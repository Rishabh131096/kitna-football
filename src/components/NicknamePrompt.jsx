import { useState } from 'react'

const VALID = /^[A-Za-z0-9 _-]{2,20}$/

export default function NicknamePrompt({ onSave }) {
  const [name, setName] = useState('')
  const valid = VALID.test(name.trim())

  return (
    <form
      className="nickname"
      onSubmit={(e) => {
        e.preventDefault()
        if (valid) onSave(name.trim())
      }}
    >
      <input
        className="nickname__input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Pick a name for the leaderboard"
        maxLength={20}
        autoFocus
      />
      <button className="btn btn--primary" type="submit" disabled={!valid}>
        Save & submit
      </button>
    </form>
  )
}
