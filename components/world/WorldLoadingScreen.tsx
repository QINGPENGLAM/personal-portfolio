'use client'

import Link from 'next/link'

export function WorldLoadingScreen({ progress, status, onUseFallback }: { progress: number; status: string; onUseFallback: () => void }) {
  return (
    <div className="world-loading world-loading-sequence" role="status">
      <div className="world-loader-portal" aria-hidden="true"><span /><span /><strong>QL</strong></div>
      <p className="eyebrow">Initializing world</p>
      <h2>{status}</h2>
      <div aria-label={`${progress}% complete`} aria-valuemax={100} aria-valuemin={0} aria-valuenow={progress} className="world-loader-progress" role="progressbar"><span style={{ width: `${progress}%` }} /></div>
      <small>{progress}% · progress follows actual initialization milestones</small>
      <div className="world-loader-actions"><button onClick={onUseFallback} type="button">Use lightweight map</button><Link href="/#quick-view">Skip to Recruiter View</Link></div>
    </div>
  )
}
