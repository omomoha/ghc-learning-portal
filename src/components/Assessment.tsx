import { useMemo, useState } from "react";
import type { Question } from "@/content/types";
import { saveScoreRemote } from "@/data/progress";
import { useAuth } from "@/auth/AuthProvider";

type Props = {
  moduleId: number;
  questions: Question[];
};

export function Assessment({ moduleId, questions }: Props) {
  const { user } = useAuth();
  const [selected, setSelected] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);

  const total = questions.length;
  const answered = Object.keys(selected).length;
  const allAnswered = answered === total;

  const score = useMemo(() => {
    if (!checked) return null;
    let correct = 0;
    questions.forEach((q, i) => {
      if (selected[i] === q.correct) correct++;
    });
    return { correct, total, pct: Math.round((correct / total) * 100) };
  }, [checked, questions, selected, total]);

  function check() {
    setChecked(true);
    let correct = 0;
    questions.forEach((q, i) => {
      if (selected[i] === q.correct) correct++;
    });
    void saveScoreRemote(user?.uid ?? null, moduleId, {
      correct,
      total,
      pct: Math.round((correct / total) * 100),
    });
  }

  if (!questions.length) {
    return (
      <div className="assessment">
        <h3>Assessment</h3>
        <p style={{ color: "var(--text-muted)" }}>
          No assessment questions are available for this module.
        </p>
      </div>
    );
  }

  return (
    <div className="assessment">
      <h3>Knowledge check</h3>
      {questions.map((q, qi) => {
        const sel = selected[qi];
        return (
          <fieldset key={qi} className="q-block" style={{ border: "none", padding: "16px 0" }}>
            <legend className="q-text">
              {qi + 1}. {q.text}
            </legend>
            <div className="q-options" role="radiogroup" aria-label={`Question ${qi + 1}`}>
              {q.options.map((opt, oi) => {
                const isSel = sel === oi;
                let cls = "q-option";
                if (checked) {
                  if (oi === q.correct) cls += " correct";
                  else if (isSel && oi !== q.correct) cls += " incorrect";
                } else if (isSel) {
                  cls += " selected";
                }
                return (
                  <button
                    key={oi}
                    type="button"
                    className={cls}
                    role="radio"
                    aria-checked={isSel}
                    disabled={checked}
                    onClick={() => setSelected({ ...selected, [qi]: oi })}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {checked && (
              <p className="q-explain">
                <strong>Explanation:</strong> {q.explanation}
              </p>
            )}
          </fieldset>
        );
      })}
      {!checked ? (
        <button
          type="button"
          className="btn btn-primary"
          disabled={!allAnswered}
          onClick={check}
          style={{ marginTop: 12 }}
        >
          {allAnswered ? "Check answers" : `Answer all ${total} questions to check`}
        </button>
      ) : (
        score && (
          <div
            className={`score-display ${score.pct >= 70 ? "pass" : "fail"}`}
            role="status"
            aria-live="polite"
          >
            Score: {score.correct} / {score.total} ({score.pct}%)
            {" — "}
            {score.pct >= 70 ? "Passed. Mark this module complete." : "Review the material and retake."}
          </div>
        )
      )}
    </div>
  );
}
