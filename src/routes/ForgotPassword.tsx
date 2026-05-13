import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { AuthShell } from "@/components/AuthShell";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setSent(true);
    } catch {
      // Don't reveal whether an account exists; just succeed silently for security.
      setSent(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthShell
      title="Reset your password."
      subtitle="We'll email you a secure link to set a new one."
    >
      <h1>Reset password</h1>
      <p className="sub">Enter the email on your account.</p>
      {sent ? (
        <>
          <div role="status" aria-live="polite" className="error" style={{
            background: "rgba(5,150,105,0.08)",
            borderColor: "rgba(5,150,105,0.3)",
            color: "var(--success)",
          }}>
            If an account exists for <strong>{email}</strong>, a reset link is on its way.
            Check your inbox (and spam folder).
          </div>
          <p className="single-link">
            <Link to="/login">Back to sign in</Link>
          </p>
        </>
      ) : (
        <form onSubmit={onSubmit} noValidate>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {error && (
            <div role="alert" className="error">{error}</div>
          )}
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? "Sending…" : "Send reset link"}
          </button>
          <p className="single-link">
            <Link to="/login">Back to sign in</Link>
          </p>
        </form>
      )}
    </AuthShell>
  );
}
