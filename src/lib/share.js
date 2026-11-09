import { renderScoreCard } from './shareCard.js'

const SITE_URL = 'https://kitnafootball.com'

export function buildShareText({ game, score, bestStreak, rank }) {
  const rankPart = rank?.rank ? ` — ranked #${rank.rank} today` : ''
  return `${game.emoji} I scored ${score.toLocaleString('en-IN')} points (best streak: ${bestStreak}) on ${game.name}${rankPart} — कितना Football?\n\nBeat me: ${SITE_URL}`
}

/** Renders the score card once; the image is shown on screen so it can be
 * screenshotted even where no share/download path works (e.g. in-app browsers).
 * `rank` is optional — pass the result of leaderboardService.getRank() once
 * the player has submitted today's score, to flex the card with it. */
export async function buildShareAssets({ game, score, bestStreak, rank }) {
  const blob = await renderScoreCard({ game, score, bestStreak, rank })
  const file = new File([blob], 'kitna-football-score.png', { type: 'image/png' })
  return { file, url: URL.createObjectURL(blob), text: buildShareText({ game, score, bestStreak, rank }) }
}

export function downloadFile(file) {
  const url = URL.createObjectURL(file)
  const a = document.createElement('a')
  a.href = url
  a.download = file.name
  a.click()
  URL.revokeObjectURL(url)
}

/**
 * Instagram (and most apps) only show up in the native share sheet when
 * you're sharing a file, not just text/a link — there's no web API that
 * targets Instagram directly. So we hand the card image to navigator.share
 * as a file; on mobile this surfaces Instagram Stories/Direct alongside
 * WhatsApp, Twitter, etc. Returns 'unsupported' when neither path exists,
 * so the caller can fall back to the always-visible image + download button.
 */
export async function shareFile({ file, text }) {
  if (navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], text, title: 'Kitna Football?' })
      return 'shared'
    } catch (err) {
      if (err?.name === 'AbortError') return 'cancelled'
    }
  }

  if (navigator.share) {
    try {
      await navigator.share({ text, url: SITE_URL })
      return 'shared'
    } catch (err) {
      if (err?.name === 'AbortError') return 'cancelled'
    }
  }

  return 'unsupported'
}
