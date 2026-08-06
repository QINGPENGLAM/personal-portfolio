import { describe, expect, it, vi } from 'vitest'
import { createPageMetadata, siteConfig } from '@/lib/site'
import { handleContactRequest, type ContactWorkerEnv, type RateLimitStore } from '@/server/contact-worker'

class MemoryRateLimit implements RateLimitStore {
  values = new Map<string, string>()
  async get(key: string) { return this.values.get(key) ?? null }
  async put(key: string, value: string) { this.values.set(key, value) }
}

const env: ContactWorkerEnv = {
  CONTACT_ALLOWED_ORIGIN: 'https://portfolio.example',
  CONTACT_FROM_EMAIL: 'Portfolio <hello@example.com>',
  CONTACT_TO_EMAIL: 'owner@example.com',
  EMAIL_API_KEY: 'test-only',
  RATE_LIMIT: new MemoryRateLimit(),
  RATE_LIMIT_SALT: 'test-salt',
}

describe('Phase 6 production hardening', () => {
  it('creates canonical and social metadata for direct routes', () => {
    const metadata = createPageMetadata('Projects', 'Selected engineering work.', '/projects')
    expect(metadata.alternates).toEqual({ canonical: '/projects/' })
    expect(metadata.openGraph).toMatchObject({ url: '/projects/', type: 'website' })
    expect(siteConfig.ogImage).toMatch(/^https:\/\//)
  })

  it('rejects oversized contact bodies before provider delivery', async () => {
    const send = vi.fn<typeof fetch>()
    const request = new Request('https://contact.example', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': '12001', Origin: env.CONTACT_ALLOWED_ORIGIN },
      body: '{}',
    })
    const response = await handleContactRequest(request, env, send)
    expect(response.status).toBe(413)
    expect(response.headers.get('Cache-Control')).toBe('no-store')
    expect(send).not.toHaveBeenCalled()
  })
})
