import { useMemo, useState } from "react";
import { events } from "../data/mockData.js";
import EventCard from "../components/EventCard.jsx";
import "./Events.css";

export default function Events() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...new Set(events.map((e) => e.category))],
    []
  );

  const filteredEvents = useMemo(
    () =>
      activeCategory === "All"
        ? events
        : events.filter((e) => e.category === activeCategory),
    [activeCategory]
  );

  return (
    <div className="ev-page">
      <h1 className="ev-title">Events</h1>
      <p className="muted ev-subtitle">
        Trade points on how you think campus events will play out. No real money, just bragging rights.
      </p>

      <div className="ev-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`ev-tab${activeCategory === cat ? " ev-tab--active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="ev-grid">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}