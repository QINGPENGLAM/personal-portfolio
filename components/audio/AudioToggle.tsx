'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { usePortfolioAudio } from './AudioProvider'

export function AudioToggle() {
  const { enabled, pending, error, volume, setVolume, toggle } = usePortfolioAudio()
  const [visible, setVisible] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const label = pending ? 'Cancel background music' : enabled ? 'Pause background music' : 'Play background music'

  const reveal = useCallback(() => {
    setVisible(true)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      const panel = panelRef.current
      if (panel?.contains(document.activeElement) || panel?.matches(':hover')) return
      setVisible(false)
    }, 3000)
  }, [])

  useEffect(() => {
    if (!enabled && !pending && !error) return
    const frame = requestAnimationFrame(reveal)
    return () => cancelAnimationFrame(frame)
  }, [enabled, pending, error, reveal])

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current)
  }, [])

  return <div className="audio-control" onBlurCapture={reveal} onFocusCapture={reveal} onPointerEnter={reveal} onPointerLeave={reveal}>
    <button aria-label={label} aria-pressed={enabled} className="icon-button audio-toggle" onClick={() => { reveal(); toggle() }} title={label} type="button"><span aria-hidden="true">{enabled ? '♪' : '♩'}</span></button>
    {enabled ? <button aria-controls="music-volume-controls" aria-expanded={visible} aria-label="Adjust music volume" className="audio-settings-toggle" onClick={reveal} title="Adjust music volume" type="button"><span aria-hidden="true">⋯</span></button> : null}
    {enabled || pending || error ? <div className={`audio-settings${visible ? ' is-visible' : ''}`} id="music-volume-controls" inert={!visible} ref={panelRef}>
      {error ? <p role="status">{error}</p> : <>
        <p>{pending ? 'Starting music…' : 'Background music'}</p>
        <label>Music volume <span>{Math.round(volume * 100)}%</span><input aria-label="Music volume" max="100" min="0" onChange={event => { reveal(); setVolume(Number(event.target.value) / 100) }} type="range" value={Math.round(volume * 100)} /></label>
      </>}
    </div> : null}
  </div>
}
