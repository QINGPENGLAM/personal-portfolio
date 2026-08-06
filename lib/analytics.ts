export type PortfolioEvent = 'world_entered' | 'guided_tour_started' | 'recruiter_view_opened' | 'project_opened' | 'resume_downloaded' | 'contact_submitted' | 'chatbot_opened'

type EventPayload = {
  event: PortfolioEvent
  path: string
  timestamp: string
}

export function trackPortfolioEvent(event: PortfolioEvent) {
  if (typeof window === 'undefined') return

  const payload: EventPayload = { event, path: window.location.pathname, timestamp: new Date().toISOString() }
  const endpoint = process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT

  if (endpoint) {
    const body = JSON.stringify(payload)
    if (!navigator.sendBeacon?.(endpoint, new Blob([body], { type: 'application/json' }))) {
      void fetch(endpoint, { method: 'POST', body, headers: { 'Content-Type': 'application/json' }, keepalive: true }).catch(() => undefined)
    }
    return
  }

  try {
    const key = 'qingpeng-portfolio-session-events'
    const counts = JSON.parse(window.sessionStorage.getItem(key) ?? '{}') as Partial<Record<PortfolioEvent, number>>
    counts[event] = (counts[event] ?? 0) + 1
    window.sessionStorage.setItem(key, JSON.stringify(counts))
  } catch {
    // Analytics must never interrupt the portfolio.
  }
}
