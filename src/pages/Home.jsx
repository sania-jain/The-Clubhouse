import { events, myBetEventIds } from "../data/mockData.js";
import EventCard from "../components/EventCard.jsx";
import LeaderboardTable from "../components/LeaderboardTable.jsx";

// Home page built from the shared components. "Your Points" is still a
// placeholder until PointsChart exists.
export default function Home() {
  // Only show events the user actually has a bet on, not every event on
  // the platform — same `events` data as the Events page, just scoped down.
  const myBets = events.filter((event) => myBetEventIds.includes(event.id));
  
  return (
    <div>
      <h1>Current Bets</h1>
      <div className="ev-grid">
        {myBets.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      <h2>Leaderboard (top 5)</h2>
      <LeaderboardTable />

    </div>
  );
}
