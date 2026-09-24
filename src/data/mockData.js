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
};

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
