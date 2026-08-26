-- कितना Football? daily per-game leaderboards.
--
-- Run this once against a fresh Supabase project (SQL editor, or `supabase db push`
-- if you adopt the CLI). Requires Anonymous sign-ins enabled under
-- Authentication > Providers first, since players/id references auth.users
-- and RLS policies key off auth.uid() from an anonymous session.

create table public.players (
  id uuid primary key references auth.users(id) on delete cascade,
  nickname text not null,
  created_at timestamptz not null default now(),
  nickname_updated_at timestamptz not null default now(),
  constraint nickname_length check (char_length(nickname) between 2 and 20),
  constraint nickname_charset check (nickname ~ '^[A-Za-z0-9 _-]+$')
);

-- One row per (player, game, day) — the daily-best model. The unique
-- constraint below is what makes this "one submission counts per day".
create table public.scores (
  id bigint generated always as identity primary key,
  player_id uuid not null references public.players(id) on delete cascade,
  game_id text not null check (game_id in (
    'football-transfers', 'football-stats', 'epl-stats'
  )),
  -- Theoretical max for one perfect 24-round run is ~8850 (see scoreFor in
  -- src/hooks/useGame.js); 10000 gives headroom while still rejecting
  -- devtools-submitted absurd scores.
  score integer not null check (score between 0 and 10000),
  play_date date not null default (timezone('Asia/Kolkata', now()))::date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (player_id, game_id, play_date)
);

create index scores_leaderboard_idx on public.scores (game_id, play_date, score desc);

-- Server always computes play_date in IST, never trusts a client-supplied
-- value, so a submission can't be backdated/forward-dated onto another day.
create or replace function public.force_play_date()
returns trigger as $$
begin
  new.play_date := (timezone('Asia/Kolkata', now()))::date;
  new.updated_at := now();
  return new;
end;
$$ language plpgsql;

create trigger scores_force_play_date
before insert or update on public.scores
for each row execute function public.force_play_date();

-- "Keep best of day" upsert. The client calls this via supabase.rpc(...)
-- rather than inserting into scores directly.
create or replace function public.submit_score(p_game_id text, p_score int)
returns void as $$
begin
  insert into public.scores (player_id, game_id, score)
  values (auth.uid(), p_game_id, p_score)
  on conflict (player_id, game_id, play_date)
  do update set score = greatest(scores.score, excluded.score);
end;
$$ language plpgsql security invoker;

grant execute on function public.submit_score(text, int) to anon, authenticated;

alter table public.players enable row level security;
alter table public.scores  enable row level security;

-- Nicknames must be readable by everyone (leaderboard join), writable only by self.
create policy players_select_all on public.players for select using (true);
create policy players_insert_own on public.players for insert with check (auth.uid() = id);
create policy players_update_own on public.players for update using (auth.uid() = id) with check (auth.uid() = id);

-- Scores: public leaderboard read, writes restricted to the caller's own identity.
create policy scores_select_all on public.scores for select using (true);
create policy scores_insert_own on public.scores for insert with check (auth.uid() = player_id);
create policy scores_update_own on public.scores for update using (auth.uid() = player_id) with check (auth.uid() = player_id);
-- No delete policy on either table — default deny.
