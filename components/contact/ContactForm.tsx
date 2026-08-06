'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { usePortfolioAudio } from '@/components/audio/AudioProvider'
import { profile } from '@/data/profile'
import { trackPortfolioEvent } from '@/lib/analytics'
import { validateContactSubmission, type ContactSubmission } from '@/lib/contact'

type FieldErrors = Partial<Record<keyof ContactSubmission, string>>
type FormStatus = { kind: 'idle' | 'sending' | 'success' | 'error'; message: string }

export function ContactForm() {
  const startedAtRef = useRef(0)
  const { play } = usePortfolioAudio()
  const [errors, setErrors] = useState<FieldErrors>({})
  const [ready, setReady] = useState(false)
  const [status, setStatus] = useState<FormStatus>({ kind: 'idle', message: '' })
  const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT

  useEffect(() => {
    startedAtRef.current = Date.now()
    const timer = window.setTimeout(() => setReady(true), 0)
    return () => window.clearTimeout(timer)
  }, [])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const payload = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      company: String(formData.get('company') ?? ''),
      message: String(formData.get('message') ?? ''),
      website: String(formData.get('website') ?? ''),
      startedAt: startedAtRef.current,
    }
    const validation = validateContactSubmission(payload)

    if (!validation.success) {
      setErrors(validation.fieldErrors)
      setStatus({ kind: 'error', message: 'Review the highlighted fields and try again.' })
      window.requestAnimationFrame(() => form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus())
      return
    }

    setErrors({})
    if (!endpoint) {
      setStatus({ kind: 'error', message: 'Secure form delivery is not connected in this local preview. Please use the email link.' })
      return
    }

    setStatus({ kind: 'sending', message: 'Sending your message…' })
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 12_000)

    try {
      const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(validation.data), signal: controller.signal })
      const result = await response.json().catch(() => null) as { message?: string } | null
      if (!response.ok) throw new Error(result?.message ?? 'The message could not be sent.')
      form.reset()
      startedAtRef.current = Date.now()
      setStatus({ kind: 'success', message: 'Message sent. QingPeng will get back to you soon.' })
      trackPortfolioEvent('contact_submitted')
      play('confirm')
    } catch (error) {
      const message = error instanceof DOMException && error.name === 'AbortError'
        ? 'Message delivery timed out. Please use email instead.'
        : error instanceof Error ? error.message : 'The message could not be sent. Please use email instead.'
      setStatus({ kind: 'error', message })
    } finally {
      window.clearTimeout(timeout)
    }
  }

  return (
    <form className="contact-form glass-card" noValidate onSubmit={handleSubmit}>
      <div className="contact-form-heading"><p className="eyebrow">Secure message</p><h2>Send a note.</h2><p>{endpoint ? 'Messages are validated before delivery.' : 'Local-demo mode · delivery endpoint not configured.'}</p></div>
      <div className="contact-field-grid">
        <label><span>Name</span><input aria-describedby={errors.name ? 'contact-name-error' : undefined} aria-invalid={Boolean(errors.name)} autoComplete="name" maxLength={80} name="name" required />{errors.name ? <small id="contact-name-error">{errors.name}</small> : null}</label>
        <label><span>Email</span><input aria-describedby={errors.email ? 'contact-email-error' : undefined} aria-invalid={Boolean(errors.email)} autoComplete="email" maxLength={160} name="email" required type="email" />{errors.email ? <small id="contact-email-error">{errors.email}</small> : null}</label>
      </div>
      <label><span>Company <em>optional</em></span><input aria-describedby={errors.company ? 'contact-company-error' : undefined} aria-invalid={Boolean(errors.company)} autoComplete="organization" maxLength={120} name="company" />{errors.company ? <small id="contact-company-error">{errors.company}</small> : null}</label>
      <label><span>Message</span><textarea aria-describedby={errors.message ? 'contact-message-error' : 'contact-message-help'} aria-invalid={Boolean(errors.message)} maxLength={2000} minLength={20} name="message" required rows={7} /><small id={errors.message ? 'contact-message-error' : 'contact-message-help'}>{errors.message ?? '20–2,000 characters. Form content is never sent to analytics.'}</small></label>
      <label aria-hidden="true" className="contact-honeypot" hidden><span>Website</span><input aria-hidden="true" autoComplete="off" name="website" tabIndex={-1} /></label>
      <div className="contact-submit-row"><button className="button button-primary" disabled={!ready || status.kind === 'sending'} type="submit">{!ready ? 'Preparing…' : status.kind === 'sending' ? 'Sending…' : 'Send message'}</button><a href={`mailto:${profile.email}`}>Or email {profile.email}</a></div>
      {status.kind !== 'idle' ? <p className={`contact-status is-${status.kind}`} role={status.kind === 'error' ? 'alert' : 'status'}>{status.message}</p> : null}
    </form>
  )
}
