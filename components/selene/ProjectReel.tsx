'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { withBasePath } from '@/lib/site'
import { nearestProject } from '@/lib/selene/deck'
import { useReducedMotion } from './useReducedMotion'

export type ReelProject = {
  id: string; slug: string; title: string; description: string
  image: string | null; alt: string; tags: string[]; accent: string
}

export function ProjectReel({ projects }: { projects: readonly ReelProject[] }) {
  const trackRef = useRef<HTMLOListElement>(null)
  const cards = useRef<HTMLLIElement[]>([])
  const [active, setActive] = useState(0)
  const activeRef = useRef(0)
  const barRef = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const track = trackRef.current
    const bar = barRef.current
    if (!track || !bar) return
    let disposed = false
    const update = () => {
      // Refs can detach before passive cleanup; observers may also have queued work.
      if (disposed || trackRef.current !== track || barRef.current !== bar) return
      const bounds = track.getBoundingClientRect()
      const focus = bounds.left + track.clientWidth / 2
      const centers = cards.current.map(card => {
        const rect = card.getBoundingClientRect()
        return rect.left + rect.width / 2
      })
      const nearest = nearestProject(centers, focus)
      cards.current.forEach((card, index) => {
        const distance = Math.min(1, Math.abs(centers[index] - focus) / (track.clientWidth * 0.75))
        card.style.opacity = String(1 - distance * 0.5)
        card.dataset.focused = String(index === nearest)
      })
      if (activeRef.current !== nearest) { activeRef.current = nearest; setActive(nearest) }
      const travel = track.scrollWidth - track.clientWidth
      bar.style.transform = `scaleX(${travel > 0 ? track.scrollLeft / travel : 1})`
    }
    track.addEventListener('scroll', update, { passive: true })
    const observer = new ResizeObserver(update)
    observer.observe(track)
    update()
    return () => { disposed = true; track.removeEventListener('scroll', update); observer.disconnect() }
  }, [])

  const showProject = (index: number, keyboardFocus = false) => {
    const track = trackRef.current
    const card = cards.current[index]
    if (!track || !card) return
    const bounds = track.getBoundingClientRect()
    const rect = card.getBoundingClientRect()
    const left = track.scrollLeft + rect.left + rect.width / 2 - bounds.left - track.clientWidth / 2
    track.scrollTo({ left, behavior: reduced || keyboardFocus ? 'instant' : 'smooth' })
  }

  return (
    <section aria-labelledby="project-reel-title" className="project-reel" id="project-deck">
      <div className="project-reel-stage">
        <div className="project-reel-copy">
          <p className="reel-eyebrow">Selected transmissions / projects</p>
          <h2 id="project-reel-title">Ideas.<br /> Built into<br /> something real.</h2>
          <p>AI systems, search tools, and playable worlds. Swipe or scroll left and right to explore the work.</p>
          <div aria-hidden="true" className="reel-progress"><span><span>{String(active + 1).padStart(2, '0')}</span> / {String(projects.length).padStart(2, '0')}</span><span className="reel-progress-track"><span ref={barRef} /></span></div>
          <div className="reel-controls"><button aria-label="Previous project" disabled={active === 0} onClick={() => showProject(active - 1)} type="button">←</button><button aria-label="Next project" disabled={active >= projects.length - 1} onClick={() => showProject(active + 1)} type="button">→</button></div>
          <Link className="reel-all-projects" href="/projects"><span>View all projects</span><span aria-hidden="true">↗</span></Link>
        </div>
        <ol aria-label="Project cards, scroll left and right" className="project-reel-track" data-lenis-prevent ref={trackRef} tabIndex={0} onKeyDown={event => {
          if (event.target !== event.currentTarget) return
          if (event.key === 'ArrowRight') { event.preventDefault(); showProject(Math.min(projects.length - 1, active + 1)) }
          if (event.key === 'ArrowLeft') { event.preventDefault(); showProject(Math.max(0, active - 1)) }
        }}>
          {projects.map((project, index) => (
            <li className="project-reel-card" key={project.id} ref={element => { if (element) cards.current[index] = element }} style={{ '--reel-accent': project.accent } as CSSProperties}>
              <Link aria-label={`View ${project.title} case study`} className="reel-card-link" data-analytics-event="project_opened" href={`/projects/${project.slug}`} onFocus={event => { if (event.currentTarget.matches(':focus-visible')) showProject(index, true) }}>
                <div className="reel-card-media">
                  {project.image ? <Image alt={project.alt} fill loading="lazy" sizes="(max-width: 767px) 78vw, 420px" src={withBasePath(project.image)} /> : <div aria-hidden="true" className="reel-system-visual"><div className="reel-system-orbit" /><strong>DD</strong><span>Signal → Diagnose → Review</span></div>}
                  <span className="reel-media-label">{!project.image ? 'System concept' : project.image.endsWith('.svg') ? 'Concept illustration' : 'Gameplay capture'}</span>
                </div>
                <div className="reel-card-caption"><span className="reel-card-number">{String(index + 1).padStart(2, '0')}</span><div><p className="reel-card-tags">{project.tags.join(' / ')}</p><h3>{project.title}</h3><p className="reel-card-description">{project.description}</p><span className="reel-card-action">Open case study <span aria-hidden="true">↗</span></span></div></div>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
