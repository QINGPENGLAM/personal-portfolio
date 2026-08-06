'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { usePortfolioAudio } from '@/components/audio/AudioProvider'
import { CaseStudyDialog } from '@/components/case-study/CaseStudyDialog'
import { projects } from '@/data/projects'
import { getWorldLandmark, isWorldPanelKind, worldLandmarks, type WorldLandmarkKind, type WorldPanelKind } from '@/data/world'
import { getWorldTourStop, worldTourStops, type WorldTourStopId } from '@/data/world-tour'
import { getProjectBySlug } from '@/lib/projects'
import { trackPortfolioEvent } from '@/lib/analytics'
import { resolveQualityMode, type MovementInput, type QualityMode, type QualitySignals, type ResolvedQualityMode } from '@/lib/world'
import { WorldErrorBoundary } from './WorldErrorBoundary'
import { WorldFallback } from './WorldFallback'
import { LandmarkPanelDialog } from './LandmarkPanelDialog'
import { WorldLoadingScreen } from './WorldLoadingScreen'

const WorldCanvas = dynamic(() => import('./WorldCanvas'), {
  ssr: false,
  loading: () => null,
})

type WebGLStatus = 'checking' | 'available' | 'unavailable'

const initialMovement: MovementInput = { forward: false, backward: false, left: false, right: false }

function detectWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

function getDeviceMemory() {
  return (navigator as Navigator & { deviceMemory?: number }).deviceMemory
}

