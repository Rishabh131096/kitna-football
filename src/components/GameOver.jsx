import { useState } from 'react'
import { getNickname, setNickname } from '../lib/storage.js'
import { ensurePlayer, submitScore } from '../services/leaderboardService.js'
import NicknamePrompt from './NicknamePrompt.jsx'
import Leaderboard from './Leaderboard.jsx'

export default function GameOver({ game, score, bestStreak, isRecord, personalBest, onReplay, onHome }) {
  const [stage, setStage] = useState('idle') // idle | prompt | saving | done

  const submit = async (nickname) => {
    setStage('saving')
    setNickname(nickname)
    await ensurePlayer(nickname)
    await submitScore(game.id, score)
    setStage('done')
  }

  const handleSubmitClick = () => {
    const existing = getNickname()
    if (existing) submit(existing)
    else setStage('prompt')
  }

  return (
    <div className="over">
      <span className="over__emoji">{game.emoji}</span>
      {isRecord && <span className="over__record">New personal best</span>}

      <div className="over__score">{score.toLocaleString('en-IN')}</div>
      <div className="over__label">points</div>

      <div className="over__stats">
        <div>
          <span className="over__stat-value">🔥 {bestStreak}</span>
          <span className="over__stat-label">best streak</span>
        </div>
        <div>
          <span className="over__stat-value">{personalBest.toLocaleString('en-IN')}</span>
          <span className="over__stat-label">your record</span>
        </div>
      </div>

      {stage === 'idle' && (
        <button className="btn btn--ghost btn--block" onClick={handleSubmitClick} type="button">
          Submit to today's leaderboard
        </button>
      )}
      {stage === 'prompt' && <NicknamePrompt onSave={submit} />}
      {stage === 'saving' && <p className="leaderboard__status">Submitting…</p>}
      {stage === 'done' && (
        <div className="over__leaderboard">
          <h3 className="over__leaderboard-title">Today's top scores</h3>
          <Leaderboard gameId={game.id} />
        </div>
      )}

      <div className="over__actions">
        <button className="btn btn--primary" onClick={onReplay} type="button">
          Play again
        </button>
        <button className="btn btn--ghost" onClick={onHome} type="button">
          Other games
        </button>
      </div>
    </div>
  )
}
