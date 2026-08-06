import Link from 'next/link'
import { RecruiterView } from '@/components/RecruiterView'
import { WorldPlaceholder } from '@/components/WorldPlaceholder'
import { profile } from '@/data/profile'
import { withBasePath } from '@/lib/site'

export default function HomePage() {
  return (
    <main>
      <section className="home-hero">
        <div className="hero-world"><WorldPlaceholder compact /></div>
        <div className="hero-scrim" />
        <div className="hero-copy">
          <p className="hero-label"><span /> Software engineering · AI systems · creative technology</p>
          <h1>Building software with <em>systems depth</em> and a sense of wonder.</h1>
          <p>{profile.headline}</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/world"><span aria-hidden="true">◇</span> Enter My World</Link>
            <Link className="button button-secondary" data-analytics-event="recruiter_view_opened" href="/#quick-view">Quick Portfolio View</Link>
          </div>
          <div className="hero-links">
            <Link href="/projects">View projects <span aria-hidden="true">→</span></Link>
            <a data-analytics-event="resume_downloaded" download href={withBasePath(profile.resumePath)}>Download résumé <span aria-hidden="true">↓</span></a>
            <a href={`mailto:${profile.email}`}>Contact me <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div className="hero-mode-note"><strong>Two ways in.</strong><span>Explore the world or jump straight to the recruiter view.</span></div>
      </section>
      <RecruiterView />
    </main>
  )
}
