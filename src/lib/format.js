const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

/** ₹1,23,456 — Indian digit grouping, no decimals. */
export const formatRupees = (n) => inr.format(Math.round(n))

/** ₹18.5 Cr */
export const formatCrore = (n) =>
  `₹${Number(n).toFixed(2).replace(/\.?0+$/, '')} Cr`

/**
 * Market caps: ₹2 lakh Cr territory down to ₹60,000 Cr.
 * Input is raw crore; picks the readable magnitude.
 */
export function formatMarketCap(crore) {
  if (crore >= 100000) {
    const lakh = crore / 100000
    const digits = lakh >= 10 ? 1 : 2
    return `₹${lakh.toFixed(digits).replace(/\.?0+$/, '')} lakh Cr`
  }
  return `₹${Math.round(crore).toLocaleString('en-IN')} Cr`
}

/** €120m */
export const formatMillion = (n) =>
  `€${Number(n).toFixed(1).replace(/\.0$/, '')}m`

/** "312 goals" / "1 trophy" — pluralised count with a unit label. */
const formatCount = (n, singular, plural = `${singular}s`) =>
  `${Math.round(n).toLocaleString('en-IN')} ${Math.round(n) === 1 ? singular : plural}`

export function formatByUnit(value, unit) {
  if (unit === 'crore') return formatCrore(value)
  if (unit === 'mcap') return formatMarketCap(value)
  if (unit === 'million') return formatMillion(value)
  if (unit === 'goals') return formatCount(value, 'goal')
  if (unit === 'assists') return formatCount(value, 'assist')
  if (unit === 'appearances') return formatCount(value, 'appearance')
  if (unit === 'trophies') return formatCount(value, 'trophy', 'trophies')
  if (unit === 'runs') return formatCount(value, 'run')
  if (unit === 'wickets') return formatCount(value, 'wicket')
  if (unit === 'clean-sheets') return formatCount(value, 'clean sheet')
  if (unit === 'strike-rate') return Number(value).toFixed(1)
  return formatRupees(value)
}

/** "2.4x more" / "18% more" — used in the reveal insight line. */
export function gapPhrase(hi, lo) {
  if (lo <= 0) return ''
  const ratio = hi / lo
  if (ratio >= 2) return `${ratio.toFixed(1)}x more`
  const pct = Math.round((ratio - 1) * 100)
  return pct <= 0 ? 'almost identical' : `${pct}% more`
}
