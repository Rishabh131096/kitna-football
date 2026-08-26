import { useCallback, useEffect, useRef, useState } from 'react'
import { getRounds } from '../services/roundService.js'
import { track } from '../services/analytics.js'
import { getBest, setBest } from '../lib/storage.js'

export const LIVES = 3
const DECK_SIZE = 10

const BASE_POINTS = 100
const STREAK_BONUS = 25
const MAX_STREAK_BONUS = 300
const SPEED_WINDOW_MS = 3000
const MAX_SPEED_BONUS = 50

function scoreFor(streak, elapsedMs) {
  const streakBonus = Math.min(streak * STREAK_BONUS, MAX_STREAK_BONUS)
  const speedBonus = Math.round(
    MAX_SPEED_BONUS * Math.max(0, 1 - elapsedMs / SPEED_WINDOW_MS)
  )
  return BASE_POINTS + streakBonus + speedBonus
}

export function useGame(gameId) {
  const [deck, setDeck] = useState([])
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState('loading') // loading | choosing | revealed | over
  const [lives, setLives] = useState(LIVES)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [lastPick, setLastPick] = useState(null) // { key, correct, points }
  const [isRecord, setIsRecord] = useState(false)

  const shownAt = useRef(0)

  const deal = useCallback(async () => {
    setPhase('loading')
    const next = await getRounds(gameId, DECK_SIZE)
    setDeck(next)
    setIndex(0)
    setLives(LIVES)
    setScore(0)
    setStreak(0)
    setBestStreak(0)
    setLastPick(null)
    setIsRecord(false)
    setPhase('choosing')
    shownAt.current = performance.now()
    track('game_start', { gameId, deckSize: next.length })
  }, [gameId])

  useEffect(() => {
    deal()
  }, [deal])

  const round = deck[index]

  const choose = useCallback(
    (key) => {
      if (phase !== 'choosing' || !round) return

      const elapsed = performance.now() - shownAt.current
      const correct = key === round.answerKey
      const points = correct ? scoreFor(streak, elapsed) : 0
      const nextStreak = correct ? streak + 1 : 0

      setLastPick({ key, correct, points })
      setScore((s) => s + points)
      setStreak(nextStreak)
      setBestStreak((b) => Math.max(b, nextStreak))
      if (!correct) setLives((l) => l - 1)
      setPhase('revealed')

      // The whole point of the game: what people believe prices to be.
      track('guess', {
        gameId,
        roundId: round.id,
        chosen: key,
        correct,
        elapsedMs: Math.round(elapsed),
        ratio: Number(round.ratio.toFixed(3)),
        options: round.options.map((o) => ({ side: o.key, id: o.optionId, value: o.value })),
        streakBefore: streak,
      })
    },
    [phase, round, streak, gameId]
  )

  const next = useCallback(() => {
    if (phase !== 'revealed') return
    const outOfLives = lives <= 0
    const outOfCards = index + 1 >= deck.length

    if (outOfLives || outOfCards) {
      const record = setBest(gameId, score)
      setIsRecord(record)
      setPhase('over')
      track('game_over', {
        gameId,
        score,
        bestStreak,
        roundsPlayed: index + 1,
        reason: outOfLives ? 'out_of_lives' : 'deck_finished',
      })
      return
    }

    setIndex((i) => i + 1)
    setLastPick(null)
    setPhase('choosing')
    shownAt.current = performance.now()
  }, [phase, lives, index, deck.length, gameId, score, bestStreak])

  return {
    round,
    phase,
    lives,
    score,
    streak,
    bestStreak,
    lastPick,
    isRecord,
    personalBest: getBest(gameId),
    roundNumber: index + 1,
    deckSize: deck.length,
    choose,
    next,
    restart: deal,
  }
}
