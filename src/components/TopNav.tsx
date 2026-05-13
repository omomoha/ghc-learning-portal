import { Link } from "react-router-dom";
import { manifest } from "@/content/loader";
import { ThemeToggle } from "./ThemeToggle";
import { UserMenu } from "./UserMenu";

type Props = {
  completedCount: number;
  onToggleSidebar?: () => void;
  sidebarOpen?: boolean;
  breadcrumb?: React.ReactNode;
};

export function TopNav({ completedCount, onToggleSidebar, sidebarOpen, breadcrumb }: Props) {
  const total = manifest.length;
  const pct = total ? Math.round((completedCount / total) * 100) : 0;

  return (
    <nav className="top-nav" aria-label="Primary">
      <div className="nav-inner">
        {onToggleSidebar && (
          <button
            type="button"
            className="sidebar-toggle"
            onClick={onToggleSidebar}
            aria-label={sidebarOpen ? "Close course navigation" : "Open course navigation"}
            aria-expanded={sidebarOpen}
            aria-controls="learn-sidebar"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        )}
        <Link to="/learn/home" className="nav-brand">
          <span className="brand-icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </span>
          <span>GHC Advanced: Agentic Workflow</span>
        </Link>
        {breadcrumb && <div className="nav-breadcrumb">{breadcrumb}</div>}
        <div className="nav-progress-wrap" aria-label={`Course progress: ${completedCount} of ${total} modules`}>
          <span>{completedCount} / {total}</span>
          <div className="nav-progress-bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
            <div className="nav-progress-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
        <ThemeToggle />
        <UserMenu />
      </div>
    </nav>
  );
}
