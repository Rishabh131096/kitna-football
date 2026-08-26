import { useState } from 'react'
import Home from './components/Home.jsx'
import GameScreen from './components/GameScreen.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import { GAMES } from './services/roundService.js'

export default function App() {
  const [gameId, setGameId] = useState(null)
  const [leaderboardGameId, setLeaderboardGameId] = useState(null)
  const game = GAMES.find((g) => g.id === gameId)
  const leaderboardGame = GAMES.find((g) => g.id === leaderboardGameId)

  return (
    <div className="app">
      {game ? (
        <GameScreen key={game.id} game={game} onHome={() => setGameId(null)} />
      ) : (
        <Home onSelect={setGameId} onViewLeaderboard={setLeaderboardGameId} />
      )}

      {leaderboardGame && (
        <div className="lb-overlay" role="dialog" aria-label={`${leaderboardGame.name} leaderboard`}>
          <div className="lb-overlay__panel">
            <header className="lb-overlay__head">
              <span>{leaderboardGame.emoji} {leaderboardGame.name} — today</span>
              <button
                className="lb-overlay__close"
                onClick={() => setLeaderboardGameId(null)}
                type="button"
                aria-label="Close"
              >
                ✕
              </button>
            </header>
            <Leaderboard gameId={leaderboardGame.id} />
          </div>
        </div>
      )}
    </div>
  )
}
