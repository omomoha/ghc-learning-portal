import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AdminShell } from "@/components/AdminShell";
import { fetchUserDetail, type UserDetail } from "@/data/admin";
import { manifest } from "@/content/loader";

function fmtFullDate(ms: number | null) {
  if (!ms) return "—";
  return new Date(ms).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function AdminUserDetail() {
  const { uid = "" } = useParams<{ uid: string }>();
  const [user, setUser] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchUserDetail(uid)
      .then((u) => {
        if (!cancelled) {
          setUser(u);
          setLoading(false);
          if (!u) setError("User not found.");
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to load user");
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [uid]);

  const title = user?.displayName ?? user?.email ?? "User";

  return (
    <AdminShell
      title={title}
      subtitle={user ? `${user.email ?? "(no email)"} · ${user.role}` : "Loading…"}
    >
      <p style={{ marginBottom: 16, fontSize: 13 }}>
        <Link to="/admin/users" style={{ color: "var(--teal)" }}>← Back to all users</Link>
      </p>
      {loading && <div className="empty-state">Loading user…</div>}
      {error && (
        <div role="alert" className="empty-state" style={{ color: "var(--error)" }}>
          {error}
        </div>
      )}
      {user && (
        <>
          <div className="kpi-row">
            <article className="kpi-card">
              <div className="label">Joined</div>
              <div className="value" style={{ fontSize: 16 }}>{fmtFullDate(user.createdAt)}</div>
            </article>
            <article className="kpi-card">
              <div className="label">Last seen</div>
              <div className="value" style={{ fontSize: 16 }}>{fmtFullDate(user.lastSeenAt)}</div>
            </article>
            <article className="kpi-card">
              <div className="label">Modules completed</div>
              <div className="value">{user.progress.length} <span style={{ fontSize: 18, color: "var(--text-faint)" }}>/ {manifest.length}</span></div>
              <div className="delta">{Math.round((user.progress.length / manifest.length) * 100)}%</div>
            </article>
            <article className="kpi-card">
              <div className="label">Assessments taken</div>
              <div className="value">{user.scores.length}</div>
              <div className="delta">{user.scores.filter((s) => s.pct >= 70).length} passed</div>
            </article>
          </div>

          <article className="dashboard-card" style={{ marginBottom: 20 }}>
            <h2 style={{ fontSize: 16, marginBottom: 14 }}>Per-module progress</h2>
            <table className="admin-table" style={{ background: "transparent" }}>
              <thead>
                <tr>
                  <th style={{ width: 60 }}>#</th>
                  <th>Title</th>
                  <th style={{ width: 120 }}>Score</th>
                  <th style={{ width: 180 }}>Completed</th>
                </tr>
              </thead>
              <tbody>
                {manifest.map((m) => {
                  const prog = user.progress.find((p) => p.moduleId === m.id);
                  const score = user.scores.find((s) => s.moduleId === m.id);
                  return (
                    <tr key={m.id} style={{ cursor: "default" }}>
                      <td>{m.id}</td>
                      <td className="col-name">{m.title}</td>
                      <td>
                        {score ? (
                          <span style={{ color: score.pct >= 70 ? "var(--success)" : "var(--warning)", fontWeight: 600 }}>
                            {score.pct}% ({score.correct}/{score.total})
                          </span>
                        ) : (
                          <span style={{ color: "var(--text-faint)" }}>—</span>
                        )}
                      </td>
                      <td>
                        {prog ? (
                          <span style={{ color: "var(--success)" }}>✓ {fmtFullDate(prog.completedAt)}</span>
                        ) : (
                          <span style={{ color: "var(--text-faint)" }}>—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </article>
        </>
      )}
    </AdminShell>
  );
}
