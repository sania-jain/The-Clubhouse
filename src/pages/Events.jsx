import { useMemo, useState } from "react";
import { upcomingEvents } from "../data/mockData.js";
import "./Events.css";

const EVENT_DETAILS = {
  1: {
    tag: "LIVE",
    tagColor: "primary",
    category: "Football",
    closes: "Closes today, 6:30 PM",
    volume: 48200,
    options: [
      { label: "VT", probability: 62, change: 4.1, probHistory: [51, 54, 53, 57, 59, 62] },
      { label: "UVA", probability: 38, change: -4.1, probHistory: [49, 46, 47, 43, 41, 38] },
    ],
  },
  2: {
    tag: "NEW",
    tagColor: "secondary",
    category: "Campus",
    closes: "Closes Sep 24, 7:00 PM",
    volume: 2140,
    options: [
      { label: "Team Trivia Titans", probability: 41, change: 3.2, probHistory: [32, 34, 35, 37, 39, 41] },
      { label: "Field", probability: 59, change: -3.2, probHistory: [68, 66, 65, 63, 61, 59] },
    ],
  },
  3: {
    tag: "CLOSING SOON",
    tagColor: "accent",
    category: "Basketball",
    closes: "Closes Sep 28, 6:00 PM",
    volume: 5120,
    options: [
      { label: "VT", probability: 54, change: 1.2, probHistory: [50, 51, 52, 51, 53, 54] },
      { label: "MIA", probability: 46, change: -1.2, probHistory: [50, 49, 48, 49, 47, 46] },
    ],
  },
};

const events = upcomingEvents.map((e) => {
  const details = EVENT_DETAILS[e.id] ?? {
    tag: "UPCOMING",
    tagColor: "secondary",
    category: "General",
    closes: `${e.day} ${e.month}`,
    volume: 0,
    options: [],
  };
  return { ...e, ...details };
});

const OPTION_COLORS = ["secondary", "primary", "accent"];

function Sparkline({ data, color }) {
  const w = 64;
  const h = 22;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((d - min) / range) * h;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg
      className="ev-spark"
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <polyline points={points} fill="none" stroke={`var(--color-${color})`} strokeWidth="2" />
    </svg>
  );
}

function EventCard({ event }) {
  const [selected, setSelected] = useState(null);

  const toggleOption = (label) => {
    setSelected((prev) => (prev === label ? null : label));
  };

  return (
    <div className="card ev-card">
      <div className="ev-card-header">
        <span className={`ev-tag ev-tag--${event.tagColor}`}>{event.tag}</span>
        <span className="muted ev-category">{event.category}</span>
      </div>

      <h3 className="ev-card-title">{event.title}</h3>
      <p className="muted ev-card-subtitle">{event.subtitle}</p>

      {event.options.length > 0 && (
        <div className="ev-options">
          {event.options.map((opt, i) => {
            const color = OPTION_COLORS[i % OPTION_COLORS.length];
            const isSelected = selected === opt.label;
            return (
              <button
                key={opt.label}
                type="button"
                className={`ev-option${isSelected ? " ev-option--selected" : ""}`}
                onClick={() => toggleOption(opt.label)}
                aria-pressed={isSelected}
              >
                <div className="ev-option-top">
                  <span className="ev-option-label">{opt.label}</span>
                  <span className="ev-option-pct" style={{ color: `var(--color-${color})` }}>
                    {opt.probability}%
                  </span>
                </div>

                <div className="ev-option-bar-track">
                  <div
                    className="ev-option-bar-fill"
                    style={{ width: `${opt.probability}%`, backgroundColor: `var(--color-${color})` }}
                  />
                </div>

                <div className="ev-option-bottom">
                  <Sparkline data={opt.probHistory} color={color} />
                  <span className={`ev-option-change ev-option-change--${opt.change >= 0 ? "up" : "down"}`}>
                    {opt.change >= 0 ? "▲" : "▼"} {Math.abs(opt.change).toFixed(1)}%
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}

      <div className="ev-card-footer">
        <span className="muted">{event.closes}</span>
        <span className="muted">{event.volume.toLocaleString()} pts traded</span>
      </div>
    </div>
  );
}

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