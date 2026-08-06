'use client'

import { usePortfolioAudio } from './AudioProvider'

export function AudioToggle() {
  const { available, enabled, toggle } = usePortfolioAudio()

  return <button aria-label={available ? `${enabled ? 'Mute' : 'Enable'} optional interface sound` : 'Interface sound unavailable'} aria-pressed={enabled} className="icon-button audio-toggle" disabled={!available} onClick={toggle} title={available ? `${enabled ? 'Mute' : 'Enable'} optional sound` : 'Sound unavailable'} type="button"><span aria-hidden="true">{enabled ? '♪' : '♩'}</span></button>
}
