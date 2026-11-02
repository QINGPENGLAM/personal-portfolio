import { afterEach, expect, it, vi } from 'vitest'
import { createReplyDelay, revealAssistantAnswer } from '@/lib/assistant-presentation'

afterEach(() => vi.useRealTimers())
const answer = 'A sourced answer with several complete words. 中文回答也应该保留完整文本和表情 👩🏽‍💻。'
it('waits briefly and reveals prefixes in multiple chunks without changing text', async () => {
  vi.useFakeTimers()
  const updates: string[] = []
  const result = revealAssistantAnswer(answer, text => updates.push(text), new AbortController().signal)
  await vi.advanceTimersByTimeAsync(300)
  expect(updates).toEqual([])
  await vi.advanceTimersByTimeAsync(300)
  expect(updates.length).toBeGreaterThan(0)
  expect(updates[0].length).toBeLessThan(answer.length)
  await vi.runAllTimersAsync()
  await result
  expect(updates.length).toBeGreaterThan(1)
  expect(updates.at(-1)).toBe(answer)
  expect(updates.every(text => answer.startsWith(text))).toBe(true)
})
it('cancels before or during reveal and never schedules later text', async () => {
  vi.useFakeTimers()
  for (const elapsed of [100, 600]) {
    const updates: string[] = [], controller = new AbortController()
    const result = revealAssistantAnswer(answer.repeat(4), text => updates.push(text), controller.signal).catch(error => error)
    await vi.advanceTimersByTimeAsync(elapsed)
    controller.abort()
    expect((await result).name).toBe('AbortError')
    const count = updates.length
    await vi.advanceTimersByTimeAsync(10000)
    expect(updates).toHaveLength(count)
  }
})
it('shows the full answer immediately for reduced motion', async () => {
  vi.useFakeTimers()
  const update = vi.fn()
  await revealAssistantAnswer(answer, update, new AbortController().signal, { reducedMotion: true })
  expect(update.mock.calls).toEqual([[answer]])
  expect(vi.getTimerCount()).toBe(0)
})

it('counts real response wait toward preparation rather than adding another delay', async () => {
  vi.useFakeTimers()
  const delay = createReplyDelay()
  expect(delay()).toBe(550)
  await vi.advanceTimersByTimeAsync(1000)
  expect(delay()).toBe(0)
})
