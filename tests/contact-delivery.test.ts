import { afterEach, expect, it, vi } from 'vitest'
import { sendContactMessage } from '@/lib/contact-delivery'

const submission = { name: 'Test Visitor', email: 'visitor@example.com', company: 'Example', message: 'A test of the portfolio contact form.', website: '', startedAt: 1000 }
afterEach(() => vi.unstubAllGlobals())

it('sends only message fields and the public form key to Web3Forms', async () => {
  const fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: true }) })
  vi.stubGlobal('fetch', fetch)
  const signal = new AbortController().signal
  await sendContactMessage(submission, signal)
  expect(fetch).toHaveBeenCalledOnce()
  const [url, options] = fetch.mock.calls[0]
  expect(url).toBe('https://api.web3forms.com/submit')
  expect(options.signal).toBe(signal)
  expect(JSON.parse(options.body)).toEqual({
    access_key: '7f865341-9fd8-455e-8210-41dec02358d9',
    subject: 'Portfolio message from Test Visitor',
    name: submission.name, email: submission.email, company: submission.company, message: submission.message, botcheck: false,
  })
})

it('treats provider rejection as failure even when HTTP status is successful', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: false, message: 'Invalid access key' }) }))
  await expect(sendContactMessage(submission, new AbortController().signal)).rejects.toThrow('Invalid access key')
})

it('rejects unreadable provider responses instead of claiming delivery', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => { throw new Error('Invalid JSON') } }))
  await expect(sendContactMessage(submission, new AbortController().signal)).rejects.toThrow('The message could not be sent.')
})

it('preserves an explicitly configured custom Worker endpoint', async () => {
  const fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ message: 'Message sent.' }) })
  vi.stubGlobal('fetch', fetch)
  await sendContactMessage(submission, new AbortController().signal, 'https://contact.example')
  expect(fetch.mock.calls[0][0]).toBe('https://contact.example')
  expect(JSON.parse(fetch.mock.calls[0][1].body)).toEqual(submission)
})
