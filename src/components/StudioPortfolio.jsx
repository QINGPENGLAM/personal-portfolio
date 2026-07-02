import { useEffect, useMemo, useRef, useState } from 'react'
import { portfolioExperience } from '../data/portfolioArchive'
import { profile } from '../data/profile'

const studioThemes = ['rose', 'linen', 'sage']
const introLines = [
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

function getUpcomingProjects(projects, startIndex, count = 2) {
  if (!projects.length) {
    return []
  }

  return Array.from({ length: count }, (_, index) => projects[(startIndex + index + 1) % projects.length]).filter(Boolean)
}

function ProjectFigure({ project, variant = 'main' }) {
  return (
    <article className={`studio-v2-preview-card is-${variant}`} style={{ '--studio-project-accent': project.color }}>
      <div className="studio-v2-preview-frame">
        {project.previewSrc ? (
          <img
            alt={project.previewAlt ?? `${project.title} preview`}
            className={`studio-v2-preview-image${project.previewFit === 'contain' ? ' is-contain' : ''}`}
            loading="lazy"
            src={project.previewSrc}
          />
        ) : (
          <div className="studio-v2-preview-fallback">
            <span>{project.stationLabel}</span>
            <strong>{project.shortLabel}</strong>
          </div>
        )}
      </div>

      <div className="studio-v2-preview-meta">
        <span>{project.category}</span>
        <span>{extractYear(project.period)}</span>
      </div>
    </article>
  )
}

function StageLayer({
  direction,
  nextProjects = [],
  onOpenProject,
  project,
  projectIndex,
  state,
  totalProjects,
}) {
  const isCurrent = state === 'enter'

  return (
    <article className={`studio-v2-stage-layer is-${state} is-${direction > 0 ? 'next' : 'prev'}`}>
      <div className="studio-v2-stage-counter">
        <span>Project</span>
        <strong>{String(projectIndex + 1).padStart(2, '0')}</strong>
        <span>{String(totalProjects).padStart(2, '0')}</span>
      </div>

      <div className="studio-v2-stage-caption">
        <div className="studio-v2-stage-caption-line">
          <span>
            {project.category}. {extractYear(project.period)}
          </span>
          <span>{project.location}</span>
        </div>

        <p>{project.summary}</p>

        {isCurrent ? (
          <div className="studio-v2-stage-links">
            <button className="studio-v2-link-button" onClick={() => onOpenProject(project.id)} type="button">
              Open case study
            </button>

            {project.repoUrl ? (
              <a className="studio-v2-link-button is-ghost" href={project.repoUrl} rel="noreferrer" target="_blank">
                {project.repoLabel ?? 'Visit'}
              </a>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="studio-v2-stage-main">
        <ProjectFigure project={project} variant="main" />

        {isCurrent && nextProjects.length ? (
          <div className="studio-v2-preview-queue" aria-hidden="true">
            {nextProjects.map((nextProject, index) => (
              <ProjectFigure key={nextProject.id} project={nextProject} variant={`stack-${index + 1}`} />
            ))}
          </div>
        ) : null}
      </div>

      <div className="studio-v2-stage-word">
        <h2>{getDisplayWord(project)}</h2>
        <p>{project.title}</p>
      </div>
    </article>
  )
}

export default function StudioPortfolio({ onOpenProject, onSwitchToRoom, projects }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [themeIndex, setThemeIndex] = useState(0)
  const [clockLabel, setClockLabel] = useState(formatClock)
  const [transitionState, setTransitionState] = useState({
    direction: 1,
    previousIndex: null,
    token: 0,
  })
  const transitionTimeoutRef = useRef(null)

  const totalProjects = projects.length
  const activeProject = projects[activeIndex] ?? projects[0] ?? null
  const previousProject = transitionState.previousIndex != null ? projects[transitionState.previousIndex] ?? null : null
  const featuredExperience = portfolioExperience.slice(0, 3)
  const currentTheme = studioThemes[themeIndex % studioThemes.length]
  const upcomingProjects = useMemo(() => getUpcomingProjects(projects, activeIndex, 2), [activeIndex, projects])

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
    return () => {
      if (transitionTimeoutRef.current) {
        window.clearTimeout(transitionTimeoutRef.current)
      }
    }
  }, [])

  const activateProject = (nextIndex) => {
    if (!totalProjects) {
      return
    }

    const normalizedIndex = (nextIndex + totalProjects) % totalProjects

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
    }, 760)
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

  if (!activeProject) {
    return null
  }

  return (
    <div className="studio-v2" data-theme={currentTheme}>
      <header className="studio-v2-header">
        <a className="studio-v2-brand" href="#studio-top">
          <span>Q</span>
          <span>/</span>
          <span>L</span>
        </a>

        <p className="studio-v2-clock">San Antonio, {clockLabel}</p>

        <nav aria-label="Studio sections" className="studio-v2-nav">
          <a href="#studio-projects">Projects</a>
          <a href="#studio-about">About</a>
        </nav>

        <button
          className="studio-v2-theme-button"
          onClick={() => setThemeIndex((currentIndex) => (currentIndex + 1) % studioThemes.length)}
          type="button"
        >
          Change Color Theme
        </button>
      </header>

      <section className="studio-v2-intro" id="studio-top">
        <div className="studio-v2-progress">100%</div>

        <p className="studio-v2-intro-copy">
          {introLines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>

        <div className="studio-v2-intro-footer">
          <span>portfolio 2026</span>
          <span>scroll</span>
        </div>
      </section>

      <section className="studio-v2-stage" id="studio-projects">
        <div className="studio-v2-stage-frame">
          {previousProject ? (
            <StageLayer
              direction={transitionState.direction}
              key={`exit-${previousProject.id}-${transitionState.token}`}
              onOpenProject={onOpenProject}
              project={previousProject}
              projectIndex={transitionState.previousIndex ?? 0}
              state="exit"
              totalProjects={totalProjects}
            />
          ) : null}

          <StageLayer
            direction={transitionState.direction}
            key={`enter-${activeProject.id}-${transitionState.token}`}
            nextProjects={upcomingProjects}
            onOpenProject={onOpenProject}
            project={activeProject}
            projectIndex={activeIndex}
            state="enter"
            totalProjects={totalProjects}
          />
        </div>
      </section>

      <section className="studio-v2-controller" aria-label="Project controls">
        <button className="studio-v2-nav-button" onClick={() => activateProject(activeIndex - 1)} type="button">
          Previous project
        </button>

        <div className="studio-v2-number-row">
          {projects.map((project, index) => (
            <button
              aria-label={`Open ${project.title}`}
              className={`studio-v2-number-button${index === activeIndex ? ' is-active' : ''}`}
              key={project.id}
              onClick={() => activateProject(index)}
              onFocus={() => activateProject(index)}
              onMouseEnter={() => activateProject(index)}
              type="button"
            >
              {String(index + 1).padStart(2, '0')}
            </button>
          ))}
        </div>

        <button className="studio-v2-nav-button" onClick={() => activateProject(activeIndex + 1)} type="button">
          Next project
        </button>
      </section>

      <section className="studio-v2-project-list" aria-label="Project list">
        {projects.map((project, index) => (
          <button
            className={`studio-v2-project-row${index === activeIndex ? ' is-active' : ''}`}
            key={project.id}
            onClick={() => activateProject(index)}
            onFocus={() => activateProject(index)}
            onMouseEnter={() => activateProject(index)}
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
          <button className="studio-v2-link-button is-ghost" onClick={onSwitchToRoom} type="button">
            3D Room
          </button>
        </div>
      </footer>
    </div>
  )
}
