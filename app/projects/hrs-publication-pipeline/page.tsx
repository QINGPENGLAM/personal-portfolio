import { HrsCaseStudy } from '@/components/hrs/HrsCaseStudy'
import { createPageMetadata } from '@/lib/site'

export const metadata = createPageMetadata('HRS Publication Pipeline', 'An interactive walkthrough of publication intake, human review, PostgreSQL persistence and Google Cloud deployment decisions.', '/projects/hrs-publication-pipeline')

export default function HrsCaseStudyPage() {
  return <HrsCaseStudy />
}
