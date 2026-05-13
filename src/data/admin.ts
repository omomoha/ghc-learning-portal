/**
 * Admin data fetchers. These query Firestore across all users and aggregate
 * progress + assessment scores. For small/medium cohorts this is fine.
 * For larger cohorts we'd denormalize per-user stats onto the user doc.
 */

import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  deleteDoc,
  Timestamp,
  type DocumentData,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { manifest } from "@/content/loader";

export type AdminUserRow = {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: "admin" | "learner";
  createdAt: number | null;
  lastSeenAt: number | null;
  completedCount: number;
  assessmentsTaken: number;
  averagePct: number | null;
};

function tsToMs(v: unknown): number | null {
  if (v instanceof Timestamp) return v.toMillis();
  if (typeof v === "number") return v;
  return null;
}

async function loadCounts(uid: string) {
  const [progSnap, scoresSnap] = await Promise.all([
    getDocs(collection(db, "users", uid, "progress")),
    getDocs(collection(db, "users", uid, "assessments")),
  ]);
  let avgTotal = 0;
  let avgCount = 0;
  scoresSnap.forEach((d) => {
    const s = d.data() as { pct?: number };
    if (typeof s.pct === "number") {
      avgTotal += s.pct;
      avgCount++;
    }
  });
  return {
    completedCount: progSnap.size,
    assessmentsTaken: scoresSnap.size,
    averagePct: avgCount ? Math.round(avgTotal / avgCount) : null,
  };
}

/** Fetch every user with progress aggregates. One-shot, runs N+1 in parallel. */
export async function fetchAllUsers(): Promise<AdminUserRow[]> {
  const snap = await getDocs(query(collection(db, "users"), orderBy("createdAt", "desc")));
  const docs = snap.docs;
  const rows = await Promise.all(
    docs.map(async (d) => {
      const data = d.data() as DocumentData;
      const counts = await loadCounts(d.id);
      return {
        uid: d.id,
        email: data.email ?? null,
        displayName: data.displayName ?? null,
        role: data.role === "admin" ? "admin" : "learner",
        createdAt: tsToMs(data.createdAt),
        lastSeenAt: tsToMs(data.lastSeenAt),
        ...counts,
      } as AdminUserRow;
    }),
  );
  return rows;
}

export type CohortSummary = {
  totalUsers: number;
  activeLast7d: number;
  totalCompletions: number;
  averagePct: number | null;
  completionsByModule: Array<{ moduleId: number; title: string; completed: number }>;
  recentCompletions: Array<{ uid: string; displayName: string | null; moduleId: number; at: number }>;
};

/** Aggregate stats across the whole cohort for the overview page. */
export async function fetchCohortSummary(): Promise<CohortSummary> {
  const usersSnap = await getDocs(collection(db, "users"));
  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

  let totalUsers = 0;
  let activeLast7d = 0;
  let totalCompletions = 0;
  let avgTotal = 0;
  let avgCount = 0;
  const completionsByModuleMap = new Map<number, number>();
  const recents: CohortSummary["recentCompletions"] = [];

  await Promise.all(
    usersSnap.docs.map(async (u) => {
      totalUsers++;
      const ud = u.data() as DocumentData;
      const lastSeen = tsToMs(ud.lastSeenAt);
      if (lastSeen && lastSeen >= sevenDaysAgo) activeLast7d++;

      const [progSnap, scoresSnap] = await Promise.all([
        getDocs(collection(db, "users", u.id, "progress")),
        getDocs(collection(db, "users", u.id, "assessments")),
      ]);
      progSnap.forEach((p) => {
        const id = Number(p.id);
        completionsByModuleMap.set(id, (completionsByModuleMap.get(id) ?? 0) + 1);
        totalCompletions++;
        const at = tsToMs((p.data() as DocumentData).completedAt);
        if (at) {
          recents.push({
            uid: u.id,
            displayName: (ud.displayName as string) ?? (ud.email as string) ?? null,
            moduleId: id,
            at,
          });
        }
      });
      scoresSnap.forEach((s) => {
        const pct = (s.data() as { pct?: number }).pct;
        if (typeof pct === "number") {
          avgTotal += pct;
          avgCount++;
        }
      });
    }),
  );

  const completionsByModule = manifest.map((m) => ({
    moduleId: m.id,
    title: m.title,
    completed: completionsByModuleMap.get(m.id) ?? 0,
  }));
  recents.sort((a, b) => b.at - a.at);

  return {
    totalUsers,
    activeLast7d,
    totalCompletions,
    averagePct: avgCount ? Math.round(avgTotal / avgCount) : null,
    completionsByModule,
    recentCompletions: recents.slice(0, 10),
  };
}

