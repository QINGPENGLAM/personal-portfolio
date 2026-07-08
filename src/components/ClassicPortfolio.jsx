import { useEffect, useRef, useState } from 'react'
import { portfolioExperience, portfolioOnlyProjects } from '../data/portfolioArchive'
import { profile } from '../data/profile'
import { getProjectLinks } from '../utils/projectLinks'

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
    const palette = [
      [243, 199, 95],
      [140, 180, 255],
      [110, 228, 255],
      [196, 156, 255],
      [255, 148, 122],
      [142, 228, 197],
    ]

    const createParticle = (width, height) => {
      const [red, green, blue] = palette[Math.floor(Math.random() * palette.length)]

      return {
        baseOpacity: Math.random() * 0.32 + 0.16,
        drift: Math.random() * 0.55 + 0.2,
        pulseOffset: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        radius: Math.random() * 2 + 0.75,
        red,
        green,
        blue,
        speedX: (Math.random() - 0.5) * 0.22,
        speedY: Math.random() * 0.16 + 0.04,
        swayOffset: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.018 + 0.005,
        x: Math.random() * width,
        y: Math.random() * height,
      }
    }

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      const width = Math.max(rect.width, 1)
      const height = Math.max(rect.height, 1)
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const particleCount = width < 768 ? 42 : 74

      canvas.width = width * dpr
      canvas.height = height * dpr
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      particles = Array.from({ length: particleCount }, () => createParticle(width, height))
    }

    const renderFrame = () => {
      const width = canvas.width / Math.min(window.devicePixelRatio || 1, 2)
      const height = canvas.height / Math.min(window.devicePixelRatio || 1, 2)
      const time = window.performance.now() * 0.0018

      context.clearRect(0, 0, width, height)
      context.globalCompositeOperation = 'screen'

      particles.forEach((particle) => {
        const swayX = Math.sin(time * (particle.swaySpeed * 90) + particle.swayOffset) * particle.drift
        const swayY = Math.cos(time * (particle.swaySpeed * 72) + particle.swayOffset) * particle.drift * 0.35
        const shimmer = 0.76 + Math.sin(time * (particle.pulseSpeed * 120) + particle.pulseOffset) * 0.24
        const opacity = Math.min(0.92, particle.baseOpacity * shimmer + 0.08)

        particle.x += particle.speedX + swayX * 0.08
        particle.y += particle.speedY + swayY * 0.05

        if (particle.x < -8) {
          particle.x = width + 8
        } else if (particle.x > width + 8) {
          particle.x = -8
        }

        if (particle.y > height + 8) {
          particle.y = -8
          particle.x = Math.random() * width
        }

        context.shadowBlur = particle.radius * (4.2 + shimmer * 4.5)
        context.shadowColor = `rgba(${particle.red}, ${particle.green}, ${particle.blue}, ${opacity * 0.85})`
        context.fillStyle = `rgba(${particle.red}, ${particle.green}, ${particle.blue}, ${opacity})`
        context.beginPath()
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        context.fill()
      })

      context.shadowBlur = 0
      context.globalCompositeOperation = 'source-over'
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
  const projectLinks = getProjectLinks(project)

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

          {projectLinks.map((link) => (
            <a className="portfolio-card-link" href={link.href} key={link.href} rel="noreferrer" target="_blank">
              {link.label}
            </a>
          ))}
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
      <div aria-hidden="true" className="portfolio-page-aura is-center" />
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
          <div aria-hidden="true" className="portfolio-hero-glow is-tertiary" />
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
            <span>projects across current work and past builds</span>
          </article>
          <article {...interactiveSurfaceProps} className="portfolio-stat-card glass-surface interactive-surface">
            <strong>{allExperienceCount}</strong>
            <span>roles spanning software engineering, data systems, research, and education</span>
          </article>
          <article {...interactiveSurfaceProps} className="portfolio-stat-card glass-surface interactive-surface">
            <strong>{portfolioOnlyProjects.length}</strong>
            <span>additional archived and resume projects</span>
          </article>
        </section>

        <section className="portfolio-section" id="experience">
          <div className="portfolio-section-heading">
            <div>
              <p className="eyebrow">Experience</p>
              <h2>Selected Experience</h2>
            </div>
          </div>

          <div className="portfolio-subsection">
            <div className="portfolio-subsection-heading">
              <h3>Recent Roles</h3>
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
              <h2>Selected Projects</h2>
            </div>
          </div>

          <div className="portfolio-subsection">
            <div className="portfolio-subsection-heading">
              <h3>Featured Projects</h3>
            </div>

            <div className="portfolio-project-grid">
              {featuredProjects.map((project) => (
                <FeaturedProjectCard key={project.id} onOpenProject={onOpenProject} project={project} />
              ))}
            </div>
          </div>

          <div className="portfolio-subsection">
            <div className="portfolio-subsection-heading">
              <h3>GitHub Archive + Additional Work</h3>
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
