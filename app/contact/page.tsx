import { ContactForm } from '@/components/contact/ContactForm'
import { SectionPage } from '@/components/SectionPage'
import { profile } from '@/data/profile'
import { createPageMetadata, withBasePath } from '@/lib/site'

export const metadata = createPageMetadata('Contact', 'Contact QingPeng Lam about software engineering roles, technical projects, and product collaboration.', '/contact')

export default function ContactPage() {
  return (
    <SectionPage eyebrow="Contact" title="Let’s build something useful." intro="Send a concise message through the validated form, or use any direct channel below. The fallback email path always remains available.">
      <div className="contact-layout">
        <ContactForm />
        <div className="contact-card glass-card">
        <div><p className="eyebrow">Best first step</p><h2>Email QingPeng</h2><p>For software engineering roles, project conversations, or collaboration.</p></div>
        <div className="contact-links"><a className="button button-primary" href={`mailto:${profile.email}`}>{profile.email}</a><a href={profile.linkedinUrl} rel="noreferrer" target="_blank">LinkedIn <span aria-hidden="true">↗</span></a><a href={profile.githubUrl} rel="noreferrer" target="_blank">GitHub <span aria-hidden="true">↗</span></a><a data-analytics-event="resume_downloaded" download href={withBasePath(profile.resumePath)}>Download résumé <span aria-hidden="true">↓</span></a></div>
        </div>
      </div>
    </SectionPage>
  )
}
