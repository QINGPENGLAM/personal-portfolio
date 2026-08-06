import Link from 'next/link'
import type { Project } from '@/data/schemas'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card glass-card">
      <div className="project-card-topline">
        <span className={`project-status is-${project.status}`}>{project.status}</span>
        <span>{project.date}</span>
      </div>
      <h3>{project.title}</h3>
      <p>{project.shortDescription}</p>
      <ul className="metric-list">
        {project.measurableResults.map((result) => <li key={result}>{result}</li>)}
      </ul>
      <div className="chip-list" aria-label={`${project.title} technologies`}>
        {project.technologies.slice(0, 6).map((technology) => <span key={technology}>{technology}</span>)}
      </div>
      <div className="card-actions">
        <Link data-analytics-event="project_opened" href={`/projects/${project.slug}`}>Read case study <span aria-hidden="true">→</span></Link>
        {project.githubUrl ? <a href={project.githubUrl} rel="noreferrer" target="_blank">View code <span aria-hidden="true">↗</span></a> : <span className="link-placeholder">Public code not available</span>}
        {project.liveDemoUrl ? <a href={project.liveDemoUrl} rel="noreferrer" target="_blank">Live demo <span aria-hidden="true">↗</span></a> : null}
      </div>
    </article>
  )
}
