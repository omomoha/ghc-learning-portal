import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { httpsCallable } from "firebase/functions";
import { AdminShell } from "@/components/AdminShell";
import { fetchAllUsers, type AdminUserRow } from "@/data/admin";
import { functions } from "@/lib/firebase";

type SortKey = "displayName" | "email" | "role" | "completedCount" | "averagePct" | "lastSeenAt";

function fmtDate(ms: number | null) {
  if (!ms) return "—";
  const d = Date.now() - ms;
  const days = Math.floor(d / 86400000);
  if (days < 1) return "today";
  if (days === 1) return "yesterday";
  if (days < 7) return `${days} days ago`;
  return new Date(ms).toLocaleDateString();
}

export function AdminUsers() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<AdminUserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("lastSeenAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [busyUid, setBusyUid] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchAllUsers()
      .then((r) => {
        if (!cancelled) {
          setRows(r);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load users");
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const sorted = useMemo(() => {
    const filtered = q.trim()
      ? rows.filter((r) => {
          const hay = `${r.displayName ?? ""} ${r.email ?? ""}`.toLowerCase();
          return hay.includes(q.trim().toLowerCase());
        })
      : rows;
    const dir = sortDir === "asc" ? 1 : -1;
    return [...filtered].sort((a, b) => {
      const av = a[sortKey] as string | number | null;
      const bv = b[sortKey] as string | number | null;
      if (av === bv) return 0;
      if (av === null) return 1;
      if (bv === null) return -1;
      return av > bv ? dir : -dir;
    });
  }, [rows, q, sortKey, sortDir]);

  function toggleSort(k: SortKey) {
    if (k === sortKey) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else {
      setSortKey(k);
      setSortDir(k === "displayName" || k === "email" ? "asc" : "desc");
    }
  }

  async function toggleRole(row: AdminUserRow) {
    if (!window.confirm(
      `${row.role === "admin" ? "Remove admin from" : "Make admin:"} ${row.email ?? row.uid}?`,
    )) return;
    setBusyUid(row.uid);
    try {
      const setAdminRole = httpsCallable<{ targetUid: string; admin: boolean }, { ok: boolean }>(
        functions,
        "setAdminRole",
      );
      await setAdminRole({ targetUid: row.uid, admin: row.role !== "admin" });
      setRows((rs) =>
        rs.map((r) => (r.uid === row.uid ? { ...r, role: r.role === "admin" ? "learner" : "admin" } : r)),
      );
    } catch (e) {
      window.alert(`Couldn't update role: ${e instanceof Error ? e.message : "unknown error"}`);
    } finally {
      setBusyUid(null);
    }
  }

  return (
    <AdminShell title="Users" subtitle={`${rows.length} signed up`}>
      {loading && <div className="empty-state">Loading users…</div>}
      {error && (
        <div role="alert" className="empty-state" style={{ color: "var(--error)" }}>
          {error}
        </div>
      )}
      {!loading && !error && (
        <div className="admin-table-wrap">
          <div className="admin-table-toolbar">
            <input
              type="search"
              placeholder="Search by name or email…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Search users"
            />
            <span style={{ fontSize: 12, color: "var(--text-faint)" }}>
              Showing {sorted.length} of {rows.length}
            </span>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>
                  <button type="button" onClick={() => toggleSort("displayName")}>Name {sortKey === "displayName" ? (sortDir === "asc" ? "↑" : "↓") : ""}</button>
                </th>
                <th>
                  <button type="button" onClick={() => toggleSort("email")}>Email {sortKey === "email" ? (sortDir === "asc" ? "↑" : "↓") : ""}</button>
                </th>
                <th>Role</th>
                <th>
                  <button type="button" onClick={() => toggleSort("completedCount")}>Completed {sortKey === "completedCount" ? (sortDir === "asc" ? "↑" : "↓") : ""}</button>
                </th>
                <th>
                  <button type="button" onClick={() => toggleSort("averagePct")}>Avg score {sortKey === "averagePct" ? (sortDir === "asc" ? "↑" : "↓") : ""}</button>
                </th>
                <th>
                  <button type="button" onClick={() => toggleSort("lastSeenAt")}>Last seen {sortKey === "lastSeenAt" ? (sortDir === "asc" ? "↑" : "↓") : ""}</button>
                </th>
                <th aria-label="Actions"></th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((r) => (
                <tr key={r.uid} onClick={() => navigate(`/admin/users/${r.uid}`)}>
                  <td className="col-name">{r.displayName ?? "(unnamed)"}</td>
                  <td className="col-email">{r.email ?? "—"}</td>
                  <td>
                    <span className={`role-tag${r.role === "admin" ? " admin" : ""}`}>{r.role}</span>
                  </td>
                  <td>{r.completedCount} / 16</td>
                  <td>{r.averagePct === null ? "—" : `${r.averagePct}%`}</td>
                  <td>{fmtDate(r.lastSeenAt)}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      style={{ padding: "4px 10px", fontSize: 12 }}
                      onClick={() => toggleRole(r)}
                      disabled={busyUid === r.uid}
                    >
                      {busyUid === r.uid
                        ? "Updating…"
                        : r.role === "admin"
                          ? "Demote"
                          : "Make admin"}
                    </button>
                  </td>
                </tr>
              ))}
              {sorted.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", color: "var(--text-muted)", padding: 32 }}>
                    No users match the current filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </AdminShell>
  );
}
