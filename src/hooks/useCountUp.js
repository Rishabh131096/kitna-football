import { useEffect, useRef, useState } from 'react'

const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

/** Animates 0 -> target. `active` gates it so numbers stay hidden
 *  until the reveal. */
export function useCountUp(target, active, duration = 750) {
  const [value, setValue] = useState(0)
  const frame = useRef()

  useEffect(() => {
    if (!active) {
      setValue(0)
      return
    }
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      setValue(target * easeOutExpo(t))
      if (t < 1) frame.current = requestAnimationFrame(tick)
    }
    frame.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame.current)
  }, [target, active, duration])

  return value
}
