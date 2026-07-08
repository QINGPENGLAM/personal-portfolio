import { useEffect, useRef, useState } from 'react'
import ClassicPortfolio from './components/ClassicPortfolio'
import Experience3D from './components/Experience3D'
import ProjectPanel from './components/ProjectPanel'
import StudioPortfolio from './components/StudioPortfolio'
import { projects } from './data/projects'

const touchDirections = [
  { id: 'forward', symbol: '↑', label: 'Move forward' },
  { id: 'left', symbol: '←', label: 'Move left' },
  { id: 'backward', symbol: '↓', label: 'Move backward' },
  { id: 'right', symbol: '→', label: 'Move right' },
]

function createInputState() {
  return {
    forward: false,
    backward: false,
    left: false,
    right: false,
    turnLeft: false,
    turnRight: false,
  }
}

function clearInputState(inputState) {
  inputState.forward = false
  inputState.backward = false
  inputState.left = false
  inputState.right = false
  inputState.turnLeft = false
  inputState.turnRight = false
}

function ViewSwitcher({ onChange, viewMode }) {
  return (
    <div aria-label="Portfolio view switcher" className="view-switcher" role="tablist">
      <button
        aria-selected={viewMode === 'portfolio'}
        className={`view-switcher-button${viewMode === 'portfolio' ? ' is-active' : ''}`}
        onClick={() => onChange('portfolio')}
        role="tab"
        type="button"
      >
        Portfolio
      </button>
      <button
        aria-selected={viewMode === 'studio'}
        className={`view-switcher-button${viewMode === 'studio' ? ' is-active' : ''}`}
        onClick={() => onChange('studio')}
        role="tab"
        type="button"
      >
        Studio
      </button>
      <button
        aria-selected={viewMode === 'room'}
        className={`view-switcher-button${viewMode === 'room' ? ' is-active' : ''}`}
        onClick={() => onChange('room')}
        role="tab"
        type="button"
      >
        3D Room
      </button>
    </div>
  )
}

