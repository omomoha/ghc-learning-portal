import { NavLink } from "react-router-dom";
import type { ReactNode } from "react";
import { TopNav } from "./TopNav";
import { useProgress } from "@/data/progress";
import { useAuth } from "@/auth/AuthProvider";

type Props = { title: string; subtitle?: string; children: ReactNode };

/** Layout shell for admin pages: TopNav + admin sidebar + main. */
export function AdminShell({ title, subtitle, children }: Props) {
  const { user } = useAuth();
  const { completed } = useProgress(user?.uid ?? null);

  return (
    <>
      <TopNav completedCount={completed.size} />
      <div className="admin-shell">
        <aside className="admin-sidebar" aria-label="Admin navigation">
          <h3>Admin</h3>
          <ul className="admin-nav-list">
            <li>
              <NavLink to="/admin" end>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="3" y="3" width="7" height="9" />
                  <rect x="14" y="3" width="7" height="5" />
                  <rect x="14" y="12" width="7" height="9" />
                  <rect x="3" y="16" width="7" height="5" />
                </svg>
                Overview
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/users">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                Users
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/resources">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                Resources
              </NavLink>
            </li>
          </ul>
          <h3 style={{ marginTop: 28 }}>Learner view</h3>
          <ul className="admin-nav-list">
            <li>
              <NavLink to="/dashboard">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M3 12l2-2 4 4 8-8 4 4" />
                </svg>
                My dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/learn/home">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                </svg>
                Course
              </NavLink>
            </li>
          </ul>
        </aside>
        <main id="main" tabIndex={-1}>
          <div className="admin-page">
            <header className="admin-header">
              <h1>{title}</h1>
              {subtitle && <p className="sub">{subtitle}</p>}
            </header>
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
