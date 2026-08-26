import { useEffect } from 'react'
import { useGame } from '../hooks/useGame.js'
import Hud from './Hud.jsx'
import OptionCard from './OptionCard.jsx'
import GameOver from './GameOver.jsx'

export default function GameScreen({ game, onHome }) {
  const g = useGame(game.id)
  const revealed = g.phase === 'revealed'
  const { next } = g

  // Space / Enter to continue keeps desktop play fast.
  useEffect(() => {
    if (!revealed) return
    const onKey = (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        next()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [revealed, next])

  if (g.phase === 'loading') {
    return <div className="loading">Dealing…</div>
  }

  if (g.phase === 'over') {
    return (
      <GameOver
        game={game}
        score={g.score}
        bestStreak={g.bestStreak}
        isRecord={g.isRecord}
        personalBest={g.personalBest}
        onReplay={g.restart}
        onHome={onHome}
      />
    )
  }

  const { round, lastPick } = g

  const stateFor = (key) => {
    if (!revealed) return 'idle'
    const isAnswer = key === round.answerKey
    if (lastPick?.key === key) return isAnswer ? 'picked-correct' : 'picked-wrong'
    return isAnswer ? 'revealed-winner' : 'revealed-loser'
  }

  return (
    <div className="game" style={{ '--accent': game.accent }}>
      <Hud
        onBack={onHome}
        lives={g.lives}
        score={g.score}
        streak={g.streak}
        roundNumber={g.roundNumber}
        deckSize={g.deckSize}
      />

      <h2 className="game__question">{round.question}</h2>

      <div className="arena" key={round.id}>
        <OptionCard
          option={round.options[0]}
          unit={round.unit}
          revealed={revealed}
          state={stateFor('left')}
          onChoose={g.choose}
          disabled={revealed}
        />

        <div className="arena__vs">
          <span>or</span>
        </div>

        <OptionCard
          option={round.options[1]}
          unit={round.unit}
          revealed={revealed}
          state={stateFor('right')}
          onChoose={g.choose}
          disabled={revealed}
        />
      </div>

      <footer className={`reveal ${revealed ? 'is-open' : ''}`}>
        {revealed && (
          <>
            <div className={`reveal__verdict ${lastPick.correct ? 'is-good' : 'is-bad'}`}>
              <span className="reveal__mark">{lastPick.correct ? '✓' : '✗'}</span>
              <span>{lastPick.correct ? 'Correct' : 'Nope'}</span>
              {lastPick.correct && <span className="reveal__points">+{lastPick.points}</span>}
            </div>
            <p className="reveal__insight">{round.insight}</p>
            <button className="btn btn--primary btn--block" onClick={g.next} type="button">
              Next
            </button>
          </>
        )}
      </footer>
    </div>
  )
}
