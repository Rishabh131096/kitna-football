/** localStorage with a guard — Safari private mode and embedded webviews
 *  can throw on access. Degrades to in-memory so the game never crashes. */

const memory = new Map()
const KEY = 'kitna:v1'

function read() {
  try {
    const raw = window.localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return Object.fromEntries(memory)
  }
}

function write(obj) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(obj))
  } catch {
    Object.entries(obj).forEach(([k, v]) => memory.set(k, v))
  }
}

export function getBest(gameId) {
  return read()[`best:${gameId}`] ?? 0
}

export function setBest(gameId, score) {
  const state = read()
  const key = `best:${gameId}`
  if ((state[key] ?? 0) < score) {
    state[key] = score
    write(state)
    return true
  }
  return false
}

export function getNickname() {
  return read().nickname ?? ''
}

export function setNickname(name) {
  const state = read()
  state.nickname = name
  write(state)
}
