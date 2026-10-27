'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import type { Experience } from '@/data/schemas'
import styles from '@/components/hrs/HrsCaseStudy.module.css'

export function ExperienceCard({ experience }: { experience: Experience }) {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const previousOverflow = useRef<string | null>(null)
  const backdropPress = useRef(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const dialogId = `experience-dialog-${experience.id}`

  const restoreScroll = () => {
    if (closeTimer.current !== null) clearTimeout(closeTimer.current)
    closeTimer.current = null
    if (dialogRef.current) delete dialogRef.current.dataset.closing
    if (previousOverflow.current !== null) {
      document.body.style.overflow = previousOverflow.current
      previousOverflow.current = null
    }
    backdropPress.current = false
    triggerRef.current?.focus({ preventScroll: true })
  }

  useEffect(() => () => {
    if (closeTimer.current !== null) clearTimeout(closeTimer.current)
    if (previousOverflow.current !== null) document.body.style.overflow = previousOverflow.current
  }, [])

  const open = () => {
    const dialog = dialogRef.current
    if (!dialog || dialog.open) return
    dialog.showModal()
    previousOverflow.current = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus({ preventScroll: true })
  }

  const finishClose = () => {
    if (closeTimer.current !== null) clearTimeout(closeTimer.current)
    closeTimer.current = null
    dialogRef.current?.close()
  }

  const requestClose = () => {
    const dialog = dialogRef.current
    if (!dialog?.open || dialog.dataset.closing) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finishClose()
      return
    }
    dialog.dataset.closing = 'true'
    // Keep the dialog modal until its exit animation finishes; the timer also
    // handles a cancelled animation or a motion preference changed mid-close.
    closeTimer.current = setTimeout(finishClose, 250)
  }

  const outsideDialog = (x: number, y: number) => {
    const rect = dialogRef.current?.getBoundingClientRect()
    return !!rect && (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom)
  }

  return (
    <>
      <article className="experience-disclosure">
        <span className="experience-dates">{experience.startDate} — {experience.endDate}</span>
        <h3>{experience.role}</h3>
        <strong className="experience-company">{experience.company}</strong>
        {experience.course && <span className="experience-course">{experience.course}</span>}
        <p>{experience.summary}</p>
        <button aria-controls={dialogId} aria-haspopup="dialog" aria-label={`View ${experience.role} details`} className="experience-toggle experience-card-trigger" onClick={open} ref={triggerRef} type="button">
          View details <span aria-hidden="true">↗</span>
        </button>
        <noscript><Link className="experience-role-link" href={`/experience#${experience.id}`}>Read full role details →</Link></noscript>
      </article>
      <dialog
        aria-describedby={`${dialogId}-description`}
        aria-labelledby={`${dialogId}-title`}
        className={styles.dialog}
        id={dialogId}
        onClose={restoreScroll}
        onCancel={(event) => { event.preventDefault(); requestClose() }}
        onAnimationEnd={(event) => {
          if (event.target === event.currentTarget && event.currentTarget.dataset.closing) finishClose()
        }}
        onKeyDown={(event) => {
          if (event.key !== 'Tab') return
          const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'))
          const first = controls[0]
          const last = controls[controls.length - 1]
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
          else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
        }}
        onPointerDown={(event) => { backdropPress.current = event.target === event.currentTarget && outsideDialog(event.clientX, event.clientY) }}
        onClick={(event) => {
          if (event.target === event.currentTarget && backdropPress.current && outsideDialog(event.clientX, event.clientY)) requestClose()
        }}
        ref={dialogRef}
      >
        <div className={styles.dialogBar}>
          <span>Experience details</span>
          <button aria-label={`Close ${experience.role} details`} onClick={requestClose} ref={closeRef} type="button">Close <span aria-hidden="true">×</span></button>
        </div>
        <div className={styles.dialogBody}>
          <p className={styles.dialogCaption}>{experience.startDate} — {experience.endDate}</p>
          <h2 id={`${dialogId}-title`}>{experience.role}</h2>
          <p>{experience.company} · {experience.location}</p>
          {experience.course && <p>{experience.course}</p>}
          <p id={`${dialogId}-description`}>{experience.summary}</p>
          <h3>Contributions</h3>
          <ul>{experience.contributions.map(item => <li key={item}>{item}</li>)}</ul>
          {experience.outcomes.length > 0 && <><h3>Measured outcomes</h3><ul>{experience.outcomes.map(item => <li key={item}>{item}</li>)}</ul></>}
          {experience.technologies.length > 0 && <><h3>Technologies</h3><div className="chip-list">{experience.technologies.map(item => <span key={item}>{item}</span>)}</div></>}
          <Link className="experience-role-link" href={`/experience#${experience.id}`}>Full role details →</Link>
        </div>
      </dialog>
    </>
  )
}
