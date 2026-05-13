/**
 * Theme management.
 * - "system" follows prefers-color-scheme (default).
 * - "light" / "dark" overrides via data-theme attribute on <html>.
 * Persisted in localStorage.
 */

import { useEffect, useState } from "react";

export type Theme = "system" | "light" | "dark";

const KEY = "ghc_theme";

export function readTheme(): Theme {
  try {
    const v = localStorage.getItem(KEY);
    if (v === "light" || v === "dark" || v === "system") return v;
  } catch {
    /* ignore */
  }
  return "system";
}

export function applyTheme(t: Theme) {
  const html = document.documentElement;
  if (t === "system") html.removeAttribute("data-theme");
  else html.setAttribute("data-theme", t);
  try {
    localStorage.setItem(KEY, t);
  } catch {
    /* ignore */
  }
}

/** Hook: returns [theme, setTheme]. */
export function useTheme(): [Theme, (t: Theme) => void] {
  const [theme, setTheme] = useState<Theme>(() => readTheme());
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);
  return [theme, setTheme];
}

/** Resolve the *effective* theme right now (system → resolves to light or dark). */
export function effectiveTheme(t: Theme): "light" | "dark" {
  if (t === "light" || t === "dark") return t;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
