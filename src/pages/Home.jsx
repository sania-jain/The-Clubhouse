import { currentBets, leaderboard, currentUser } from "../data/mockData.js";

// Placeholder Home page — proves data + routing works.
// Will be rebuilt using the shared components (BetCard, LeaderboardTable, etc.)
export default function Home() {
  return (
    <div>
      <h1>Current Bets</h1>
      <ul>
        {currentBets.map((bet) => (
          <li key={bet.id}>{bet.title} — {bet.subtitle}</li>
        ))}
      </ul>

      <h2>Leaderboard (top 5)</h2>
      <ol>
        {leaderboard.map((p) => (
          <li key={p.rank}>{p.name} — {p.points.toLocaleString()} pts</li>
        ))}
      </ol>

      <h2>Your Points</h2>
      <p className="accent-text">{currentUser.balance.toLocaleString()} pts</p>
    </div>
  );
}
