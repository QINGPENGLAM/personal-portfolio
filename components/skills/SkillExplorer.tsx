'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { skillGroups } from '@/data/skills'
import { getSkillEvidence } from '@/lib/skills'

export function SkillExplorer() {
  const [selectedSkill, setSelectedSkill] = useState('Python')
  const [previewSkill, setPreviewSkill] = useState<string | null>(null)
  const activeSkill = previewSkill ?? selectedSkill
  const evidence = useMemo(() => getSkillEvidence(activeSkill), [activeSkill])

  return (
    <>
      <div className="skill-explorer">
        <div className="skill-constellation" onPointerLeave={() => setPreviewSkill(null)}>
          <div className="skill-constellation-heading">
            <p className="eyebrow">Evidence map</p>
            <h2>Select a skill to trace where it appears.</h2>
            <p>Hover previews a connection. Click pins it.</p>
          </div>
          {skillGroups.map((group) => (
            <section aria-labelledby={`skill-group-${group.label.replace(/\W+/g, '-').toLowerCase()}`} className="skill-cluster" key={group.label}>
              <h3 id={`skill-group-${group.label.replace(/\W+/g, '-').toLowerCase()}`}>{group.label}</h3>
              <div>
                {group.items.map((skill) => (
                  <button
                    aria-pressed={selectedSkill === skill}
                    className={activeSkill === skill ? 'is-active' : undefined}
                    key={skill}
                    onClick={() => setSelectedSkill(skill)}
                    onFocus={() => setPreviewSkill(skill)}
                    onBlur={() => setPreviewSkill(null)}
                    onPointerEnter={() => setPreviewSkill(skill)}
                    type="button"
                  >{skill}</button>
                ))}
              </div>
            </section>
          ))}
        </div>

        <aside className="skill-evidence-panel" aria-live="polite">
          <p className="eyebrow">Selected skill</p>
          <h2>{activeSkill}</h2>
          <p>{evidence.length ? `${evidence.length} detailed portfolio ${evidence.length === 1 ? 'connection' : 'connections'}.` : 'Listed on the résumé; no detailed portfolio evidence is published yet.'}</p>
          <div className="skill-evidence-list">
            {evidence.map((item) => (
              <Link href={item.href} key={`${item.kind}-${item.id}`}>
                <span>{item.kind}</span>
                <strong>{item.title}</strong>
                <small>{item.summary}</small>
              </Link>
            ))}
          </div>
        </aside>
      </div>

      <details className="plain-skill-list glass-card">
        <summary>View plain accessible skills list</summary>
        <div>{skillGroups.map((group) => <section key={group.label}><h3>{group.label}</h3><p>{group.items.join(' · ')}</p></section>)}</div>
      </details>
    </>
  )
}
