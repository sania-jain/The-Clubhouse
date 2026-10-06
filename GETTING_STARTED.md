# VTRisk Demo — Getting Started

A React prototype of the VTRisk homepage. Data comes from a Supabase
database (see `supabase/README.md`), and falls back to the hardcoded data in
`src/data/mockData.js` when Supabase isn't set up, so the app always runs
locally.

## 1. Clone the repo

```
git clone <REPO_URL>
cd The-Clubhouse
```

## 2. Use Node 22 (important)

Check your version first:
```
node -v
```
You want **22.x**. The Supabase client (`@supabase/supabase-js`) requires
Node 22 or newer, and Node 20 is past end-of-life. If you're on something
else, install nvm and switch:
```
brew install nvm
nvm install 22
nvm use 22
```
This project deliberately pins **Vite 5** and **React 18** (not the newest
majors) because the latest Vite ships an experimental bundler that has a
known bug installing native binaries on Apple Silicon. Don't bump these
versions without checking with the team first.

## 3. Install and run

```
npm install
npm run dev
```

Vite will print a local URL, usually `http://localhost:5173` — open that in
your browser. You should see the nav bar (Bets / Leaderboard / Events) and
be able to click between pages.

**If `npm install` throws an error mentioning a native binding or Rolldown**,
run this and try again:
```
rm -rf node_modules package-lock.json
npm install
```

## 4. Project structure

```
src/
├── main.jsx                 # entry point + route definitions
├── App.jsx                  # layout shell: nav bar + page outlet
├── index.css                # global stylesheet, color variables live here
├── lib/
│   └── supabase.js          # Supabase client (reads .env.local)
├── data/
│   ├── DataProvider.jsx     # loads data once; components call useData()
│   ├── api.js               # Supabase queries -> same shapes as mockData.js
│   └── mockData.js          # fallback demo data when Supabase isn't set up
├── components/              # shared UI: EventCard, LeaderboardTable, Sparkline
└── pages/
    ├── Home.jsx             # your current bets + top-5 leaderboard
    ├── Leaderboard.jsx      # full leaderboard table
    └── Events.jsx           # all events with category filter

supabase/
├── migrations/              # every database change, in order
├── seed.sql                 # demo data for a brand-new database
├── config.toml              # Supabase CLI settings
└── README.md                # how the backend works + how to change it
```

## 5. Color palette

Defined as CSS variables in `src/index.css` — use these instead of hardcoding
hex values anywhere:

| Variable | Hex | Use |
|---|---|---|
| `--color-bg` | `#000014` | page background |
| `--color-primary` | `#8C183E` | active tab, balance pill, primary accents |
| `--color-accent` | `#F5A657` | odds, points, highlights |
| `--color-secondary` | `#54AB97` | bet buttons, "new"/"trending" tags |

## 6. What's next

The pages currently render plain unstyled lists just to prove the data and
routing work. Next steps:

- [ ] Build shared components in `src/components/`:
  - `Navbar.jsx` — replace the temporary inline nav in `App.jsx`
  - `BetCard.jsx` — the horizontally-scrolling bet cards on Home
  - `LeaderboardTable.jsx`
  - `PointsChart.jsx` — simple inline SVG sparkline, no chart library
  - `UpcomingEvents.jsx`
- [ ] Rebuild `Home.jsx` using those components to match the mockup
- [ ] Style `Leaderboard.jsx` and `Events.jsx` pages
- [ ] Make bet options (e.g. "VT +140") clickable/highlightable using local
      component state — no need to persist selections yet

## Notes for contributing

- Don't hardcode data inside components. Read it with `useData()`.
- Every database change, including demo-data edits, goes in a new migration
  in `supabase/migrations/`, applied with `npx supabase db push`, never the
  SQL Editor. Mirror demo-data changes in `seed.sql` and `mockData.js` too.
  Editing `seed.sql` alone doesn't change the live database. See
  `supabase/README.md`.
- No new dependencies without a quick check-in — the goal is to keep this
  simple and easy to run for everyone.
- Pull latest and reinstall (`npm install`) after pulling in case
  `package.json` changed.
