import { SectionPage } from '@/components/SectionPage'
import { CombinedTimeline } from '@/components/timeline/CombinedTimeline'
import { experiences } from '@/data/experience'
import { createPageMetadata } from '@/lib/site'

export const metadata = createPageMetadata('Experience', 'Review QingPeng Lam’s résumé-grounded software engineering experience across AI, data, and product systems.', '/experience')

export default function ExperiencePage() {
  return (
    <SectionPage eyebrow="Experience" title="Engineering across AI, data, and product systems." intro="A concise, résumé-grounded timeline. Expand each role by reading its direct contributions and supported technologies.">
      <div className="timeline professional-timeline">
        {experiences.map((experience) => (
          <article className="timeline-entry" id={experience.id} key={experience.id}>
            <div className="timeline-date"><span>{experience.startDate}</span><span>{experience.endDate}</span></div>
            <div className="timeline-node" aria-hidden="true" />
            <div className="glass-card timeline-card">
              <p className="eyebrow">{experience.company} · {experience.location}</p>
              <h2>{experience.role}</h2><p>{experience.summary}</p>
              <details className="technical-details"><summary>Direct contributions and technical detail</summary><p className="technical-detail-label">Direct contributions</p><ul>{experience.contributions.map((item) => <li key={item}>{item}</li>)}</ul><p className="technical-detail-label">Measured outcomes</p><ul>{experience.outcomes.map((item) => <li key={item}>{item}</li>)}</ul><p className="technical-detail-label">Technologies</p><div className="chip-list">{experience.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div></details>
            </div>
          </article>
        ))}
      </div>
      <CombinedTimeline />
    </SectionPage>
  )
}
