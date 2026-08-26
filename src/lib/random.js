/** Deterministic-ish helpers. Swap in a seeded RNG later if you need
 *  reproducible decks for A/B testing question difficulty. */

export const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function pickTwo(arr) {
  const [a, b] = shuffle(arr)
  return [a, b]
}

/** Coin flip that decides which side a correct answer lands on. */
export const coin = () => Math.random() < 0.5
