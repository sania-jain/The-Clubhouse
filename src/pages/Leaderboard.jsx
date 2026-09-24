import LeaderboardTable from "../components/LeaderboardTable.jsx";
import "./Leaderboard.css";

export default function Leaderboard() {
  return (
    <div className="lb">
      <h1 className="lb-title">Leaderboard</h1>
      <p className="muted lb-subtitle">Ranked by total points earned from correct predictions this season.</p>

      <LeaderboardTable />
    </div>
  );
}
