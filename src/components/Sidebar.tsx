import { Link } from "react-router-dom";
import { manifest } from "@/content/loader";

type Props = {
  open: boolean;
  onClose: () => void;
  completed: Set<number>;
  currentModuleId?: number;
};

export function Sidebar({ open, onClose, completed, currentModuleId }: Props) {
  const w1 = manifest.filter((m) => m.workshop === 1);
  const w2 = manifest.filter((m) => m.workshop === 2);

  return (
    <>
      <aside
        className={`left-sidebar${open ? " open" : ""}`}
        aria-label="Course navigation"
        id="learn-sidebar"
      >
        <div>
          <Link to="/learn/home" className="sidebar-home-btn" onClick={onClose}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9,22 9,12 15,12 15,22" />
            </svg>
            Course overview
          </Link>

          {[
            { label: "Workshop 1", sub: "Agentic Development & AI Code Review", items: w1 },
            { label: "Workshop 2", sub: "Skills, MCP & Enterprise Governance", items: w2 },
          ].map((ws) => (
            <div key={ws.label} className="sidebar-workshop">
              <div className="sidebar-ws-label">{ws.label}</div>
              <div className="sidebar-ws-sub">{ws.sub}</div>
              <ul className="sidebar-module-list">
                {ws.items.map((m) => {
                  const done = completed.has(m.id);
                  const active = currentModuleId === m.id;
                  return (
                    <li key={m.id}>
                      <Link
                        to={`/learn/module/${m.id}`}
                        className={[done ? "completed" : "", active ? "active" : ""].join(" ").trim()}
                        onClick={onClose}
                        aria-current={active ? "page" : undefined}
                      >
                        <span className="mod-num" aria-hidden="true">{m.id}</span>
                        <span style={{ flex: 1 }}>{m.title}</span>
                        {done && <span className="mod-check" aria-label="completed">✓</span>}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </aside>
      <div
        className={`sidebar-overlay${open ? " show" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />
    </>
  );
}
