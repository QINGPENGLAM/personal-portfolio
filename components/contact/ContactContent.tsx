import type { ReactNode } from 'react'
import { profile } from '@/data/profile'
import { withBasePath } from '@/lib/site'

export function ContactContent({ form }: { form: ReactNode }) {
  return (
      <div className="contact-layout">
        {form}
        <div className="contact-card glass-card">
        <div><p className="eyebrow">Best first step</p><h2>Email QingPeng</h2><p>For software engineering roles, project conversations, or collaboration.</p></div>
        <div className="contact-links"><a className="button button-primary" href={`mailto:${profile.email}`}>{profile.email}</a><a href={profile.linkedinUrl} rel="noreferrer" target="_blank">LinkedIn <span aria-hidden="true">↗</span></a><a href={profile.githubUrl} rel="noreferrer" target="_blank">GitHub <span aria-hidden="true">↗</span></a><a data-analytics-event="resume_downloaded" download href={withBasePath(profile.resumePath)}>Download résumé <span aria-hidden="true">↓</span></a></div>
        </div>
      </div>
  )
}
