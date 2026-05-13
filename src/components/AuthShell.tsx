import { Link } from "react-router-dom";
import type { ReactNode } from "react";

type Props = {
  title: string;
  subtitle: string;
  children: ReactNode;
  /** Optional list of value-prop bullets shown on the brand panel. */
  highlights?: string[];
};

/**
 * Two-column shell for auth pages (login, signup, forgot-password).
 * Left: branded panel with course headline + bullets.
 * Right: form card.
 */
export function AuthShell({ title, subtitle, children, highlights }: Props) {
  return (
    <div className="auth-shell">
      <aside className="auth-aside">
        <Link to="/" className="brand-row">
          <span className="brand-icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </span>
          GHC Advanced
        </Link>
        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
          {highlights && (
            <ul>
              {highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          )}
        </div>
        <p className="footer-note">© 2026 GHC Advanced Learning · The Agentic Workflow</p>
      </aside>
      <main id="main" className="auth-main" tabIndex={-1}>
        <div className="auth-card">{children}</div>
      </main>
    </div>
  );
}
