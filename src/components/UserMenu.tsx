import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useAuth } from "@/auth/AuthProvider";
import { auth } from "@/lib/firebase";

export function UserMenu() {
  const { user, role } = useAuth();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!user) return null;

  const initials = (user.displayName || user.email || "U")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w: string) => w[0]?.toUpperCase())
    .join("");

  return (
    <div ref={wrapRef} style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={`Account menu for ${user.email}`}
        style={{
          width: 36,
          height: 36,
          borderRadius: 999,
          background: "var(--teal-light)",
          color: "var(--brand)",
          fontWeight: 700,
          fontSize: 13,
          display: "grid",
          placeItems: "center",
        }}
      >
        {initials}
      </button>
      {open && (
        <div
          role="menu"
          style={{
            position: "absolute",
            right: 0,
            top: "calc(100% + 6px)",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            minWidth: 220,
            boxShadow: "var(--shadow-lg)",
            padding: 8,
            zIndex: 50,
          }}
        >
          <div style={{ padding: "8px 10px", borderBottom: "1px solid var(--border)", marginBottom: 4 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{user.displayName || "Learner"}</div>
            <div style={{ fontSize: 12, color: "var(--text-faint)" }}>{user.email}</div>
            {role === "admin" && (
              <div style={{ fontSize: 11, marginTop: 4, color: "var(--brand)", fontWeight: 700 }}>
                ADMIN
              </div>
            )}
          </div>
          <MenuLink to="/dashboard" onClick={() => setOpen(false)}>Your dashboard</MenuLink>
          {role === "admin" && (
            <MenuLink to="/admin" onClick={() => setOpen(false)}>Admin</MenuLink>
          )}
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              void signOut(auth);
            }}
            style={menuItemStyle}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}

const menuItemStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  textAlign: "left",
  padding: "8px 10px",
  borderRadius: "var(--radius-sm)",
  fontSize: 14,
  color: "var(--text)",
  background: "transparent",
  textDecoration: "none",
};

function MenuLink({ to, onClick, children }: { to: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link role="menuitem" to={to} onClick={onClick} style={menuItemStyle}>
      {children}
    </Link>
  );
}
