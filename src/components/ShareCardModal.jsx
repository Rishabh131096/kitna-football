import { useState } from 'react'

export default function ShareCardModal({ imageUrl, hasRank, onShare, onDownload, onClose }) {
  const [status, setStatus] = useState('idle') // idle | sharing | unsupported

  const handleShare = async () => {
    setStatus('sharing')
    const result = await onShare()
    setStatus(result === 'unsupported' ? 'unsupported' : 'idle')
  }

  return (
    <div className="lb-overlay" role="dialog" aria-label="Share your score">
      <div className="lb-overlay__panel share-card">
        <header className="lb-overlay__head">
          <span>Share your score</span>
          <button className="lb-overlay__close" onClick={onClose} type="button" aria-label="Close">
            ✕
          </button>
        </header>

        <img className="share-card__image" src={imageUrl} alt="Your score card" />

        {!hasRank && (
          <p className="share-card__motivate">
            💡 This card doesn't have your rank yet — submit to today's leaderboard first and share it again to flex your spot.
          </p>
        )}

        <p className="share-card__hint">
          {status === 'unsupported'
            ? "Sharing isn't supported here — screenshot this card or download it instead."
            : 'Screenshot this card to post it anywhere, or use the buttons below.'}
        </p>

        <div className="share-card__actions">
          <button className="btn btn--primary" onClick={handleShare} disabled={status === 'sharing'} type="button">
            {status === 'sharing' ? 'Sharing…' : 'Share'}
          </button>
          <button className="btn btn--ghost" onClick={onDownload} type="button">
            Download
          </button>
        </div>
      </div>
    </div>
  )
}
