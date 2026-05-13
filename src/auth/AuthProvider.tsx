import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { auth, db, isFirebaseConfigured } from "@/lib/firebase";

export type Role = "learner" | "admin";

type AuthState = {
  user: User | null;
  role: Role | null;
  loading: boolean;
};

const AuthContext = createContext<AuthState>({ user: null, role: null, loading: true });

function resolveRole(claimAdmin: boolean, firestoreRole: unknown): Role {
  if (claimAdmin) return "admin";
  if (firestoreRole === "admin") return "admin";
  return "learner";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(isFirebaseConfigured);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false);
      return;
    }
    let stopRoleSub: (() => void) | null = null;

    const unsubAuth = onAuthStateChanged(auth, async (u: User | null) => {
      // Tear down the previous user's role subscription before switching.
      if (stopRoleSub) {
        stopRoleSub();
        stopRoleSub = null;
      }
      setUser(u);
      if (!u) {
        setRole(null);
        setLoading(false);
        return;
      }

      // Resolve initial role from BOTH the custom claim AND the Firestore role doc
      // before unblocking the route guards. This avoids a flash-of-wrong-role where
      // RequireAdmin would otherwise redirect to /dashboard during the first paint
      // because the Firestore snapshot hadn't arrived yet.
      let claimAdmin = false;
      try {
        const token = await u.getIdTokenResult();
        claimAdmin = token.claims.admin === true;
      } catch {
        /* ignore */
      }
      let firestoreRole: unknown = null;
      try {
        const snap = await getDoc(doc(db, "users", u.uid));
        firestoreRole = (snap.data() as { role?: string } | undefined)?.role;
      } catch {
        /* ignore — security rules might block this momentarily; we'll retry via onSnapshot */
      }
      setRole(resolveRole(claimAdmin, firestoreRole));
      setLoading(false);

      // Subscribe for live role changes (e.g., an admin promotes / demotes this user).
      stopRoleSub = onSnapshot(doc(db, "users", u.uid), (snap) => {
        const r = (snap.data() as { role?: string } | undefined)?.role;
        setRole(resolveRole(claimAdmin, r));
      });
    });

    return () => {
      if (stopRoleSub) stopRoleSub();
      unsubAuth();
    };
  }, []);

  const value = useMemo(() => ({ user, role, loading }), [user, role, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
