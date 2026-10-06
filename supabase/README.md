# Backend (Supabase)

The app reads its data from a Supabase Postgres database. If Supabase isn't
set up on your machine, it falls back to `src/data/mockData.js`, so you can
always run the frontend without any of this.

## What's in here

| File | What it does |
|---|---|
| `migrations/20261005000000_initial_schema.sql` | Tables, leaderboard view, security rules |
| `seed.sql` | Demo data (same players, events and bets as `mockData.js`) |

**Tables:**

- `profiles`: players, with balance, year/major and points history
- `events`: things you can bet on
- `event_options`: the choices for each event (VT / UVA, Yes / No, ...)
- `bets`: which player put how many points on which option

The `leaderboard` view ranks every profile by balance.

Security: row level security is on for every table. Anyone can **read**, but
nobody can **write** with the publishable key, so the website can't change
data yet. Write rules get added together with sign-in.

## One-time project setup (one person does this)

1. Create a project at [supabase.com](https://supabase.com) and invite the team
   under **Organization → Team**.
2. Open **SQL Editor**, paste in all of
   `migrations/20261005000000_initial_schema.sql`, and click **Run**.
3. In a new query, paste in all of `seed.sql` and click **Run**. Only run it
   once; running it again fails on duplicate usernames.
4. Check **Table Editor**. You should see 47 profiles, 7 events, 15 event
   options and 3 bets.

## Connecting your local app (everyone does this)

1. Copy `.env.example` to `.env.local` in the project root.
2. Fill in the values from **Project Settings → API**:
   - `VITE_SUPABASE_URL`: the Project URL
   - `VITE_SUPABASE_PUBLISHABLE_KEY`: the publishable key (`sb_publishable_...`),
     or the `anon` public key on older projects
3. Restart `npm run dev`.

Never use the **secret** / `service_role` key in the app. It ignores all
security rules, and everything in `.env.local` ends up in the browser.
`.env.local` is gitignored, so don't commit it or paste keys into the chat.

## How the frontend uses it

- `src/lib/supabase.js` creates the client from `.env.local`.
- `src/data/api.js` runs the queries and converts rows into the same shapes
  as `mockData.js`.
- `src/data/DataProvider.jsx` loads everything once at startup. Components
  read it with `const { events, leaderboard, currentUser, myBetEventIds } = useData();`.

There's no sign-in yet, so the seeded player `jd` is treated as "you"
(`DEMO_USERNAME` in `api.js`).

## Changing the database

Don't just click around in the dashboard. Save every change as a new SQL
file in `migrations/` (named with a timestamp, so they run in order), commit
it, and run it in the SQL Editor. That way the schema is reviewed in PRs and
everyone can rebuild the same database. If you change the demo data, update
both `seed.sql` and `mockData.js`.
