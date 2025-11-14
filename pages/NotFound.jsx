import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", paddingTop: 80 }}>
      <h1 style={{ fontSize: 48 }}>404</h1>
      <h2>Page not found</h2>
      <p className="text-muted">We couldn't find what you were looking for.</p>
      <Link to="/" className="btn" style={{ marginTop: 18 }}>Go to Home</Link>
    </div>
  );
}
