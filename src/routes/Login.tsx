import { useState, type FormEvent } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { AuthShell } from "@/components/AuthShell";

type LocationState = { from?: { pathname?: string } } | null;

function friendlyAuthError(code: string): string {
  if (code.includes("invalid-credential") || code.includes("wrong-password")) return "Email or password is incorrect.";
  if (code.includes("user-not-found")) return "No account exists for this email.";
  if (code.includes("too-many-requests")) return "Too many failed attempts. Try again in a few minutes.";
  if (code.includes("network-request-failed")) return "Network error. Check your connection and retry.";
  return "We couldn't sign you in. Please try again.";
}

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as LocationState)?.from?.pathname ?? "/learn/home";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(from, { replace: true });
    } catch (err) {
      const code = err instanceof Error && "code" in err ? String((err as { code: string }).code) : "";
      setError(friendlyAuthError(code));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthShell
      title="Welcome back."
      subtitle="Sign in to pick up where you left off."
      highlights={[
        "16 self-paced modules",
        "Knowledge checks per module",
        "Progress saved automatically",
      ]}
    >
      <h1>Sign in</h1>
      <p className="sub">Use the email you signed up with.</p>
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
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && (
          <div role="alert" className="error">
            {error}
          </div>
        )}
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? "Signing in…" : "Sign in"}
        </button>
      </form>
      <div className="links">
        <Link to="/forgot-password">Forgot password?</Link>
        <Link to="/signup">Create account</Link>
      </div>
    </AuthShell>
  );
}
