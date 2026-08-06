import Image from 'next/image'
import Link from 'next/link'
import type { CSSProperties } from 'react'
import type { Project } from '@/data/schemas'
import { getAdjacentProjects } from '@/lib/projects'
import { withBasePath } from '@/lib/site'
import { ArchitectureDiagram } from '@/components/architecture/ArchitectureDiagram'

export function CaseStudyContent({ mode = 'page', project }: { mode?: 'page' | 'dialog'; project: Project }) {
  const adjacent = getAdjacentProjects(project.slug)
  const preview = project.screenshots[0]

  return (
    <article className={`case-study-content is-${mode}`} style={{ '--project-accent': project.landmark.accent } as CSSProperties}>
      <header className="case-study-hero">
        <div className="case-study-hero-copy">
          <p className="eyebrow">{project.landmark.type} · {project.status}</p>
          <h1 id={mode === 'dialog' ? 'project-dialog-title' : undefined}>{project.title}</h1>
          <p className="case-study-lede">{project.shortDescription}</p>
          <dl className="case-study-meta">
            <div><dt>Role</dt><dd>{project.role}</dd></div>
            <div><dt>Timeline</dt><dd>{project.date}</dd></div>
            <div><dt>Focus</dt><dd>{project.focusAreas.join(' · ')}</dd></div>
          </dl>
          <div className="case-study-actions">
            {project.githubUrl ? <a className="button button-primary" href={project.githubUrl} rel="noreferrer" target="_blank">View code <span aria-hidden="true">↗</span></a> : <span className="case-study-unavailable">Public code is not currently available.</span>}
            {project.liveDemoUrl ? <a className="button button-secondary" href={project.liveDemoUrl} rel="noreferrer" target="_blank">Open live demo <span aria-hidden="true">↗</span></a> : null}
            {mode === 'dialog' ? <Link className="button button-secondary" href={`/projects/${project.slug}`}>Open standalone case study</Link> : null}
          </div>
        </div>
        <div className="case-study-visual" aria-label={`${project.title} project visual`}>
          {preview ? <Image alt={`${project.title} product preview`} fill loading="eager" sizes="(max-width: 760px) 100vw, 44vw" src={withBasePath(preview)} /> : (
            <div className="case-study-core-visual" aria-hidden="true"><span /><span /><span /><strong>{project.title.slice(0, 2).toUpperCase()}</strong></div>
          )}
        </div>
      </header>

      <section className="verified-metrics" aria-label="Verified project results">
        {project.measurableResults.map((result, index) => <div key={result}><span>0{index + 1}</span><strong>{result}</strong><small>Verified portfolio evidence</small></div>)}
      </section>

      <div className="case-study-section case-study-overview">
        <div><p className="eyebrow">Overview</p><h2>What was built and why.</h2></div>
        <div><p>{project.fullOverview}</p><dl><div><dt>Problem</dt><dd>{project.problem}</dd></div><div><dt>For</dt><dd>{project.caseStudy.audience}</dd></div></dl></div>
      </div>

      <section className="case-study-section" aria-labelledby={`${project.slug}-contributions`}>
        <div><p className="eyebrow">Direct contribution</p><h2 id={`${project.slug}-contributions`}>The work I personally owned.</h2></div>
        <ol className="contribution-list">{project.directContributions.map((contribution, index) => <li key={contribution}><span>0{index + 1}</span><p>{contribution}</p></li>)}</ol>
      </section>

      <section className="constraint-panel" aria-labelledby={`${project.slug}-constraints`}>
        <div><p className="eyebrow">Problem boundaries</p><h2 id={`${project.slug}-constraints`}>Constraints that shaped the system.</h2></div>
        <ul>{project.caseStudy.constraints.map((constraint) => <li key={constraint}>{constraint}</li>)}</ul>
      </section>

      <ArchitectureDiagram project={project} />

      <section className="case-study-section engineering-decisions" aria-labelledby={`${project.slug}-decisions`}>
        <div><p className="eyebrow">Engineering challenges</p><h2 id={`${project.slug}-decisions`}>Decisions, tradeoffs, and outcomes.</h2></div>
        <div className="decision-grid">
          {project.caseStudy.decisions.map((decision, index) => (
            <article key={decision.challenge}>
              <span>Decision 0{index + 1}</span><h3>{decision.challenge}</h3>
              <dl><div><dt>Choice</dt><dd>{decision.decision}</dd></div><div><dt>Tradeoff</dt><dd>{decision.tradeoff}</dd></div><div><dt>Outcome</dt><dd>{decision.outcome}</dd></div></dl>
            </article>
          ))}
        </div>
      </section>

      <section className="technical-breakdown" aria-labelledby={`${project.slug}-breakdown`}>
        <div className="technical-breakdown-header"><span aria-hidden="true">● ● ●</span><strong id={`${project.slug}-breakdown`}>engineering-breakdown / {project.slug}</strong></div>
        <div className="technical-breakdown-grid">
          <div>
            <p className="eyebrow">System modules</p>
            <ul className="module-list">{project.caseStudy.architectureNodes.map((node) => <li key={node.id}><span>{node.kind}</span><strong>{node.label}</strong><p>{node.responsibility}</p></li>)}</ul>
          </div>
          <aside>
            <p className="eyebrow">Testing strategy</p>
            <ul>{project.caseStudy.testing.map((item) => <li key={item}>{item}</li>)}</ul>
            <p className="eyebrow breakdown-stack-label">Technology stack</p>
            <div className="chip-list">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>
          </aside>
        </div>
      </section>

      <section className="case-study-section reflection-section" aria-labelledby={`${project.slug}-reflection`}>
        <div><p className="eyebrow">Reflection</p><h2 id={`${project.slug}-reflection`}>What this project clarified.</h2></div>
        <div><p>{project.caseStudy.reflection.learned}</p><h3>What I would improve next</h3><ul>{project.caseStudy.reflection.next.map((item) => <li key={item}>{item}</li>)}</ul></div>
      </section>

      <nav aria-label="Related project navigation" className="related-projects">
        <Link href="/projects"><span>Project index</span><strong>All selected work</strong></Link>
        {adjacent.next ? <Link href={`/projects/${adjacent.next.slug}`}><span>Next case study</span><strong>{adjacent.next.title} →</strong></Link> : null}
      </nav>
    </article>
  )
}
