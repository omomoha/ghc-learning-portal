import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { AuthShell } from "@/components/AuthShell";

function friendlyAuthError(code: string): string {
  if (code.includes("email-already-in-use")) return "An account already exists for this email. Try signing in.";
  if (code.includes("invalid-email")) return "That doesn't look like a valid email address.";
  if (code.includes("weak-password")) return "Password is too weak. Use at least 8 characters with a mix of letters and numbers.";
  if (code.includes("network-request-failed")) return "Network error. Check your connection and retry.";
  return "We couldn't create your account. Please try again.";
}

export function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    setSubmitting(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (name) await updateProfile(cred.user, { displayName: name });
      await setDoc(doc(db, "users", cred.user.uid), {
        email: cred.user.email,
        displayName: name || null,
        role: "learner",
        createdAt: serverTimestamp(),
        lastSeenAt: serverTimestamp(),
        totalTimeSpentSec: 0,
      });
      // Send a verification email but don't block signup on it.
      sendEmailVerification(cred.user).catch(() => {});
      navigate("/learn/home", { replace: true });
    } catch (err) {
      const code = err instanceof Error && "code" in err ? String((err as { code: string }).code) : "";
      setError(friendlyAuthError(code));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthShell
      title="Start the workshop."
      subtitle="Create a free account. Progress is saved automatically."
      highlights={[
        "16 modules across 2 workshops",
        "Knowledge checks with explanations",
        "Sync across devices once you're signed in",
      ]}
    >
      <h1>Create your account</h1>
      <p className="sub">It takes under a minute.</p>
      <form onSubmit={onSubmit} noValidate>
        <div className="field">
          <label htmlFor="name">Full name</label>
          <input
            id="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
            autoComplete="new-password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="hint">At least 8 characters. Use a mix of letters and numbers.</p>
        </div>
        {error && (
          <div role="alert" className="error">
            {error}
          </div>
        )}
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? "Creating account…" : "Create account"}
        </button>
      </form>
      <p className="single-link">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </AuthShell>
  );
}
