# VTRisk Demo — Getting Started

A local-only React prototype of the VTRisk homepage. No backend, no database —
all data is hardcoded in `src/data/mockData.js` so we can focus on layout,
navigation, and styling first.

## 1. Clone the repo

```
git clone <REPO_URL>
cd The-Clubhouse
```

## 2. Use Node 20 (important)

Check your version first:
```
node -v
```
You want **20.x or 22.x**. If you're on something else (especially an odd
version like 21, which is not LTS), install nvm and switch:
```
brew install nvm
nvm install 20
nvm use 20
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
├── main.jsx              # entry point + route definitions
├── App.jsx                # layout shell: nav bar + page outlet
├── index.css               # global stylesheet — color variables live here
├── data/
│   └── mockData.js         # all hardcoded bets, leaderboard, events, user data
├── components/             # (empty for now — shared UI pieces go here)
└── pages/
    ├── Home.jsx             # currently a plain placeholder list
    ├── Leaderboard.jsx       # currently a plain placeholder list
    └── Events.jsx            # currently a plain placeholder list
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

- Keep all data changes in `mockData.js` — don't hardcode data inside
  components.
- No new dependencies without a quick check-in — the goal is to keep this
  simple and easy to run for everyone.
- Pull latest and reinstall (`npm install`) after pulling in case
  `package.json` changed.
