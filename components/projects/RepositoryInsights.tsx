import type { CSSProperties } from 'react'
import { buildRepositoryInsights } from '@/lib/github-insights'
import type { GitHubRepository } from '@/data/schemas'

type ScaleStyle = CSSProperties & { '--insight-scale': string }

function InsightBars({ items, label }: { items: { label: string; count: number }[]; label: string }) {
  const maximum = Math.max(...items.map((item) => item.count), 1)
  return (
    <ol aria-label={label} className="insight-bars">
      {items.map((item) => (
        <li key={item.label} style={{ '--insight-scale': `${(item.count / maximum) * 100}%` } as ScaleStyle}>
          <span>{item.label}</span><i aria-hidden="true" /><strong>{item.count}</strong>
        </li>
      ))}
    </ol>
  )
}

export function RepositoryInsights({ repositories }: { repositories: GitHubRepository[] }) {
  const insights = buildRepositoryInsights(repositories)

  return (
    <section className="repository-insights" aria-labelledby="repository-insights-heading">
      <div className="insight-metrics">
        <article className="glass-card"><span>Public repositories</span><strong>{insights.total}</strong><p>Visible in the dated GitHub snapshot.</p></article>
        <article className="glass-card"><span>Verified live pages</span><strong>{insights.verifiedLive}</strong><p>Exact URLs returning HTTP 200 HTML.</p></article>
        <article className="glass-card"><span>Unavailable candidates</span><strong>{insights.unavailableLive}</strong><p>Pages-enabled URLs returning 404.</p></article>
        <article className="glass-card"><span>Code-only records</span><strong>{insights.notConfigured}</strong><p>No Pages configuration reported.</p></article>
      </div>

      <div className="insight-boundary glass-card">
        <p className="eyebrow">Reading the evidence</p>
        <h2 id="repository-insights-heading">What the repository history actually shows.</h2>
        <p>These charts summarize current public metadata. A year means the year of a repository’s latest recorded push—not its creation date, development duration, team size, traffic, or production maturity.</p>
      </div>

      <div className="insight-grid">
        <section className="glass-card" aria-labelledby="language-insight-heading">
          <div className="insight-card-heading"><p className="eyebrow">Primary language</p><h3 id="language-insight-heading">Repository distribution</h3></div>
          <InsightBars items={insights.languages} label="Repositories grouped by GitHub primary language" />
        </section>
        <section className="glass-card" aria-labelledby="year-insight-heading">
          <div className="insight-card-heading"><p className="eyebrow">Latest push year</p><h3 id="year-insight-heading">Recorded activity</h3></div>
          <InsightBars items={insights.pushYears} label="Repositories grouped by latest recorded push year" />
        </section>
      </div>

      <section className="deployment-ledger glass-card" aria-labelledby="deployment-ledger-heading">
        <div><p className="eyebrow">Deployment ledger</p><h2 id="deployment-ledger-heading">Reachability, separated from configuration.</h2></div>
        <dl>
          <div><dt>Pages enabled</dt><dd>{insights.pagesEnabled}</dd></div>
          <div><dt>Verified reachable</dt><dd>{insights.verifiedLive}</dd></div>
          <div><dt>Returned 404</dt><dd>{insights.unavailableLive}</dd></div>
          <div><dt>Not configured</dt><dd>{insights.notConfigured}</dd></div>
        </dl>
      </section>
    </section>
  )
}
