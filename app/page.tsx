import { DeferredContactForm } from '@/components/contact/DeferredContactForm'
import { ContactContent } from '@/components/contact/ContactContent'
import { AboutMe } from '@/components/selene/AboutMe'
import { Earthrise } from '@/components/selene/Earthrise'
import { ProjectReel } from '@/components/selene/ProjectReel'
import { RecruiterView } from '@/components/RecruiterView'
import { projects } from '@/data/projects'

export default function HomePage() {
  const reelProjects = [{
    id: 'hrs-publication-pipeline',
    slug: 'hrs-publication-pipeline',
    title: 'HRS Publication Pipeline',
    description: 'A Python pipeline that turns publication alerts into a deduplicated, human-reviewed research queue.',
    image: '/project-previews/hrs-publication-pipeline.svg',
    alt: 'HRS pipeline concept: publication alerts flow through checks and storage into human review.',
    tags: ['Python', 'PostgreSQL', 'Google Cloud'],
    accent: '#68d5c2',
  }, ...projects.map(project => ({
    id: project.id, slug: project.slug, title: project.title,
    description: project.shortDescription, image: project.screenshots[0] ?? null,
    alt: project.screenshotAlt ?? `${project.title} project illustration`,
    tags: project.technologies.slice(0, 3), accent: project.landmark.accent,
  }))]
  return <main><Earthrise /><AboutMe /><ProjectReel projects={reelProjects} /><RecruiterView />
    <section aria-labelledby="home-contact-heading" className="home-contact" id="contact">
      <div className="section-heading">
        <div><p className="eyebrow">Contact</p><h2 id="home-contact-heading">Let’s build something useful.</h2></div>
        <p>Get in touch about software engineering roles, projects, or collaboration.</p>
      </div>
      <ContactContent form={<DeferredContactForm />} />
    </section>
  </main>
}
