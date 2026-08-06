import { validateContactSubmission } from '../lib/contact'

export interface RateLimitStore {
  get(key: string): Promise<string | null>
  put(key: string, value: string, options: { expirationTtl: number }): Promise<void>
}

export type ContactWorkerEnv = {
  CONTACT_ALLOWED_ORIGIN: string
  CONTACT_FROM_EMAIL: string
  CONTACT_TO_EMAIL: string
  EMAIL_API_KEY: string
  EMAIL_API_URL?: string
  RATE_LIMIT: RateLimitStore
  RATE_LIMIT_SALT: string
}

type SendRequest = typeof fetch

function responseHeaders(origin: string) {
  return {
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Origin': origin,
    'Cache-Control': 'no-store',
    'Content-Type': 'application/json; charset=utf-8',
    'Referrer-Policy': 'no-referrer',
    Vary: 'Origin',
    'X-Content-Type-Options': 'nosniff',
  }
}

function jsonResponse(body: unknown, status: number, origin: string) {
  return new Response(JSON.stringify(body), { status, headers: responseHeaders(origin) })
}

async function hashAddress(address: string, salt: string) {
  const bytes = new TextEncoder().encode(`${salt}:${address}`)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('')
}

async function checkRateLimit(request: Request, env: ContactWorkerEnv) {
  const address = request.headers.get('CF-Connecting-IP') ?? request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() ?? 'unknown'
  const key = `contact:${await hashAddress(address, env.RATE_LIMIT_SALT)}`
  const current = Number(await env.RATE_LIMIT.get(key) ?? '0')
  if (current >= 5) return false
  await env.RATE_LIMIT.put(key, String(current + 1), { expirationTtl: 600 })
  return true
}

export async function handleContactRequest(request: Request, env: ContactWorkerEnv, send: SendRequest = fetch) {
  const origin = request.headers.get('Origin') ?? ''
  if (origin !== env.CONTACT_ALLOWED_ORIGIN) return jsonResponse({ message: 'Origin not allowed.' }, 403, env.CONTACT_ALLOWED_ORIGIN)
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: responseHeaders(origin) })
  if (request.method !== 'POST') return jsonResponse({ message: 'Method not allowed.' }, 405, origin)

  const contentType = request.headers.get('Content-Type') ?? ''
  if (!contentType.toLowerCase().startsWith('application/json')) return jsonResponse({ message: 'Expected a JSON request.' }, 415, origin)
  const contentLength = Number(request.headers.get('Content-Length') ?? '0')
  if (Number.isFinite(contentLength) && contentLength > 12_000) return jsonResponse({ message: 'Request body is too large.' }, 413, origin)
  if (!(await checkRateLimit(request, env))) return jsonResponse({ message: 'Too many messages. Please try again later or use email.' }, 429, origin)

  let body: unknown
  try {
    const rawBody = await request.text()
    if (rawBody.length > 12_000) return jsonResponse({ message: 'Request body is too large.' }, 413, origin)
    body = JSON.parse(rawBody) as unknown
  } catch {
    return jsonResponse({ message: 'Invalid request body.' }, 400, origin)
  }

  const validation = validateContactSubmission(body)
  if (!validation.success) return jsonResponse({ message: 'Please review the form fields.', fieldErrors: validation.fieldErrors }, 400, origin)

  const { company, email, message, name } = validation.data
  const safeName = name.replace(/[\r\n]+/g, ' ')
  const providerResponse = await send(env.EMAIL_API_URL ?? 'https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.EMAIL_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.CONTACT_FROM_EMAIL,
      to: [env.CONTACT_TO_EMAIL],
      reply_to: email,
      subject: `Portfolio message from ${safeName}`,
      text: [`Name: ${name}`, `Email: ${email}`, `Company: ${company || 'Not provided'}`, '', message].join('\n'),
    }),
  })

  if (!providerResponse.ok) return jsonResponse({ message: 'Message delivery is temporarily unavailable. Please use email instead.' }, 502, origin)
  return jsonResponse({ message: 'Message sent.' }, 200, origin)
}

const contactWorker = { fetch: handleContactRequest }

export default contactWorker
