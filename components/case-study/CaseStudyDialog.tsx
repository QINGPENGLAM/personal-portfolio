'use client'

import { createPortal } from 'react-dom'
import { useEffect, useRef } from 'react'
import type { Project } from '@/data/schemas'
import { CaseStudyContent } from './CaseStudyContent'

export function CaseStudyDialog({ onRequestClose, project }: { onRequestClose: () => void; project: Project }) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !dialogRef.current) return
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), select, [tabindex]:not([tabindex="-1"])'))
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }

    document.addEventListener('keydown', trapFocus)
    return () => {
      document.removeEventListener('keydown', trapFocus)
      document.body.style.overflow = previousOverflow
      previousFocus?.focus()
    }
  }, [])

  return createPortal(
    <div className="case-study-dialog-backdrop" onMouseDown={(event) => { if (event.currentTarget === event.target) onRequestClose() }}>
      <div aria-labelledby="project-dialog-title" aria-modal="true" className="case-study-dialog" ref={dialogRef} role="dialog">
        <div className="case-study-dialog-bar"><span>World preserved in background</span><button aria-label={`Close ${project.title} case study`} onClick={onRequestClose} ref={closeButtonRef} type="button">Close <kbd>Esc</kbd></button></div>
        <CaseStudyContent mode="dialog" project={project} />
      </div>
    </div>,
    document.body,
  )
}