export type UserDetail = {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: "admin" | "learner";
  createdAt: number | null;
  lastSeenAt: number | null;
  progress: Array<{ moduleId: number; completedAt: number | null }>;
  scores: Array<{ moduleId: number; correct: number; total: number; pct: number; at: number | null }>;
};

export async function fetchUserDetail(uid: string): Promise<UserDetail | null> {
  const userSnap = await getDoc(doc(db, "users", uid));
  if (!userSnap.exists()) return null;
  const data = userSnap.data() as DocumentData;
  const [progSnap, scoresSnap] = await Promise.all([
    getDocs(collection(db, "users", uid, "progress")),
    getDocs(collection(db, "users", uid, "assessments")),
  ]);
  const progress = progSnap.docs.map((d) => ({
    moduleId: Number(d.id),
    completedAt: tsToMs((d.data() as DocumentData).completedAt),
  }));
  const scores = scoresSnap.docs.map((d) => {
    const s = d.data() as DocumentData;
    return {
      moduleId: Number(d.id),
      correct: Number(s.correct ?? 0),
      total: Number(s.total ?? 0),
      pct: Number(s.pct ?? 0),
      at: tsToMs(s.at),
    };
  });
  return {
    uid,
    email: data.email ?? null,
    displayName: data.displayName ?? null,
    role: data.role === "admin" ? "admin" : "learner",
    createdAt: tsToMs(data.createdAt),
    lastSeenAt: tsToMs(data.lastSeenAt),
    progress: progress.sort((a, b) => a.moduleId - b.moduleId),
    scores: scores.sort((a, b) => a.moduleId - b.moduleId),
  };
}

/* ===== Resources ===== */

export type Resource = {
  id: string;
  title: string;
  description: string;
  type: "pdf" | "slides" | "video" | "link";
  url: string;
  storagePath?: string;
  moduleId?: number;
  sizeBytes?: number;
  uploadedBy: string;
  uploadedAt: number | null;
};

export async function fetchResources(): Promise<Resource[]> {
  const snap = await getDocs(query(collection(db, "resources"), orderBy("uploadedAt", "desc")));
  return snap.docs.map((d) => {
    const data = d.data() as DocumentData;
    return {
      id: d.id,
      title: String(data.title ?? ""),
      description: String(data.description ?? ""),
      type: (data.type ?? "link") as Resource["type"],
      url: String(data.url ?? ""),
      storagePath: data.storagePath as string | undefined,
      moduleId: typeof data.moduleId === "number" ? data.moduleId : undefined,
      sizeBytes: typeof data.sizeBytes === "number" ? data.sizeBytes : undefined,
      uploadedBy: String(data.uploadedBy ?? ""),
      uploadedAt: tsToMs(data.uploadedAt),
    };
  });
}

export async function createResource(
  uid: string,
  partial: Omit<Resource, "id" | "uploadedBy" | "uploadedAt">,
) {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  await setDoc(doc(db, "resources", id), {
    ...partial,
    uploadedBy: uid,
    uploadedAt: serverTimestamp(),
  });
  return id;
}

export async function deleteResource(id: string) {
  await deleteDoc(doc(db, "resources", id));
}
