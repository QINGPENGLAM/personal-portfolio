import Link from 'next/link'
import { githubRepositories, githubRepositorySnapshot } from '@/data/github-repositories'

const contextCopy = {
  experience: 'These personal, coursework, and evaluation repositories are separate from the employer roles above. They support the broader engineering record without implying that all 39 were workplace deliverables.',
  skills: 'Use the repository index to inspect where languages and tools appear across published builds. Repository metadata supports discovery; it is not a proficiency score or a production-maturity claim.',
} as const

export function RepositoryEvidenceCallout({ context }: { context: keyof typeof contextCopy }) {
  const verifiedLiveCount = githubRepositories.filter((repository) => repository.liveStatus === 'verified').length

  return (
    <aside aria-labelledby={`repository-evidence-${context}`} className={`repository-evidence-callout repository-evidence-${context} glass-card`}>
      <div className="repository-evidence-copy">
        <p className="eyebrow">Published repository evidence</p>
        <h2 id={`repository-evidence-${context}`}>{githubRepositories.length} public repositories behind the portfolio.</h2>
        <p>{contextCopy[context]}</p>
        <div className="repository-evidence-actions">
          <Link className="button button-secondary" href="/projects/archive">Browse all {githubRepositories.length} repositories →</Link>
          <Link href="/projects/insights">View evidence dashboard →</Link>
        </div>
      </div>

      <dl aria-label="Repository evidence summary" className="repository-evidence-metrics">
        <div><dt>Public repositories</dt><dd>{githubRepositories.length}</dd></div>
        <div><dt>Verified live pages</dt><dd>{verifiedLiveCount}</dd></div>
        <div><dt>Snapshot</dt><dd><time dateTime={githubRepositorySnapshot.capturedAt}>{githubRepositorySnapshot.capturedAt}</time></dd></div>
      </dl>

      <details className="repository-evidence-details">
        <summary>Show all {githubRepositories.length} repository names</summary>
        <div className="repository-evidence-index">
          {githubRepositories.map((repository) => (
            <a href={repository.codeUrl} key={repository.codeUrl} rel="noreferrer" target="_blank">
              <strong>{repository.name}</strong>
              <span>{repository.primaryLanguage ?? 'Language not reported'} <span aria-hidden="true">↗</span></span>
            </a>
          ))}
        </div>
      </details>
    </aside>
  )
}
