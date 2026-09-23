import { leaderboard } from "../data/mockData.js";
import "./Leaderboard.css";

const MEDALS = { 1: "🥇", 2: "🥈", 3: "🥉" };

export default function Leaderboard() {
  return (
    <div className="lb">
      <h1 className="lb-title">Leaderboard</h1>
      <p className="muted lb-subtitle">Ranked by total points earned from correct predictions this season.</p>

      <div className="card lb-table-wrap">
        <table className="lb-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th className="lb-col-detail">Year &amp; Major</th>
              <th className="lb-num">Trend</th>
              <th className="lb-num">Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((p) => (
              <tr key={p.rank}>
                <td className="lb-rank">
                  <span className="lb-medal">{MEDALS[p.rank] ?? ""}</span>
                  {p.rank}
                </td>
                <td>{p.name}</td>
                <td className="muted lb-col-detail">{p.detail}</td>
                <td className={`lb-num lb-trend--${p.trend}`}>{p.trend === "up" ? "▲" : "▼"}</td>
                <td className="lb-num lb-points">{p.points.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
