import { useState } from "react";
import Sparkline from "./Sparkline.jsx";
import "./EventCard.css";

const OPTION_COLORS = ["secondary", "primary", "accent"];

export default function EventCard({ event }) {
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
