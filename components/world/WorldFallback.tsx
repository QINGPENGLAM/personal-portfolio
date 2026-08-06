import Link from 'next/link'
import type { CSSProperties } from 'react'
import { projects } from '@/data/projects'
import { worldLandmarks } from '@/data/world'

export function WorldFallback({ reason }: { reason: string }) {
  return (
    <section className="world-fallback" aria-labelledby="world-fallback-title">
      <div>
        <p className="eyebrow">Accessible world map</p>
        <h2 id="world-fallback-title">The portfolio is still fully available.</h2>
        <p>{reason} Choose a landmark below or return to the complete Recruiter View.</p>
      </div>
      <div className="fallback-landmark-grid">
        {worldLandmarks.map((landmark) => (
          <Link href={landmark.href} key={landmark.id} style={{ '--landmark-accent': landmark.accent } as CSSProperties}>
            <span aria-hidden="true" />
            <strong>{landmark.label}</strong>
            <small>{landmark.detail}</small>
          </Link>
        ))}
      </div>
      <nav aria-label="Featured project case studies" className="fallback-project-links">
        <span>Featured project case studies</span>
        {projects.map((project) => <Link href={`/projects/${project.slug}`} key={project.slug}>{project.title} <span aria-hidden="true">→</span></Link>)}
      </nav>
      <Link className="button button-primary" href="/#quick-view">Open Recruiter View</Link>
    </section>
  )
}