export function WorldExperience() {
  const router = useRouter()
  const { play } = usePortfolioAudio()
  const movementRef = useRef<MovementInput>({ ...initialMovement })
  const projectOpenTimerRef = useRef<number | null>(null)
  const tourTimerRef = useRef<number | null>(null)
  const [activeId, setActiveId] = useState<WorldLandmarkKind | null>(null)
  const [activeProjectSlug, setActiveProjectSlug] = useState<string | null>(null)
  const [openProjectSlug, setOpenProjectSlug] = useState<string | null>(null)
  const [openPanelId, setOpenPanelId] = useState<WorldPanelKind | null>(null)
  const [canvasReady, setCanvasReady] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [qualityMode, setQualityMode] = useState<QualityMode>('automatic')
  const [runtimeOverride, setRuntimeOverride] = useState<ResolvedQualityMode | null>(null)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [showHelp, setShowHelp] = useState(true)
  const [theme, setTheme] = useState<'day' | 'night'>('night')
  const [webGLStatus, setWebGLStatus] = useState<WebGLStatus>('checking')
  const [activeTourStopId, setActiveTourStopId] = useState<WorldTourStopId | null>(null)
  const [tourPaused, setTourPaused] = useState(false)
  const [qualitySignals, setQualitySignals] = useState<QualitySignals>({ width: 1280, devicePixelRatio: 1, reducedMotion: false })
  const activeLandmark = getWorldLandmark(activeId)
  const activeProject = getProjectBySlug(activeProjectSlug)
  const openProject = getProjectBySlug(openProjectSlug)
  const activeTourStop = getWorldTourStop(activeTourStopId)
  const activeTourIndex = activeTourStop ? worldTourStops.findIndex((stop) => stop.id === activeTourStop.id) : -1

  const syncOverlayFromUrl = useCallback(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const project = getProjectBySlug(searchParams.get('project'))
    const panelId = searchParams.get('panel')
    const panel = isWorldPanelKind(panelId) ? panelId : null
    const tourStop = project || panel ? null : getWorldTourStop(searchParams.get('tour'))
    setOpenProjectSlug(project?.slug ?? null)
    setActiveProjectSlug(project?.slug ?? null)
    setOpenPanelId(project ? null : panel)
    setActiveTourStopId(tourStop?.id ?? null)
    if (project) setActiveId('projects')
    else if (panel) setActiveId(panel)
    else if (tourStop) setActiveId(tourStop.landmarkId)
    else setActiveId(null)
  }, [])

  const setTourStep = useCallback((stopId: WorldTourStopId, mode: 'push' | 'replace' = 'replace') => {
    const stop = getWorldTourStop(stopId)
    if (!stop) return
    const url = new URL(window.location.href)
    url.searchParams.delete('project')
    url.searchParams.delete('panel')
    url.searchParams.set('tour', stop.id)
    const state = { ...(window.history.state ?? {}), qingpengWorldTour: true }
    window.history[mode === 'push' ? 'pushState' : 'replaceState'](state, '', `${url.pathname}${url.search}${url.hash}`)
    setOpenProjectSlug(null)
    setActiveProjectSlug(null)
    setOpenPanelId(null)
    setActiveTourStopId(stop.id)
    setActiveId(stop.landmarkId)
    play('landmark')
  }, [play])

  const startTour = useCallback(() => {
    setTourPaused(false)
    setShowHelp(false)
    setTourStep(worldTourStops[0].id, 'push')
    trackPortfolioEvent('guided_tour_started')
  }, [setTourStep])

  const closeTour = useCallback(() => {
    if (tourTimerRef.current) {
      window.clearTimeout(tourTimerRef.current)
      tourTimerRef.current = null
    }
    if (window.history.state?.qingpengWorldTour) {
      window.history.back()
      return
    }
    const url = new URL(window.location.href)
    url.searchParams.delete('tour')
    window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`)
    setActiveTourStopId(null)
    setActiveId(null)
  }, [])

  const moveTour = useCallback((offset: number) => {
    if (activeTourIndex < 0) return
    const nextStop = worldTourStops[activeTourIndex + offset]
    if (nextStop) setTourStep(nextStop.id)
  }, [activeTourIndex, setTourStep])

  const closeProject = useCallback(() => {
    if (projectOpenTimerRef.current) {
      window.clearTimeout(projectOpenTimerRef.current)
      projectOpenTimerRef.current = null
    }
    if (window.history.state?.qingpengProjectOverlay) {
      window.history.back()
      return
    }

    const url = new URL(window.location.href)
    url.searchParams.delete('project')
    window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`)
    setOpenProjectSlug(null)
    setActiveProjectSlug(null)
  }, [])

  const openProjectCaseStudy = useCallback((slug: string) => {
    const project = getProjectBySlug(slug)
    if (!project) return
    if (projectOpenTimerRef.current) {
      window.clearTimeout(projectOpenTimerRef.current)
      projectOpenTimerRef.current = null
    }
    const url = new URL(window.location.href)
    url.searchParams.delete('panel')
    url.searchParams.set('project', project.slug)
    window.history.pushState({ ...(window.history.state ?? {}), qingpengProjectOverlay: project.slug }, '', `${url.pathname}${url.search}${url.hash}`)
    setOpenProjectSlug(project.slug)
    trackPortfolioEvent('project_opened')
    play('portal')
  }, [play])

  const closePanel = useCallback(() => {
    if (window.history.state?.qingpengLandmarkPanel) {
      window.history.back()
      return
    }

    const url = new URL(window.location.href)
    url.searchParams.delete('panel')
    window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`)
    setOpenPanelId(null)
  }, [])

  const openLandmarkPanel = useCallback((panelId: WorldPanelKind) => {
    const url = new URL(window.location.href)
    url.searchParams.delete('project')
    url.searchParams.set('panel', panelId)
    window.history.pushState({ ...(window.history.state ?? {}), qingpengLandmarkPanel: panelId }, '', `${url.pathname}${url.search}${url.hash}`)
    setOpenPanelId(panelId)
    play('portal')
  }, [play])

  useEffect(() => {
    const initializationTimer = window.setTimeout(() => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      const prefersReducedMotion = mediaQuery.matches
      const storedTheme = window.localStorage.getItem('qingpeng-portfolio-theme')
      const storedQuality = window.localStorage.getItem('qingpeng-world-quality')
      const forcedFallback = new URLSearchParams(window.location.search).get('fallback') === '1'

      setReducedMotion(prefersReducedMotion)
      const preferredTheme = storedTheme === 'day' || storedTheme === 'night' ? storedTheme : window.matchMedia('(prefers-color-scheme: light)').matches ? 'day' : 'night'
      setTheme(preferredTheme)
      setQualityMode(storedQuality === 'high' || storedQuality === 'balanced' || storedQuality === 'performance' ? storedQuality : 'automatic')
      setQualitySignals({ width: window.innerWidth, devicePixelRatio: window.devicePixelRatio || 1, reducedMotion: prefersReducedMotion, deviceMemory: getDeviceMemory() })
      setWebGLStatus(!forcedFallback && detectWebGL() ? 'available' : 'unavailable')
      document.documentElement.dataset.theme = preferredTheme
      syncOverlayFromUrl()
      trackPortfolioEvent('world_entered')
    })

    return () => window.clearTimeout(initializationTimer)
  }, [syncOverlayFromUrl])

  useEffect(() => {
    window.addEventListener('popstate', syncOverlayFromUrl)
    return () => window.removeEventListener('popstate', syncOverlayFromUrl)
  }, [syncOverlayFromUrl])

  useEffect(() => () => {
    if (projectOpenTimerRef.current) window.clearTimeout(projectOpenTimerRef.current)
    if (tourTimerRef.current) window.clearTimeout(tourTimerRef.current)
  }, [])

  useEffect(() => {
    const handleVisibility = () => setIsVisible(!document.hidden)
    const handleResize = () => setQualitySignals((current) => ({ ...current, width: window.innerWidth, devicePixelRatio: window.devicePixelRatio || 1 }))
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLElement && (event.target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName))) return
      if (event.code === 'KeyR') {
        router.push('/#quick-view')
        event.preventDefault()
      } else if (event.code === 'Escape') {
        if (openProjectSlug) closeProject()
        else if (openPanelId) closePanel()
        else if (activeTourStop) closeTour()
        else { setActiveId(null); setActiveProjectSlug(null) }
        event.preventDefault()
      } else if (event.code === 'KeyH' && !event.repeat) {
        setShowHelp((current) => !current)
        event.preventDefault()
      }
    }

    document.addEventListener('visibilitychange', handleVisibility)
    window.addEventListener('resize', handleResize, { passive: true })
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeTourStop, closePanel, closeProject, closeTour, openPanelId, openProjectSlug, router])

  useEffect(() => {
    if (!activeTourStop || !canvasReady || tourPaused || reducedMotion || !isVisible || openProject || openPanelId || activeTourIndex >= worldTourStops.length - 1) return
    tourTimerRef.current = window.setTimeout(() => moveTour(1), 8_500)
    return () => {
      if (tourTimerRef.current) window.clearTimeout(tourTimerRef.current)
      tourTimerRef.current = null
    }
  }, [activeTourIndex, activeTourStop, canvasReady, isVisible, moveTour, openPanelId, openProject, reducedMotion, tourPaused])

  useEffect(() => {
    if (!activeTourStop) return
    const frame = window.requestAnimationFrame(() => {
      document.querySelector('.world-stage')?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [activeTourStop, reducedMotion])

  const resolvedQuality = useMemo(
    () => resolveQualityMode(runtimeOverride ?? qualityMode, qualitySignals),
    [qualityMode, qualitySignals, runtimeOverride],
  )

  const handleQualityDecline = useCallback(() => {
    setRuntimeOverride('performance')
  }, [])

  const selectQuality = (mode: QualityMode) => {
    setQualityMode(mode)
    setRuntimeOverride(null)
    window.localStorage.setItem('qingpeng-world-quality', mode)
  }

  const toggleTheme = () => {
    const nextTheme = theme === 'night' ? 'day' : 'night'
    setTheme(nextTheme)
    document.documentElement.dataset.theme = nextTheme
    window.localStorage.setItem('qingpeng-portfolio-theme', nextTheme)
  }

  const setTouchDirection = (direction: keyof MovementInput, pressed: boolean) => {
    movementRef.current[direction] = pressed
  }

  const resetFocus = () => {
    if (activeTourStop) {
      closeTour()
      return
    }
    if (projectOpenTimerRef.current) {
      window.clearTimeout(projectOpenTimerRef.current)
      projectOpenTimerRef.current = null
    }
    setActiveId(null)
    setActiveProjectSlug(null)
  }

  const selectLandmark = (id: WorldLandmarkKind | null) => {
    setActiveId(id)
    if (id !== 'projects') setActiveProjectSlug(null)
    if (id) play('landmark')
  }

  const selectProject = (slug: string) => {
    if (!getProjectBySlug(slug)) return
    if (projectOpenTimerRef.current) window.clearTimeout(projectOpenTimerRef.current)
    setActiveId('projects')
    setActiveProjectSlug(slug)
    projectOpenTimerRef.current = window.setTimeout(() => openProjectCaseStudy(slug), reducedMotion ? 0 : 620)
  }

  if (webGLStatus === 'checking') {
    return <div className="world-stage world-stage-checking"><WorldLoadingScreen onUseFallback={() => setWebGLStatus('unavailable')} progress={25} status="Checking WebGL capability" /></div>
  }

  if (webGLStatus === 'unavailable') {
    return <WorldFallback reason="WebGL is unavailable or the fallback mode was requested." />
  }

  return (
    <section className={`world-stage is-${theme}${activeTourStop ? ' is-tour-active' : ''}`} aria-label="Interactive portfolio world">
      <WorldErrorBoundary>
        <WorldCanvas
          activeId={activeId}
          activeProjectSlug={activeProjectSlug}
          cameraTarget={activeTourStop?.cameraTarget ?? null}
          isVisible={isVisible && !openProject && !openPanelId}
          movementRef={movementRef}
          onQualityDecline={handleQualityDecline}
          onReady={() => setCanvasReady(true)}
          onSelect={selectLandmark}
          onSelectProject={selectProject}
          quality={resolvedQuality}
          reducedMotion={reducedMotion}
          theme={theme}
        />
      </WorldErrorBoundary>

      {!canvasReady ? <WorldLoadingScreen onUseFallback={() => setWebGLStatus('unavailable')} progress={72} status="Connecting renderer and project nodes" /> : null}

      <div className="world-hud-top">
        <div className="world-live-status"><span /> World online <small>{resolvedQuality.mode} quality</small></div>
        <div className="world-hud-actions">
          <label>
            <span className="sr-only">World quality</span>
            <select aria-label="World quality" onChange={(event) => selectQuality(event.target.value as QualityMode)} value={qualityMode}>
              <option value="automatic">Auto quality</option>
              <option value="high">High quality</option>
              <option value="balanced">Balanced</option>
              <option value="performance">Performance</option>
            </select>
          </label>
          <button aria-label={`Switch world to ${theme === 'night' ? 'day' : 'night'} mode`} onClick={toggleTheme} type="button">{theme === 'night' ? '☼ Day' : '☾ Night'}</button>
          <button aria-pressed={Boolean(activeTourStop)} onClick={activeTourStop ? closeTour : startTour} type="button">{activeTourStop ? 'Exit tour' : 'Guided tour'}</button>
          <button onClick={resetFocus} type="button">Reset camera</button>
        </div>
      </div>

      {showHelp ? (
        <div className="world-help" aria-label="World controls">
          <p><strong>Explore</strong><span>Move through the connected system.</span></p>
          <div><span><kbd>WASD</kbd> move</span><span><kbd>Drag</kbd> look</span><span><kbd>H</kbd> hide</span><span><kbd>R</kbd> recruiter view</span></div>
          <button aria-label="Hide world controls" onClick={() => setShowHelp(false)} type="button">×</button>
        </div>
      ) : <button className="world-help-toggle" onClick={() => setShowHelp(true)} type="button">Show controls</button>}

      {activeTourStop ? (
        <aside aria-label="Guided world tour" aria-live="polite" className="guided-tour-card" style={{ '--tour-accent': activeTourStop.accent } as CSSProperties}>
          <div className="guided-tour-progress"><span>{activeTourIndex + 1} / {worldTourStops.length}</span><div aria-label="Guided tour progress" aria-valuemax={worldTourStops.length} aria-valuemin={1} aria-valuenow={activeTourIndex + 1} role="progressbar"><i style={{ width: `${((activeTourIndex + 1) / worldTourStops.length) * 100}%` }} /></div></div>
          <p>{activeTourStop.eyebrow}</p>
          <h2>{activeTourStop.title}</h2>
          <p>{activeTourStop.description}</p>
          <div className="guided-tour-actions">
            <button disabled={activeTourIndex === 0} onClick={() => moveTour(-1)} type="button">Previous</button>
            {!reducedMotion && activeTourIndex < worldTourStops.length - 1 ? <button aria-pressed={tourPaused} onClick={() => setTourPaused((current) => !current)} type="button">{tourPaused ? 'Resume' : 'Pause'}</button> : null}
            {activeTourIndex < worldTourStops.length - 1 ? <button className="is-primary" onClick={() => moveTour(1)} type="button">Next stop</button> : <button className="is-primary" onClick={closeTour} type="button">Finish tour</button>}
            <Link href={activeTourStop.href}>{activeTourStop.actionLabel} <span aria-hidden="true">↗</span></Link>
          </div>
          {reducedMotion ? <small>Manual steps are enabled for reduced motion.</small> : <small>{tourPaused ? 'Cinematic auto-advance paused.' : 'Auto-advances after a short reading interval.'}</small>}
        </aside>
      ) : activeProject ? (
        <aside className="landmark-focus-card project-focus-card" style={{ '--landmark-accent': activeProject.landmark.accent } as CSSProperties}>
          <span className="landmark-focus-index">Project landmark</span>
          <h2>{activeProject.title}</h2>
          <p>{activeProject.shortDescription}</p>
          <div><button className="button button-primary" onClick={() => openProjectCaseStudy(activeProject.slug)} type="button">Open case study</button><button className="button button-secondary" onClick={() => setActiveProjectSlug(null)} type="button">Project district</button></div>
        </aside>
      ) : activeLandmark ? (
        <aside className="landmark-focus-card" style={{ '--landmark-accent': activeLandmark.accent } as CSSProperties}>
          <span className="landmark-focus-index">Focused landmark</span>
          <h2>{activeLandmark.label}</h2>
          <p>{activeLandmark.detail}</p>
          <div>{isWorldPanelKind(activeLandmark.id) ? <button className="button button-primary" onClick={() => { if (isWorldPanelKind(activeLandmark.id)) openLandmarkPanel(activeLandmark.id) }} type="button">Preview dossier</button> : <Link className="button button-primary" href={activeLandmark.href}>Open section</Link>}<button className="button button-secondary" onClick={resetFocus} type="button">Keep exploring</button></div>
        </aside>
      ) : null}

      <nav aria-label="Featured project landmarks" className="world-project-dock">
        <span>Project nodes</span>
        {projects.map((project) => <button aria-current={activeProjectSlug === project.slug ? 'true' : undefined} aria-label={`Open ${project.title} project case study`} key={project.slug} onClick={() => selectProject(project.slug)} style={{ '--landmark-accent': project.landmark.accent } as CSSProperties} type="button"><i /><strong>{project.title}</strong></button>)}
      </nav>

      <nav aria-label="World landmarks" className="world-landmark-dock">
        {worldLandmarks.map((landmark) => (
          <button aria-current={activeId === landmark.id ? 'true' : undefined} aria-label={`Focus ${landmark.label}`} key={landmark.id} onClick={() => selectLandmark(landmark.id)} style={{ '--landmark-accent': landmark.accent } as CSSProperties} type="button"><span /><strong>{landmark.label.replace(/ (District|Tower|Observatory|Workshop|Archive|Terminal|Portal)$/, '')}</strong></button>
        ))}
      </nav>

      <div className="world-touch-controls" aria-label="Touch movement controls">
        {([
          ['forward', '↑', 'Move forward'], ['left', '←', 'Move left'], ['backward', '↓', 'Move backward'], ['right', '→', 'Move right'],
        ] as const).map(([direction, symbol, label]) => (
          <button
            aria-label={label}
            className={`touch-${direction}`}
            key={direction}
            onPointerCancel={() => setTouchDirection(direction, false)}
            onPointerDown={(event) => { event.preventDefault(); setTouchDirection(direction, true) }}
            onPointerLeave={() => setTouchDirection(direction, false)}
            onPointerUp={() => setTouchDirection(direction, false)}
            type="button"
          >{symbol}</button>
        ))}
      </div>

      {runtimeOverride ? <p className="quality-notice" role="status">Performance mode enabled after sustained frame slowdown.</p> : null}
      {openProject ? <CaseStudyDialog onRequestClose={closeProject} project={openProject} /> : null}
      {openPanelId ? <LandmarkPanelDialog onRequestClose={closePanel} panelId={openPanelId} /> : null}
    </section>
  )
}
