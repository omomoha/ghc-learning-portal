import { Link, useNavigate } from "react-router-dom";
import { manifest } from "@/content/loader";
import { useProgress } from "@/data/progress";
import { useAuth } from "@/auth/AuthProvider";
import { LearnShell } from "@/components/LearnShell";

export function LearnHome() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { completed } = useProgress(user?.uid ?? null);

  const w1 = manifest.filter((m) => m.workshop === 1);
  const w2 = manifest.filter((m) => m.workshop === 2);
  const totalQuestions = manifest.reduce((sum, m) => sum + m.questionCount, 0);

  return (
    <LearnShell completed={completed}>
      <section className="home-hero">
        <div className="home-hero-inner">
          <div className="home-badges">
            <span className="badge">Advanced</span>
            <span className="badge">1 Full Day</span>
            <span className="badge">{manifest.length} Modules</span>
          </div>
          <h1>GitHub Copilot Advanced: The Agentic Workflow</h1>
          <p>
            Master autonomous AI agents, custom skills, MCP integrations, multi-model strategy,
            and enterprise governance.
          </p>
          <div className="home-meta">
            <span>~8 hours</span>
            <span>2 Workshops</span>
            <span>{totalQuestions} Assessment questions</span>
          </div>
          <div className="home-prereq">
            <strong>Prerequisites:</strong> Proficiency with Copilot Chat and basic IDE integration.{" "}
            <Link to="/learn/prerequisites">View prerequisite learning path →</Link>
          </div>
          <button
            type="button"
            className="btn btn-secondary"
            style={{ marginTop: 20, background: "#fff", color: "var(--brand)" }}
            onClick={() => navigate("/learn/module/1")}
          >
            Start learning
          </button>
        </div>
      </section>

      <section className="curriculum-section">
        <div className="curriculum-inner">
          <header className="curriculum-header">
            <h2>Course curriculum</h2>
            <p>Complete modules in order. Each builds on the previous.</p>
          </header>

          {[
            { tag: "Workshop 1", title: "Agentic Development & AI Code Review", items: w1 },
            { tag: "Workshop 2", title: "Skills, MCP & Enterprise Governance", items: w2 },
          ].map((ws) => (
            <div key={ws.tag} className="ws-block">
              <h3 className="ws-heading">
                <span className="ws-tag">{ws.tag}</span>
                {ws.title}
              </h3>
              <div className="module-cards-grid">
                {ws.items.map((m) => {
                  const done = completed.has(m.id);
                  return (
                    <button
                      key={m.id}
                      type="button"
                      className={`mc-card${done ? " done" : ""}`}
                      onClick={() => navigate(`/learn/module/${m.id}`)}
                    >
                      <div className="mc-card-num">{m.id}</div>
                      <h4>{m.title}</h4>
                      <div className="mc-card-time">{m.time}</div>
                      {done && <div className="mc-done-tag">✓ Completed</div>}
                      {m.needsRestoration && (
                        <div className="mc-needs-restore">⚠ Content pending restoration</div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </LearnShell>
  );
}