export default function App() {
  const movementRef = useRef(createInputState())
  const nearbyProjectRef = useRef(null)
  const [hoveredId, setHoveredId] = useState(null)
  const [nearbyId, setNearbyId] = useState(null)
  const [selectedId, setSelectedId] = useState(null)
  const [showRoomHints, setShowRoomHints] = useState(true)
  const [viewMode, setViewMode] = useState('portfolio')

  const isRoomView = viewMode === 'room'
  const isStudioView = viewMode === 'studio'
  const nearbyProject = projects.find((project) => project.id === nearbyId) ?? null
  const selectedProject = projects.find((project) => project.id === selectedId) ?? null
  const activeId = hoveredId ?? selectedId ?? nearbyId ?? null

  const closeProject = () => {
    setSelectedId(null)
    setHoveredId(null)
  }

  const switchViewMode = (nextViewMode) => {
    if (nextViewMode === viewMode) {
      return
    }

    window.scrollTo(0, 0)
    clearInputState(movementRef.current)
    setHoveredId(null)
    setNearbyId(null)
    setSelectedId(null)
    setViewMode(nextViewMode)
  }

  useEffect(() => {
    nearbyProjectRef.current = nearbyId
  }, [nearbyId])

  useEffect(() => {
    if (selectedProject) {
      const previousOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'

      return () => {
        document.body.style.overflow = previousOverflow
      }
    }

    return undefined
  }, [selectedProject])

  useEffect(() => {
    if (!isRoomView) {
      clearInputState(movementRef.current)
      return undefined
    }

    setShowRoomHints(true)
    const timeoutId = window.setTimeout(() => {
      setShowRoomHints(false)
    }, 2800)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [isRoomView])

  useEffect(() => {
    if (selectedId && isRoomView) {
      clearInputState(movementRef.current)
    }
  }, [isRoomView, selectedId])

  useEffect(() => {
    const modifierKeys = new Set([
      'ShiftLeft',
      'ShiftRight',
      'ControlLeft',
      'ControlRight',
      'AltLeft',
      'AltRight',
      'MetaLeft',
      'MetaRight',
    ])

    const keyMap = {
      KeyW: 'forward',
      KeyS: 'backward',
      KeyA: 'left',
      KeyD: 'right',
      ArrowUp: 'forward',
      ArrowDown: 'backward',
      ArrowLeft: 'turnLeft',
      ArrowRight: 'turnRight',
      KeyQ: 'turnLeft',
      KeyE: 'turnRight',
    }

    const handleKeyDown = (event) => {
      if (selectedId) {
        if (event.code === 'Escape') {
          closeProject()
          event.preventDefault()
          return
        }

        if (isRoomView && !modifierKeys.has(event.code)) {
          closeProject()
          event.preventDefault()
        }

        return
      }

      if (!isRoomView) {
        return
      }

      if (event.repeat && event.code !== 'KeyH') {
        return
      }

      if (event.code === 'KeyH') {
        setShowRoomHints((currentValue) => !currentValue)
        event.preventDefault()
        return
      }

      if (event.code === 'Escape') {
        closeProject()
        event.preventDefault()
        return
      }

      if (event.code === 'Enter' || event.code === 'Space') {
        if (hoveredId) {
          setSelectedId(hoveredId)
          event.preventDefault()
          return
        }

        if (nearbyProjectRef.current) {
          setSelectedId(nearbyProjectRef.current)
          event.preventDefault()
        }

        return
      }

      const direction = keyMap[event.code]

      if (!direction) {
        return
      }

      movementRef.current[direction] = true
      event.preventDefault()
    }

    const handleKeyUp = (event) => {
      const direction = keyMap[event.code]

      if (!direction || !isRoomView) {
        return
      }

      movementRef.current[direction] = false
      event.preventDefault()
    }

    const handleBlur = () => {
      clearInputState(movementRef.current)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    window.addEventListener('blur', handleBlur)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('blur', handleBlur)
    }
  }, [hoveredId, isRoomView, selectedId])

  const setDirection = (direction, pressed) => {
    movementRef.current[direction] = pressed
  }

  const openProject = (projectId) => {
    setSelectedId(projectId)
  }

  return (
    <main className={`app-shell is-${viewMode}`}>
      {isStudioView ? null : <ViewSwitcher onChange={switchViewMode} viewMode={viewMode} />}

      {isRoomView ? (
        <section className="experience-stage" aria-labelledby="room-portfolio-title">
          <div className="scene-frame">
            <div className={`scene-copy${showRoomHints ? '' : ' is-muted'}`}>
              <p className="eyebrow">Interactive 3D Portfolio</p>
              <h1 id="room-portfolio-title">Walk the room, open the work.</h1>
              <p>
                Explore the projects as stations inside a playable room. If you want the standard portfolio instead,
                switch back with the view toggle above.
              </p>
            </div>

            <div className={`scene-guide${showRoomHints ? '' : ' is-muted'}`} aria-label="Room controls">
              <span>Move: WASD</span>
              <span>Turn: ← →</span>
              <span>Interact: Enter / Click</span>
              <span>Hints: H</span>
              <span>Close card: any key</span>
            </div>

            <div className="scene-canvas-wrap">
              <Experience3D
                activeId={activeId}
                inputState={movementRef.current}
                nearbyId={nearbyId}
                onClearSelection={closeProject}
                onHoverChange={setHoveredId}
                onNearbyChange={setNearbyId}
                onSelect={openProject}
                projects={projects}
                selectedId={selectedId}
              />
            </div>

            {nearbyProject ? (
              <button className="nearby-prompt" onClick={() => openProject(nearbyProject.id)} type="button">
                <strong>{nearbyProject.stationLabel}</strong>
                <span>{nearbyProject.shortLabel}</span>
                <em>Enter or click</em>
              </button>
            ) : null}

            <div className="mobile-pad" aria-label="Touch movement controls">
              {touchDirections.map((direction) => (
                <button
                  key={direction.id}
                  aria-label={direction.label}
                  className={`pad-button pad-${direction.id}`}
                  onPointerCancel={() => setDirection(direction.id, false)}
                  onPointerDown={(event) => {
                    event.preventDefault()
                    event.stopPropagation()
                    setDirection(direction.id, true)
                  }}
                  onPointerLeave={() => setDirection(direction.id, false)}
                  onPointerUp={(event) => {
                    event.preventDefault()
                    event.stopPropagation()
                    setDirection(direction.id, false)
                  }}
                  type="button"
                >
                  {direction.symbol}
                </button>
              ))}

              <button
                className="pad-button pad-action"
                disabled={!nearbyProject}
                onClick={() => {
                  if (nearbyProject) {
                    openProject(nearbyProject.id)
                  }
                }}
                type="button"
              >
                Open
              </button>
            </div>
          </div>
        </section>
      ) : isStudioView ? (
        <StudioPortfolio
          onOpenProject={openProject}
          onSwitchToPortfolio={() => switchViewMode('portfolio')}
          onSwitchToRoom={() => switchViewMode('room')}
          projects={projects}
        />
      ) : (
        <ClassicPortfolio onOpenProject={openProject} onSwitchToRoom={() => switchViewMode('room')} projects={projects} />
      )}

      <ProjectPanel
        dismissHint={isRoomView ? 'Press any key to close' : 'Press Esc to close'}
        onClose={closeProject}
        project={selectedProject}
      />
    </main>
  )
}
