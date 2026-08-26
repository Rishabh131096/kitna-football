import { useEffect, useState } from 'react'
import { getLeaderboard } from '../services/leaderboardService.js'
import { getNickname } from '../lib/storage.js'

export default function Leaderboard({ gameId }) {
  const [state, setState] = useState({ loading: true, ok: true, entries: [] })

  useEffect(() => {
    let cancelled = false
    setState({ loading: true, ok: true, entries: [] })
    getLeaderboard(gameId).then((result) => {
      if (!cancelled) setState({ loading: false, ...result })
    })
    return () => {
      cancelled = true
    }
  }, [gameId])

  if (state.loading) return <p className="leaderboard__status">Loading today's board…</p>
  if (!state.ok) return <p className="leaderboard__status">Leaderboard unavailable right now.</p>
  if (state.entries.length === 0) {
    return <p className="leaderboard__status">No scores submitted today yet — be the first.</p>
  }

  const me = getNickname()

  return (
    <ol className="leaderboard">
      {state.entries.map((entry, i) => (
        <li
          key={i}
          className={`leaderboard__row ${entry.nickname === me ? 'is-me' : ''}`}
        >
          <span className="leaderboard__rank">{i + 1}</span>
          <span className="leaderboard__name">{entry.nickname}</span>
          <span className="leaderboard__score">{entry.score.toLocaleString('en-IN')}</span>
        </li>
      ))}
    </ol>
  )
}
