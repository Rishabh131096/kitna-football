/**
 * The ONLY place the app touches data.
 *
 * Everything is async and returns plain round objects, so when the backend
 * exists you replace the bodies of `getGames` / `getRounds` with `fetch`
 * calls and nothing else in the app changes.
 */

import { transfers } from '../data/footballTransfers.js'
import { footballers } from '../data/footballStats.js'
import { premierLeagueSeasons, SEASONS as PL_SEASONS } from '../data/premierLeagueSeason.js'
import { pickTwo, pick, coin } from '../lib/random.js'
import { formatByUnit, gapPhrase } from '../lib/format.js'

export const GAMES = [
  {
    id: 'football-transfers',
    name: 'Deadline Day',
    tagline: 'Two footballers, two transfer fees. Who cost the club more?',
    emoji: '⚽',
    question: 'Who had the bigger transfer fee?',
    accent: '#e63946',
    unit: 'million',
  },
  {
    id: 'football-stats',
    name: 'Full Time',
    tagline: 'Goals, assists, appearances, trophies — same two footballers, a different stat every round.',
    emoji: '📊',
    question: 'Who leads on this stat?',
    accent: '#ffb703',
    unit: 'goals',
  },
  {
    id: 'epl-stats',
    name: 'Top Flight',
    tagline: 'Goals, assists, appearances, clean sheets — a random Premier League season, a different stat every round.',
    emoji: '🥅',
    question: 'Who leads on this stat?',
    accent: '#118ab2',
    unit: 'goals',
  },
]

export async function getGames() {
  return GAMES
}

/* ------------------------------------------------------------------ *
 * Round builders — one per game. Each returns a round or null if the
 * sampled pair is unusable (tie, too easy, too absurd).
 * ------------------------------------------------------------------ */

// Reject pairs that are a coin flip, and pairs that are so lopsided the
// question answers itself. Tuned per game.
const DIFFICULTY = {
  'football-transfers': { min: 1.04, max: 5 },
  'football-stats:goals': { min: 1.1, max: 6 },
  'football-stats:assists': { min: 1.1, max: 6 },
  'football-stats:appearances': { min: 1.05, max: 4 },
  'football-stats:trophies': { min: 1.15, max: 8 },
  'football-stats:clean-sheets': { min: 1.1, max: 3 },
  'epl-stats:goals': { min: 1.1, max: 3.5 },
  'epl-stats:assists': { min: 1.15, max: 5 },
  'epl-stats:appearances': { min: 1.05, max: 1.6 },
  'epl-stats:clean-sheets': { min: 1.1, max: 2 },
}

function withinDifficulty(gameId, a, b) {
  const hi = Math.max(a, b)
  const lo = Math.min(a, b)
  if (lo <= 0) return false
  const ratio = hi / lo
  const { min, max } = DIFFICULTY[gameId]
  return ratio >= min && ratio <= max
}

function assemble({ gameId, question, unit, first, second, insight }) {
  // Randomise which side the correct answer sits on, otherwise players
  // learn the position instead of the prices.
  const [left, right] = coin() ? [first, second] : [second, first]
  const answerKey = left.value > right.value ? 'left' : 'right'
  const hi = Math.max(left.value, right.value)
  const lo = Math.min(left.value, right.value)

  return {
    id: `${gameId}:${first.key}:${second.key}`,
    gameId,
    question,
    unit,
    options: [
      { ...left, optionId: left.key, key: 'left', display: formatByUnit(left.value, unit) },
      { ...right, optionId: right.key, key: 'right', display: formatByUnit(right.value, unit) },
    ],
    answerKey,
    ratio: hi / lo,
    insight: insight ?? `That's ${gapPhrase(hi, lo)}.`,
  }
}

function buildFootballTransferRound() {
  const [x, y] = pickTwo(transfers)
  if (!x || !y || x.million === y.million) return null
  if (!withinDifficulty('football-transfers', x.million, y.million)) return null

  return assemble({
    gameId: 'football-transfers',
    question: 'Who had the bigger transfer fee?',
    unit: 'million',
    first: { key: x.id, emoji: x.emoji, title: x.player, subtitle: `${x.from} → ${x.to}`, badge: `${x.year} · ${x.position}`, value: x.million },
    second: { key: y.id, emoji: y.emoji, title: y.player, subtitle: `${y.from} → ${y.to}`, badge: `${y.year} · ${y.position}`, value: y.million },
  })
}

