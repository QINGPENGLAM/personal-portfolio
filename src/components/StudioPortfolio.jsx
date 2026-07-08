import { useEffect, useRef, useState } from 'react'
import { portfolioExperience } from '../data/portfolioArchive'
import { profile } from '../data/profile'
import { getProjectLinks } from '../utils/projectLinks'

const studioThemes = ['rose', 'linen', 'sage']
const STUDIO_TRANSITION_MS = 920
const studioNoteLines = [
  "Ciao, I'm QingPeng. A software engineer",
  'building AI workflows, data systems,',
  'and interactive digital experiences.',
]

function extractYear(period) {
  const matches = period.match(/20\d{2}/g)
  return matches?.[matches.length - 1] ?? 'Now'
}

function formatClock() {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'America/Chicago',
    timeZoneName: 'short',
  }).format(new Date())
}

function getDisplayWord(project) {
  return (project.shortLabel || project.id).toLowerCase().replace(/[^a-z0-9]/g, '')
}

function normalizeIndex(value, total) {
  return ((value % total) + total) % total
}

function HeroPreview({ onOpenProject, project }) {
  return (
    <button
      className="studio-v2-hero-preview-button"
      onClick={() => onOpenProject(project.id)}
      type="button"
    >
      <div className="studio-v2-hero-preview-frame">
        {project.previewSrc ? (
          <img
            alt={project.previewAlt ?? `${project.title} preview`}
            className={`studio-v2-hero-preview-image${project.previewFit === 'contain' ? ' is-contain' : ''}`}
            loading="lazy"
            src={project.previewSrc}
          />
        ) : (
          <div className="studio-v2-hero-preview-fallback">
            <span>{project.stationLabel}</span>
            <strong>{project.shortLabel}</strong>
          </div>
        )}
      </div>
      <p>{project.title}</p>
    </button>
  )
}

function HeroLayer({ direction, onOpenProject, project, state }) {
  const projectLinks = getProjectLinks(project)

  return (
    <article
      className={`studio-v2-hero-layer is-${state} is-${direction > 0 ? 'next' : 'prev'}`}
      style={{ '--studio-project-accent': project.color }}
    >
      <div className="studio-v2-hero-aurora" aria-hidden="true">
        <span className="studio-v2-hero-blob is-one" />
        <span className="studio-v2-hero-blob is-two" />
        <span className="studio-v2-hero-blob is-three" />
      </div>

      <div className="studio-v2-hero-title-block">
        <button className="studio-v2-hero-title-button" onClick={() => onOpenProject(project.id)} type="button">
          <h2>{getDisplayWord(project)}</h2>
        </button>

        <div className="studio-v2-hero-meta">
          <span>{project.category}. {project.location ?? 'QingPeng Lam'}</span>
          <span>Year. {extractYear(project.period)}</span>
        </div>
      </div>

      <div className="studio-v2-hero-summary-row">
        <p>{project.summary}</p>

        {projectLinks.length ? (
          <div className="studio-v2-hero-link-row">
            {projectLinks.map((link) => (
              <a className="studio-v2-visit-button" href={link.href} key={link.href} rel="noreferrer" target="_blank">
                {link.label}
              </a>
            ))}
          </div>
        ) : (
          <button className="studio-v2-visit-button" onClick={() => onOpenProject(project.id)} type="button">
            Open
          </button>
        )}
      </div>

      <div className="studio-v2-hero-preview-wrap">
        <HeroPreview onOpenProject={onOpenProject} project={project} />
      </div>
    </article>
  )
}

