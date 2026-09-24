import { Link, Outlet, useLocation } from "react-router-dom";
import { currentUser } from "./data/mockData.js";

// Temporary inline nav — this gets replaced by the full Navbar
// component in the next step. Kept here now just so routing works.
export default function App() {
  const location = useLocation();

  const linkStyle = (path) => ({
    padding: "8px 16px",
    borderRadius: 6,
    color: location.pathname === path ? "var(--color-accent)" : "var(--color-text)",
    borderBottom: location.pathname === path ? "2px solid var(--color-accent)" : "2px solid transparent",
  });

  return (
    <div>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 24px",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <strong>VTRisk</strong>
        <nav style={{ display: "flex", gap: 8 }}>
          <Link to="/" style={linkStyle("/")}>Home</Link>
          <Link to="/leaderboard" style={linkStyle("/leaderboard")}>Leaderboard</Link>
          <Link to="/events" style={linkStyle("/events")}>Events</Link>
        </nav>
        <div className="card" style={{ padding: "6px 14px" }}>
          Balance <span className="accent-text">{currentUser.balance.toLocaleString()}</span>
        </div>
      </header>
      <main className="page">
        <Outlet />
      </main>
    </div>
  );
}
