'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'

const ContactForm = dynamic(() => import('./ContactForm').then(module => module.ContactForm), {
  loading: () => <p role="status">Loading contact form…</p>,
})

export function DeferredContactForm() {
  const container = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!container.current) return
    if (typeof window.IntersectionObserver !== 'function') {
      const timer = window.setTimeout(() => setVisible(true), 0)
      return () => window.clearTimeout(timer)
    }
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setVisible(true)
        observer.disconnect()
      }
    }, { rootMargin: '600px' })
    observer.observe(container.current)
    return () => observer.disconnect()
  }, [])

  return <div ref={container}>{visible ? <ContactForm /> : <p>Send a message using the form or contact me directly.</p>}</div>
}
