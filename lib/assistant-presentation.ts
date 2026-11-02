// Client-side presentation only: does not generate text or call a model.
const PREPARE_MS = 550
export function createReplyDelay() {
  const startedAt = performance.now()
  return () => Math.max(0, PREPARE_MS - (performance.now() - startedAt))
}
function pause(ms: number, signal: AbortSignal): Promise<void> {
  signal.throwIfAborted()
  return new Promise((resolve, reject) => {
    const abort = () => { clearTimeout(timer); signal.removeEventListener('abort', abort); reject(new DOMException('Aborted', 'AbortError')) }
    const timer = setTimeout(() => { signal.removeEventListener('abort', abort); resolve() }, ms)
    signal.addEventListener('abort', abort, { once: true })
  })
}
export async function revealAssistantAnswer(text: string, update: (prefix: string) => void, signal: AbortSignal, options: { reducedMotion?: boolean; delayMs?: number } = {}) {
  signal.throwIfAborted()
  if (options.reducedMotion) { update(text); return }
  await pause(options.delayMs ?? PREPARE_MS, signal)
  const segments = typeof Intl.Segmenter === 'function'
    ? Array.from(new Intl.Segmenter(undefined, { granularity: 'word' }).segment(text), item => item.segment)
    : Array.from(text)
  let prefix = '', chunk = ''
  for (let i = 0; i < segments.length; i++) {
    chunk += segments[i]
    if (chunk.length < 24 && i < segments.length - 1) continue
    signal.throwIfAborted()
    prefix += chunk
    chunk = ''
    update(prefix)
    if (i < segments.length - 1) await pause(40, signal)
  }
  signal.throwIfAborted()
}
