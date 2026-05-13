import { useTheme, effectiveTheme, type Theme } from "@/lib/theme";

const order: Theme[] = ["system", "light", "dark"];
const labels: Record<Theme, string> = {
  system: "System theme",
  light: "Light theme",
  dark: "Dark theme",
};

export function ThemeToggle() {
  const [theme, setTheme] = useTheme();

  function cycle() {
    const idx = order.indexOf(theme);
    setTheme(order[(idx + 1) % order.length]);
  }

  const effective = effectiveTheme(theme);

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`Theme: ${labels[theme]}. Click to cycle.`}
      title={labels[theme]}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 36,
        height: 36,
        borderRadius: "var(--radius)",
        color: "var(--text-muted)",
      }}
    >
      {effective === "dark" ? (
        // Moon
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        // Sun
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      )}
    </button>
  );
}
