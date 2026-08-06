'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') console.error('Portfolio route error', error)
  }, [error])

  return <main className="not-found"><p className="eyebrow">System interruption</p><h1>This section could not finish loading.</h1><p>The rest of the portfolio is still available. Retry this section or return to the recruiter view.</p><div><button className="button button-primary" onClick={reset} type="button">Retry section</button><Link className="button button-secondary" href="/#quick-view">Recruiter View</Link></div></main>
}
