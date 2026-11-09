/**
 * The seam for anything leaderboard-related, same convention as
 * roundService.js. Every function catches its own errors and returns a
 * plain result instead of throwing, so a missing/unreachable Supabase
 * project degrades to "leaderboard unavailable" rather than crashing the
 * game.
 */

import { supabase, ensureAnonSession } from '../lib/supabaseClient.js'

const todayIST = () => new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' })

export async function ensurePlayer(nickname) {
  const session = await ensureAnonSession()
  if (!session) return { ok: false }

  const { error } = await supabase
    .from('players')
    .upsert({ id: session.user.id, nickname, nickname_updated_at: new Date().toISOString() })

  if (error) {
    if (import.meta.env.DEV) console.debug('[leaderboard] ensurePlayer failed', error)
    return { ok: false }
  }
  return { ok: true }
}

export async function submitScore(gameId, score) {
  const session = await ensureAnonSession()
  if (!session) return { ok: false }

  const { error } = await supabase.rpc('submit_score', {
    p_game_id: gameId,
    p_score: score,
  })

  if (error) {
    if (import.meta.env.DEV) console.debug('[leaderboard] submitScore failed', error)
    return { ok: false }
  }
  return { ok: true }
}

/** Today's rank for `score`: count of strictly-higher scores today, plus one.
 * Cheap enough as two head-only counts; no RPC/migration needed since
 * `scores_select_all` already permits public reads. */
export async function getRank(gameId, score) {
  if (!supabase) return { ok: false }

  const today = todayIST()
  const base = () => supabase.from('scores').select('*', { count: 'exact', head: true }).eq('game_id', gameId).eq('play_date', today)

  const [{ count: ahead, error: aheadError }, { count: total, error: totalError }] = await Promise.all([
    base().gt('score', score),
    base(),
  ])

  if (aheadError || totalError) {
    if (import.meta.env.DEV) console.debug('[leaderboard] getRank failed', aheadError ?? totalError)
    return { ok: false }
  }

  return { ok: true, rank: ahead + 1, total }
}

export async function getLeaderboard(gameId, { limit = 20 } = {}) {
  if (!supabase) return { ok: false, entries: [] }

  const today = todayIST()

  const { data, error } = await supabase
    .from('scores')
    .select('score, players(nickname)')
    .eq('game_id', gameId)
    .eq('play_date', today)
    .order('score', { ascending: false })
    .limit(limit)

  if (error) {
    if (import.meta.env.DEV) console.debug('[leaderboard] getLeaderboard failed', error)
    return { ok: false, entries: [] }
  }

  return {
    ok: true,
    entries: data.map((row) => ({ nickname: row.players?.nickname ?? '???', score: row.score })),
  }
}
