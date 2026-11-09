import { useEffect, useState } from 'react'
import { getNickname, setNickname } from '../lib/storage.js'
import { ensurePlayer, submitScore, getRank } from '../services/leaderboardService.js'
import { buildShareAssets, shareFile, downloadFile } from '../lib/share.js'
import { rankTier } from '../lib/rankTier.js'
import { track } from '../services/analytics.js'
import NicknamePrompt from './NicknamePrompt.jsx'
import Leaderboard from './Leaderboard.jsx'
import ShareCardModal from './ShareCardModal.jsx'

// scores_select_all makes this readable without a session, so we can show
// the submit button itself with a preview of where this score would land —
// a stronger nudge than a plain CTA. This is only ever used for that
// pre-submit preview — the share card uses a separately-tracked *confirmed*
// rank so it never claims a leaderboard spot the player hasn't actually taken.
// The tier only ever shows up as styling (glow/color), never as "top 10%"-
// style text — the button always just states the rank itself.
function submitCta(rank) {
  const plain = { tier: 'plain', label: "Submit to today's leaderboard" }
  if (!rank?.rank) return plain

  const total = (rank.total ?? 0) + 1 // submitting adds your own row
  const tier = rankTier({ rank: rank.rank, total })
  if (total === 1) return { tier: 'elite', label: "🔥 Be the first on today's leaderboard!" }

  if (tier === 'elite') return { tier, label: `🔥 You'd rank #${rank.rank} — submit now` }
  if (tier === 'great') return { tier, label: `🏆 You'd rank #${rank.rank} — claim it` }
  if (tier === 'good') return { tier, label: `⭐ You'd rank #${rank.rank} today — submit it` }
  return plain
}

export default function GameOver({ game, score, bestStreak, isRecord, personalBest, onReplay, onHome }) {
  const [stage, setStage] = useState('idle') // idle | prompt | saving | done
  const [potentialRank, setPotentialRank] = useState(null) // pre-submit nudge only
  const [confirmedRank, setConfirmedRank] = useState(null) // set only after a real submission
  const [preparingCard, setPreparingCard] = useState(false)
  const [shareCard, setShareCard] = useState(null) // { file, url, text } | null

  useEffect(() => {
    let cancelled = false
    getRank(game.id, score).then((result) => {
      if (!cancelled && result.ok) setPotentialRank({ rank: result.rank, total: result.total })
    })
    return () => { cancelled = true }
  }, [game.id, score])

  const openShareCard = async () => {
    setPreparingCard(true)
    const assets = await buildShareAssets({ game, score, bestStreak, rank: confirmedRank })
    setPreparingCard(false)
    setShareCard(assets)
    track('share_card_view', { gameId: game.id, score, bestStreak, rank: confirmedRank?.rank ?? null })
  }

  const closeShareCard = () => {
    if (shareCard) URL.revokeObjectURL(shareCard.url)
    setShareCard(null)
  }

  const handleShare = async () => {
    const result = await shareFile({ file: shareCard.file, text: shareCard.text })
    track('share_score', { gameId: game.id, score, bestStreak, result })
    return result
  }

  const handleDownload = () => {
    downloadFile(shareCard.file)
    track('share_score', { gameId: game.id, score, bestStreak, result: 'downloaded' })
  }

  const submit = async (nickname) => {
    setStage('saving')
    setNickname(nickname)
    await ensurePlayer(nickname)
    await submitScore(game.id, score)
    setStage('done')
    const result = await getRank(game.id, score)
    if (result.ok) setConfirmedRank({ rank: result.rank, total: result.total })
  }

  const handleSubmitClick = () => {
    const existing = getNickname()
    if (existing) submit(existing)
    else setStage('prompt')
  }

  const cta = submitCta(potentialRank)

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
        <button
          className={`btn btn--block over__submit${cta.tier === 'plain' ? ' btn--ghost' : ` over__submit--${cta.tier}`}`}
          style={{ '--accent': game.accent }}
          onClick={handleSubmitClick}
          type="button"
        >
          {cta.label}
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

      <button
        className="btn btn--ghost btn--block over__share"
        onClick={openShareCard}
        disabled={preparingCard}
        type="button"
      >
        {preparingCard ? 'Preparing…' : '📤 Share my score'}
      </button>

      <div className="over__actions">
        <button className="btn btn--primary" onClick={onReplay} type="button">
          Play again
        </button>
        <button className="btn btn--ghost" onClick={onHome} type="button">
          Other games
        </button>
      </div>

      {shareCard && (
        <ShareCardModal
          imageUrl={shareCard.url}
          hasRank={!!confirmedRank}
          onShare={handleShare}
          onDownload={handleDownload}
          onClose={closeShareCard}
        />
      )}
    </div>
  )
}
