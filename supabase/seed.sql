-- Demo data, matching src/data/mockData.js. Run once on an empty database,
-- after the migration in supabase/migrations/.

-- ---------- Players ----------

insert into public.profiles (username, display_name, initials, detail, balance, change_pct, points_history) values
  ('maya_k',   'Maya K.',   'MK', 'Junior · Mechanical Eng.', 18920,  3.2, '{}'),
  ('derek_t',  'Derek T.',  'DT', 'Senior · Finance',         17405,  1.8, '{}'),
  ('sam_p',    'Sam P.',    'SP', 'Sophomore · CS',           16110, -0.9, '{}'),
  ('rae_c',    'Rae C.',    'RC', 'Senior · Marketing',       15860,  2.1, '{}'),
  ('jordan_l', 'Jordan L.', 'JL', 'Junior · Biology',         14995, -1.5, '{}'),
  -- The demo player the app treats as "you" until sign-in exists.
  ('jd',       'JD',        'JD', null,                        2480, 12.4,
    '{1800,1950,1870,2050,2200,2120,2300,2260,2400,2350,2480}');

-- 41 filler players between the top 5 and JD, so JD ranks #47 like in the mock data.
insert into public.profiles (username, display_name, initials, detail, balance, change_pct)
select
  'hokie' || code,
  'Hokie' || code,
  'HK',
  (array['Freshman', 'Sophomore', 'Junior', 'Senior'])[1 + n % 4]
    || ' · '
    || (array['CS', 'Biology', 'Finance', 'Mechanical Eng.', 'Marketing', 'Psychology'])[1 + n % 6],
  14900 - (n - 1) * 300,
  round(((n * 37) % 200 - 100) / 10.0, 1)
from generate_series(1, 41) as n,
  lateral (select ((n * 7919) % 9000 + 1000)::text as code) as c;

-- ---------- Events ----------

insert into public.events (id, title, subtitle, category, tag, tag_color, starts_at, closes_at, volume) values
  (1, 'Hokies vs Cavaliers', 'Football · 3:30 PM', 'Football', 'LIVE', 'primary',
    '2026-09-21 15:30 America/New_York', '2026-09-21 18:30 America/New_York', 48200),
  (2, 'Trivia Night Pool', 'Squires · 7:00 PM', 'Campus', 'NEW', 'secondary',
    '2026-09-24 19:00 America/New_York', '2026-09-24 19:00 America/New_York', 2140),
  (3, 'Hokies vs Hurricanes', 'Basketball · 6:00 PM', 'Basketball', 'CLOSING SOON', 'accent',
    '2026-09-28 18:00 America/New_York', '2026-09-28 18:00 America/New_York', 5120),
  (4, 'Homecoming King or Queen', 'Campus Vote · 11:59 PM', 'Campus', 'TRENDING', 'accent',
    '2026-09-26 23:59 America/New_York', '2026-09-26 23:59 America/New_York', 14750),
  (5, 'VT Esports League Finals', 'Team Ignite vs Vector · 9:00 PM', 'Esports', 'NEW', 'secondary',
    '2026-09-30 21:00 America/New_York', '2026-09-30 21:00 America/New_York', 3980),
  (6, 'Snow Before Thanksgiving Break?', 'Campus Weather Market', 'Campus', 'TRENDING', 'primary',
    '2026-11-26 00:00 America/New_York', '2026-11-26 00:00 America/New_York', 6310),
  (7, 'Hokies Make the ACC Championship?', 'Season-Long Market', 'Football', 'CLOSING SOON', 'accent',
    '2026-11-30 23:59 America/New_York', '2026-11-30 23:59 America/New_York', 22100);

-- The ids above were set by hand, so move the id counter past them.
select setval(pg_get_serial_sequence('public.events', 'id'), (select max(id) from public.events));

insert into public.event_options (event_id, label, probability, change, prob_history, sort_order) values
  (1, 'VT',                 62,  4.1, '{51,54,53,57,59,62}', 0),
  (1, 'UVA',                38, -4.1, '{49,46,47,43,41,38}', 1),
  (2, 'Team Trivia Titans', 41,  3.2, '{32,34,35,37,39,41}', 0),
  (2, 'Field',              59, -3.2, '{68,66,65,63,61,59}', 1),
  (3, 'VT',                 54,  1.2, '{50,51,52,51,53,54}', 0),
  (3, 'MIA',                46, -1.2, '{50,49,48,49,47,46}', 1),
  (4, 'Jordan M.',          34,  5.4, '{22,25,27,30,32,34}', 0),
  (4, 'Casey R.',           29, -2.1, '{34,33,32,31,30,29}', 1),
  (4, 'Field',              37, -3.3, '{44,42,41,39,38,37}', 2),
  (5, 'Team Ignite',        58,  3.0, '{50,52,53,55,56,58}', 0),
  (5, 'Team Vector',        42, -3.0, '{50,48,47,45,44,42}', 1),
  (6, 'Yes',                23,  1.4, '{18,19,19,21,22,23}', 0),
  (6, 'No',                 77, -1.4, '{82,81,81,79,78,77}', 1),
  (7, 'Yes',                31,  2.6, '{24,25,27,28,29,31}', 0),
  (7, 'No',                 69, -2.6, '{76,75,73,72,71,69}', 1);

-- ---------- Bets ----------

-- JD's open bets: events 1, 4 and 6, matching myBetEventIds in the mock data.
insert into public.bets (profile_id, option_id, amount)
select p.id, o.id, b.amount
from (values (1, 'VT', 250), (4, 'Jordan M.', 100), (6, 'Yes', 75)) as b (event_id, label, amount)
join public.event_options o on o.event_id = b.event_id and o.label = b.label
cross join public.profiles p
where p.username = 'jd';
