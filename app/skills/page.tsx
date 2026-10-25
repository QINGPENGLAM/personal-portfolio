import { SectionPage } from '@/components/SectionPage'
import { RepositoryEvidenceCallout } from '@/components/projects/RepositoryEvidenceCallout'
import { SkillExplorer } from '@/components/skills/SkillExplorer'
import { skillGroups } from '@/data/skills'
import { skillRepositorySnapshot } from '@/data/skill-evidence'
import { getSkillEvidence } from '@/lib/skills'
import { createPageMetadata } from '@/lib/site'

export const metadata = createPageMetadata('Skills', 'Explore the languages and tools QingPeng Lam uses, with sourced connections to case studies, public repositories and work experience.', '/skills')

export default function SkillsPage() {
  const groups = skillGroups.map(group => ({ label: group.label, items: group.items.map(name => ({ name, evidence: getSkillEvidence(name) })) }))
  return (
    <SectionPage eyebrow="Skills" title="A stack organized by how it gets used." intro="Explore the languages, tools and techniques behind the projects. Each connection links to a case study, repository or published role.">
      <SkillExplorer checkedAt={skillRepositorySnapshot.checkedAt} groups={groups} />
      <RepositoryEvidenceCallout context="skills" />
    </SectionPage>
  )
}
