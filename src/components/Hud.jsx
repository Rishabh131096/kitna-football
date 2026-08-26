import { LIVES } from '../hooks/useGame.js'

export default function Hud({ onBack, lives, score, streak, roundNumber, deckSize }) {
  return (
    <header className="hud">
      <button className="hud__back" onClick={onBack} type="button" aria-label="Back to menu">
        ‹
      </button>

      <div className="hud__lives" aria-label={`${lives} lives left`}>
        {Array.from({ length: LIVES }).map((_, i) => (
          <span key={i} className={`heart ${i < lives ? '' : 'heart--lost'}`}>
            {i < lives ? '❤️' : '🤍'}
          </span>
        ))}
      </div>

      <div className="hud__right">
        {streak >= 2 && (
          <span className="streak" key={streak}>
            🔥 {streak}
          </span>
        )}
        <span className="hud__score" key={score}>{score.toLocaleString('en-IN')}</span>
      </div>

      <div className="hud__progress">
        <div
          className="hud__progress-fill"
          style={{ width: `${deckSize ? (roundNumber / deckSize) * 100 : 0}%` }}
        />
      </div>
    </header>
  )
}
