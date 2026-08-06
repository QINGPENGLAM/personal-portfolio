'use client'

import { useEffect, useState } from 'react'
import { usePortfolioAudio } from '@/components/audio/AudioProvider'

const sequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA']

export function EasterEggLayer() {
  const [unlocked, setUnlocked] = useState(false)
  const { play } = usePortfolioAudio()

  useEffect(() => {
    let index = 0
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLElement && (event.target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName))) return
      index = event.code === sequence[index] ? index + 1 : event.code === sequence[0] ? 1 : 0
      if (index !== sequence.length) return
      index = 0
      setUnlocked(true)
      document.documentElement.dataset.easterEgg = 'unlocked'
      window.localStorage.setItem('qingpeng-curiosity-achievement', 'unlocked')
      play('portal')
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [play])

  if (!unlocked) return null

  return <div className="easter-egg-toast" role="status"><span aria-hidden="true">◇</span><div><strong>Curiosity path unlocked</strong><small>Keep exploring. Good systems reward careful attention.</small></div><button aria-label="Dismiss curiosity achievement" onClick={() => setUnlocked(false)} type="button">×</button></div>
}
