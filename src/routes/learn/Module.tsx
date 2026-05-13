import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { loadModule, manifest } from "@/content/loader";
import { markCompleteRemote, useProgress } from "@/data/progress";
import { useAuth } from "@/auth/AuthProvider";
import type { Module as ModuleType } from "@/content/types";
import { LearnShell } from "@/components/LearnShell";
import { SectionView } from "@/components/SectionView";
import { Assessment } from "@/components/Assessment";

export function Module() {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const { user } = useAuth();
  const { completed } = useProgress(user?.uid ?? null);

  const [module, setModule] = useState<ModuleType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    loadModule(id).then((m) => {
      if (!cancelled) {
        setModule(m);
        setLoading(false);
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      }
    });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (Number.isNaN(id) || id < 1 || id > manifest.length) {
    return (
      <LearnShell completed={completed}>
        <div className="module-page">
          <h1>Module not found</h1>
          <p style={{ color: "var(--text-muted)", marginTop: 8 }}>That module ID doesn&apos;t exist.</p>
          <Link to="/learn/home" className="btn btn-secondary" style={{ marginTop: 16 }}>
            Back to course overview
          </Link>
        </div>
      </LearnShell>
    );
  }

  if (loading || !module) {
    return (
      <LearnShell completed={completed} currentModuleId={id}>
        <div className="module-page">Loading module…</div>
      </LearnShell>
    );
  }

  const isDone = completed.has(module.id);
  const hasNext = id < manifest.length;
  const hasPrev = id > 1;

  function onMarkComplete() {
    void markCompleteRemote(user?.uid ?? null, module!.id);
    if (hasNext) {
      window.setTimeout(() => navigate(`/learn/module/${id + 1}`), 300);
    }
  }

  const wsTitle = module.workshop === 1
    ? "Agentic Development & AI Code Review"
    : "Skills, MCP & Enterprise Governance";

  return (
    <LearnShell
      completed={completed}
      currentModuleId={module.id}
      breadcrumb={
        <>
          <Link to="/learn/home">Home</Link>
          <span>›</span>
          <span>Module {module.id}: {module.title}</span>
        </>
      }
    >
      <article className="module-page">
        <nav className="module-breadcrumb" aria-label="Breadcrumb">
          <Link to="/learn/home">Home</Link>
          <span aria-hidden="true">›</span>
          Module {module.id} of {manifest.length}
        </nav>

        <header className="module-header-block">
          <div className="module-ws-tag">
            Workshop {module.workshop} — {wsTitle}
          </div>
          <h1>{module.title}</h1>
          <div className="module-meta-row">
            <span>{module.time}</span>
            <span>
              {module.assessment?.questions.length
                ? `${module.assessment.questions.length} questions`
                : "No assessment"}
            </span>
            {isDone && <span style={{ color: "var(--success)", fontWeight: 600 }}>✓ Completed</span>}
          </div>
        </header>

        {module._needsRestoration && (
          <div className="concept-box warning" style={{ marginBottom: 24 }}>
            <h4>Content pending restoration</h4>
            <p>
              The original source file for this module is corrupted. Restore the content in{" "}
              <code>src/content/modules/{module.id}.json</code> from your original copy before
              shipping.
            </p>
          </div>
        )}

        {module.objectives.length > 0 && (
          <div className="objectives-block">
            <h3>Learning objectives</h3>
            <ul>
              {module.objectives.map((o, i) => (
                <li key={i}>{o}</li>
              ))}
            </ul>
          </div>
        )}

        {module.sections.map((s, i) => (
          <SectionView key={i} section={s} />
        ))}

        {module.assessment && (
          <Assessment moduleId={module.id} questions={module.assessment.questions} />
        )}

        <button
          type="button"
          className={`module-complete-btn${isDone ? " done" : ""}`}
          onClick={onMarkComplete}
        >
          {isDone
            ? "✓ Module completed"
            : hasNext
              ? "Mark complete & continue →"
              : "🎉 Complete the course"}
        </button>
      </article>

      <nav className="module-footer-nav" aria-label="Module pagination">
        <div className="page-nav">
          <button
            type="button"
            className="page-nav-btn"
            onClick={() => (hasPrev ? navigate(`/learn/module/${id - 1}`) : navigate("/learn/home"))}
          >
            <span>
              <span className="nav-label">{hasPrev ? "Previous" : "Back to"}</span>
              <span className="nav-title">
                {hasPrev ? manifest[id - 2].title : "Course overview"}
              </span>
            </span>
          </button>
          <div className="module-dots" aria-hidden="true">
            {manifest.map((m) => (
              <span
                key={m.id}
                className={[
                  "module-dot",
                  completed.has(m.id) ? "done" : "",
                  m.id === id ? "current" : "",
                ].join(" ").trim()}
                title={`Module ${m.id}: ${m.title}`}
              />
            ))}
          </div>
          <button
            type="button"
            className="page-nav-btn"
            onClick={() => (hasNext ? navigate(`/learn/module/${id + 1}`) : navigate("/learn/home"))}
          >
            <span>
              <span className="nav-label">{hasNext ? "Next" : "Finish"}</span>
              <span className="nav-title">
                {hasNext ? manifest[id].title : "Back to overview"}
              </span>
            </span>
          </button>
        </div>
      </nav>
    </LearnShell>
  );
}
