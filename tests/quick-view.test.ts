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
