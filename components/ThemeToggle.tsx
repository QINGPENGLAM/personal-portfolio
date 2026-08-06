'use client'

import { useEffect, useState } from 'react'

type Theme = 'day' | 'night'

const storageKey = 'qingpeng-portfolio-theme'

function getPreferredTheme(): Theme {
  const storedTheme = window.localStorage.getItem(storageKey)

  if (storedTheme === 'day' || storedTheme === 'night') {
    return storedTheme
  }

  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'day' : 'night'
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('night')

  useEffect(() => {
    const preferredTheme = getPreferredTheme()
    document.documentElement.dataset.theme = preferredTheme
    const frame = window.requestAnimationFrame(() => setTheme(preferredTheme))
    return () => window.cancelAnimationFrame(frame)
  }, [])

  const toggleTheme = () => {
    const nextTheme: Theme = theme === 'night' ? 'day' : 'night'
    document.documentElement.dataset.theme = nextTheme
    window.localStorage.setItem(storageKey, nextTheme)
    setTheme(nextTheme)
  }

  return (
    <button
      aria-label={`Switch to ${theme === 'night' ? 'day' : 'night'} theme`}
      aria-pressed={theme === 'day'}
      className="icon-button"
      onClick={toggleTheme}
      title={`Switch to ${theme === 'night' ? 'day' : 'night'} theme`}
      type="button"
    >
      <span aria-hidden="true">◐</span>
    </button>
  )
}