// Each round picks a random category, so the same two players can turn up
// under different stats on different deals — that's the point of the game.
const FOOTBALL_STAT_CATEGORIES = [
  { key: 'goals', field: 'goals', question: 'Who scored more career goals?', unit: 'goals' },
  { key: 'assists', field: 'assists', question: 'Who has more career assists?', unit: 'assists' },
  { key: 'appearances', field: 'appearances', question: 'Who has more career appearances?', unit: 'appearances' },
  { key: 'trophies', field: 'trophies', question: 'Who has won more major trophies?', unit: 'trophies' },
  { key: 'clean-sheets', field: 'cleanSheets', question: 'Who has kept more career clean sheets?', unit: 'clean-sheets' },
]

function buildFootballStatsRound() {
  const category = pick(FOOTBALL_STAT_CATEGORIES)
  // pools is a curated judgment call (e.g. Lampard belongs in the goals
  // pool despite being tagged "Midfielder"), not a mechanical position
  // filter — see the comment in footballStats.js.
  const pool = footballers.filter((p) => p.pools?.includes(category.key) && typeof p[category.field] === 'number' && p[category.field] > 0)
  const [x, y] = pickTwo(pool)
  if (!x || !y || x[category.field] === y[category.field]) return null
  if (!withinDifficulty(`football-stats:${category.key}`, x[category.field], y[category.field])) return null

  return assemble({
    gameId: 'football-stats',
    question: category.question,
    unit: category.unit,
    first: { key: `${x.id}:${category.key}`, emoji: x.emoji, title: x.player, subtitle: x.country, badge: x.position, value: x[category.field] },
    second: { key: `${y.id}:${category.key}`, emoji: y.emoji, title: y.player, subtitle: y.country, badge: y.position, value: y[category.field] },
  })
}

const EPL_STAT_CATEGORIES = [
  { key: 'goals', field: 'goals', question: (season) => `Who scored more Premier League goals in ${season}?`, unit: 'goals' },
  { key: 'assists', field: 'assists', question: (season) => `Who provided more Premier League assists in ${season}?`, unit: 'assists' },
  { key: 'appearances', field: 'appearances', question: (season) => `Who made more Premier League appearances in ${season}?`, unit: 'appearances' },
  { key: 'clean-sheets', field: 'cleanSheets', question: (season) => `Who kept more Premier League clean sheets in ${season}?`, unit: 'clean-sheets' },
]

function buildEplStatsRound() {
  const category = pick(EPL_STAT_CATEGORIES)
  const season = pick(PL_SEASONS)
  // Only ever compare two players from the same season — see the comment
  // in premierLeagueSeason.js.
  const pool = premierLeagueSeasons.filter((p) => p.season === season && p.pools?.includes(category.key) && typeof p[category.field] === 'number' && p[category.field] > 0)
  const [x, y] = pickTwo(pool)
  if (!x || !y || x[category.field] === y[category.field]) return null
  if (!withinDifficulty(`epl-stats:${category.key}`, x[category.field], y[category.field])) return null

  return assemble({
    gameId: 'epl-stats',
    question: category.question(season),
    unit: category.unit,
    first: { key: `${x.id}:${category.key}`, emoji: x.emoji, title: x.player, subtitle: x.team, badge: `${season} · ${x.position}`, value: x[category.field] },
    second: { key: `${y.id}:${category.key}`, emoji: y.emoji, title: y.player, subtitle: y.team, badge: `${season} · ${y.position}`, value: y[category.field] },
  })
}

const BUILDERS = {
  'football-transfers': buildFootballTransferRound,
  'football-stats': buildFootballStatsRound,
  'epl-stats': buildEplStatsRound,
}

/**
 * @param {string} gameId
 * @param {number} count  how many rounds to deal
 * @returns {Promise<Round[]>}
 */
export async function getRounds(gameId, count = 20) {
  const build = BUILDERS[gameId]
  if (!build) throw new Error(`Unknown game: ${gameId}`)

  const rounds = []
  const seen = new Set()
  let attempts = 0

  // Rejection sampling. The attempt cap stops a small or badly-tuned
  // dataset from spinning forever.
  while (rounds.length < count && attempts < count * 60) {
    attempts++
    const round = build()
    if (!round) continue
    // Fingerprint on the *content* ids, not left/right, so the same pair
    // shown in flipped positions still counts as a duplicate.
    const fingerprint = round.options.map((o) => o.optionId).sort().join('|')
    if (seen.has(fingerprint)) continue
    seen.add(fingerprint)
    rounds.push(round)
  }

  return rounds
}
