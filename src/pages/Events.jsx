import { upcomingEvents } from "../data/mockData.js";

export default function Events() {
  return (
    <div>
      <h1>Events</h1>
      <ul>
        {upcomingEvents.map((e) => (
          <li key={e.id}>{e.day} {e.month} — {e.title}</li>
        ))}
      </ul>
    </div>
  );
}