export default function StudioPortfolio({ onOpenProject, onSwitchToPortfolio, onSwitchToRoom, projects }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [themeIndex, setThemeIndex] = useState(0)
  const [clockLabel, setClockLabel] = useState(formatClock)
  const [transitionState, setTransitionState] = useState({
    direction: 1,
    previousIndex: null,
    token: 0,
  })
  const transitionTimeoutRef = useRef(null)
  const wheelTimeoutRef = useRef(null)
  const touchStartRef = useRef(null)

  const totalProjects = projects.length
  const activeProject = projects[activeIndex] ?? projects[0] ?? null
  const previousProject = transitionState.previousIndex != null ? projects[transitionState.previousIndex] ?? null : null
  const currentTheme = studioThemes[themeIndex % studioThemes.length]
  const featuredExperience = portfolioExperience.slice(0, 3)
  const counterLabel = String(activeIndex + 1).padStart(2, '0')

  useEffect(() => {
    setClockLabel(formatClock())
    const intervalId = window.setInterval(() => {
      setClockLabel(formatClock())
    }, 60000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        window.clearTimeout(transitionTimeoutRef.current)
      }

      if (wheelTimeoutRef.current) {
        window.clearTimeout(wheelTimeoutRef.current)
      }
    }
  }, [])

  const activateProject = (nextIndex) => {
    if (!totalProjects) {
      return
    }

    const normalizedIndex = normalizeIndex(nextIndex, totalProjects)

    if (normalizedIndex === activeIndex) {
      return
    }

    const forwardDistance = (normalizedIndex - activeIndex + totalProjects) % totalProjects
    const backwardDistance = (activeIndex - normalizedIndex + totalProjects) % totalProjects
    const direction = forwardDistance <= backwardDistance ? 1 : -1

    if (transitionTimeoutRef.current) {
      window.clearTimeout(transitionTimeoutRef.current)
    }

    setTransitionState((currentValue) => ({
      direction,
      previousIndex: activeIndex,
      token: currentValue.token + 1,
    }))
    setActiveIndex(normalizedIndex)

    transitionTimeoutRef.current = window.setTimeout(() => {
      setTransitionState((currentValue) => ({
        ...currentValue,
        previousIndex: null,
      }))
      transitionTimeoutRef.current = null
    }, STUDIO_TRANSITION_MS)
  }

  useEffect(() => {
    if (!totalProjects) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        activateProject(activeIndex + 1)
      }

      if (event.key === 'ArrowLeft') {
        activateProject(activeIndex - 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeIndex, totalProjects])

  const handleHeroWheel = (event) => {
    if (wheelTimeoutRef.current || !totalProjects) {
      return
    }

    const dominantDelta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY

    if (Math.abs(dominantDelta) < 36) {
      return
    }

    event.preventDefault()
    activateProject(activeIndex + (dominantDelta > 0 ? 1 : -1))

    wheelTimeoutRef.current = window.setTimeout(() => {
      wheelTimeoutRef.current = null
    }, STUDIO_TRANSITION_MS - 120)
  }

  const handleTouchStart = (event) => {
    const touch = event.touches[0]

    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
    }
  }

  const handleTouchEnd = (event) => {
    if (!touchStartRef.current) {
      return
    }

    const touch = event.changedTouches[0]
    const deltaX = touch.clientX - touchStartRef.current.x
    const deltaY = touch.clientY - touchStartRef.current.y

    touchStartRef.current = null

    if (Math.abs(deltaX) < 44 || Math.abs(deltaX) <= Math.abs(deltaY)) {
      return
    }

    activateProject(activeIndex + (deltaX < 0 ? 1 : -1))
  }

  if (!activeProject) {
    return null
  }

  return (
    <div className="studio-v2" data-theme={currentTheme}>
      <header className="studio-v2-header">
        <a className="studio-v2-brand" href="#studio-top">
          <span>Q</span>
          <span>L</span>
        </a>

        <p className="studio-v2-clock">San Antonio, {clockLabel}</p>

        <nav aria-label="Studio sections" className="studio-v2-nav">
          <a href="#studio-projects">Projects</a>
          <a href="#studio-about">About</a>
        </nav>

        <button
          aria-label="Change Color Theme"
          className="studio-v2-theme-button"
          onClick={() => setThemeIndex((currentIndex) => (currentIndex + 1) % studioThemes.length)}
          title="Change Color Theme"
          type="button"
        />
      </header>

      <section
        className="studio-v2-hero"
        id="studio-top"
        onTouchEnd={handleTouchEnd}
        onTouchStart={handleTouchStart}
        onWheel={handleHeroWheel}
      >
        <span className="studio-v2-side-note is-left">portfolio 2026</span>
        <span className="studio-v2-side-note is-right">scroll</span>

        <div className="studio-v2-counter-dial">
          <span className="studio-v2-counter-label is-top">Project</span>

          <div className="studio-v2-counter-digits" aria-hidden="true">
            <strong>{counterLabel[0]}</strong>
            <strong>{counterLabel[1]}</strong>
          </div>

          <span className="studio-v2-counter-label is-bottom">Number</span>

          <button
            aria-label="Previous project"
            className="studio-v2-counter-arrow is-prev"
            onClick={() => activateProject(activeIndex - 1)}
            type="button"
          >
            <span aria-hidden="true">←</span>
          </button>

          <button
            aria-label="Next project"
            className="studio-v2-counter-arrow is-next"
            onClick={() => activateProject(activeIndex + 1)}
            type="button"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>

        <div className="studio-v2-hero-note">
          {studioNoteLines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>

        <div className="studio-v2-hero-stage">
          {previousProject ? (
            <HeroLayer
              direction={transitionState.direction}
              key={`exit-${previousProject.id}-${transitionState.token}`}
              onOpenProject={onOpenProject}
              project={previousProject}
              state="exit"
            />
          ) : null}

          <HeroLayer
            direction={transitionState.direction}
            key={`enter-${activeProject.id}-${transitionState.token}`}
            onOpenProject={onOpenProject}
            project={activeProject}
            state="enter"
          />
        </div>
      </section>

      <section className="studio-v2-controller" aria-label="Project controls">
        <div className="studio-v2-number-row">
          {projects.map((project, index) => (
            <button
              aria-label={`Open ${project.title}`}
              className={`studio-v2-number-button${index === activeIndex ? ' is-active' : ''}`}
              key={project.id}
              onClick={() => activateProject(index)}
              type="button"
            >
              {String(index + 1).padStart(2, '0')}
            </button>
          ))}
        </div>

        <div className="studio-v2-controller-actions">
          <button className="studio-v2-link-button is-ghost" onClick={onSwitchToPortfolio} type="button">
            Portfolio
          </button>
          <button className="studio-v2-link-button is-ghost" onClick={onSwitchToRoom} type="button">
            3D Room
          </button>
        </div>
      </section>

      <section className="studio-v2-project-list" id="studio-projects">
        {projects.map((project, index) => (
          <button
            className={`studio-v2-project-row${index === activeIndex ? ' is-active' : ''}`}
            key={project.id}
            onClick={() => activateProject(index)}
            type="button"
          >
            <span className="studio-v2-project-row-index">{String(index + 1).padStart(2, '0')}</span>
            <span className="studio-v2-project-row-word">{getDisplayWord(project)}</span>
            <span className="studio-v2-project-row-meta">
              <strong>{project.title}</strong>
              <em>
                {project.category}. {extractYear(project.period)}
              </em>
            </span>
          </button>
        ))}
      </section>

      <section className="studio-v2-about" id="studio-about">
        <div className="studio-v2-about-copy">
          <p className="studio-v2-kicker">About</p>
          <h2>{profile.title}</h2>
          <p>{profile.intro}</p>
        </div>

        <div className="studio-v2-about-panels">
          {featuredExperience.map((experience) => (
            <article className="studio-v2-about-panel" key={experience.id}>
              <span>{experience.period}</span>
              <h3>{experience.title}</h3>
              <p>
                {experience.company} · {experience.location}
              </p>
            </article>
          ))}
        </div>
      </section>

      <footer className="studio-v2-footer">
        <p>{profile.availability}</p>

        <div className="studio-v2-footer-links">
          {profile.socials.map((social) => (
            <a href={social.href} key={social.href} rel="noreferrer" target="_blank">
              {social.label}
            </a>
          ))}
        </div>
      </footer>
    </div>
  )
}
