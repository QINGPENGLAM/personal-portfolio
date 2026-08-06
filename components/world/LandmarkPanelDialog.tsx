'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { education } from '@/data/education'
import { experiences } from '@/data/experience'
import { profile } from '@/data/profile'
import { skillGroups } from '@/data/skills'
import { getWorldLandmark, type WorldPanelKind } from '@/data/world'

const focusableSelector = 'a[href], button:not([disabled]), summary, [tabindex]:not([tabindex="-1"])'

function ExperiencePanel() {
  return <div className="landmark-panel-list">{experiences.map((experience) => <article key={experience.id}><span>{experience.startDate} — {experience.endDate}</span><h3>{experience.role}</h3><strong>{experience.company} · {experience.location}</strong><p>{experience.summary}</p><Link href={`/experience#${experience.id}`}>Open role detail <span aria-hidden="true">→</span></Link></article>)}</div>
}

function AboutPanel() {
  return <div className="landmark-panel-about"><p>{profile.introduction}</p><div><article><span>Build</span><strong>AI-assisted tools, search, data systems, and interactive products.</strong></article><article><span>Work</span><strong>Prototype, validate difficult edges, then strengthen the system.</strong></article><article><span>Explore</span><strong>Reliable AI features with clear product thinking.</strong></article></div></div>
}

function SkillsPanel() {
  return <div className="landmark-panel-skills">{skillGroups.map((group) => <section key={group.label}><h3>{group.label}</h3><p>{group.items.join(' · ')}</p></section>)}</div>
}

function EducationPanel() {
  return <div className="landmark-panel-education"><span>{education.startDate} — {education.endDate}</span><h3>{education.degree}</h3><strong>{education.institution} · {education.location}</strong><dl><div><dt>Minor</dt><dd>{education.minor}</dd></div><div><dt>GPA</dt><dd>{education.gpa}</dd></div></dl></div>
}

const panelContent = {
  experience: <ExperiencePanel />,
  about: <AboutPanel />,
  skills: <SkillsPanel />,
  education: <EducationPanel />,
} satisfies Record<WorldPanelKind, React.ReactNode>

export function LandmarkPanelDialog({ panelId, onRequestClose }: { panelId: WorldPanelKind; onRequestClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const landmark = getWorldLandmark(panelId)

  useEffect(() => {
    const previousActiveElement = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const dialog = dialogRef.current
    dialog?.querySelector<HTMLElement>(focusableSelector)?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !dialog) return
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector))
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) { last.focus(); event.preventDefault() }
      else if (!event.shiftKey && document.activeElement === last) { first.focus(); event.preventDefault() }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => { document.removeEventListener('keydown', handleKeyDown); previousActiveElement?.focus() }
  }, [])

  if (!landmark) return null

  return (
    <div className="landmark-panel-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onRequestClose() }}>
      <div aria-labelledby="landmark-panel-title" aria-modal="true" className="landmark-panel-dialog" ref={dialogRef} role="dialog" style={{ '--landmark-accent': landmark.accent } as React.CSSProperties}>
        <div className="landmark-panel-bar"><span>World dossier · {landmark.label}</span><button aria-label={`Close ${landmark.label} dossier`} onClick={onRequestClose} type="button">Close <kbd>Esc</kbd></button></div>
        <div className="landmark-panel-content">
          <header><p className="eyebrow">{landmark.label}</p><h2 id="landmark-panel-title">{landmark.detail}</h2><p>Concise portfolio evidence, available here without leaving the world.</p></header>
          {panelContent[panelId]}
          <div className="landmark-panel-actions"><Link className="button button-primary" href={landmark.href}>Open full section</Link><button className="button button-secondary" onClick={onRequestClose} type="button">Return to world</button></div>
        </div>
      </div>
    </div>
  )
}
