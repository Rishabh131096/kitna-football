/**
 * Shared tiering so the submit-button CTA and the share-card banner agree on
 * what counts as "exciting" for a given rank. `total` must already include
 * the player's own row — pass `getRank()`'s total directly once submitted,
 * or `total + 1` beforehand (submitting adds one more entry to the pool).
 */
export function rankTier({ rank, total } = {}) {
  if (!rank) return 'plain'
  if (!total || total <= 1) return 'elite' // first entrant, or a near-empty pool
  if (rank <= 10) return 'elite'
  if (rank <= Math.ceil(total * 0.25)) return 'great'
  if (rank <= Math.ceil(total * 0.5)) return 'good'
  return 'plain'
}
