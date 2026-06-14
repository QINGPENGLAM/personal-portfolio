import { useEffect, useRef, useState } from 'react'
import { portfolioExperience, portfolioOnlyProjects } from '../data/portfolioArchive'
import { profile } from '../data/profile'

function updateInteractiveSurface(event) {
  const bounds = event.currentTarget.getBoundingClientRect()
  const pointerX = event.clientX - bounds.left
  const pointerY = event.clientY - bounds.top

  event.currentTarget.style.setProperty('--pointer-x', `${pointerX}px`)
  event.currentTarget.style.setProperty('--pointer-y', `${pointerY}px`)
}

function resetInteractiveSurface(event) {
  event.currentTarget.style.removeProperty('--pointer-x')
  event.currentTarget.style.removeProperty('--pointer-y')
}

const interactiveSurfaceProps = {
  onPointerLeave: resetInteractiveSurface,
  onPointerMove: updateInteractiveSurface,
}

function PortfolioParticleField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) {
      return undefined
    }

    const context = canvas.getContext('2d')

    if (!context) {
      return undefined
    }

    let animationFrameId = 0
    let particles = []

    const createParticle = (width, height) => ({
      opacity: Math.random() * 0.45 + 0.16,
      radius: Math.random() * 1.8 + 0.7,
      speedX: (Math.random() - 0.5) * 0.18,
      speedY: Math.random() * 0.18 + 0.06,
      x: Math.random() * width,
      y: Math.random() * height,
    })

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      const width = Math.max(rect.width, 1)
      const height = Math.max(rect.height, 1)
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const particleCount = width < 768 ? 34 : 58

      canvas.width = width * dpr
      canvas.height = height * dpr
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      particles = Array.from({ length: particleCount }, () => createParticle(width, height))
    }

    const renderFrame = () => {
      const width = canvas.width / Math.min(window.devicePixelRatio || 1, 2)
      const height = canvas.height / Math.min(window.devicePixelRatio || 1, 2)

      context.clearRect(0, 0, width, height)

      particles.forEach((particle, index) => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x < -8) {
          particle.x = width + 8
        } else if (particle.x > width + 8) {
          particle.x = -8
        }

        if (particle.y > height + 8) {
          particle.y = -8
          particle.x = Math.random() * width
        }

        context.fillStyle = index % 9 === 0 ? `rgba(243, 199, 95, ${particle.opacity})` : `rgba(255, 255, 255, ${particle.opacity})`
        context.beginPath()
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        context.fill()
      })

      animationFrameId = window.requestAnimationFrame(renderFrame)
    }

    resizeCanvas()
    renderFrame()
    window.addEventListener('resize', resizeCanvas)

    return () => {
      window.cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return <canvas aria-hidden="true" className="portfolio-page-particles" ref={canvasRef} />
}

function FeaturedProjectCard({ onOpenProject, project }) {
  return (
    <article
      {...interactiveSurfaceProps}
      className="portfolio-card glass-surface interactive-surface"
      style={{ '--project-accent': project.color }}
    >
      <div className="portfolio-card-media">
        {project.previewSrc ? (
          <img
            alt={project.previewAlt ?? `${project.title} preview`}
            className={`portfolio-card-image${project.previewFit === 'contain' ? ' is-contain' : ''}`}
            loading="lazy"
            src={project.previewSrc}
          />
        ) : (
          <div className="portfolio-card-placeholder">
            <strong>{project.stationLabel}</strong>
            <span>{project.shortLabel}</span>
          </div>
        )}
      </div>

      <div className="portfolio-card-body">
        <div className="portfolio-card-meta">
          <span>{project.category}</span>
          <span>{project.period}</span>
        </div>

        <h3>{project.title}</h3>
        <p>{project.summary}</p>

        <div className="portfolio-tag-row">
          {project.stack.slice(0, 4).map((item) => (
            <span className="portfolio-chip" key={item}>
              {item}
            </span>
          ))}
        </div>

        <div className="portfolio-card-actions">
          <button className="portfolio-card-button" onClick={() => onOpenProject(project.id)} type="button">
            View details
          </button>

          {project.repoUrl ? (
            <a className="portfolio-card-link" href={project.repoUrl} rel="noreferrer" target="_blank">
              {project.repoLabel ?? 'Open link'}
            </a>
          ) : null}
        </div>
      </div>
    </article>
  )
}

