'use client'

import { useMemo, useState } from 'react'
import type { GitHubRepository } from '@/data/schemas'

type SortOption = 'newest' | 'oldest' | 'name'
type AvailabilityOption = 'all' | 'verified' | 'code-only'

const monthNames = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.']

function formatMonth(date: string) {
  const [year, month] = date.split('-').map(Number)
  return `${monthNames[month - 1]} ${year}`
}

function formatFullDate(date: string) {
  const [year, month, day] = date.split('-').map(Number)
  return `${monthNames[month - 1]} ${day}, ${year}`
}

export function GitHubArchive({ repositories, snapshotDate }: { repositories: GitHubRepository[]; snapshotDate: string }) {
  const [query, setQuery] = useState('')
  const [language, setLanguage] = useState('All')
  const [availability, setAvailability] = useState<AvailabilityOption>('all')
  const [sort, setSort] = useState<SortOption>('newest')
  const verifiedLiveCount = repositories.filter((repository) => repository.liveStatus === 'verified').length
  const unavailableLiveCount = repositories.filter((repository) => repository.liveStatus === 'unavailable').length
  const languages = useMemo(
    () => ['All', ...Array.from(new Set(repositories.map((repository) => repository.primaryLanguage ?? 'Not reported'))).sort()],
    [repositories],
  )

  const filteredRepositories = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return repositories
      .filter((repository) => language === 'All' || (repository.primaryLanguage ?? 'Not reported') === language)
      .filter((repository) => availability === 'all' || (availability === 'verified' ? repository.liveStatus === 'verified' : repository.liveStatus !== 'verified'))
      .filter((repository) => !normalizedQuery || [repository.name, repository.description, repository.primaryLanguage, repository.liveTitle].filter(Boolean).join(' ').toLowerCase().includes(normalizedQuery))
      .sort((left, right) => {
        if (sort === 'name') return left.name.localeCompare(right.name)
        return sort === 'oldest' ? left.pushedAt.localeCompare(right.pushedAt) : right.pushedAt.localeCompare(left.pushedAt)
      })
  }, [availability, language, query, repositories, sort])

  return (
    <section aria-labelledby="archive-browser-heading" className="archive-browser">
      <div className="archive-proof glass-card">
        <div><span aria-hidden="true">✓</span><p><strong>Live evidence checked</strong>{verifiedLiveCount} exact Pages URLs returned working HTML on {formatFullDate(snapshotDate)}. {unavailableLiveCount} configured candidates returned 404 and remain unlinked.</p></div>
        <a href="https://github.com/QINGPENGLAM?tab=repositories" rel="noreferrer" target="_blank">Open GitHub profile <span aria-hidden="true">↗</span></a>
      </div>

      <div className="archive-heading">
        <div><p className="eyebrow">Repository browser</p><h2 id="archive-browser-heading">Trace the full build history.</h2></div>
        <p aria-live="polite">Showing {filteredRepositories.length} of {repositories.length} public repositories.</p>
      </div>

      <div className="archive-controls glass-card">
        <label className="archive-search"><span>Search repositories</span><input onChange={(event) => setQuery(event.target.value)} placeholder="Try Redis, AI, portfolio…" type="search" value={query} /></label>
        <label><span>Language</span><select onChange={(event) => setLanguage(event.target.value)} value={language}>{languages.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label><span>Availability</span><select onChange={(event) => setAvailability(event.target.value as AvailabilityOption)} value={availability}><option value="all">All repositories</option><option value="verified">Verified live demos</option><option value="code-only">Code only</option></select></label>
        <label><span>Sort</span><select onChange={(event) => setSort(event.target.value as SortOption)} value={sort}><option value="newest">Newest activity</option><option value="oldest">Oldest activity</option><option value="name">Name A–Z</option></select></label>
      </div>

      {filteredRepositories.length ? (
        <div className="archive-grid">
          {filteredRepositories.map((repository) => (
            <article className="archive-card glass-card" key={repository.codeUrl}>
              <div className="archive-card-meta"><span>{repository.primaryLanguage ?? 'Language not reported'}</span><time dateTime={repository.pushedAt}>Updated {formatMonth(repository.pushedAt)}</time></div>
              <h3>{repository.name}</h3>
              <p className={repository.description ? undefined : 'archive-description-missing'}>{repository.description ?? 'No repository description is published on GitHub.'}</p>
              {repository.liveStatus === 'verified' ? <span className="archive-live-badge">Live page verified · {formatFullDate(repository.liveCheckedAt!)}</span> : null}
              {repository.liveStatus === 'unavailable' ? <span className="archive-live-unavailable">Configured live URL returned 404 · {formatFullDate(repository.liveCheckedAt!)}</span> : null}
              <div className="archive-card-actions">
                <a aria-label={`View ${repository.name} code on GitHub`} href={repository.codeUrl} rel="noreferrer" target="_blank">View code <span aria-hidden="true">↗</span></a>
                {repository.liveUrl ? <a aria-label={`Open ${repository.name} verified live demo`} href={repository.liveUrl} rel="noreferrer" target="_blank">Live demo <span aria-hidden="true">↗</span></a> : null}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="archive-empty glass-card"><h3>No repositories match those filters.</h3><p>Try a shorter search or choose another evidence filter.</p><button onClick={() => { setQuery(''); setLanguage('All'); setAvailability('all') }} type="button">Clear filters</button></div>
      )}
    </section>
  )
}
