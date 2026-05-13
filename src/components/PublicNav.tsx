import { Link } from "react-router-dom";
import { useAuth } from "@/auth/AuthProvider";
import { ThemeToggle } from "./ThemeToggle";

export function PublicNav() {
  const { user } = useAuth();

  return (
    <nav className="public-nav" aria-label="Primary">
      <div className="public-nav-inner">
        <Link to="/" className="nav-brand">
          <span className="brand-icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </span>
          <span>GHC Advanced: Agentic Workflow</span>
        </Link>
        <ThemeToggle />
        {user ? (
          <Link to="/learn/home" className="btn btn-primary">
            Continue learning
          </Link>
        ) : (
          <>
            <Link to="/login" className="btn btn-secondary">Sign in</Link>
            <Link to="/signup" className="btn btn-primary">Get started</Link>
          </>
        )}
      </div>
    </nav>
  );
}
