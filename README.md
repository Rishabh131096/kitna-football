# कितना Football? — a football price/stat-guessing game

Three head-to-head "who's bigger?" football games for the Indian market. Free
to play, no stakes, no cash out. Split out of the original
[कितना?](https://github.com/Rishabh131096/kitna) price-literacy project so
football can ship and deploy on its own.

```bash
npm install
npm run dev
```

## The games

| Game | Question |
|---|---|
| **Deadline Day** | Two footballers, two transfer fees — who cost more? |
| **Full Time** | Career goals, assists, appearances, trophies, clean sheets — same two footballers, a different stat every round |
| **Top Flight** | A random Premier League season — who leads on goals/assists/appearances/clean sheets? |

## Structure

```
src/
  data/            ← placeholder datasets, shaped like an API response
  services/
    roundService   ← THE seam. Swap these two functions for fetch() calls.
    analytics      ← every guess is buffered here; point FLUSH_URL at your API
    leaderboardService ← Supabase-backed daily per-game leaderboards
  hooks/
    useGame        ← lives, streak, scoring, phase machine
    useCountUp     ← price reveal animation
  components/      ← Home, GameScreen, OptionCard, Hud, GameOver, Leaderboard
  lib/             ← formatting, shuffle, guarded localStorage, Supabase client
```

## Adding the backend later

Only `src/services/roundService.js` knows where data comes from. Replace the
bodies of `getGames()` and `getRounds(gameId, count)` with `fetch` calls that
return the same shapes and nothing else in the app changes. Round shape:

```js
{
  id, gameId, question, unit,        // unit: 'million' | 'goals' | 'assists' | 'appearances' | 'trophies' | 'clean-sheets'
  options: [{ key:'left'|'right', optionId, emoji, title, subtitle, badge, value, display }],
  answerKey, ratio, insight
}
```

## Leaderboards

Daily per-game leaderboards run on Supabase (anonymous auth + a
`players`/`scores` table). Run
[supabase/migrations/0001_init.sql](supabase/migrations/0001_init.sql) once
against your own Supabase project, then set `VITE_SUPABASE_URL` and
`VITE_SUPABASE_ANON_KEY` — locally in `.env` (see `.env.example`), and in CI as
the `SUPABASE_URL` / `SUPABASE_ANON_KEY` repo secrets the deploy workflow
reads. Without them the app just runs with leaderboards disabled.

## Difficulty tuning

`DIFFICULTY` in `roundService.js` rejects pairs by ratio, per game/category —
e.g. clean sheets caps tighter than trophies since trophy counts swing wider
between two career-comparable players.

## Data status

⚠️ **All figures are illustrative placeholders.** Every dataset file says so at
the top.
