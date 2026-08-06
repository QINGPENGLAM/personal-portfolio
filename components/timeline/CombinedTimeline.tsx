'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { filterTimeline, timelineTypes, type TimelineFilter } from '@/data/timeline'

const filterLabels: Record<TimelineFilter, string> = {
  all: 'All milestones',
  experience: 'Experience',
  project: 'Projects',
  education: 'Education',
}

export function CombinedTimeline() {
  const [filter, setFilter] = useState<TimelineFilter>('all')
  const visibleItems = useMemo(() => filterTimeline(filter), [filter])

  return (
    <section className="combined-timeline" aria-labelledby="combined-timeline-heading">
      <div className="timeline-heading">
        <div>
          <p className="eyebrow">Connected history</p>
          <h2 id="combined-timeline-heading">Work, education, and projects on one track.</h2>
        </div>
        <div aria-label="Filter timeline" className="timeline-filters" role="group">
          {timelineTypes.map((type) => (
            <button aria-pressed={filter === type} key={type} onClick={() => setFilter(type)} type="button">{filterLabels[type]}</button>
          ))}
        </div>
      </div>
      <p className="sr-only" aria-live="polite">Showing {visibleItems.length} timeline items.</p>
      <ol className="combined-timeline-track">
        {visibleItems.map((item) => (
          <li className={`combined-timeline-item is-${item.type}`} key={item.id}>
            <div className="combined-timeline-marker" aria-hidden="true"><span /></div>
            <article className="glass-card">
              <div className="timeline-item-meta"><span>{item.type}</span><time>{item.startDate} — {item.endDate}</time></div>
              <h3>{item.title}</h3>
              <strong>{item.organization}</strong>
              <p>{item.summary}</p>
              {item.technologies.length ? <div className="chip-list">{item.technologies.slice(0, 4).map((technology) => <span key={technology}>{technology}</span>)}</div> : null}
              {item.href ? <Link href={item.href}>Open related detail <span aria-hidden="true">→</span></Link> : null}
            </article>
          </li>
        ))}
      </ol>
    </section>
  )
}
