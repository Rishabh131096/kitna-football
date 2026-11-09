import { rankTier } from './rankTier.js'

const WIDTH = 1080
const HEIGHT = 1920
const BG = '#0b0d12'
const TEXT = '#eef1f7'
const MUTED = '#8b93a7'
const FONT = 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'

function roundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

/** Draws a centered pill badge, optionally glowing (the elite tier). Width
 * auto-fits the text (plus horizontal padding) rather than a fixed guess, so
 * a one-digit rank doesn't float inside the same pill as a three-digit one. */
function drawBadge(ctx, { text, y, height, background, textColor, font, borderColor, glow, paddingX = 56 }) {
  ctx.font = font
  const width = Math.max(ctx.measureText(text).width + paddingX * 2, height) // never narrower than it is tall
  const x = (WIDTH - width) / 2

  if (glow) {
    ctx.save()
    ctx.shadowColor = glow
    ctx.shadowBlur = 50
  }
  ctx.fillStyle = background
  roundedRect(ctx, x, y, width, height, height / 2)
  ctx.fill()
  if (glow) ctx.restore()

  if (borderColor) {
    ctx.strokeStyle = borderColor
    ctx.lineWidth = 3
    roundedRect(ctx, x, y, width, height, height / 2)
    ctx.stroke()
  }

  ctx.fillStyle = textColor
  ctx.font = font
  ctx.fillText(text, WIDTH / 2, y + height / 2 + 16)
}

/** Draws the rank line, with styling that scales with how good the rank is —
 * the tiering itself (rankTier, shared with the submit button) still drives
 * top-10 vs top-25%/50% vs everyone else, but that only ever shows up as
 * styling (glow, color, boldness). The text itself is always just the rank —
 * no "top 10%" label anywhere. */
function drawRank(ctx, { game, rank, y }) {
  const tier = rankTier(rank)
  if (tier === 'plain') {
    ctx.fillStyle = MUTED
    ctx.font = `600 38px ${FONT}`
    ctx.fillText(`#${rank.rank} today`, WIDTH / 2, y + 60)
    return
  }

  if (tier === 'elite') {
    drawBadge(ctx, {
      text: `\u{1F525} #${rank.rank} today`,
      y,
      height: 150,
      background: game.accent,
      textColor: '#fff',
      font: `800 56px ${FONT}`,
      glow: game.accent,
    })
    return
  }

  if (tier === 'great') {
    drawBadge(ctx, {
      text: `\u{1F3C6} #${rank.rank} today`,
      y: y + 15,
      height: 118,
      background: `${game.accent}30`,
      textColor: game.accent,
      font: `800 46px ${FONT}`,
      borderColor: game.accent,
    })
    return
  }

  // good
  drawBadge(ctx, {
    text: `⭐ #${rank.rank} today`,
    y: y + 23,
    height: 104,
    background: `${game.accent}1f`,
    textColor: game.accent,
    font: `700 42px ${FONT}`,
  })
}

/** Renders a story-shaped (1080x1920) score card. Sized for Instagram Stories / WhatsApp Status.
 * `rank` is optional — `{ rank, total }` from getRank(), only known once the player has
 * submitted to today's leaderboard. Omit it and the card just skips that line. */
export function renderScoreCard({ game, score, bestStreak, rank }) {
  const canvas = document.createElement('canvas')
  canvas.width = WIDTH
  canvas.height = HEIGHT
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = BG
  ctx.fillRect(0, 0, WIDTH, HEIGHT)

  const glow = ctx.createRadialGradient(WIDTH / 2, 620, 80, WIDTH / 2, 620, 620)
  glow.addColorStop(0, `${game.accent}55`)
  glow.addColorStop(1, `${game.accent}00`)
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, WIDTH, HEIGHT)

  ctx.textAlign = 'center'

  ctx.fillStyle = MUTED
  ctx.font = `700 34px ${FONT}`
  ctx.fillText('कितना FOOTBALL?', WIDTH / 2, 220)

  ctx.font = '240px sans-serif'
  ctx.fillText(game.emoji, WIDTH / 2, 560)

  ctx.fillStyle = game.accent
  ctx.font = `800 56px ${FONT}`
  ctx.fillText(game.name.toUpperCase(), WIDTH / 2, 660)

  ctx.fillStyle = TEXT
  ctx.font = `800 220px ${FONT}`
  ctx.fillText(score.toLocaleString('en-IN'), WIDTH / 2, 940)

  ctx.fillStyle = MUTED
  ctx.font = `700 40px ${FONT}`
  ctx.fillText('POINTS', WIDTH / 2, 1000)

  ctx.fillStyle = TEXT
  ctx.font = `600 48px ${FONT}`
  ctx.fillText(`\u{1F525} Best streak: ${bestStreak}`, WIDTH / 2, 1140)

  if (rank?.rank) {
    drawRank(ctx, { game, rank, y: 1225 })
  }

  const pillW = 760
  const pillH = 130
  const pillX = (WIDTH - pillW) / 2
  const pillY = 1560
  ctx.fillStyle = game.accent
  roundedRect(ctx, pillX, pillY, pillW, pillH, pillH / 2)
  ctx.fill()
  ctx.fillStyle = '#fff'
  ctx.font = `800 46px ${FONT}`
  ctx.fillText('Beat me → kitnafootball.com', WIDTH / 2, pillY + 83)

  ctx.fillStyle = MUTED
  ctx.font = `500 32px ${FONT}`
  ctx.fillText('Free · no stakes · 30 seconds', WIDTH / 2, 1780)

  return new Promise((resolve) => canvas.toBlob(resolve, 'image/png'))
}
