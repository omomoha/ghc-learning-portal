import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { AdminShell } from "@/components/AdminShell";
import { fetchCohortSummary, type CohortSummary } from "@/data/admin";

function relativeTime(ms: number): string {
  const diff = Date.now() - ms;
  const s = Math.floor(diff / 1000);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m} minute${m === 1 ? "" : "s"} ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} hour${h === 1 ? "" : "s"} ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d} day${d === 1 ? "" : "s"} ago`;
  return new Date(ms).toLocaleDateString();
}

export function AdminOverview() {
  const [summary, setSummary] = useState<CohortSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchCohortSummary()
      .then((s) => {
        if (!cancelled) {
          setSummary(s);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load cohort stats");
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <AdminShell title="Cohort overview" subtitle="Live stats across all learners.">
      {loading && <div className="empty-state">Loading cohort stats…</div>}
      {error && (
        <div role="alert" className="empty-state" style={{ color: "var(--error)" }}>
          {error}
        </div>
      )}
      {summary && (
        <>
          <div className="kpi-row">
            <article className="kpi-card">
              <div className="label">Total users</div>
              <div className="value">{summary.totalUsers}</div>
              <div className="delta">Across all roles</div>
            </article>
            <article className="kpi-card">
              <div className="label">Active in last 7 days</div>
              <div className="value">{summary.activeLast7d}</div>
              <div className="delta">
                {summary.totalUsers
                  ? `${Math.round((summary.activeLast7d / summary.totalUsers) * 100)}% of cohort`
                  : "No users yet"}
              </div>
            </article>
            <article className="kpi-card">
              <div className="label">Total completions</div>
              <div className="value">{summary.totalCompletions}</div>
              <div className="delta">Across all users &amp; modules</div>
            </article>
            <article className="kpi-card">
              <div className="label">Average assessment score</div>
              <div className="value">{summary.averagePct === null ? "—" : `${summary.averagePct}%`}</div>
              <div className={`delta${summary.averagePct !== null && summary.averagePct >= 70 ? " good" : ""}`}>
                {summary.averagePct === null
                  ? "No assessments taken yet"
                  : summary.averagePct >= 70
                    ? "Cohort passing"
                    : "Below pass threshold"}
              </div>
            </article>
          </div>

          <article className="dashboard-card" style={{ marginBottom: 20 }}>
            <h2 style={{ fontSize: 16, marginBottom: 14 }}>Completions by module</h2>
            {summary.completionsByModule.every((m) => m.completed === 0) ? (
              <div className="empty-state">
                No modules have been completed by anyone yet. Once learners start finishing modules, the bars
                will fill in here.
              </div>
            ) : (
              <div style={{ width: "100%", height: 280 }}>
                <ResponsiveContainer>
                  <BarChart data={summary.completionsByModule} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                    <XAxis dataKey="moduleId" tickLine={false} axisLine={false} fontSize={11} stroke="var(--text-faint)" />
                    <YAxis tickLine={false} axisLine={false} fontSize={11} stroke="var(--text-faint)" allowDecimals={false} />
                    <Tooltip
                      contentStyle={{
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        borderRadius: 8,
                        fontSize: 12,
                      }}
                      labelFormatter={(id) => {
                        const m = summary.completionsByModule.find((x) => x.moduleId === Number(id));
                        return m ? `Module ${id}: ${m.title}` : `Module ${id}`;
                      }}
                      formatter={(value: number) => [`${value} learner${value === 1 ? "" : "s"}`, "Completed"]}
                    />
                    <Bar dataKey="completed" radius={[6, 6, 0, 0]}>
                      {summary.completionsByModule.map((e) => (
                        <Cell key={e.moduleId} fill={e.completed > 0 ? "var(--teal)" : "var(--border)"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </article>

          <article className="dashboard-card">
            <h2 style={{ fontSize: 16, marginBottom: 14 }}>Recent completions across the cohort</h2>
            {summary.recentCompletions.length === 0 ? (
              <div className="empty-state">No completion events yet.</div>
            ) : (
              <ul className="recent-list">
                {summary.recentCompletions.map((e, i) => (
                  <li key={i} className="recent-item">
                    <span className="badge-mini" aria-hidden="true">✓</span>
                    <span className="recent-title">
                      <Link to={`/admin/users/${e.uid}`} style={{ color: "var(--text)", fontWeight: 600 }}>
                        {e.displayName ?? "(unnamed)"}
                      </Link>{" "}
                      completed <strong>Module {e.moduleId}</strong>
                    </span>
                    <time dateTime={new Date(e.at).toISOString()}>{relativeTime(e.at)}</time>
                  </li>
                ))}
              </ul>
            )}
          </article>
        </>
      )}
    </AdminShell>
  );
}
