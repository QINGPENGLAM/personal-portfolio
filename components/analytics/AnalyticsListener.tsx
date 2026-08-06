'use client'

import { useEffect } from 'react'
import { trackPortfolioEvent, type PortfolioEvent } from '@/lib/analytics'

const supportedEvents = new Set<PortfolioEvent>(['world_entered', 'recruiter_view_opened', 'project_opened', 'resume_downloaded', 'contact_submitted', 'chatbot_opened'])

export function AnalyticsListener() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return
      const element = event.target.closest<HTMLElement>('[data-analytics-event]')
      const eventName = element?.dataset.analyticsEvent as PortfolioEvent | undefined
      if (eventName && supportedEvents.has(eventName)) trackPortfolioEvent(eventName)
    }

    document.addEventListener('click', handleClick, { capture: true })
    return () => document.removeEventListener('click', handleClick, { capture: true })
  }, [])

  return null
}