function PortfolioOnlyProjectCard({ project }) {
  return (
    <article {...interactiveSurfaceProps} className="portfolio-card glass-surface interactive-surface">
      <div className="portfolio-card-media">
        {project.previewSrc ? (
          <img
            alt={project.previewAlt ?? `${project.title} preview`}
            className={`portfolio-card-image${project.previewFit === 'contain' ? ' is-contain' : ''}`}
            loading="lazy"
            src={project.previewSrc}
          />
        ) : (
          <div className="portfolio-card-placeholder">
            <strong>{project.title}</strong>
            <span>{project.source}</span>
          </div>
        )}
      </div>

      <div className="portfolio-card-body">
        <div className="portfolio-card-meta">
          <span>{project.category}</span>
          <span>{project.period}</span>
        </div>

        <h3>{project.title}</h3>
        <p>{project.summary}</p>

        <div className="portfolio-tag-row">
          {project.stack.map((item) => (
            <span className="portfolio-chip" key={item}>
              {item}
            </span>
          ))}
        </div>

        <div className="portfolio-card-actions">
          {project.links?.length ? (
            project.links.map((link) => (
              <a className="portfolio-card-link" href={link.href} key={link.href} rel="noreferrer" target="_blank">
                {link.label}
              </a>
            ))
          ) : (
            <span className="portfolio-source">{project.source}</span>
          )}
        </div>
      </div>
    </article>
  )
}

