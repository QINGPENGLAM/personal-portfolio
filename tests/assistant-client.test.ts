import { expect, it, vi } from 'vitest'
import { askAssistant } from '@/lib/assistant-client'

it('uses the old local guide without a configured endpoint', async () => {
  const fetcher = vi.fn()
  const result = await askAssistant('backend systems', [], undefined, undefined, fetcher)
  expect(result.mode).toBe('local')
  expect(result.links.length).toBeGreaterThan(0)
  expect(fetcher).not.toHaveBeenCalled()
})
it('sends bounded history and returns a validated answer', async () => {
  const fetcher = vi.fn(async (_url: string | URL | Request, _init?: RequestInit) => { void _url; void _init; return Response.json({ mode: 'ai', available: true, answer: 'Evidence', links: [{ href: '/projects/hrs-publication-pipeline', label: 'HRS' }] }) })
  const result = await askAssistant('HRS?', Array.from({ length: 8 }, () => ({ role: 'user' as const, content: 'x'.repeat(600) })), 'https://assistant.test', undefined, fetcher)
  expect(result.mode).toBe('ai')
  expect(JSON.parse(String(fetcher.mock.calls[0][1]?.body)).history).toHaveLength(4)
  expect(JSON.parse(String(fetcher.mock.calls[0][1]?.body)).history[0].content).toHaveLength(480)
})
it('falls back visibly for errors, invented links and invalid endpoints', async () => {
  for (const endpoint of ['http://evil.test', 'https://assistant.test']) {
    const fetcher = vi.fn(async () => Response.json({ mode: 'ai', available: true, answer: 'Fake', links: [{ href: 'javascript:alert(1)', label: 'bad' }] }))
    const result = await askAssistant('backend', [], endpoint, undefined, fetcher)
    expect(result.mode).toBe('fallback')
    expect(result.notice).toContain('Local guide')
  }
})
it('does not silently generate a local answer when user cancels', async () => {
  const controller = new AbortController(); controller.abort()
  await expect(askAssistant('HRS', [], 'https://assistant.test', controller.signal)).rejects.toMatchObject({ name: 'AbortError' })
})
it.each([
  [502, { error: 'service-unavailable', reason: 'provider-rejected', providerStatus: 429 }, 'Free AI provider is rate-limiting'],
  [429, { error: 'quota', scope: 'day', retryAfterSeconds: 3600 }, 'daily limit reached'],
  [429, { error: 'quota', scope: 'minute', retryAfterSeconds: 30 }, 'Too many questions this minute'],
  [502, { error: 'service-unavailable', reason: 'timeout' }, 'AI timed out'],
])('distinguishes fallback causes (%s %j)', async (status, body, expected) => {
  const fetcher = vi.fn(async () => Response.json(body, { status }))
  const result = await askAssistant('backend', [], 'https://assistant.test', undefined, fetcher)
  expect(result.mode).toBe('fallback')
  expect(result.notice).toContain(expected)
  expect(fetcher).toHaveBeenCalledTimes(1)
})
it('answers the reported education question from public facts even when AI is unavailable', async () => {
  const fetcher = vi.fn(async () => Response.json({ error: 'service-unavailable', providerStatus: 429 }, { status: 502 }))
  const result = await askAssistant('what year is qingpeng', [], 'https://assistant.test', undefined, fetcher)
  expect(result.answer).toContain('Dec. 2026')
  expect(result.answer).toContain('not explicitly stated')
  expect(result.links).toContainEqual({ href: '/about#education', label: 'Education detail' })
})
