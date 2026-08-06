import Link from 'next/link'
import { SectionPage } from '@/components/SectionPage'
import { ProjectsExplorer } from '@/components/projects/ProjectsExplorer'
import { githubRepositories } from '@/data/github-repositories'
import { projectContentPlaceholders, projects } from '@/data/projects'
import { createPageMetadata } from '@/lib/site'

export const metadata = createPageMetadata('Projects', 'Explore evidence-backed software engineering case studies covering AI workflows, reliability, search, data, and developer tooling.', '/projects')

export default function ProjectsPage() {
  const verifiedLiveRepositoryCount = githubRepositories.filter((repository) => repository.liveStatus === 'verified').length

  return (
    <SectionPage eyebrow="Selected engineering work" title="Systems with proof behind them." intro="The featured set stays intentionally small: every case study is supported by the supplied résumé and current project evidence.">
      <ProjectsExplorer />
      <aside className="project-archive-callout glass-card" aria-label="Complete GitHub project archive">
        <div><p className="eyebrow">Beyond the case studies</p><h2>{githubRepositories.length} public repositories, one transparent archive.</h2><p>Browse by name, language, activity, or demo availability. {verifiedLiveRepositoryCount} live pages include a current check date; missing descriptions and unavailable deployments remain explicit.</p></div>
        <div className="project-archive-actions"><Link className="button button-secondary" href="/projects/archive">Browse archive →</Link><Link href="/projects/insights">View evidence dashboard →</Link></div>
      </aside>
      <section className="content-section project-breakdowns" aria-labelledby="breakdown-heading">
        <div className="section-heading"><div><p className="eyebrow">Technical summaries</p><h2 id="breakdown-heading">What was built and why.</h2></div><p>Open a case study for the full architecture, engineering decisions, testing evidence, and reflection.</p></div>
        {projects.map((project) => (
          <article className="project-breakdown glass-card" key={project.id}>
              <div><span className="project-index">0{projects.indexOf(project) + 1}</span><h3>{project.title}</h3><p>{project.fullOverview}</p><Link className="technical-summary-link" href={`/projects/${project.slug}`}>Read the complete case study →</Link></div>
            <dl>
              <div><dt>Problem</dt><dd>{project.problem}</dd></div>
              <div><dt>Role</dt><dd>{project.role}</dd></div>
              <div><dt>Architecture</dt><dd>{project.architecture.join(' · ')}</dd></div>
            </dl>
          </article>
        ))}
      </section>
      <details className="content-placeholders"><summary>Unresolved content placeholders ({projectContentPlaceholders.length})</summary><ul>{projectContentPlaceholders.map((item) => <li key={item}>{item}</li>)}</ul></details>
    </SectionPage>
  )
}
