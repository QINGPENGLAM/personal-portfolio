import Link from 'next/link'
import { WorldExperience } from '@/components/world/WorldExperience'
import { createPageMetadata } from '@/lib/site'

export const metadata = createPageMetadata('Interactive Portfolio World', 'Explore QingPeng Lam’s projects, experience, skills, education, résumé, and contact routes through an accessible 3D portfolio world.', '/world')

export default function WorldPage() {
  return (
    <main className="world-page">
      <div className="world-page-copy">
        <p className="eyebrow">Production portfolio world</p>
        <h1>Walk the connected world.</h1>
        <div><p>Follow the adaptive data signals, open project case studies, and preview professional dossiers without unloading the scene. Sound remains optional and muted by default.</p><Link className="world-tour-entry" href="/world?tour=identity">Start the guided story <span aria-hidden="true">→</span></Link></div>
      </div>
      <WorldExperience />
      <div className="world-controls">
        <span><kbd>WASD</kbd> move</span>
        <span><kbd>Drag</kbd> look around</span>
        <span><kbd>Tab</kbd> focus interface controls</span>
        <Link href="/#quick-view">Exit to Recruiter View</Link>
      </div>
    </main>
  )
}
