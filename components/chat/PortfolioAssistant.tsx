'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { usePortfolioAudio } from '@/components/audio/AudioProvider'
import { suggestedAssistantQuestions } from '@/data/assistant-suggestions'
import type { GuideResult } from '@/lib/assistant-client'
import { trackPortfolioEvent } from '@/lib/analytics'

type Message = { id: number; kind: 'assistant' | 'user'; text: string; answer?: GuideResult }

export function PortfolioAssistant() {
  const pathname = usePathname()
  const endpoint = process.env.NEXT_PUBLIC_ASSISTANT_ENDPOINT
  const controllerRef = useRef<AbortController | null>(null)
  useEffect(() => () => controllerRef.current?.abort(), [])
  const [open, setOpen] = useState(false)
  const [showQuestions, setShowQuestions] = useState(true)
  const [question, setQuestion] = useState('')
  const [pending, setPending] = useState(false)
  const pendingRef = useRef(false)
  const [messages, setMessages] = useState<Message[]>([{ id: 0, kind: 'assistant', text: 'I’m a portfolio guide. I answer from published content, link to sources and never speak as QingPeng.' }])
  const requestTimesRef = useRef<number[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const messageIdRef = useRef(1)
  const restoreFocusRef = useRef(false)
  const { play } = usePortfolioAudio()

  useEffect(() => {
    if (!open) {
      if (restoreFocusRef.current) {
        restoreFocusRef.current = false
        const frame = window.requestAnimationFrame(() => toggleRef.current?.focus())
        return () => window.cancelAnimationFrame(frame)
      }
      return
    }
    restoreFocusRef.current = true
    inputRef.current?.focus()
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open])

  const toggle = () => {
    setOpen((current) => {
      if (!current) {
        trackPortfolioEvent('chatbot_opened')
        play('confirm')
      }
      return !current
    })
  }

  const ask = async (value: string, now: number) => {
    const trimmed = value.trim().slice(0, 240)
    if (!trimmed || pendingRef.current) return
    requestTimesRef.current = requestTimesRef.current.filter((time) => now - time < 60_000)
    const limited = requestTimesRef.current.length >= 12
    if (!limited) requestTimesRef.current.push(now)
    const userId = messageIdRef.current++
    const assistantId = messageIdRef.current++
    pendingRef.current = true
    setPending(true)
    setMessages((current) => [...current, { id: userId, kind: 'user', text: trimmed }])
    setQuestion('')
    setShowQuestions(false)
    const controller = new AbortController()
    controllerRef.current = controller
    try {
      const answer: GuideResult = limited
        ? { mode: 'local', available: false, answer: 'Question limit reached for this minute. Please pause before asking again.', links: [] }
        : await (await import('@/lib/assistant-client')).askAssistant(trimmed, messages.filter(m => m.id !== 0).slice(-4).map(m => ({ role: m.kind, content: m.text.slice(0, 480) })), endpoint, controller.signal)
      setMessages((current) => [...current, { id: assistantId, kind: 'assistant', text: answer.answer, answer }])
    } catch {
      if (controller.signal.aborted) {
        setMessages(current => [...current, { id: assistantId, kind: 'assistant', text: 'Request cancelled.' }])
        return
      }
      const answer: GuideResult = {
        mode: 'fallback',
        available: false,
        answer: 'The portfolio guide could not load. Please try again or browse the projects page.',
        links: [{ href: '/projects', label: 'Browse projects' }],
      }
      setMessages((current) => [...current, { id: assistantId, kind: 'assistant', text: answer.answer, answer }])
    } finally {
      controllerRef.current = null
      pendingRef.current = false
      setPending(false)
    }
  }

  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); ask(question, event.timeStamp) }

  return (
    <div className={`portfolio-assistant${pathname.startsWith('/world') ? ' is-world' : ''}`}>
      {open ? (
        <section aria-describedby="portfolio-assistant-description" aria-label="Portfolio guide" className="assistant-panel" id="portfolio-assistant-panel" role="dialog">
          <header><div><span>{endpoint ? 'AI + public portfolio sources' : 'Local demo · approved data only'}</span><strong>Portfolio guide</strong></div><button aria-label="Close portfolio guide" onClick={toggle} type="button">×</button></header>
          <div aria-live="polite" className="assistant-messages">
            {messages.map((message, index) => <article className={`is-${message.kind}`} id={index === 0 ? 'portfolio-assistant-description' : undefined} key={message.id}><span>{message.kind === 'user' ? 'You' : message.answer?.mode === 'ai' ? 'AI guide' : 'Guide'}</span>{message.answer?.notice ? <small>{message.answer.notice}</small> : null}<p>{message.text}</p>{message.answer?.links.length ? <div>{message.answer.links.map((link) => <Link href={link.href} key={`${message.id}-${link.href}`}>{link.label} <span aria-hidden="true">→</span></Link>)}</div> : null}</article>)}
          </div>
          {messages.length > 1 && !pending ? <button aria-expanded={showQuestions} className="assistant-question-picker" onClick={() => setShowQuestions(current => !current)} type="button">{showQuestions ? 'Hide common questions' : 'Browse common questions'}</button> : null}
          {showQuestions ? <div className="assistant-suggestions"><span>Common portfolio questions</span>{suggestedAssistantQuestions.map((suggestion) => <button disabled={pending} key={suggestion} onClick={(event) => ask(suggestion, event.timeStamp)} type="button">{suggestion}</button>)}</div> : null}
          <form onSubmit={submit}><label className="sr-only" htmlFor="portfolio-question">Ask about QingPeng’s portfolio</label><input id="portfolio-question" maxLength={240} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask about projects, skills, or experience…" ref={inputRef} value={question} /><button disabled={pending || !question.trim()} type="submit">Ask</button></form>
          {pending ? <button onClick={() => controllerRef.current?.abort()} type="button">Cancel request</button> : null}
          <small role="status">{pending ? 'Loading portfolio answers…' : endpoint ? 'Questions and recent chat are sent to our AI service and OpenRouter. Please avoid personal or sensitive information.' : 'No external AI or personal data collection is active in this mode.'}</small>
        </section>
      ) : null}
      <button aria-controls="portfolio-assistant-panel" aria-expanded={open} className={`assistant-toggle${open ? ' is-open' : ''}`} onClick={toggle} ref={toggleRef} type="button"><span aria-hidden="true">◇</span><strong>Ask portfolio</strong></button>
    </div>
  )
}
