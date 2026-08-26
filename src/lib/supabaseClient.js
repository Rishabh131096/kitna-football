/** Single Supabase client + anonymous-session helper. Every call here is
 *  guarded so a missing/unreachable project degrades to "leaderboard
 *  unavailable" rather than breaking the game. */

import { createClient } from '@supabase/supabase-js'

const URL = import.meta.env.VITE_SUPABASE_URL
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = URL && ANON_KEY ? createClient(URL, ANON_KEY) : null

/** Resolves once an anonymous auth session exists, or null if Supabase
 *  isn't configured / reachable. */
export async function ensureAnonSession() {
  if (!supabase) {
    if (import.meta.env.DEV) console.debug('[leaderboard] no supabase client — check VITE_SUPABASE_URL/ANON_KEY')
    return null
  }
  try {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) return session
    const { data, error } = await supabase.auth.signInAnonymously()
    if (error) throw error
    return data.session
  } catch (err) {
    if (import.meta.env.DEV) console.debug('[leaderboard] anon sign-in failed', err)
    return null
  }
}
