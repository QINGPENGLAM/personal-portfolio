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
export async function askAssistant(question: string, history: AssistantRequest['history'], configuredEndpoint?: string, signal?: AbortSignal, fetcher: typeof fetch = fetch): Promise<GuideResult> {
  signal?.throwIfAborted()
  const endpoint = assistantEndpoint(configuredEndpoint)
  if (endpoint) {
    const controller = new AbortController()
    const abort = () => controller.abort()
    signal?.addEventListener('abort', abort, { once: true })
    const timer = setTimeout(abort, 24000)
    try {
      const response = await fetcher(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'omit', signal: controller.signal,
        body: JSON.stringify({ question: question.trim().slice(0, 240), history: history.slice(-4).map(h => ({ role: h.role, content: h.content.slice(0, 480) })) }),
      })
      if (!response.ok) { await response.body?.cancel(); throw new Error('service') }
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
      signal?.throwIfAborted()
      return responseSchema.parse(JSON.parse(text))
    } catch { signal?.throwIfAborted() }
    finally { clearTimeout(timer); signal?.removeEventListener('abort', abort) }
  }
  signal?.throwIfAborted()
  const local = (await import('./assistant')).answerPortfolioQuestion(question)
  signal?.throwIfAborted()
  return { ...local, mode: configuredEndpoint ? 'fallback' : 'local', ...(configuredEndpoint ? { notice: 'Local guide · AI unavailable or limit reached.' } : {}) }
}
