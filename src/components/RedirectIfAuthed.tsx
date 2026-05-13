import { Navigate } from "react-router-dom";
import { useAuth } from "@/auth/AuthProvider";
import type { ReactNode } from "react";

/** Wrap a public page (login/signup) so signed-in users are bounced to /learn/home. */
export function RedirectIfAuthed({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to="/learn/home" replace />;
  return <>{children}</>;
}
