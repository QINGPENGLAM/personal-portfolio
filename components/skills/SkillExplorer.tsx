'use client'

import Link from 'next/link'
import { useId, useRef, useState } from 'react'
import type { SkillEvidence } from '@/lib/skills'
import styles from './SkillExplorer.module.css'

export type SkillExplorerGroup = { label: string; items: { name: string; evidence: SkillEvidence[] }[] }
type EvidenceKind = 'all' | SkillEvidence['kind']
const filters: { value: EvidenceKind; label: string }[] = [
  { value: 'all', label: 'All' }, { value: 'project', label: 'Projects' },
  { value: 'repository', label: 'Repositories' }, { value: 'experience', label: 'Experience' },
]
const kindLabels = { project: 'Case study', repository: 'Public repository', experience: 'Experience' }

function EvidenceLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return href.startsWith('https://')
    ? <a title="Opens in a new tab" className={className} href={href} rel="noreferrer" target="_blank">{children}</a>
    : <Link className={className} href={href}>{children}</Link>
}

export function SkillExplorer({ groups, checkedAt }: { groups: SkillExplorerGroup[]; checkedAt: string }) {
  const id = useId()
  const [selectedSkill, setSelectedSkill] = useState('Python')
  const [hoverSkill, setHoverSkill] = useState<string | null>(null)
  const [focusSkill, setFocusSkill] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [kind, setKind] = useState<EvidenceKind>('all')
  const panelRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const previewSkill = hoverSkill ?? focusSkill
  const activeSkill = previewSkill ?? selectedSkill
  const items = groups.flatMap(group => group.items)
  const evidence = items.find(item => item.name === activeSkill)?.evidence ?? []
  const filtered = evidence.filter(item => kind === 'all' || item.kind === kind)
  const visibleGroups = groups.map(group => ({ ...group, items: group.items.filter(item => item.name.toLowerCase().includes(query.trim().toLowerCase())) })).filter(group => group.items.length)
  const countLabel = (count: number) => `${count} ${count === 1 ? 'connection' : 'connections'}`

  function pinSkill(name: string, fromKeyboard: boolean) {
    setSelectedSkill(name)
    setHoverSkill(null)
    setFocusSkill(null)
    setKind('all')
    if (fromKeyboard || window.matchMedia('(max-width: 900px)').matches) {
      requestAnimationFrame(() => {
        headingRef.current?.focus({ preventScroll: true })
        panelRef.current?.scrollIntoView({ block: 'start', behavior: 'instant' })
      })
    }
  }

  return (
    <>
      <section
        aria-label="Skill evidence explorer"
        className={`skill-explorer ${styles.explorer}`}
        onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocusSkill(null) }}
        onPointerLeave={() => setHoverSkill(null)}
        onKeyDown={event => { if (event.key === 'Escape') { setHoverSkill(null); setFocusSkill(null) } }}
      >
        <div className="skill-constellation">
          <div className="skill-constellation-heading">
            <p className="eyebrow">Skills in practice</p>
            <h2>Follow a skill into the work.</h2>
            <p>Hover or focus to explore. Click, tap or press Enter to pin a skill.</p>
          </div>
          <div className={styles.search}>
            <label htmlFor={`${id}-search`}>Find a skill</label>
            <div>
              <input autoComplete="off" id={`${id}-search`} onChange={event => setQuery(event.target.value)} placeholder="Try C++, React or Unity" ref={searchRef} type="search" value={query} />
              {query && <button aria-label="Clear search" onClick={() => { setQuery(''); searchRef.current?.focus() }} type="button">Clear</button>}
            </div>
          </div>
          <p className={styles.legend}>Numbers show published connections, not proficiency.</p>
          {!visibleGroups.length && <p role="status">No skills match “{query}”.</p>}
          {visibleGroups.map(group => (
            <section aria-labelledby={`${id}-${group.label.replace(/\W+/g, '-').toLowerCase()}`} className="skill-cluster" key={group.label}>
              <h3 id={`${id}-${group.label.replace(/\W+/g, '-').toLowerCase()}`}>{group.label}</h3>
              <div>
                {group.items.map(skill => (
                  <button
                    aria-controls={`${id}-evidence`}
                    aria-label={`${skill.name}, ${countLabel(skill.evidence.length)}`}
                    aria-pressed={selectedSkill === skill.name}
                    className={`${styles.chip}${activeSkill === skill.name ? ' is-active' : ''}`}
                    key={skill.name}
                    onClick={event => pinSkill(skill.name, event.detail === 0)}
                    onFocus={event => { if (event.currentTarget.matches(':focus-visible')) { setHoverSkill(null); setFocusSkill(skill.name) } }}
                    onPointerEnter={event => { if (event.pointerType !== 'touch') setHoverSkill(skill.name) }}
                    type="button"
                  >
                    {skill.name}<span aria-hidden="true" className={styles.count}>{skill.evidence.length}</span>
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>

        <aside aria-label="Skill connections" className={`skill-evidence-panel ${styles.panel}`} id={`${id}-evidence`} ref={panelRef}>
          <div className={styles.panelHeader}>
            <p className="eyebrow">{previewSkill && previewSkill !== selectedSkill ? 'Previewing' : 'Pinned skill'}</p>
            <button className={styles.back} onClick={() => { searchRef.current?.focus(); searchRef.current?.scrollIntoView({ block: 'center' }) }} type="button">Back to skills</button>
          </div>
          <h2 ref={headingRef} tabIndex={-1}>{activeSkill}</h2>
          <p aria-atomic="true" className={styles.status} role="status">{countLabel(evidence.length)}{previewSkill && previewSkill !== selectedSkill ? ` · ${selectedSkill} is pinned` : ' · selected'}</p>
          <div aria-label="Filter connections" className={styles.filters}>
            {filters.map(filter => {
              const count = filter.value === 'all' ? evidence.length : evidence.filter(item => item.kind === filter.value).length
              return <button aria-pressed={kind === filter.value} key={filter.value} onClick={() => setKind(filter.value)} type="button">{filter.label}<span aria-hidden="true">{count}</span></button>
            })}
          </div>
          {!evidence.length ? (
            <p className={styles.empty}>This skill is listed in the portfolio. A detailed project or role connection has not been published yet.</p>
          ) : !filtered.length ? (
            <p className={styles.empty}>No {kind} connections for {activeSkill} yet.</p>
          ) : (
            <ul className={styles.cards}>
              {filtered.map(item => (
                <li className={styles.card} key={`${item.kind}-${item.id}`}>
                  <p className={styles.kind}>{kindLabels[item.kind]}</p>
                  <h3><EvidenceLink href={item.href}>{item.title}</EvidenceLink></h3>
                  <p className={styles.summary}>{item.summary}</p>
                  <p className={styles.reason}>{item.reason}</p>
                  <div className={styles.cardLinks}>
                    <EvidenceLink href={item.sourceUrl}>{item.sourceLabel} <span aria-hidden="true">↗</span></EvidenceLink>
                    {item.codeUrl && item.kind === 'project' && <EvidenceLink href={item.codeUrl}>View code <span aria-hidden="true">↗</span></EvidenceLink>}
                    {item.checkedAt && <time dateTime={item.checkedAt}>Checked {item.checkedAt}</time>}
                  </div>
                </li>
              ))}
            </ul>
          )}
          <p className={styles.snapshot}>GitHub languages checked {checkedAt}. Framework links cite manifests or source. Repository totals may include third-party code.</p>
        </aside>
      </section>
      <details className="plain-skill-list glass-card">
        <summary>View plain accessible skills list</summary>
        <div>{groups.map(group => <section key={group.label}><h3>{group.label}</h3><p>{group.items.map(skill => skill.name).join(' · ')}</p></section>)}</div>
      </details>
    </>
  )
}
