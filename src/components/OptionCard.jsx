import { useCountUp } from '../hooks/useCountUp.js'
import { formatByUnit } from '../lib/format.js'

/**
 * state: 'idle' | 'picked-correct' | 'picked-wrong' | 'revealed-winner' | 'revealed-loser'
 */
export default function OptionCard({ option, unit, revealed, state, onChoose, disabled }) {
  const animated = useCountUp(option.value, revealed)
  const display = revealed ? formatByUnit(animated, unit) : null

  return (
    <button
      className={`card card--${state}`}
      onClick={() => onChoose(option.key)}
      disabled={disabled}
      type="button"
    >
      <span className="card__emoji" aria-hidden="true">{option.emoji}</span>

      <span className="card__title">{option.title}</span>
      {option.subtitle && <span className="card__subtitle">{option.subtitle}</span>}
      {option.badge && <span className="card__badge">{option.badge}</span>}

      <span className={`card__price ${revealed ? 'is-revealed' : ''}`}>
        {revealed ? display : <span className="card__price-hidden">• • •</span>}
      </span>
    </button>
  )
}
