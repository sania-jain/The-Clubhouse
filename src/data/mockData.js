// All demo data lives here. Nothing is persisted — this is just
// in-memory data the components read from on load.

export const currentBets = [
  {
    id: 1,
    tag: "LIVE",
    tagColor: "accent",
    category: "FOOTBALL",
    title: "Hokies vs Cavaliers",
    subtitle: "Rivalry Night · Lane Stadium",
    options: [
      { label: "VT", odds: "+140" },
      { label: "UVA", odds: "-120" },
    ],
  },
  {
    id: 2,
    tag: "CLOSING SOON",
    tagColor: "primary",
    category: "Intramural championship",
    title: "Intramural championship",
    subtitle: "Who takes the flag football cup?",
    options: [
      { label: "Squad 12", odds: "+220" },
      { label: "Squad 4", odds: "+165" },
    ],
  },
  {
    id: 3,
    tag: "NEW",
    tagColor: "secondary",
    category: "Hokies vs Hurricanes",
    title: "Hokies vs Hurricanes",
    subtitle: "Men's Basketball · ACC opener",
    options: [
      { label: "VT", odds: "-105" },
      { label: "MIA", odds: "-115" },
    ],
  },
  {
    id: 4,
    tag: "TRENDING",
    tagColor: "accent",
    category: "Homecoming",
    title: "Homecoming king or queen",
    subtitle: "Campus vote · closes Friday",
    options: [{ label: "Field", odds: "+310" }],
  },
];

export const leaderboard = [
  { rank: 1, initials: "MK", name: "Maya K.", detail: "Junior · Mechanical Eng.", points: 18920, trend: "up" },
  { rank: 2, initials: "DT", name: "Derek T.", detail: "Senior · Finance", points: 17405, trend: "up" },
  { rank: 3, initials: "SP", name: "Sam P.", detail: "Sophomore · CS", points: 16110, trend: "down" },
  { rank: 4, initials: "RC", name: "Rae C.", detail: "Senior · Marketing", points: 15860, trend: "up" },
  { rank: 5, initials: "JL", name: "Jordan L.", detail: "Junior · Biology", points: 14995, trend: "down" },
];

export const currentUser = {
  name: "JD",
  balance: 2480,
  rank: 47,
  changePct: 12.4,
  peakThisMonth: 3150,
  pointsHistory: [1800, 1950, 1870, 2050, 2200, 2120, 2300, 2260, 2400, 2350, 2480],
};

export const upcomingEvents = [
  { id: 1, day: "21", month: "SEP", title: "Hokies vs Cavaliers", subtitle: "Football · 3:30 PM" },
  { id: 2, day: "24", month: "SEP", title: "Trivia Night Pool", subtitle: "Squires · 7:00 PM" },
  { id: 3, day: "28", month: "SEP", title: "Hokies vs Hurricanes", subtitle: "Basketball · 6:00 PM" },
  { id: 4, day: "26", month: "SEP", title: "Homecoming King or Queen", subtitle: "Campus Vote · 11:59 PM" },
  { id: 5, day: "30", month: "SEP", title: "VT Esports League Finals", subtitle: "Team Ignite vs Vector · 9:00 PM" },
  { id: 6, day: "26", month: "NOV", title: "Snow Before Thanksgiving Break?", subtitle: "Campus Weather Market" },
  { id: 7, day: "30", month: "NOV", title: "Hokies Make the ACC Championship?", subtitle: "Season-Long Market" },
];

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
  4: {
    tag: "TRENDING",
    tagColor: "accent",
    category: "Campus",
    closes: "Closes Fri, 11:59 PM",
    volume: 14750,
    options: [
      { label: "Jordan M.", probability: 34, change: 5.4, probHistory: [22, 25, 27, 30, 32, 34] },
      { label: "Casey R.", probability: 29, change: -2.1, probHistory: [34, 33, 32, 31, 30, 29] },
      { label: "Field", probability: 37, change: -3.3, probHistory: [44, 42, 41, 39, 38, 37] },
    ],
  },
  5: {
    tag: "NEW",
    tagColor: "secondary",
    category: "Esports",
    closes: "Closes Sep 30, 9:00 PM",
    volume: 3980,
    options: [
      { label: "Team Ignite", probability: 58, change: 3.0, probHistory: [50, 52, 53, 55, 56, 58] },
      { label: "Team Vector", probability: 42, change: -3.0, probHistory: [50, 48, 47, 45, 44, 42] },
    ],
  },
  6: {
    tag: "TRENDING",
    tagColor: "primary",
    category: "Campus",
    closes: "Closes Nov 26, 12:00 AM",
    volume: 6310,
    options: [
      { label: "Yes", probability: 23, change: 1.4, probHistory: [18, 19, 19, 21, 22, 23] },
      { label: "No", probability: 77, change: -1.4, probHistory: [82, 81, 81, 79, 78, 77] },
    ],
  },
  7: {
    tag: "CLOSING SOON",
    tagColor: "accent",
    category: "Football",
    closes: "Closes Nov 30, 11:59 PM",
    volume: 22100,
    options: [
      { label: "Yes", probability: 31, change: 2.6, probHistory: [24, 25, 27, 28, 29, 31] },
      { label: "No", probability: 69, change: -2.6, probHistory: [76, 75, 73, 72, 71, 69] },
    ],
  },
};

// Ids of events the current user actually has a bet placed on. Home's
// "Current Bets" section filters `events` down to this list — a real user
// wouldn't have a bet on every event on the platform, just a few.
export const myBetEventIds = [1, 4, 6];

export const events = upcomingEvents.map((e) => {
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
