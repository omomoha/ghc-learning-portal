import { useEffect, useState, type ReactNode } from "react";
import { TopNav } from "./TopNav";
import { Sidebar } from "./Sidebar";

type Props = {
  completed: Set<number>;
  currentModuleId?: number;
  breadcrumb?: ReactNode;
  children: ReactNode;
};

/** Shared shell for the gated learner experience: top nav + sidebar + main content. */
export function LearnShell({ completed, currentModuleId, breadcrumb, children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ESC closes the sidebar drawer (mobile).
  useEffect(() => {
    if (!sidebarOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSidebarOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sidebarOpen]);

  return (
    <>
      <TopNav
        completedCount={completed.size}
        onToggleSidebar={() => setSidebarOpen((s) => !s)}
        sidebarOpen={sidebarOpen}
        breadcrumb={breadcrumb}
      />
      <div className="learn-shell">
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          completed={completed}
          currentModuleId={currentModuleId}
        />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
      </div>
    </>
  );
}
