/**
 * Every guess is a data point about how people *perceive* prices, which is
 * the actual product here. For now events buffer in memory and log to the
 * console; point `FLUSH_URL` at your backend when it exists.
 */

const FLUSH_URL = null // e.g. '/api/events'
const buffer = []

let sessionId = null
function getSessionId() {
  if (!sessionId) {
    sessionId =
      (crypto?.randomUUID?.() ?? `s_${Date.now()}_${Math.random().toString(36).slice(2)}`)
  }
  return sessionId
}

export function track(event, payload = {}) {
  const record = {
    event,
    sessionId: getSessionId(),
    ts: new Date().toISOString(),
    ...payload,
  }
  buffer.push(record)
  if (import.meta.env.DEV) console.debug('[analytics]', event, record)
  return record
}

/** Read the buffer from the console while prototyping: window.__kitnaEvents() */
export const getEvents = () => [...buffer]

export async function flush() {
  if (!FLUSH_URL || buffer.length === 0) return
  const batch = buffer.splice(0, buffer.length)
  try {
    await fetch(FLUSH_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ events: batch }),
      keepalive: true,
    })
  } catch {
    buffer.unshift(...batch) // put them back, try again next time
  }
}

if (typeof window !== 'undefined') window.__kitnaEvents = getEvents
