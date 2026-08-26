# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install       # install deps
npm run dev       # start Vite dev server on :5173 (auto-opens browser)
npm run build     # production build to dist/
npm run preview   # preview the production build locally
```

There is no test suite, linter, or type checker configured in this repo.

Deploys automatically to GitHub Pages on every push to `main` via
[.github/workflows/deploy.yml](.github/workflows/deploy.yml) (`npm ci && npm run build`, publishes `dist/`).
The Vite `base` is hardcoded to `/kitna-football/` in [vite.config.js](vite.config.js) — keep that in sync with the Pages repo name.

## What this is

कितना Football? — a set of head-to-head "which is bigger?" football
price/stat-guessing games for the Indian market. Split out of the original
[कितना?](https://github.com/Rishabh131096/kitna) price-literacy project so
football can be its own product/deploy. Currently a frontend-only prototype:
all data is illustrative placeholder data, not real figures (every file in
`src/data/` says so at the top).

## Architecture

**Single seam for a future backend:** [src/services/roundService.js](src/services/roundService.js)
is the *only* place the app touches data. `getGames()` and `getRounds(gameId, count)`
are the entire contract — when a real backend exists, replace their bodies with
`fetch` calls returning the same shapes and nothing else in the app changes.
Each game in `GAMES` is declarative config (id, name, tagline, emoji, accent
color, unit); each has a matching round-builder function in `BUILDERS`.

**The three games:**
- `football-transfers` ("Deadline Day") — two footballers, two transfer fees.
- `football-stats` ("Full Time") — two footballers, a random career stat
  (goals/assists/appearances/trophies/clean sheets) each round.
- `epl-stats` ("Top Flight") — two players from the same random Premier
  League season, a random season stat each round.

**Adding a new game** means: add an entry to `GAMES`, add a `build*Round()`
function that samples two items and returns via `assemble()`, register it in
`BUILDERS`, add a difficulty entry to `DIFFICULTY`, and add a dataset file under
`src/data/`.

**Round generation is rejection sampling**, not a fixed pool: `getRounds` calls
the game's builder repeatedly (cap `count * 60` attempts) until it has `count`
non-null, non-duplicate rounds. Builders return `null` for pairs that are ties,
too easy, or unusable, so the same builder is retried until a valid pair
appears. `DIFFICULTY` (min/max ratio) tunes this per game/category.
Duplicate detection fingerprints on the sorted content ids so a pair shown
flipped left/right still counts as seen. Left/right side is coin-flipped in
`assemble()` so players can't learn position instead of value.

**Game state machine** lives in [src/hooks/useGame.js](src/hooks/useGame.js), a
single hook (`useGame(gameId)`) driving a `loading → choosing → revealed → over`
phase cycle over a dealt deck of rounds (`DECK_SIZE = 24`). Owns lives, score,
streak/best-streak, and scoring (`scoreFor`: base points + streak bonus + a
time-decaying speed bonus). Every real component reads from this hook rather
than holding its own game logic. Best score per game persists via
[src/lib/storage.js](src/lib/storage.js) (guarded localStorage — degrades to an
in-memory Map if localStorage throws, e.g. Safari private mode).

**Analytics** ([src/services/analytics.js](src/services/analytics.js)) buffers
every `track()` call in memory (no backend wired up — `FLUSH_URL` is `null`).
`useGame` fires `game_start` / `guess` / `game_over` events with full round
context (chosen side, correctness, elapsed time, price ratio). Read the
live buffer from the browser console via `window.__kitnaEvents()`.

**Leaderboards** ([src/services/leaderboardService.js](src/services/leaderboardService.js),
[src/lib/supabaseClient.js](src/lib/supabaseClient.js)) are backed by Supabase —
anonymous auth + a `players`/`scores` table with a daily-best-per-game model.
Everything degrades gracefully to "leaderboard unavailable" if
`VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY` aren't set. Run
[supabase/migrations/0001_init.sql](supabase/migrations/0001_init.sql) once
against a fresh Supabase project to stand up the schema — this repo needs its
own Supabase project (or its own `game_id` namespace in a shared one); it does
not share state with the parent `kitna` repo.

**Component tree:** `App` picks between `Home` (game picker) and `GameScreen`
(active round UI, keyed by `game.id` to force remount on game switch).
`GameScreen` composes `Hud` (lives/score/streak), `OptionCard` (one side of the
comparison), and `GameOver`.

`src/lib/format.js` handles unit-aware price display (`unit`: `million` |
`goals` | `assists` | `appearances` | `trophies` | `clean-sheets`) and human
gap phrasing (e.g. "2.3x more"). `src/lib/random.js` holds shuffle/pick
helpers — deliberately non-seeded for now.
