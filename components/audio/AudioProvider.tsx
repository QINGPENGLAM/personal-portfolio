'use client'

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { withBasePath } from '@/lib/site'

type SoundName = 'confirm' | 'landmark' | 'portal'
type AudioState = {
  enabled: boolean
  pending: boolean
  error: string | null
  volume: number
  setVolume: (volume: number) => void
  play: (sound: SoundName) => void
  toggle: () => void
}

const AudioContextState = createContext<AudioState | null>(null)

export function AudioProvider({ children }: { children: ReactNode }) {
  const musicRef = useRef<HTMLAudioElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const requestRef = useRef(0)
  const volumeRef = useRef(0.2)
  const [enabled, setEnabled] = useState(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [volume, updateVolume] = useState(0.2)

  const setVolume = useCallback((value: number) => {
    const next = Math.max(0, Math.min(1, value))
    volumeRef.current = next
    updateVolume(next)
    if (musicRef.current) musicRef.current.volume = next
  }, [])

  const failPlayback = useCallback(() => {
    requestRef.current += 1
    musicRef.current?.pause()
    setEnabled(false)
    setPending(false)
    setError('Music could not play. Please try again.')
  }, [])

  const startMusic = useCallback(() => {
    const music = musicRef.current
    if (!music) return
    const request = ++requestRef.current
    setError(null)
    if (!music.getAttribute('src') || music.error) music.src = withBasePath('/audio/calm-ambient-dreamscape.mp3')
    music.volume = volumeRef.current
    setPending(true)
    const handleFailure = () => {
      if (request !== requestRef.current) return
      failPlayback()
    }
    try {
      void music.play().then(() => {
        if (request !== requestRef.current) return
        setEnabled(true)
        setPending(false)
      }).catch(handleFailure)
    } catch {
      handleFailure()
    }
  }, [failPlayback])

  useEffect(() => {
    const music = musicRef.current
    return () => {
      requestRef.current += 1
      music?.pause()
      void audioContextRef.current?.close().catch(() => {})
      audioContextRef.current = null
    }
  }, [])

  const toggle = useCallback(() => {
    if (enabled || pending) {
      requestRef.current += 1
      musicRef.current?.pause()
      setEnabled(false)
      setPending(false)
      setError(null)
      return
    }
    startMusic()
  }, [enabled, pending, startMusic])

  const play = useCallback((sound: SoundName) => {
    if (!enabled) return
    // Optional interface effects can fail independently of HTML music playback.
    const synthesize = async () => {
      if (!window.AudioContext) return
      const context = audioContextRef.current ?? new window.AudioContext()
      audioContextRef.current = context
      if (context.state === 'suspended') await context.resume()
      const oscillator = context.createOscillator()
      const gain = context.createGain()
      const frequencies: Record<SoundName, [number, number]> = { confirm: [520, 680], landmark: [330, 440], portal: [220, 560] }
      const [start, end] = frequencies[sound]
      const now = context.currentTime
      oscillator.type = sound === 'portal' ? 'sine' : 'triangle'
      oscillator.frequency.setValueAtTime(start, now)
      oscillator.frequency.exponentialRampToValueAtTime(end, now + 0.12)
      gain.gain.setValueAtTime(0.0001, now)
      gain.gain.exponentialRampToValueAtTime(0.035 * volume || 0.0001, now + 0.018)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15)
      oscillator.connect(gain).connect(context.destination)
      oscillator.start(now)
      oscillator.stop(now + 0.16)
    }
    void synthesize().catch(() => {})
  }, [enabled, volume])

  return <AudioContextState.Provider value={{ enabled, pending, error, volume, setVolume, play, toggle }}>
    <audio loop onError={failPlayback} preload="none" ref={musicRef} />
    {children}
  </AudioContextState.Provider>
}

export function usePortfolioAudio() {
  const context = useContext(AudioContextState)
  if (!context) throw new Error('usePortfolioAudio must be used inside AudioProvider')
  return context
}
