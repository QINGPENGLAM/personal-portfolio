import { SectionPage } from '@/components/SectionPage'
import { education } from '@/data/education'
import { profile } from '@/data/profile'
import { createPageMetadata } from '@/lib/site'

export const metadata = createPageMetadata('About', 'Learn how QingPeng Lam approaches software engineering, AI systems, product thinking, and dependable delivery.', '/about')

export default function AboutPage() {
  return (
    <SectionPage eyebrow="About" title="Curious by nature. Practical by design." intro={profile.introduction}>
      <div className="detail-grid">
        <section className="glass-card prose-card"><p className="eyebrow">What I build</p><h2>Tools that make complex work feel clearer.</h2><p>My recent work focuses on AI-assisted engineering, data systems, search, developer tools, and interactive experiences. I care about reliability and the human workflow around the technology—not only the demo.</p><ul><li>Developer workflows that remove repeated work</li><li>Search and data systems that surface useful evidence</li><li>Interactive products that explain themselves</li></ul></section>
        <section className="glass-card prose-card"><p className="eyebrow">How I work</p><h2>Experiment, validate, then strengthen.</h2><p>I enjoy moving from a rough idea to a working proof, testing the difficult edges, and turning what survives into a maintainable system. UX design training helps me keep the user’s mental model in the room.</p><ul><li>Start with a working path</li><li>Measure the difficult edges</li><li>Document the boundary between proof and production</li></ul></section>
        <section className="glass-card prose-card"><p className="eyebrow">Technical curiosity</p><h2>Where AI meets dependable software.</h2><p>I am especially interested in AI-assisted developer tools, retrieval, model serving, data quality, and the infrastructure that makes intelligent features useful after the first demo.</p></section>
        <section className="glass-card prose-card"><p className="eyebrow">Current direction</p><h2>Growing across software, AI, and data engineering.</h2><p>My goal is to keep building systems with strong engineering fundamentals, clear product thinking, and enough curiosity to explore better ways of working.</p></section>
        <section className="glass-card prose-card" id="education"><p className="eyebrow">Education</p><h2>{education.institution}</h2><p>{education.degree}, Minor in {education.minor}. Expected {education.endDate}. GPA {education.gpa}.</p></section>
      </div>
    </SectionPage>
  )
}
