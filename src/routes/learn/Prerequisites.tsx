import { Link, useNavigate } from "react-router-dom";
import { LearnShell } from "@/components/LearnShell";
import { manifest } from "@/content/loader";
import { useProgress } from "@/data/progress";
import { useAuth } from "@/auth/AuthProvider";

export function Prerequisites() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { completed } = useProgress(user?.uid ?? null);

  const w1 = manifest.filter((m) => m.workshop === 1);
  const w2 = manifest.filter((m) => m.workshop === 2);
  const totalQuestions = manifest.reduce((s, m) => s + m.questionCount, 0);

  return (
    <LearnShell
      completed={completed}
      breadcrumb={
        <>
          <Link to="/learn/home">Home</Link>
          <span>›</span>
          <span>Prerequisites & Details</span>
        </>
      }
    >
      <article className="module-page">
        <nav className="module-breadcrumb" aria-label="Breadcrumb">
          <Link to="/learn/home">Home</Link>
          <span aria-hidden="true">›</span>
          Prerequisites & Details
        </nav>

        <header className="module-header-block">
          <h1>GitHub Copilot Advanced: The Agentic Workflow</h1>
          <p style={{ color: "var(--text-muted)", marginTop: 12 }}>
            Master autonomous AI agents, custom skills, MCP integrations, multi-model strategy,
            and enterprise governance.
          </p>
          <div className="module-meta-row" style={{ marginTop: 12 }}>
            <span>~8 hours</span>
            <span>2 Workshops</span>
            <span>{manifest.length} Modules</span>
            <span>{totalQuestions} Assessment questions</span>
          </div>
        </header>

        <section className="content-section">
          <h3>About this learning path</h3>
          <p>
            This full-day workshop program takes developers beyond basic Copilot usage into the realm of
            agentic engineering — where AI agents plan multi-step tasks, execute terminal commands,
            generate pull requests from issues, and collaborate across workflows.
          </p>
          <p>
            Across two workshops and {manifest.length} hands-on modules, you will configure agent modes,
            craft effective prompts, build MCP servers, design reusable skills, implement automated code
            review pipelines, and establish enterprise-grade AI governance.
          </p>
        </section>

        <section className="content-section">
          <h3>Topics covered</h3>
          <ul>
            <li>Configuring and operating GitHub Copilot&apos;s agent mode, background agents, and coding agents.</li>
            <li>Crafting effective prompts and issue templates that drive autonomous multi-file changes.</li>
            <li>Using the Plan Agent to architect, review, and iterate on complex code modifications.</li>
            <li>Setting up Copilot Code Review (CCR) for automated PR reviews with CodeQL and ESLint integration.</li>
            <li>Building custom skills with SKILL.md and the Copilot Skills Framework.</li>
            <li>Developing MCP servers in Node.js and Python for AI tool integrations.</li>
            <li>Implementing enterprise model strategy, AI governance, and compliance auditing.</li>
            <li>Managing context windows, building custom context providers, and optimizing AI performance.</li>
            <li>Creating Copilot Extensions and measuring organizational ROI.</li>
          </ul>
        </section>

        <div className="concept-box warning">
          <h4>Important</h4>
          <p>
            To complete this training, you must have a GitHub Copilot Business or Enterprise
            subscription with agent mode enabled. A GitHub Copilot Free or Individual plan is not
            sufficient for the coding agent and background agent exercises.
          </p>
        </div>

        <section className="content-section">
          <h3>Prerequisites</h3>
          <ul>
            <li>Proficiency with GitHub Copilot Chat and basic IDE integration.</li>
            <li>A GitHub Copilot Business or Enterprise subscription with agent mode enabled.</li>
            <li>Visual Studio Code 1.99+ with the GitHub Copilot extension (v1.250+) installed.</li>
            <li>Working knowledge of JavaScript/TypeScript and Python.</li>
            <li>Familiarity with Git workflows, pull requests, and GitHub Actions.</li>
            <li>Experience with at least one CI/CD pipeline or automated testing framework.</li>
          </ul>
        </section>

        {[
          { tag: "Workshop 1", title: "Agentic Development & AI Code Review", items: w1 },
          { tag: "Workshop 2", title: "Skills, MCP & Enterprise Governance", items: w2 },
        ].map((ws) => (
          <section key={ws.tag} className="content-section">
            <h3>
              {ws.tag} — {ws.title}
            </h3>
            <div className="module-cards-grid">
              {ws.items.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  className="mc-card"
                  onClick={() => navigate(`/learn/module/${m.id}`)}
                >
                  <div className="mc-card-num">{m.id}</div>
                  <h4>{m.title}</h4>
                  <div className="mc-card-time">{m.time}</div>
                </button>
              ))}
            </div>
          </section>
        ))}
      </article>
    </LearnShell>
  );
}
