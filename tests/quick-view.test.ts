import { afterEach, expect, it, vi } from 'vitest'
import { scrollToHash } from '@/lib/selene/scroll'

afterEach(() => vi.unstubAllGlobals())

it('jumps directly to quick view with header clearance and keyboard focus', () => {
  const scrollTo = vi.fn()
  const focus = vi.fn()
  const pushState = vi.fn()
  const target = { getBoundingClientRect: () => ({ top: 4200 }), focus, scrollIntoView: vi.fn() }
  vi.stubGlobal('window', { scrollY: 80, scrollTo })
  vi.stubGlobal('document', { querySelector: () => target })
  vi.stubGlobal('history', { pushState, replaceState: vi.fn() })
  scrollToHash('#quick-view', { immediate: true, offset: 96 })
  expect(scrollTo).toHaveBeenCalledWith({ top: 4184, behavior: 'instant' })
  expect(pushState).toHaveBeenCalledWith(null, '', '#quick-view')
  expect(focus).toHaveBeenCalledWith({ preventScroll: true })
})

it('smoothly scrolls within the same document and keeps the destination keyboard-accessible', () => {
  const scrollTo = vi.fn()
  const focus = vi.fn()
  const pushState = vi.fn()
  vi.stubGlobal('window', { scrollY: 0, scrollTo })
  vi.stubGlobal('document', { querySelector: () => ({ getBoundingClientRect: () => ({ top: 4200 }), focus }) })
  vi.stubGlobal('history', { pushState })
  scrollToHash('#quick-view', { offset: 96 })
  expect(scrollTo).toHaveBeenCalledWith({ top: 4104, behavior: 'smooth' })
  expect(pushState).toHaveBeenCalledWith(null, '', '#quick-view')
  expect(focus).toHaveBeenCalledWith({ preventScroll: true })
})
