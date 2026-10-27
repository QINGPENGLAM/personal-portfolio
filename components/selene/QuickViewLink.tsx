'use client'

import type { ReactNode } from 'react'
import { withBasePath } from '@/lib/site'
import { scrollToHash } from '@/lib/selene/scroll'

export function QuickViewLink({ className, children }: { className?: string; children: ReactNode }) {
  return <a className={className} data-analytics-event="recruiter_view_opened" href={withBasePath('/#quick-view')} onClick={event => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    scrollToHash('#quick-view', { immediate: window.matchMedia('(prefers-reduced-motion: reduce)').matches, offset: 96 })
  }}>{children}</a>
}
