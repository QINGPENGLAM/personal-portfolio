import { describe, expect, it, vi } from 'vitest'
import { answerPortfolioQuestion } from '@/lib/assistant'
import { validateContactSubmission } from '@/lib/contact'
import { handleContactRequest, type ContactWorkerEnv, type RateLimitStore } from '@/server/contact-worker'

class MemoryRateLimit implements RateLimitStore {
  values = new Map<string, string>()
  async get(key: string) { return this.values.get(key) ?? null }
  async put(key: string, value: string) { this.values.set(key, value) }
}

function validPayload() {
  return { name: 'Recruiter Name', email: 'recruiter@example.com', company: 'Example Co', message: 'I would like to discuss a software engineering role.', website: '', startedAt: Date.now() - 5000 }
}

function workerEnv(store = new MemoryRateLimit()): ContactWorkerEnv {
  return { CONTACT_ALLOWED_ORIGIN: 'https://portfolio.example', CONTACT_FROM_EMAIL: 'Portfolio <hello@example.com>', CONTACT_TO_EMAIL: 'owner@example.com', EMAIL_API_KEY: 'test-only', RATE_LIMIT: store, RATE_LIMIT_SALT: 'test-salt' }
}

function contactRequest(body: unknown, origin = 'https://portfolio.example') {
  return new Request('https://contact.example', { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: origin, 'CF-Connecting-IP': '192.0.2.1' }, body: JSON.stringify(body) })
}

describe('Phase 5 advanced features', () => {
  it('validates contact fields, timing, and the spam honeypot', () => {
    expect(validateContactSubmission(validPayload()).success).toBe(true)
    expect(validateContactSubmission({ ...validPayload(), email: 'invalid' }).success).toBe(false)
    expect(validateContactSubmission({ ...validPayload(), website: 'spam.example' }).success).toBe(false)
    expect(validateContactSubmission({ ...validPayload(), startedAt: Date.now() }).success).toBe(false)
  })

  it('rejects unapproved contact origins before delivery', async () => {
    const send = vi.fn<typeof fetch>()
    const response = await handleContactRequest(contactRequest(validPayload(), 'https://attacker.example'), workerEnv(), send)
    expect(response.status).toBe(403)
    expect(send).not.toHaveBeenCalled()
  })

  it('delivers validated contact payloads without exposing the provider key', async () => {
    const send = vi.fn<typeof fetch>().mockResolvedValue(new Response('{}', { status: 200 }))
    const response = await handleContactRequest(contactRequest(validPayload()), workerEnv(), send)
    expect(response.status).toBe(200)
    expect(send).toHaveBeenCalledOnce()
    expect(await response.json()).toEqual({ message: 'Message sent.' })
  })

  it('rate limits repeated contact submissions', async () => {
    const env = workerEnv()
    const send = vi.fn<typeof fetch>().mockResolvedValue(new Response('{}', { status: 200 }))
    for (let index = 0; index < 5; index += 1) expect((await handleContactRequest(contactRequest(validPayload()), env, send)).status).toBe(200)
    expect((await handleContactRequest(contactRequest(validPayload()), env, send)).status).toBe(429)
  })

  it('answers from approved portfolio data and refuses unsupported questions', () => {
    const backend = answerPortfolioQuestion('What backend systems has QingPeng built?')
    expect(backend.available).toBe(true)
    expect(backend.links.map((link) => link.href)).toContain('/projects/devdoctor')
    const unsupported = answerPortfolioQuestion('What is QingPeng’s favorite restaurant?')
    expect(unsupported.available).toBe(false)
    expect(unsupported.answer).toContain('not available')
  })
})
