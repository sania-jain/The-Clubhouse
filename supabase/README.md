# Backend (Supabase)

The app reads its data from a Supabase Postgres database. If Supabase isn't
set up on your machine, it falls back to `src/data/mockData.js`, so you can
always run the frontend without any of this.

**Live project:** org **Clubhouse**, project ref `titmklynbrpqxrmisajp`
(`https://titmklynbrpqxrmisajp.supabase.co`). It's already set up, with the
schema and demo data loaded. To connect your machine, see `TEAMMATE_SETUP.txt`.

## What's in here

| File | What it does |
|---|---|
| `migrations/` | Every schema or data change, in order. The CLI tracks which ones the live database already has. |
| `migrations/20261005000000_initial_schema.sql` | Tables, leaderboard view, security rules |
| `seed.sql` | Demo data (same players, events and bets as `mockData.js`). Only loaded into a brand-new database. |
| `config.toml` | Supabase CLI settings, created by `supabase init` |

**Tables:**

- `profiles`: players, with balance, year/major and points history
- `events`: things you can bet on
- `event_options`: the choices for each event (VT / UVA, Yes / No, ...)
- `bets`: which player put how many points on which option

The `leaderboard` view ranks every profile by balance.

Security: row level security is on for every table. Anyone can **read**, but
nobody can **write** with the publishable key, so the website can't change
data yet. Write rules get added together with sign-in.

## How the frontend uses it

- `src/lib/supabase.js` creates the client from `.env.local`.
- `src/data/api.js` runs the queries and converts rows into the same shapes
  as `mockData.js`.
- `src/data/DataProvider.jsx` loads everything once at startup. Components
  read it with `const { events, leaderboard, currentUser, myBetEventIds } = useData();`.

There's no sign-in yet, so the seeded player `jd` is treated as "you"
(`DEMO_USERNAME` in `api.js`).

## Changing the database

All changes, to the schema or to the data, go through migration files and
the Supabase CLI. **Never paste a migration into the dashboard's SQL Editor.**
The CLI records which migrations the live database has, and SQL run in the
editor isn't recorded. The next `db push` would try to run it again and fail.

From the project root:

```bash
npx supabase login                                     # once per computer
npx supabase link --project-ref titmklynbrpqxrmisajp   # once per clone
npx supabase migration new describe_your_change
#   -> write your SQL in the new file in supabase/migrations/
npx supabase db push --dry-run                         # shows what would run
npx supabase db push
```

Check with the team before `db push`. It changes the shared database for
everyone. Commit the migration file in the same PR as the code that needs it.

If someone did run a migration in the SQL Editor, mark it as applied so
`db push` skips it:

```bash
npx supabase migration repair --status applied <timestamp_from_file_name>
```

### Changing the demo data

Editing `seed.sql` does **not** change the live database. The seed only
runs when a database is created from scratch, and running it again fails
on duplicate usernames. To change the demo data, do all three:

1. Write a migration with the `UPDATE` / `INSERT` / `DELETE` statements and
   `db push` it. This updates the live database.
2. Make the same change in `seed.sql`, so a fresh database matches.
3. Make the same change in `src/data/mockData.js`, so mock mode matches.

## Setting up a brand-new project (not needed for ours)

Only needed if you ever start over with a new Supabase project:

```bash
npx supabase login
npx supabase link --project-ref <new_project_ref>
npx supabase db push --include-seed   # runs all migrations, then seed.sql
```

Then update the project ref in this file and in `TEAMMATE_SETUP.txt`, and
everyone's `.env.local`.
