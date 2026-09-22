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
