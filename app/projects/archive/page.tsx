import Link from 'next/link'
import { SectionPage } from '@/components/SectionPage'
import { GitHubArchive } from '@/components/projects/GitHubArchive'
import { githubRepositories, githubRepositorySnapshot } from '@/data/github-repositories'
import { createPageMetadata } from '@/lib/site'

export const metadata = createPageMetadata('Project Archive', 'Browse QingPeng Lam’s complete public GitHub repository history with transparent source metadata and independently checked live demos.', '/projects/archive')

export default function ProjectArchivePage() {
  return (
    <SectionPage eyebrow="Phase 9 · Verified live evidence" title="Every public build, without the sales pitch." intro="The main portfolio keeps a small set of deep case studies. This archive exposes the broader GitHub history using current public metadata and independently checked demo URLs—no invented descriptions and no unverified live links.">
      <nav aria-label="Project evidence navigation" className="archive-subnav"><Link href="/projects">← Selected case studies</Link><Link href="/projects/insights">View repository insights →</Link></nav>
      <GitHubArchive repositories={githubRepositories} snapshotDate={githubRepositorySnapshot.capturedAt} />
    </SectionPage>
  )
}
