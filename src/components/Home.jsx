import { GAMES } from '../services/roundService.js'
import { getBest } from '../lib/storage.js'

export default function Home({ onSelect, onViewLeaderboard }) {
  return (
    <div className="home">
      <div className="home__head">
        <h1 className="home__logo">कितना Football?</h1>
        <p className="home__tagline">
          Transfer fees, career stats, season numbers — how well do you actually know the game?
        </p>
      </div>

      <div className="home__games">
        {GAMES.map((game, i) => {
          const best = getBest(game.id)
          return (
            <div
              key={game.id}
              className="gamecard"
              style={{ '--accent': game.accent, animationDelay: `${i * 70}ms` }}
            >
              <button className="gamecard__main" onClick={() => onSelect(game.id)} type="button">
                <span className="gamecard__emoji">{game.emoji}</span>
                <span className="gamecard__body">
                  <span className="gamecard__name">{game.name}</span>
                  <span className="gamecard__tagline">{game.tagline}</span>
                </span>
              </button>
              <span className="gamecard__meta">
                {best > 0 ? <span className="gamecard__best">{best.toLocaleString('en-IN')}</span> : null}
                <button
                  className="gamecard__trophy"
                  onClick={() => onViewLeaderboard(game.id)}
                  type="button"
                  aria-label={`${game.name} leaderboard`}
                >
                  🏆
                </button>
                <button className="gamecard__arrow" onClick={() => onSelect(game.id)} type="button" aria-label={`Play ${game.name}`}>
                  ›
                </button>
              </span>
            </div>
          )
        })}
      </div>

      <p className="home__disclaimer">
        Free to play, no stakes, no cash out. Prices shown are illustrative
        placeholders while the data pipeline is being built.
      </p>
    </div>
  )
}
