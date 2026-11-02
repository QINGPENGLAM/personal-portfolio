import { describe, expect, it, vi } from 'vitest'
import { handleAssistant, type AssistantEnv } from '@/server/assistant/worker'
import { AssistantQuota, type QuotaStorage } from '@/server/assistant/quota'

function storage(): QuotaStorage {
  let value: unknown
  let queue = Promise.resolve()
  const store: QuotaStorage = {
    async get<T>() { return structuredClone(value) as T | undefined },
    async put(_key, next) { value = structuredClone(next) },
    async delete() { value = undefined; return true },
    transaction<T>(fn: (tx: QuotaStorage) => Promise<T>): Promise<T> {
      const result = queue.then(() => fn(store)); queue = result.then(() => {}, () => {}); return result
    },
  }
  return store
}
function setup() {
  const quota = new AssistantQuota({ storage: storage() })
  const env: AssistantEnv = { ASSISTANT_ALLOWED_ORIGIN: 'https://example.com', OPENROUTER_API_KEY: 'secret-key', ASSISTANT_RATE_LIMIT_SALT: 'secret-salt', ASSISTANT_QUOTA: { idFromName: () => 'global', get: () => quota } }
  const upstream = vi.fn(async (_url: string | URL | Request, init?: RequestInit) => {
    const payload = JSON.parse(String(init?.body))
    const sources = JSON.parse(payload.messages[1].content).sources
    return Response.json({ choices: [{ message: { content: JSON.stringify({ available: true, answer: 'Supported response.', citationIds: [sources[0].id] }) } }] })
  })
  const request = (body: unknown = { question: 'HRS database' }, headers = {}) => new Request('https://worker.test', { method: 'POST', headers: { Origin: 'https://example.com', 'Content-Type': 'application/json', 'CF-Connecting-IP': '1.2.3.4', ...headers }, body: typeof body === 'string' ? body : JSON.stringify(body) })
  return { env, upstream, request }
}
describe('atomic quota', () => {
  it('caps races at ten globally, three per minute and rolls over UTC day', async () => {
    const q = new AssistantQuota({ storage: storage() })
    const reserve = (ip: string, now: number) => q.fetch(new Request('https://quota', { method: 'POST', body: JSON.stringify({ hash: ip, now }) }))
    const now = Date.UTC(2026, 10, 1)
    const clock = vi.spyOn(Date, 'now').mockReturnValue(now)
    expect((await Promise.all(Array.from({ length: 20 }, (_, i) => reserve(String(i).padStart(64, 'a'), now)))).filter(r => r.ok)).toHaveLength(10)
    clock.mockReturnValue(now + 86400000)
    expect((await reserve('b'.repeat(64), now + 86400000)).ok).toBe(true)
    expect((await reserve('b'.repeat(64), now + 86400000)).ok).toBe(true)
    expect((await reserve('b'.repeat(64), now + 86400000)).ok).toBe(true)
    expect((await reserve('b'.repeat(64), now + 86400000)).status).toBe(429)
    clock.mockRestore()
  })
})
it('ignores delayed caller timestamps that could reset current-day quota', async () => {
  const q = new AssistantQuota({ storage: storage() })
  const reserve = (i: number, now: number) => q.fetch(new Request('https://quota', { method: 'POST', body: JSON.stringify({ hash: i.toString(16).padStart(64, '0'), now }) }))
  for (let i = 0; i < 10; i++) expect((await reserve(i, Date.now())).ok).toBe(true)
  expect((await reserve(11, Date.now() - 86400000)).status).toBe(429)
  expect((await reserve(12, Date.now())).status).toBe(429)
})
it('a delayed midnight alarm cannot erase today’s new reservations', async () => {
  const q = new AssistantQuota({ storage: storage() })
  const reserve = () => q.fetch(new Request('https://quota', { method: 'POST', body: JSON.stringify({ hash: 'a'.repeat(64), now: Date.now() }) }))
  await reserve(); await reserve(); await reserve()
  await q.alarm()
  expect((await reserve()).status).toBe(429)
})
it('reports quota scope without clearing counters', async () => {
  const q = new AssistantQuota({ storage: storage() })
  const reserve = (i: number) => q.fetch(new Request('https://quota', { method: 'POST', body: JSON.stringify({ hash: i.toString(16).padStart(64, '0') }) }))
  await reserve(1); await reserve(1); await reserve(1)
  expect(await (await reserve(1)).json()).toMatchObject({ scope: 'minute', retryAfterSeconds: expect.any(Number) })
  for (let i = 2; i < 9; i++) await reserve(i)
  expect(await (await reserve(10)).json()).toMatchObject({ scope: 'day', retryAfterSeconds: expect.any(Number) })
})
describe('assistant boundary', () => {
  it('makes one free-only bounded request and resolves sources itself', async () => {
    const { env, upstream, request } = setup()
    const response = await handleAssistant(request(), env, upstream)
    expect(response.status).toBe(200)
    expect(await response.json()).toMatchObject({ mode: 'ai', links: [{ href: expect.stringMatching(/^\/projects\//) }] })
    const payload = JSON.parse(String(upstream.mock.calls[0][1]?.body))
    expect(payload).toMatchObject({ model: 'openrouter/free', max_tokens: 600, provider: { data_collection: 'deny', require_parameters: true, allow_fallbacks: false } })
    expect(upstream).toHaveBeenCalledTimes(1)
    expect(String(upstream.mock.calls[0][1]?.body)).not.toContain('secret-key')
  })
  it('rejects bad origins, types, oversize actual bodies and control fields without calls', async () => {
    const { env, upstream, request } = setup()
    for (const r of [request({}, { Origin: 'https://evil.test' }), request({}, { 'Content-Type': 'text/plain' }), request(' '.repeat(8200)), request({ question: 'HRS', model: 'paid' })]) expect((await handleAssistant(r, env, upstream)).status).toBeGreaterThanOrEqual(400)
    expect(upstream).not.toHaveBeenCalled()
  })
  it('fails closed on missing quota/paid model and avoids calls with no evidence', async () => {
    const { env, upstream, request } = setup()
    expect((await handleAssistant(request(), { ...env, ASSISTANT_MODEL: 'paid/model' }, upstream)).status).toBe(503)
    expect((await handleAssistant(request(), { ...env, ASSISTANT_QUOTA: undefined }, upstream)).status).toBe(503)
    expect(await (await handleAssistant(request({ question: 'weather in Tokyo' }), env, upstream)).json()).toMatchObject({ mode: 'insufficient', available: false })
    expect(upstream).not.toHaveBeenCalled()
  })
  it('rejects invented citations, malformed output and failures without retry; failed calls consume quota', async () => {
    const { env, request } = setup()
    const upstream = vi.fn(async () => Response.json({ choices: [{ message: { content: JSON.stringify({ available: true, answer: 'Fake', citationIds: ['invented'] }) } }] }))
    expect((await handleAssistant(request(), env, upstream)).status).toBe(502)
    upstream.mockImplementation(async () => new Response('private error secret-key', { status: 429 }))
    expect((await handleAssistant(request(), env, upstream)).status).toBe(502)
    upstream.mockImplementation(async () => Response.json({ choices: [{ message: { reasoning: 'reasoning only' } }] }))
    expect((await handleAssistant(request(), env, upstream)).status).toBe(502)
    expect((await handleAssistant(request(), env, upstream)).status).toBe(429)
    expect(upstream).toHaveBeenCalledTimes(3)
  })
  it('reports only a safe failure stage and HTTP status, never provider details', async () => {
    const { env, request } = setup()
    const upstream = vi.fn(async () => new Response('secret-key private provider details', { status: 404 }))
    const response = await handleAssistant(request(), env, upstream)
    expect(response.status).toBe(502)
    expect(await response.json()).toEqual({ error: 'service-unavailable', reason: 'provider-rejected', providerStatus: 404 })
    expect(upstream).toHaveBeenCalledTimes(1)
  })
  it.each([
    ['No endpoints found matching your data policy. secret-key', 'data-policy'],
    ['No available model provider meets your routing requirements. secret-key', 'routing-unavailable'],
  ])('classifies provider rejection safely: %s', async (message, providerCategory) => {
    const { env, request } = setup()
    const upstream = vi.fn(async () => Response.json({ error: { message, metadata: { raw: 'secret-key private details' } } }, { status: 503 }))
    const response = await handleAssistant(request(), env, upstream)
    expect(await response.json()).toEqual({ error: 'service-unavailable', reason: 'provider-rejected', providerStatus: 503, providerCategory })
  })
  it('distinguishes minute throttling and exposes only numeric retry headers and known error types', async () => {
    const { env, request } = setup()
    const upstream = vi.fn(async () => Response.json({ error: { message: 'Rate limit exceeded: free-models-per-minute. secret-key', metadata: { error_type: 'rate_limit_exceeded', raw: 'secret-key' } } }, {
      status: 429, headers: { 'Retry-After': '15', 'X-RateLimit-Limit': '20', 'X-RateLimit-Remaining': '0', 'X-RateLimit-Reset': '1793553000' },
    }))
    const response = await handleAssistant(request(), env, upstream)
    expect(await response.json()).toEqual({ error: 'service-unavailable', reason: 'provider-rejected', providerStatus: 429, providerCategory: 'minute-rate-limit', providerErrorType: 'rate_limit_exceeded', rateLimit: { retryAfter: 15, limit: 20, remaining: 0, reset: 1793553000 } })
  })
  it('omits unknown error types and nonnumeric diagnostic headers', async () => {
    const { env, request } = setup()
    const upstream = vi.fn(async () => Response.json({ error: { message: 'unknown', metadata: { error_type: 'secret-key' } } }, { status: 429, headers: { 'Retry-After': 'secret-key' } }))
    const response = await handleAssistant(request(), env, upstream)
    expect(await response.json()).toEqual({ error: 'service-unavailable', reason: 'provider-rejected', providerStatus: 429 })
  })
  it.each([
    [{ choices: [{ finish_reason: 'length', message: { content: '{' } }] }, 'truncated'],
    [{ choices: [{ message: { reasoning: 'private reasoning' } }] }, 'missing-content'],
    [{ choices: [{ message: { content: 'not JSON private response' } }] }, 'invalid-json'],
  ])('classifies unusable model output without revealing it', async (payload, outputIssue) => {
    const { env, request } = setup()
    const response = await handleAssistant(request(), env, async () => Response.json(payload))
    expect(await response.json()).toEqual({ error: 'service-unavailable', reason: 'output', outputIssue })
  })
  it('aborts an upstream call at its deadline', async () => {
    vi.useFakeTimers()
    try {
      const { env, request } = setup()
      let started!: () => void
      const ready = new Promise<void>(resolve => { started = resolve })
      const upstream = vi.fn((_url: string | URL | Request, init?: RequestInit) => new Promise<Response>((_resolve, reject) => { started(); init?.signal?.addEventListener('abort', () => reject(new Error('aborted'))) }))
      const result = handleAssistant(request(), env, upstream)
      await ready
      await vi.advanceTimersByTimeAsync(21000)
      expect((await result).status).toBe(502)
      expect(upstream).toHaveBeenCalledTimes(1)
    } finally { vi.useRealTimers() }
  })
})
