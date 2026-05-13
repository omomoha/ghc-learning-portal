import { Link } from "react-router-dom";
import { PublicNav } from "@/components/PublicNav";
import { manifest } from "@/content/loader";

const OUTCOMES = [
  {
    title: "Configure agentic workflows",
    desc: "Set up Copilot's agent mode, background agents, and coding agent at the workspace and team level.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
  {
    title: "Write prompts agents understand",
    desc: "Craft issue templates and prompts that drive autonomous multi-file changes safely.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
  },
  {
    title: "Automate code review",
    desc: "Set up Copilot Code Review with CodeQL and ESLint, define custom team rules, and gate merges.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
  {
    title: "Build MCP servers and skills",
    desc: "Develop Copilot Skills with SKILL.md and ship MCP servers in Node and Python for real integrations.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M16 18l6-6-6-6" />
        <path d="M8 6l-6 6 6 6" />
      </svg>
    ),
  },
  {
    title: "Govern AI at enterprise scale",
    desc: "Establish model strategy, audit trails, and compliance for AI-assisted development.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Measure ROI that leadership trusts",
    desc: "Track Copilot-authored PRs, cycle-time delta, and the metrics that show real productivity impact.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
];

const AUDIENCES = [
  {
    title: "Senior developers",
    desc: "Already proficient with Copilot Chat. Ready to operate agents and build custom skills for your team.",
  },
  {
    title: "Engineering leads",
    desc: "Setting workflow standards. Need to decide where agents fit, what to govern, and how to measure impact.",
  },
  {
    title: "DevOps engineers",
    desc: "Integrating agents into CI/CD, code review pipelines, and operational runbooks.",
  },
];

export function Landing() {
  const w1 = manifest.filter((m) => m.workshop === 1);
  const w2 = manifest.filter((m) => m.workshop === 2);
  const totalQuestions = manifest.reduce((s, m) => s + m.questionCount, 0);

  const Tick = (
    <span className="check" aria-hidden="true">
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  );

  return (
    <>
      <PublicNav />

      <main id="main" tabIndex={-1}>
        <section className="landing-hero" aria-labelledby="landing-h1">
          <div className="landing-hero-inner">
            <div>
              <span className="landing-eyebrow">Advanced · 1 Full Day · {manifest.length} Modules</span>
              <h1 id="landing-h1">
                Master the agentic
                <br />
                workflow with GitHub Copilot.
              </h1>
              <p className="lead">
                Go beyond autocomplete. Configure autonomous agents, build custom skills and MCP
                integrations, automate code review, and establish enterprise-grade AI governance.
              </p>
              <div className="landing-cta-row">
                <Link to="/signup" className="btn btn-primary">Create your account</Link>
                <Link to="/login" className="btn btn-secondary">Sign in</Link>
              </div>
              <div className="landing-meta">
                <span>~8 hours of learning</span>
                <span>2 workshops</span>
                <span>{totalQuestions} assessment questions</span>
                <span>Self-paced</span>
              </div>
            </div>
            <aside className="landing-hero-card" aria-label="At a glance">
              <h3>At a glance</h3>
              <ul>
                <li>{Tick} Agent mode configuration</li>
                <li>{Tick} Background &amp; coding agents</li>
                <li>{Tick} Plan Agent &amp; multi-file changes</li>
                <li>{Tick} Custom skills &amp; MCP servers</li>
                <li>{Tick} AI governance &amp; ROI</li>
              </ul>
            </aside>
          </div>
        </section>

        <section className="landing-section" aria-labelledby="outcomes-h">
          <header className="landing-section-header">
            <h2 id="outcomes-h">What you&apos;ll learn</h2>
            <p>Six concrete outcomes that change how your team ships code.</p>
          </header>
          <div className="outcomes-grid">
            {OUTCOMES.map((o) => (
              <article key={o.title} className="outcome-card">
                <div className="icon">{o.icon}</div>
                <h3>{o.title}</h3>
                <p>{o.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="landing-section" aria-labelledby="curriculum-h">
          <header className="landing-section-header">
            <h2 id="curriculum-h">Course curriculum</h2>
            <p>Two workshops, sixteen modules, each with a knowledge check.</p>
          </header>
          <div className="landing-workshops">
            {[
              { tag: "Workshop 1", title: "Agentic Development & AI Code Review", items: w1 },
              { tag: "Workshop 2", title: "Skills, MCP & Enterprise Governance", items: w2 },
            ].map((ws) => (
              <article key={ws.tag} className="landing-workshop">
                <span className="ws-tag">{ws.tag}</span>
                <h3>{ws.title}</h3>
                <ol>
                  {ws.items.map((m) => (
                    <li key={m.id}>
                      <span className="num" aria-hidden="true">{m.id}</span>
                      <span style={{ flex: 1 }}>{m.title}</span>
                      <span className="time">{m.time}</span>
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </section>

        <section className="landing-section" aria-labelledby="audience-h">
          <header className="landing-section-header">
            <h2 id="audience-h">Who this is for</h2>
            <p>Built for practitioners who already use Copilot and are ready to operate it.</p>
          </header>
          <div className="landing-audience-grid">
            {AUDIENCES.map((a) => (
              <article key={a.title} className="audience-card">
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="landing-cta-band">
          <h2>Start the workshop today.</h2>
          <p>Create an account in under a minute. Progress is saved automatically.</p>
          <Link
            to="/signup"
            className="btn btn-primary"
            style={{ background: "#fff", color: "var(--brand)" }}
          >
            Create your account
          </Link>
        </section>
      </main>

      <footer className="landing-footer">
        © 2026 GHC Advanced Learning · GitHub Copilot is a trademark of GitHub, Inc.
      </footer>
    </>
  );
}
