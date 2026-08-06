import { SectionPage } from '@/components/SectionPage'
import { SkillExplorer } from '@/components/skills/SkillExplorer'
import { createPageMetadata } from '@/lib/site'

export const metadata = createPageMetadata('Skills', 'See the engineering tools QingPeng Lam uses and the published portfolio evidence connected to each skill.', '/skills')

export default function SkillsPage() {
  return (
    <SectionPage eyebrow="Skills" title="A stack organized by how it gets used." intro="No arbitrary proficiency bars. Every item below comes directly from the supplied résumé.">
      <SkillExplorer />
    </SectionPage>
  )
}
