import Link from 'next/link'
import { SectionPage } from '@/components/SectionPage'
import { RepositoryInsights } from '@/components/projects/RepositoryInsights'
import { githubRepositories, githubRepositorySnapshot } from '@/data/github-repositories'
import { createPageMetadata } from '@/lib/site'

export const metadata = createPageMetadata('Repository Insights', 'A transparent summary of QingPeng Lam’s public repository languages, latest-push years, and verified deployment evidence.', '/projects/insights')

export default function RepositoryInsightsPage() {
  return (
    <SectionPage eyebrow="Phase 10 · Repository evidence dashboard" title="Read the build history at a glance." intro={`A factual summary derived from the ${githubRepositorySnapshot.capturedAt} public GitHub snapshot. Counts describe repository metadata and deployment reachability—not product scale or production maturity.`}>
      <nav aria-label="Project evidence navigation" className="archive-subnav"><Link href="/projects">← Selected case studies</Link><Link href="/projects/archive">Browse all repositories →</Link></nav>
      <RepositoryInsights repositories={githubRepositories} />
    </SectionPage>
  )
}
