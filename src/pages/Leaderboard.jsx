import { leaderboard } from "../data/mockData.js";

export default function Leaderboard() {
  return (
    <div>
      <h1>Leaderboard</h1>
      <ol>
        {leaderboard.map((p) => (
          <li key={p.rank}>{p.name} — {p.points.toLocaleString()} pts</li>
        ))}
      </ol>
    </div>
  );
}
