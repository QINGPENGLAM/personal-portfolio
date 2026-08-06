import Link from 'next/link'
import { education } from '@/data/education'
import { experiences } from '@/data/experience'
import { githubRepositories } from '@/data/github-repositories'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'
import { skillGroups } from '@/data/skills'
import { withBasePath } from '@/lib/site'
import { ProjectCard } from './ProjectCard'

export function RecruiterView() {
  return (
    <section className="recruiter-view" id="quick-view">
      <div className="section-heading">
        <div><p className="eyebrow">Recruiter View</p><h2>The useful details, immediately.</h2></div>
        <p>Experience, selected engineering work, skills, education, and contact information—no world navigation required.</p>
      </div>

      <div className="recruiter-summary glass-card">
        <div>
          <span className="availability-dot">Open to software engineering roles</span>
          <h3>{profile.role}</h3>
          <p>{profile.introduction}</p>
        </div>
        <div className="summary-actions">
          <a className="button button-primary" data-analytics-event="resume_downloaded" download href={withBasePath(profile.resumePath)}>Download résumé</a>
          <a className="button button-secondary" href={profile.githubUrl} rel="noreferrer" target="_blank">GitHub <span aria-hidden="true">↗</span></a>
        </div>
      </div>

      <section className="content-section" aria-labelledby="selected-work-heading">
        <div className="section-kicker"><h2 id="selected-work-heading">Selected work</h2><div className="section-kicker-links"><Link href="/projects">Case studies</Link><Link href="/projects/archive">All {githubRepositories.length} public repositories</Link></div></div>
        <div className="project-grid">{projects.map((project) => <ProjectCard key={project.id} project={project} />)}</div>
      </section>

      <section className="content-section" aria-labelledby="experience-heading">
        <div className="section-kicker"><h2 id="experience-heading">Experience</h2><Link href="/experience">Full experience</Link></div>
        <div className="experience-list">
          {experiences.map((experience) => (
            <article className="experience-row" key={experience.id}>
              <div><span>{experience.startDate} — {experience.endDate}</span><strong>{experience.company}</strong></div>
              <div><h3>{experience.role}</h3><p>{experience.summary}</p></div>
            </article>
          ))}
        </div>
      </section>

      <div className="recruiter-grid">
        <section className="glass-card skill-summary" aria-labelledby="skills-summary-heading">
          <div className="section-kicker"><h2 id="skills-summary-heading">Core stack</h2><Link href="/skills">All skills</Link></div>
          {skillGroups.map((group) => <div className="skill-row" key={group.label}><strong>{group.label}</strong><p>{group.items.join(' · ')}</p></div>)}
        </section>
        <section className="glass-card education-summary" aria-labelledby="education-summary-heading">
          <p className="eyebrow">Education</p>
          <h2 id="education-summary-heading">{education.institution}</h2>
          <p>{education.degree}<br />Minor in {education.minor}</p>
          <dl><div><dt>Expected</dt><dd>{education.endDate}</dd></div><div><dt>GPA</dt><dd>{education.gpa}</dd></div></dl>
        </section>
      </div>
    </section>
  )
}