function ExperienceCard({ experience }) {
  return (
    <article {...interactiveSurfaceProps} className="timeline-card glass-surface interactive-surface">
      <div className="timeline-marker" />
      <div className="timeline-copy">
        <p className="timeline-period">{experience.period}</p>
        <h3>{experience.title}</h3>
        <p className="timeline-location">
          {experience.company} · {experience.location}
        </p>
        <p>{experience.summary}</p>

        {experience.highlights?.length ? (
          <ul className="timeline-list">
            {experience.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}

        {experience.stack?.length ? (
          <div className="portfolio-tag-row">
            {experience.stack.map((item) => (
              <span className="portfolio-chip is-soft" key={item}>
                {item}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  )
}

export default function ClassicPortfolio({ onOpenProject, onSwitchToRoom, projects }) {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const featuredProjects = projects.filter((project) => project.category !== 'Experience')
  const latestExperience = portfolioExperience[0]
  const recentExperience = portfolioExperience.slice(0, 3)
  const earlierExperience = portfolioExperience.slice(3)
  const allProjectCount = featuredProjects.length + portfolioOnlyProjects.length
  const allExperienceCount = portfolioExperience.length
  const topSkills = [
    ...new Set([
      ...projects.flatMap((project) => project.stack),
      ...portfolioExperience.flatMap((experience) => experience.stack ?? []),
      ...portfolioOnlyProjects.flatMap((project) => project.stack ?? []),
    ]),
  ].slice(0, 10)
  const primaryContact = profile.socials.find((item) => item.href.startsWith('mailto:')) ?? profile.socials[0]
  const primaryContactLabel = primaryContact?.href.startsWith('mailto:')
    ? primaryContact.href.replace('mailto:', '')
    : primaryContact?.label
  const secondaryContacts = profile.socials.filter((item) => item !== primaryContact)

  useEffect(() => {
    const updateBackToTopVisibility = () => {
      setShowBackToTop(window.scrollY > 420)
    }

    updateBackToTopVisibility()
    window.addEventListener('scroll', updateBackToTopVisibility, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateBackToTopVisibility)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="portfolio-page-shell">
      <PortfolioParticleField />
      <div aria-hidden="true" className="portfolio-page-aura is-left" />
      <div aria-hidden="true" className="portfolio-page-aura is-right" />

      <div className="portfolio-page">
        <button
          aria-label="Back to top"
          className={`portfolio-back-to-top${showBackToTop ? ' is-visible' : ''}`}
          onClick={scrollToTop}
          type="button"
        >
          <span aria-hidden="true" className="portfolio-back-to-top-icon">
            ↑
          </span>
          <span className="portfolio-back-to-top-label">Top</span>
        </button>

        <header className="portfolio-topbar glass-surface">
          <a className="portfolio-brand" href="#overview">
            <span className="portfolio-brand-mark">QL</span>
            <span>{profile.name}</span>
          </a>

          <nav aria-label="Portfolio sections" className="portfolio-nav">
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <section {...interactiveSurfaceProps} className="portfolio-name-hero glass-surface interactive-surface" id="overview">
          <div aria-hidden="true" className="portfolio-hero-glow is-primary" />
          <div aria-hidden="true" className="portfolio-hero-glow is-secondary" />
          <div className="portfolio-name-stage">
            <div className="portfolio-hero-copy-stack">
              <h1 className="portfolio-name-display">{profile.name}</h1>

              <div className="portfolio-identity-pill">
                <span aria-hidden="true" className="portfolio-identity-dot" />
                <span>{profile.heroPill}</span>
              </div>

              <div className="portfolio-hero-actions">
                <a className="portfolio-primary-button" href="#projects">
                  Check Out My Work
                </a>
                <button className="ghost-button" onClick={onSwitchToRoom} type="button">
                  Switch to 3D Room
                </button>
              </div>
            </div>
          </div>

          <div className="portfolio-hero-tech-band">
            <p className="eyebrow">Core Technologies</p>
            <div className="portfolio-focus-items">
              {topSkills.slice(0, 6).map((item) => (
                <span className="portfolio-focus-pill" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="portfolio-overview-grid">
          <article {...interactiveSurfaceProps} className="portfolio-overview-panel glass-surface interactive-surface">
            <p className="eyebrow">Overview</p>
            <p className="portfolio-lead">{profile.title}</p>
            <p className="portfolio-summary">{profile.intro}</p>

            <div className="portfolio-link-row">
              {profile.socials.map((item) => (
                <a href={item.href} key={item.label} rel="noreferrer" target="_blank">
                  {item.label}
                </a>
              ))}
            </div>
          </article>

          <aside className="portfolio-hero-side">
            <article {...interactiveSurfaceProps} className="portfolio-spotlight interactive-surface">
              <p className="eyebrow">Current Role</p>
              <h2>{latestExperience?.title}</h2>
              <p>
                {latestExperience?.company} · {latestExperience?.location}
              </p>
              <p>{latestExperience?.summary}</p>
            </article>

            <article {...interactiveSurfaceProps} className="portfolio-status-card interactive-surface">
              <div>
                <strong>{profile.location}</strong>
                <span>{profile.availability}</span>
              </div>

              <div className="portfolio-tag-row">
                {topSkills.map((skill) => (
                  <span className="portfolio-chip is-soft" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          </aside>
        </section>

        <section aria-label="Portfolio highlights" className="portfolio-stat-grid">
          <article {...interactiveSurfaceProps} className="portfolio-stat-card glass-surface interactive-surface">
            <strong>{allProjectCount}</strong>
            <span>projects across current builds, resume work, and selected archive pieces</span>
          </article>
          <article {...interactiveSurfaceProps} className="portfolio-stat-card glass-surface interactive-surface">
            <strong>{allExperienceCount}</strong>
            <span>roles spanning software engineering, data systems, research, and education</span>
          </article>
          <article {...interactiveSurfaceProps} className="portfolio-stat-card glass-surface interactive-surface">
            <strong>{portfolioOnlyProjects.length}</strong>
            <span>portfolio-only additions pulled forward from resume and earlier site versions</span>
          </article>
        </section>

        <section className="portfolio-section" id="experience">
          <div className="portfolio-section-heading">
            <div>
              <p className="eyebrow">Experience</p>
              <h2>Professional work with stronger resume context.</h2>
            </div>
            <p>
              I pulled these entries from the current portfolio, older pages, the resume, and the USAA experience
              notes so this version reads more like a standard professional site.
            </p>
          </div>

          <div className="portfolio-subsection">
            <div className="portfolio-subsection-heading">
              <h3>Recent Roles</h3>
              <p>Current and recent engineering roles with product, data, and automation emphasis.</p>
            </div>

            <div className="portfolio-timeline">
              {recentExperience.map((experience) => (
                <ExperienceCard experience={experience} key={experience.id} />
              ))}
            </div>
          </div>

          <div className="portfolio-subsection">
            <div className="portfolio-subsection-heading">
              <h3>Earlier Experience</h3>
              <p>Research, operations, museum, and education roles that still shape how I work with people and systems.</p>
            </div>

            <div className="portfolio-timeline">
              {earlierExperience.map((experience) => (
                <ExperienceCard experience={experience} key={experience.id} />
              ))}
            </div>
          </div>
        </section>

        <section className="portfolio-section" id="projects">
          <div className="portfolio-section-heading">
            <div>
              <p className="eyebrow">Projects</p>
              <h2>Current interactive builds plus portfolio-only archive work.</h2>
            </div>
            <p>
              The 3D room still focuses on a smaller set of interactive stations, while this page can carry the broader
              project history.
            </p>
          </div>

          <div className="portfolio-subsection">
            <div className="portfolio-subsection-heading">
              <h3>Current Interactive Builds</h3>
              <p>These are the projects still tied to the main interactive portfolio experience.</p>
            </div>

            <div className="portfolio-project-grid">
              {featuredProjects.map((project) => (
                <FeaturedProjectCard key={project.id} onOpenProject={onOpenProject} project={project} />
              ))}
            </div>
          </div>

          <div className="portfolio-subsection">
            <div className="portfolio-subsection-heading">
              <h3>Additional Product and Web Projects</h3>
              <p>Resume projects and selected older builds that only need to live on the standard portfolio page.</p>
            </div>

            <div className="portfolio-project-grid">
              {portfolioOnlyProjects.map((project) => (
                <PortfolioOnlyProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>

        <section className="portfolio-contact-simple" id="contact">
          <div className="portfolio-contact-simple-copy">
            <p className="eyebrow">Contact</p>
            <h2>Let&apos;s Chat</h2>
            <p className="portfolio-contact-simple-summary">{profile.availability}</p>
            <p className="portfolio-contact-simple-meta">{profile.location}</p>
          </div>

          <div className="portfolio-contact-simple-actions">
            {primaryContact ? (
              <a className="portfolio-contact-email" href={primaryContact.href}>
                {primaryContactLabel}
              </a>
            ) : null}

            <div className="portfolio-contact-simple-links">
              {secondaryContacts.map((item) => (
                <a href={item.href} key={item.label} rel="noreferrer" target="_blank">
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
