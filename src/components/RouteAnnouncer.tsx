import { useEffect, useState } from "react";
import { useLocation, matchPath } from "react-router-dom";
import { manifest } from "@/content/loader";

/**
 * Screen-reader-only live region that announces route changes.
 * Also scrolls to top + moves focus to <main id="main"> on each navigation
 * so keyboard users start at the right place.
 */
export function RouteAnnouncer() {
  const location = useLocation();
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Resolve a human-readable title for the current route.
    let title = "Page";
    const path = location.pathname;
    if (path === "/") title = "Landing page";
    else if (path === "/login") title = "Sign in";
    else if (path === "/signup") title = "Create account";
    else if (path === "/forgot-password") title = "Reset password";
    else if (path === "/dashboard") title = "Your dashboard";
    else if (path === "/learn/home") title = "Course overview";
    else if (path === "/learn/prerequisites") title = "Prerequisites";
    else if (path.startsWith("/admin")) title = "Admin";
    else {
      const m = matchPath("/learn/module/:id", path);
      if (m?.params.id) {
        const id = Number(m.params.id);
        const mod = manifest.find((x) => x.id === id);
        if (mod) title = `Module ${id}: ${mod.title}`;
      }
    }
    setMessage(`Navigated to ${title}`);
    document.title = `${title} · GHC Advanced`;

    // Move focus to main + scroll top.
    const main = document.getElementById("main");
    if (main) {
      main.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  }, [location.pathname]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: "absolute",
        width: 1,
        height: 1,
        overflow: "hidden",
        clip: "rect(0 0 0 0)",
        whiteSpace: "nowrap",
        padding: 0,
        margin: -1,
        border: 0,
      }}
    >
      {message}
    </div>
  );
}
