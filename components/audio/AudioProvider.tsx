'use client'

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'

type SoundName = 'confirm' | 'landmark' | 'portal'
type AudioState = { enabled: boolean; available: boolean; play: (sound: SoundName) => void; toggle: () => void }

const AudioContextState = createContext<AudioState | null>(null)
const storageKey = 'qingpeng-portfolio-audio'

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioContextRef = useRef<AudioContext | null>(null)
  const [enabled, setEnabled] = useState(false)
  const [available, setAvailable] = useState(true)

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setEnabled(window.localStorage.getItem(storageKey) === 'enabled'))
    return () => window.cancelAnimationFrame(frame)
  }, [])

  const getAudioContext = useCallback(() => {
    if (audioContextRef.current) return audioContextRef.current
    const AudioContextConstructor = window.AudioContext
    if (!AudioContextConstructor) throw new Error('Web Audio is unavailable')
    audioContextRef.current = new AudioContextConstructor()
    return audioContextRef.current
  }, [])

  const play = useCallback((sound: SoundName) => {
    if (!enabled) return
    try {
      const context = getAudioContext()
      const oscillator = context.createOscillator()
      const gain = context.createGain()
      const frequencies: Record<SoundName, [number, number]> = { confirm: [520, 680], landmark: [330, 440], portal: [220, 560] }
      const [start, end] = frequencies[sound]
      const now = context.currentTime
      oscillator.type = sound === 'portal' ? 'sine' : 'triangle'
      oscillator.frequency.setValueAtTime(start, now)
      oscillator.frequency.exponentialRampToValueAtTime(end, now + 0.12)
      gain.gain.setValueAtTime(0.0001, now)
      gain.gain.exponentialRampToValueAtTime(0.035, now + 0.018)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15)
      oscillator.connect(gain).connect(context.destination)
      oscillator.start(now)
      oscillator.stop(now + 0.16)
    } catch {
      setAvailable(false)
      setEnabled(false)
      window.localStorage.removeItem(storageKey)
    }
  }, [enabled, getAudioContext])

  const toggle = useCallback(() => {
    if (!available) return
    if (enabled) {
      setEnabled(false)
      window.localStorage.removeItem(storageKey)
      return
    }

    try {
      const context = getAudioContext()
      void context.resume()
      setEnabled(true)
      window.localStorage.setItem(storageKey, 'enabled')
      window.setTimeout(() => {
        const oscillator = context.createOscillator()
        const gain = context.createGain()
        const now = context.currentTime
        oscillator.frequency.setValueAtTime(480, now)
        oscillator.frequency.exponentialRampToValueAtTime(640, now + 0.1)
        gain.gain.setValueAtTime(0.025, now)
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.13)
        oscillator.connect(gain).connect(context.destination)
        oscillator.start(now)
        oscillator.stop(now + 0.14)
      }, 0)
    } catch {
      setAvailable(false)
    }
  }, [available, enabled, getAudioContext])

  return <AudioContextState.Provider value={{ enabled, available, play, toggle }}>{children}</AudioContextState.Provider>
}

export function usePortfolioAudio() {
  const context = useContext(AudioContextState)
  if (!context) throw new Error('usePortfolioAudio must be used inside AudioProvider')
  return context
}
