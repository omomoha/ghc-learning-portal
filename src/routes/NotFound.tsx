import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <main id="main" className="container" style={{ paddingTop: 80, paddingBottom: 64 }}>
      <h1>Page not found</h1>
      <p style={{ color: "var(--text-muted)", marginTop: 8 }}>
        That URL didn&apos;t match any route.
      </p>
      <Link to="/" className="btn btn-secondary" style={{ marginTop: 20 }}>
        Back to home
      </Link>
    </main>
  );
}
