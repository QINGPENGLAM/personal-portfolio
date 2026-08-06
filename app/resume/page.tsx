import { SectionPage } from '@/components/SectionPage'
import { profile } from '@/data/profile'
import { createPageMetadata, withBasePath } from '@/lib/site'

export const metadata = createPageMetadata('Resume', 'Preview or download QingPeng Lam’s software engineering résumé.', '/resume')

export default function ResumePage() {
  const resumeUrl = withBasePath(profile.resumePath)
  return (
    <SectionPage eyebrow="Résumé" title="The one-page version." intro="Download the source résumé or preview it below. All Phase 1 portfolio claims are grounded in this document and verified public links.">
      <div className="resume-actions"><a className="button button-primary" data-analytics-event="resume_downloaded" download href={resumeUrl}>Download PDF</a><a className="button button-secondary" href={resumeUrl} rel="noreferrer" target="_blank">Open in new tab <span aria-hidden="true">↗</span></a></div>
      <div className="resume-frame"><iframe src={resumeUrl} title={`${profile.name} résumé PDF`} /></div>
    </SectionPage>
  )
}
