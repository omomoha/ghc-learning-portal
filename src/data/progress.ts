/**
 * Progress + assessment scores.
 *
 * Two-layer storage:
 *  - localStorage: instant-render cache, also the only store when there's no signed-in user
 *  - Firestore /users/{uid}/progress and /users/{uid}/assessments: source of truth when signed in
 *
 * Writes go through both layers; reads prefer Firestore once subscribed.
 */

import { useEffect, useMemo, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  Timestamp,
  type DocumentData,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/lib/firebase";

const KEY = "ghc_progress_v2";

export type AssessmentScore = { correct: number; total: number; pct: number; at?: number };

type LocalState = {
  completed: number[];
  completedAt: Record<number, number>;
  scores: Record<number, AssessmentScore>;
};

function readLocal(): LocalState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { completed: [], completedAt: {}, scores: {} };
    const p = JSON.parse(raw) as Partial<LocalState>;
    return {
      completed: Array.isArray(p.completed) ? p.completed : [],
      completedAt: p.completedAt ?? {},
      scores: p.scores ?? {},
    };
  } catch {
    return { completed: [], completedAt: {}, scores: {} };
  }
}

function writeLocal(s: LocalState) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* ignore */
  }
}

function tsToMs(v: unknown): number | undefined {
  if (v instanceof Timestamp) return v.toMillis();
  if (typeof v === "number") return v;
  return undefined;
}

export type ProgressState = {
  completed: Set<number>;
  completedAt: Record<number, number>;
  scores: Record<number, AssessmentScore>;
  loading: boolean;
  /** True when signed in and synced from Firestore at least once. */
  synced: boolean;
};

const initialState = (): ProgressState => {
  const local = readLocal();
  return {
    completed: new Set(local.completed),
    completedAt: local.completedAt,
    scores: local.scores,
    loading: false,
    synced: false,
  };
};

/**
 * Subscribe to progress + assessment scores.
 * - Always renders localStorage immediately.
 * - If uid is present and Firestore is configured, subscribes to live updates.
 */
export function useProgress(uid: string | null): ProgressState {
  const [state, setState] = useState<ProgressState>(initialState);

  useEffect(() => {
    if (!uid || !isFirebaseConfigured) {
      // No signed-in user → stick with localStorage (re-read in case of cross-tab updates).
      setState(initialState());
      return;
    }

    setState((s) => ({ ...s, loading: true }));

    const progRef = collection(db, "users", uid, "progress");
    const scoresRef = collection(db, "users", uid, "assessments");

    let progRecv = false;
    let scoreRecv = false;
    const completedAt: Record<number, number> = {};
    const scores: Record<number, AssessmentScore> = {};

    function flush() {
      if (!progRecv || !scoreRecv) return;
      const next: ProgressState = {
        completed: new Set(
          Object.entries(completedAt)
            .filter(([, at]) => Boolean(at))
            .map(([id]) => Number(id)),
        ),
        completedAt: { ...completedAt },
        scores: { ...scores },
        loading: false,
        synced: true,
      };
      setState(next);
      // Mirror to local cache so reload feels instant.
      writeLocal({
        completed: [...next.completed],
        completedAt: next.completedAt,
        scores: next.scores,
      });
    }

    const unsubProg = onSnapshot(progRef, (snap) => {
      snap.docChanges().forEach((c) => {
        const id = Number(c.doc.id);
        if (c.type === "removed") {
          delete completedAt[id];
        } else {
          const data = c.doc.data() as DocumentData;
          const at = tsToMs(data.completedAt);
          if (at) completedAt[id] = at;
          else delete completedAt[id];
        }
      });
      progRecv = true;
      flush();
    });

    const unsubScore = onSnapshot(scoresRef, (snap) => {
      snap.docChanges().forEach((c) => {
        const id = Number(c.doc.id);
        if (c.type === "removed") {
          delete scores[id];
        } else {
          const data = c.doc.data() as DocumentData;
          const correct = Number(data.correct ?? 0);
          const total = Number(data.total ?? 0);
          const pct = Number(data.pct ?? 0);
          const at = tsToMs(data.at);
          scores[id] = { correct, total, pct, at };
        }
      });
      scoreRecv = true;
      flush();
    });

    return () => {
      unsubProg();
      unsubScore();
    };
  }, [uid]);

  return state;
}

/** Recent activity, newest first, derived from a ProgressState. */
export function deriveRecentActivity(
  state: ProgressState,
  limit = 8,
): Array<
  | { type: "completed"; moduleId: number; at: number }
  | { type: "scored"; moduleId: number; at: number; pct: number }
> {
  const events: Array<
    | { type: "completed"; moduleId: number; at: number }
    | { type: "scored"; moduleId: number; at: number; pct: number }
  > = [];
  for (const [idStr, at] of Object.entries(state.completedAt)) {
    if (at) events.push({ type: "completed", moduleId: Number(idStr), at });
  }
  for (const [idStr, score] of Object.entries(state.scores)) {
    if (score.at) events.push({ type: "scored", moduleId: Number(idStr), at: score.at, pct: score.pct });
  }
  events.sort((a, b) => b.at - a.at);
  return events.slice(0, limit);
}

/** Write a completion. localStorage always; Firestore when uid present. */
export async function markCompleteRemote(uid: string | null, moduleId: number) {
  // localStorage first (instant feedback, offline-friendly).
  const local = readLocal();
  if (!local.completed.includes(moduleId)) {
    local.completed.push(moduleId);
    local.completedAt[moduleId] = Date.now();
    writeLocal(local);
  }
  if (uid && isFirebaseConfigured) {
    await setDoc(
      doc(db, "users", uid, "progress", String(moduleId)),
      { completedAt: serverTimestamp() },
      { merge: true },
    );
  }
}

/** Write an assessment score. localStorage always; Firestore when uid present. */
export async function saveScoreRemote(
  uid: string | null,
  moduleId: number,
  score: Omit<AssessmentScore, "at">,
) {
  const local = readLocal();
  local.scores[moduleId] = { ...score, at: Date.now() };
  writeLocal(local);
  if (uid && isFirebaseConfigured) {
    await setDoc(doc(db, "users", uid, "assessments", String(moduleId)), {
      correct: score.correct,
      total: score.total,
      pct: score.pct,
      at: serverTimestamp(),
    });
  }
}

/** Convenience reader for places that only need the cached `completed` set synchronously. */
export function getCompletedCached(): Set<number> {
  return new Set(readLocal().completed);
}

/** Cached scores for synchronous read (e.g., initial render before Firestore loads). */
export function getScoresCached(): Record<number, AssessmentScore> {
  return readLocal().scores;
}

/** Memo hook: stable boolean derived from completed Set. */
export function useIsCompleted(state: ProgressState, moduleId: number): boolean {
  return useMemo(() => state.completed.has(moduleId), [state.completed, moduleId]);
}
