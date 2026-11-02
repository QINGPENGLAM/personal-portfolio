import type { AssistantAnswer } from './assistant'
import { responseSchema, type AssistantRequest } from './assistant-protocol'
export type GuideResult = AssistantAnswer & { mode: 'ai' | 'insufficient' | 'local' | 'fallback'; notice?: string }
export function assistantEndpoint(value: string | undefined): string | undefined {
  if (!value) return undefined
  try {
    const url = new URL(value)
    if (url.username || url.password || url.search || url.hash) return undefined
    if (url.protocol === 'https:' || (process.env.NODE_ENV !== 'production' && url.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(url.hostname))) return url.href
  } catch { /* invalid configuration uses local guide */ }
  return undefined
}
async function readResponse(response: Response): Promise<unknown> {
  const reader = response.body?.getReader()
  if (!reader) throw new Error('empty')
  let length = 0, text = ''
  const decoder = new TextDecoder()
  try {
    for (;;) {
      const { done, value } = await reader.read()
      if (done) break
      length += value.byteLength
      if (length > 16000) throw new Error('size')
      text += decoder.decode(value, { stream: true })
    }
    text += decoder.decode()
  } finally { await reader.cancel().catch(() => {}); reader.releaseLock() }
  return JSON.parse(text)
}
function failureNotice(status: number, body: unknown): string {
  const error = body && typeof body === 'object' ? body as Record<string, unknown> : {}
  if (status === 429 && error.error === 'quota') {
    if (error.scope === 'day') return 'Local guide · Site AI daily limit reached (10 attempts). It resets at 00:00 UTC.'
    if (error.scope === 'minute') return 'Local guide · Too many questions this minute. Please wait a minute.'
    return 'Local guide · Site AI request limit reached. Please try later.'
  }
  if (error.providerStatus === 429) return 'Local guide · Free AI provider is rate-limiting requests. Please try later.'
  if (error.reason === 'timeout') return 'Local guide · AI timed out. Please try later.'
  if (error.reason === 'output') return 'Local guide · AI returned an unusable answer. Showing published portfolio facts.'
  if (error.error === 'unconfigured') return 'Local guide · AI service is not configured.'
  return 'Local guide · Free AI service is temporarily unavailable.'
}
export async function askAssistant(question: string, history: AssistantRequest['history'], configuredEndpoint?: string, signal?: AbortSignal, fetcher: typeof fetch = fetch): Promise<GuideResult> {
  signal?.throwIfAborted()
  const endpoint = assistantEndpoint(configuredEndpoint)
  let notice = endpoint ? 'Local guide · AI could not be reached. Please try later.' : 'Local guide · AI endpoint is not configured correctly.'
  if (endpoint) {
    const controller = new AbortController()
    const abort = () => controller.abort()
    signal?.addEventListener('abort', abort, { once: true })
    const timer = setTimeout(abort, 24000)
    try {
      const response = await fetcher(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'omit', signal: controller.signal,
        body: JSON.stringify({ question: question.trim().slice(0, 240), history: history.slice(-4).map(h => ({ role: h.role, content: h.content.slice(0, 480) })) }),
      })
      if (!response.ok) {
        let error: unknown
        try { error = await readResponse(response) } catch { /* Never render raw service errors. */ }
        notice = failureNotice(response.status, error)
        throw new Error('service')
      }
      const answer = responseSchema.parse(await readResponse(response))
      signal?.throwIfAborted()
      return answer
    } catch {
      signal?.throwIfAborted()
      if (controller.signal.aborted) notice = 'Local guide · AI timed out. Please try later.'
    } finally { clearTimeout(timer); signal?.removeEventListener('abort', abort) }
  }
  signal?.throwIfAborted()
  const local = (await import('./assistant')).answerPortfolioQuestion(question)
  signal?.throwIfAborted()
  return { ...local, mode: configuredEndpoint ? 'fallback' : 'local', ...(configuredEndpoint ? { notice } : {}) }
}
