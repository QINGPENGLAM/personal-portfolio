'use client'

import { useEffect, useRef } from 'react'
import type { HrsNode as HrsNodeContent } from '@/data/hrs-case-study'
import styles from './HrsCaseStudy.module.css'

export function HrsNode({ node }: { node: HrsNodeContent }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const previousOverflow = useRef<string | null>(null)
  const backdropPress = useRef(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const dialogId = `hrs-dialog-${node.id}`

  const restoreScroll = () => {
    if (closeTimer.current !== null) clearTimeout(closeTimer.current)
    closeTimer.current = null
    if (dialogRef.current) delete dialogRef.current.dataset.closing
    if (previousOverflow.current !== null) {
      document.body.style.overflow = previousOverflow.current
      previousOverflow.current = null
    }
    backdropPress.current = false
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
      <button
        aria-controls={dialogId}
        aria-haspopup="dialog"
        className={`${styles.node} ${node.planned ? styles.planned : ''}`}
        id={`hrs-node-${node.id}`}
        onClick={open}
        type="button"
      >
        <span className={styles.nodeCopy}>
          {node.planned && <span className={styles.badge}>Planned</span>}
          <strong>{node.title}</strong>
          <span>{node.caption}</span>
        </span>
        <span className={styles.expand} aria-hidden="true">↗</span>
      </button>
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
          <span>{node.planned ? 'Planned functionality' : 'Engineering details'}</span>
          <button aria-label={`Close ${node.title} details`} onClick={requestClose} ref={closeRef} type="button">Close <span aria-hidden="true">×</span></button>
        </div>
        <div className={styles.dialogBody}>
          <p className={styles.dialogCaption}>{node.caption}</p>
          <h2 id={`${dialogId}-title`}>{node.title}</h2>
          <p id={`${dialogId}-description`}>{node.explanation}</p>
          {node.visualDiagram ? (
            <div className={styles.visualDetails}>
              <div className={styles.visualDiagram} aria-label={`${node.title} evidence-to-decision flow`}>
                <div className={styles.diagramSources}>
                  <h3>Paper source</h3>
                  <ul>
                    {node.visualDiagram.sources.map((source) => (
                      <li key={source.title}>
                        <strong>{source.title}</strong>
                        <span>{source.detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <span aria-hidden="true" className={styles.diagramArrow}>↓</span>
                <div className={styles.diagramCheck}>
                  <span>Evidence check</span>
                  <strong>{node.visualDiagram.check.title}</strong>
                  <p>{node.visualDiagram.check.detail}</p>
                </div>
                <p className={styles.diagramFallback}>{node.visualDiagram.fallback}</p>
                <span aria-hidden="true" className={styles.diagramArrow}>↓</span>
                <div className={styles.diagramOutcomes}>
                  <h3>AI suggestion</h3>
                  <ul>
                    {node.visualDiagram.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}
                  </ul>
                </div>
                <span aria-hidden="true" className={styles.diagramArrow}>↓</span>
                <div className={styles.diagramHuman}>
                  <span aria-hidden="true">Human decision</span>
                  <strong>{node.visualDiagram.humanDecision}</strong>
                </div>
              </div>
              {node.points.length > 0 && <ul className={styles.diagramNotes}>{node.points.map((point) => <li key={point}>{point}</li>)}</ul>}
            </div>
          ) : <ul>{node.points.map((point) => <li key={point}>{point}</li>)}</ul>}
        </div>
      </dialog>
      <noscript><div className={styles.fallback}><h3>{node.title}</h3><p>{node.explanation}</p><ul>{node.points.map((point) => <li key={point}>{point}</li>)}</ul></div></noscript>
    </>
  )
}
