import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export function RequireAdmin({ children }: { children: JSX.Element }) {
  const { user, role, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="container" style={{ padding: 24 }}>Loading…</div>;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  if (role !== "admin") return <Navigate to="/dashboard" replace />;
  return children;
}
