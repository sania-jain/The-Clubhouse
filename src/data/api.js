import { supabase } from "../lib/supabase.js";

// Until sign-in exists, the app treats this seeded player as "you".
const DEMO_USERNAME = "jd";

const TIME_ZONE = "America/New_York";
const dayFormat = new Intl.DateTimeFormat("en-US", { timeZone: TIME_ZONE, day: "numeric" });
const monthFormat = new Intl.DateTimeFormat("en-US", { timeZone: TIME_ZONE, month: "short" });
const closesFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: TIME_ZONE,
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

// Supabase rows use snake_case columns. These convert them into the same
// camelCase shapes as mockData.js, so the components work with either.

function toEvent(row) {
  const startsAt = new Date(row.starts_at);
  return {
    id: row.id,
    day: dayFormat.format(startsAt),
    month: monthFormat.format(startsAt).toUpperCase(),
    title: row.title,
    subtitle: row.subtitle,
    tag: row.tag,
    tagColor: row.tag_color,
    category: row.category,
    closes: `Closes ${closesFormat.format(new Date(row.closes_at))}`,
    volume: row.volume,
    options: row.event_options
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((o) => ({
        label: o.label,
        probability: o.probability,
        change: Number(o.change),
        probHistory: o.prob_history,
      })),
  };
}

function toLeaderboardEntry(row) {
  return {
    rank: row.rank,
    initials: row.initials,
    name: row.display_name,
    detail: row.detail,
    points: row.points,
    trend: Number(row.change_pct) >= 0 ? "up" : "down",
  };
}

function toCurrentUser(row) {
  return {
    name: row.display_name,
    balance: row.points,
    rank: row.rank,
    changePct: Number(row.change_pct),
    peakThisMonth: Math.max(row.points, ...row.points_history),
    pointsHistory: row.points_history,
  };
}

async function run(query) {
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

// Loads everything the pages need, in the same shape as mockData.js.
export async function fetchAppData() {
  const [eventRows, topRows, userRow] = await Promise.all([
    run(supabase.from("events").select("*, event_options(*)").order("id")),
    run(supabase.from("leaderboard").select("*").order("rank").limit(5)),
    run(supabase.from("leaderboard").select("*").eq("username", DEMO_USERNAME).single()),
  ]);

  const betRows = await run(
    supabase.from("bets").select("event_options(event_id)").eq("profile_id", userRow.id)
  );

  return {
    events: eventRows.map(toEvent),
    leaderboard: topRows.map(toLeaderboardEntry),
    currentUser: toCurrentUser(userRow),
    myBetEventIds: [...new Set(betRows.map((b) => b.event_options.event_id))],
  };
}
