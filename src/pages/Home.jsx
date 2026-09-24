import { events, currentUser } from "../data/mockData.js";
import EventCard from "../components/EventCard.jsx";
import LeaderboardTable from "../components/LeaderboardTable.jsx";

// Home page built from the shared components. "Your Points" is still a
// placeholder until PointsChart exists.
export default function Home() {
  return (
    <div>
      <h1>Current Bets</h1>
      <div className="ev-grid">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      <h2>Leaderboard (top 5)</h2>
      <LeaderboardTable />

    </div>
  );
}
