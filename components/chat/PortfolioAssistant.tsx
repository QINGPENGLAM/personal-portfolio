'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { usePortfolioAudio } from '@/components/audio/AudioProvider'
import { answerPortfolioQuestion, suggestedAssistantQuestions, type AssistantAnswer } from '@/lib/assistant'
import { trackPortfolioEvent } from '@/lib/analytics'

type Message = { id: number; kind: 'assistant' | 'user'; text: string; answer?: AssistantAnswer }

export function PortfolioAssistant() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState<Message[]>([{ id: 0, kind: 'assistant', text: 'I’m a local portfolio guide. I answer only from approved content and never speak as QingPeng.' }])
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

  const ask = (value: string, now: number) => {
    const trimmed = value.trim().slice(0, 240)
    if (!trimmed) return
    requestTimesRef.current = requestTimesRef.current.filter((time) => now - time < 60_000)
    const limited = requestTimesRef.current.length >= 12
    if (!limited) requestTimesRef.current.push(now)
    const answer = limited ? { available: false, answer: 'Question limit reached for this minute. Please pause before asking again.', links: [] } : answerPortfolioQuestion(trimmed)
    const userId = messageIdRef.current++
    const assistantId = messageIdRef.current++
    setMessages((current) => [...current, { id: userId, kind: 'user', text: trimmed }, { id: assistantId, kind: 'assistant', text: answer.answer, answer }])
    setQuestion('')
  }

  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); ask(question, event.timeStamp) }

  return (
    <div className={`portfolio-assistant${pathname.startsWith('/world') ? ' is-world' : ''}`}>
      {open ? (
        <section aria-describedby="portfolio-assistant-description" aria-label="Portfolio guide" className="assistant-panel" id="portfolio-assistant-panel" role="dialog">
          <header><div><span>Local demo · approved data only</span><strong>Portfolio guide</strong></div><button aria-label="Close portfolio guide" onClick={toggle} type="button">×</button></header>
          <div aria-live="polite" className="assistant-messages">
            {messages.map((message, index) => <article className={`is-${message.kind}`} id={index === 0 ? 'portfolio-assistant-description' : undefined} key={message.id}><span>{message.kind === 'assistant' ? 'Guide' : 'You'}</span><p>{message.text}</p>{message.answer?.links.length ? <div>{message.answer.links.map((link) => <Link href={link.href} key={`${message.id}-${link.href}`}>{link.label} <span aria-hidden="true">→</span></Link>)}</div> : null}</article>)}
          </div>
          {messages.length === 1 ? <div className="assistant-suggestions"><span>Suggested recruiter questions</span>{suggestedAssistantQuestions.map((suggestion) => <button key={suggestion} onClick={(event) => ask(suggestion, event.timeStamp)} type="button">{suggestion}</button>)}</div> : null}
          <form onSubmit={submit}><label className="sr-only" htmlFor="portfolio-question">Ask about QingPeng’s portfolio</label><input id="portfolio-question" maxLength={240} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask about projects, skills, or experience…" ref={inputRef} value={question} /><button disabled={!question.trim()} type="submit">Ask</button></form>
          <small>No external AI or personal data collection is active in this mode.</small>
        </section>
      ) : null}
      <button aria-controls="portfolio-assistant-panel" aria-expanded={open} className={`assistant-toggle${open ? ' is-open' : ''}`} onClick={toggle} ref={toggleRef} type="button"><span aria-hidden="true">◇</span><strong>Ask portfolio</strong></button>
    </div>
  )
}
