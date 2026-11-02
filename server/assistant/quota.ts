// Structural Cloudflare types keep the static app independent of Worker packages.
export interface QuotaStorage {
  get<T>(key: string): Promise<T | undefined>
  put(key: string, value: unknown): Promise<void>
  transaction<T>(fn: (tx: QuotaStorage) => Promise<T>): Promise<T>
  setAlarm?(time: number): Promise<void>
  delete(key: string): Promise<boolean>
}
type Counts = { day: string; total: number; buckets: Record<string, { minute: number; count: number }> }
export class AssistantQuota {
  constructor(private ctx: { storage: QuotaStorage }) {}
  async fetch(request: Request): Promise<Response> {
    const { hash } = await request.json() as { hash: string }
    if (!/^[a-f0-9]{64}$/.test(hash)) return new Response(null, { status: 400 })
    const result = await this.ctx.storage.transaction(async tx => {
      const now = Date.now() // Reservation time belongs to this atomic authority, never its caller.
      const day = new Date(now).toISOString().slice(0, 10), minute = Math.floor(now / 60000)
      const saved = await tx.get<Counts>('counts')
      if (saved && saved.day > day) return { scope: 'clock', retryAfterSeconds: 60 } // Fail closed if the wall clock regresses.
      const counts: Counts = saved?.day === day ? saved : { day, total: 0, buckets: {} }
      const bucket = counts.buckets[hash]
      if (counts.total >= 10) return { scope: 'day', retryAfterSeconds: Math.ceil((Date.parse(`${day}T00:00:00Z`) + 86400000 - now) / 1000) }
      if (bucket && bucket.minute >= minute && bucket.count >= 3) return { scope: 'minute', retryAfterSeconds: Math.ceil(((bucket.minute + 1) * 60000 - now) / 1000) }
      counts.total++
      counts.buckets[hash] = { minute: Math.max(minute, bucket?.minute ?? minute), count: bucket && bucket.minute >= minute ? bucket.count + 1 : 1 }
      await tx.put('counts', counts)
      // Bound retention even if no requests arrive tomorrow.
      await tx.setAlarm?.(Date.parse(`${day}T00:00:00Z`) + 86400000)
      return null
    })
    return result ? Response.json(result, { status: result.scope === 'clock' ? 503 : 429, headers: { 'Retry-After': String(result.retryAfterSeconds) } }) : new Response(null, { status: 204 })
  }
  async alarm() {
    await this.ctx.storage.transaction(async tx => {
      const counts = await tx.get<Counts>('counts')
      const today = new Date().toISOString().slice(0, 10)
      if (counts && counts.day < today) await tx.delete('counts')
      else if (counts) await tx.setAlarm?.(Date.parse(`${today}T00:00:00Z`) + 86400000)
    })
  }
}
