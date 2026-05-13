import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { LearnShell } from "@/components/LearnShell";
import { manifest } from "@/content/loader";
import { deriveRecentActivity, useProgress } from "@/data/progress";
import { useAuth } from "@/auth/AuthProvider";

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

export function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const progress = useProgress(user?.uid ?? null);
  const { completed, scores } = progress;
  const recent = useMemo(() => deriveRecentActivity(progress, 6), [progress]);

  const total = manifest.length;
  const completedCount = completed.size;
  const pct = total ? Math.round((completedCount / total) * 100) : 0;

  const scoreEntries = Object.entries(scores)
    .map(([id, s]) => ({ id: Number(id), pct: s.pct, correct: s.correct, totalQ: s.total }))
    .sort((a, b) => a.id - b.id);
  const avgScore = scoreEntries.length
    ? Math.round(scoreEntries.reduce((sum, x) => sum + x.pct, 0) / scoreEntries.length)
    : 0;

  // First incomplete module, then up to 3 more.
  const upNext = manifest.filter((m) => !completed.has(m.id)).slice(0, 3);

  // SVG ring math
  const ringSize = 120;
  const stroke = 10;
  const r = (ringSize - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct / 100);

  return (
    <LearnShell completed={completed}>
      <div className="dashboard-page">
        <header className="dashboard-header">
          <div>
            <h1>Welcome back{user?.displayName ? `, ${user.displayName.split(" ")[0]}` : ""}.</h1>
            <p className="sub">
              {completedCount === 0
                ? "Let's get started with your first module."
                : completedCount === total
                  ? "You've completed every module. Congratulations!"
                  : `You're ${pct}% through the course. Keep going.`}
            </p>
          </div>
          {upNext[0] && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate(`/learn/module/${upNext[0].id}`)}
            >
              Continue with Module {upNext[0].id} →
            </button>
          )}
        </header>

        <div className="kpi-row">
          <article className="kpi-card">
            <div className="label">Modules completed</div>
            <div className="value">{completedCount} <span style={{ fontSize: 18, color: "var(--text-faint)" }}>/ {total}</span></div>
            <div className="delta">{pct}% of the course</div>
          </article>
          <article className="kpi-card">
            <div className="label">Assessments taken</div>
            <div className="value">{scoreEntries.length}</div>
            <div className="delta">{scoreEntries.filter((s) => s.pct >= 70).length} passed</div>
          </article>
          <article className="kpi-card">
            <div className="label">Average score</div>
            <div className="value">{scoreEntries.length ? `${avgScore}%` : "—"}</div>
            <div className={`delta${avgScore >= 70 ? " good" : ""}`}>
              {scoreEntries.length === 0
                ? "Take your first assessment"
                : avgScore >= 90
                  ? "Excellent"
                  : avgScore >= 70
                    ? "Passing"
                    : "Review the material"}
            </div>
          </article>
          <article className="kpi-card">
            <div className="label">Modules remaining</div>
            <div className="value">{total - completedCount}</div>
            <div className="delta">{total - completedCount === 0 ? "All done" : `≈ ${Math.max(0, (total - completedCount) * 50)} minutes`}</div>
          </article>
        </div>

        <div className="dashboard-grid">
          <article className="dashboard-card">
            <h2>Assessment scores by module</h2>
            {scoreEntries.length === 0 ? (
              <div className="empty-state">
                You haven't taken any assessments yet. Each module ends with a knowledge check.
              </div>
            ) : (
              <div style={{ width: "100%", height: 260 }}>
                <ResponsiveContainer>
                  <BarChart data={scoreEntries} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                    <XAxis dataKey="id" tickLine={false} axisLine={false} fontSize={11} stroke="var(--text-faint)" />
                    <YAxis
                      domain={[0, 100]}
                      tickFormatter={(v) => `${v}%`}
                      tickLine={false}
                      axisLine={false}
                      fontSize={11}
                      stroke="var(--text-faint)"
                    />
                    <Tooltip
                      contentStyle={{
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                        fontSize: 12,
                      }}
                      formatter={(value: number, _name: string, entry) => {
                        const e = entry.payload as { correct: number; totalQ: number };
                        return [`${value}% (${e.correct}/${e.totalQ})`, "Score"];
                      }}
                      labelFormatter={(id) => {
                        const m = manifest.find((x) => x.id === Number(id));
                        return m ? `Module ${id}: ${m.title}` : `Module ${id}`;
                      }}
                    />
                    <Bar dataKey="pct" radius={[6, 6, 0, 0]}>
                      {scoreEntries.map((e) => (
                        <Cell
                          key={e.id}
                          fill={e.pct >= 90 ? "var(--success)" : e.pct >= 70 ? "var(--teal)" : "var(--warning)"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </article>

          <article className="dashboard-card">
            <h2>Overall progress</h2>
            <div className="progress-ring-block">
              <div className="progress-ring" role="img" aria-label={`${pct}% of the course complete`}>
                <svg viewBox={`0 0 ${ringSize} ${ringSize}`}>
                  <circle className="track" cx={ringSize / 2} cy={ringSize / 2} r={r} strokeWidth={stroke} fill="none" />
                  <circle
                    className="fill"
                    cx={ringSize / 2}
                    cy={ringSize / 2}
                    r={r}
                    strokeWidth={stroke}
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${circ - offset} ${circ}`}
                  />
                </svg>
                <div className="label">{pct}%</div>
              </div>
              <div className="progress-ring-stats">
                <div className="row"><strong>{completedCount}</strong> of {total} modules done</div>
                <div className="row"><strong>{Object.keys(scores).length}</strong> assessments taken</div>
                <div className="row"><strong>{avgScore}%</strong> average score</div>
              </div>
            </div>
          </article>
        </div>

        <div className="dashboard-grid">
          <article className="dashboard-card">
            <h2>Up next</h2>
            {upNext.length === 0 ? (
              <div className="empty-state">All modules complete. Excellent work.</div>
            ) : (
              <ul className="up-next-list">
                {upNext.map((m) => (
                  <li key={m.id}>
                    <button
                      type="button"
                      className="up-next-item"
                      onClick={() => navigate(`/learn/module/${m.id}`)}
                    >
                      <span className="num" aria-hidden="true">{m.id}</span>
                      <span style={{ flex: 1 }}>
                        <h3>{m.title}</h3>
                        <div className="meta">Workshop {m.workshop} · {m.time}</div>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </article>

          <article className="dashboard-card">
            <h2>Recent activity</h2>
            {recent.length === 0 ? (
              <div className="empty-state">Your activity will appear here as you progress.</div>
            ) : (
              <ul className="recent-list">
                {recent.map((e, i) => {
                  const m = manifest.find((x) => x.id === e.moduleId);
                  return (
                    <li key={i} className="recent-item">
                      {e.type === "completed" ? (
                        <span className="badge-mini" aria-label="Completed">✓</span>
                      ) : (
                        <span className="badge-mini score" aria-label="Score">{e.pct}</span>
                      )}
                      <span className="recent-title">
                        {e.type === "completed" ? "Completed " : `Scored ${e.pct}% on `}
                        <strong>Module {e.moduleId}{m ? `: ${m.title}` : ""}</strong>
                      </span>
                      <time dateTime={new Date(e.at).toISOString()}>{relativeTime(e.at)}</time>
                    </li>
                  );
                })}
              </ul>
            )}
          </article>
        </div>
      </div>
    </LearnShell>
  );
}
