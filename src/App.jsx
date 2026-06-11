import { useEffect, useRef, useState } from 'react'
import PixelRoom from './components/PixelRoom'
import ProjectPanel from './components/ProjectPanel'
import { projects } from './data/projects'

const startPosition = {
  x: 54,
  y: 78,
}

const touchDirections = [
  { id: 'forward', symbol: 'Up', label: 'Move up' },
  { id: 'left', symbol: 'Left', label: 'Move left' },
  { id: 'backward', symbol: 'Down', label: 'Move down' },
  { id: 'right', symbol: 'Right', label: 'Move right' },
]

function createInputState() {
  return {
    forward: false,
    backward: false,
    left: false,
    right: false,
  }
}

function clearInputState(inputState) {
  inputState.forward = false
  inputState.backward = false
  inputState.left = false
  inputState.right = false
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function findNearbyProject(playerPosition) {
  let closestProject = null
  let closestDistance = Number.POSITIVE_INFINITY

  for (const project of projects) {
    const dx = playerPosition.x - project.roomPosition.x
    const dy = (playerPosition.y - project.roomPosition.y) * 1.15
    const distance = Math.hypot(dx, dy)

    if (distance < closestDistance) {
      closestDistance = distance
      closestProject = project
    }
  }

  if (closestDistance > 11.5) {
    return null
  }

  return closestProject
}

export default function App() {
  const movementRef = useRef(createInputState())
  const nearbyProjectRef = useRef(null)
  const [selectedId, setSelectedId] = useState(null)
  const [hoveredId, setHoveredId] = useState(null)
  const [playerPosition, setPlayerPosition] = useState(startPosition)

  const nearbyProject = findNearbyProject(playerPosition)
  const activeId = hoveredId ?? selectedId ?? nearbyProject?.id ?? null
  const selectedProject = projects.find((project) => project.id === selectedId) ?? null

  useEffect(() => {
    nearbyProjectRef.current = nearbyProject?.id ?? null
  }, [nearbyProject])

  useEffect(() => {
    let animationFrameId = 0
    let lastTimestamp = performance.now()

    const updatePlayer = (timestamp) => {
      const delta = Math.min((timestamp - lastTimestamp) / 16.67, 2.2)
      lastTimestamp = timestamp

      setPlayerPosition((previousPosition) => {
        let nextX = previousPosition.x
        let nextY = previousPosition.y
        const speed = 0.52 * delta

        if (movementRef.current.forward) {
          nextY -= speed * 1.15
        }

        if (movementRef.current.backward) {
          nextY += speed * 1.15
        }

        if (movementRef.current.left) {
          nextX -= speed
        }

        if (movementRef.current.right) {
          nextX += speed
        }

        nextX = clamp(nextX, 18, 82)
        nextY = clamp(nextY, 34, 84)

        if (nextX === previousPosition.x && nextY === previousPosition.y) {
          return previousPosition
        }

        return {
          x: nextX,
          y: nextY,
        }
      })

      animationFrameId = window.requestAnimationFrame(updatePlayer)
    }

    animationFrameId = window.requestAnimationFrame(updatePlayer)

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [])

  useEffect(() => {
    const keyMap = {
      ArrowUp: 'forward',
      ArrowDown: 'backward',
      ArrowLeft: 'left',
      ArrowRight: 'right',
      KeyW: 'forward',
      KeyS: 'backward',
      KeyA: 'left',
      KeyD: 'right',
    }

    const handleKeyDown = (event) => {
      if (event.code === 'Enter' || event.code === 'Space') {
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

      if (!direction) {
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
  }, [])

  const setDirection = (direction, pressed) => {
    movementRef.current[direction] = pressed
  }

  const openProject = (projectId) => {
    setSelectedId(projectId)
  }

  return (
    <main className="app-shell">
      <section className="experience-stage" aria-labelledby="room-portfolio-title">
        <div className="page-copy">
          <p className="eyebrow">QingPeng Lam · Interactive Room Portfolio</p>
          <h1 id="room-portfolio-title">A 2.5D pixel bedroom you can send with a resume instead of a plain link dump.</h1>
          <p className="deck">
            The goal is simple: give recruiters and teams a live profile they can actually play. Walk around the
            room, inspect the desk, synth corner, bookshelf, and project stations, then open the work behind each
            object.
          </p>
          <div className="stat-row" aria-label="Portfolio summary">
            <div className="stat-card">
              <strong>8</strong>
              <span>room objects</span>
            </div>
            <div className="stat-card">
              <strong>React</strong>
              <span>static deploy-ready</span>
            </div>
            <div className="stat-card">
              <strong>Live</strong>
              <span>job-application friendly</span>
            </div>
          </div>
        </div>

        <div className="scene-frame scene-frame-pixel">
          <div className="scene-banner">
            <div className="signal-card pixel-card">
              <p className="signal-title">Play</p>
              <p>Use WASD or arrow keys to move. Press Enter when you are near an object.</p>
            </div>
            <div className="signal-card pixel-card">
              <p className="signal-title">Mode</p>
              <p>2.5D room, cute pixel vibe, and a lighter React build that is easier to ship as a live link.</p>
            </div>
            <div className="signal-card pixel-card">
              <p className="signal-title">Position</p>
              <p>
                x {playerPosition.x.toFixed(0)} · y {playerPosition.y.toFixed(0)}
              </p>
            </div>
          </div>

          <PixelRoom
            activeId={activeId}
            nearbyId={nearbyProject?.id ?? null}
            onHover={setHoveredId}
            onSelect={openProject}
            playerPosition={playerPosition}
            projects={projects}
            selectedId={selectedId}
          />

          <div className="room-toolbar">
            <nav className="object-strip object-strip-pixel" aria-label="Quick select room objects">
              {projects.map((project) => {
                const isActive = project.id === activeId

                return (
                  <button
                    key={project.id}
                    className={`object-chip pixel-chip${isActive ? ' is-active' : ''}`}
                    onClick={() => openProject(project.id)}
                    type="button"
                  >
                    <span>{project.roomLabel}</span>
                    <small>{project.shortLabel}</small>
                  </button>
                )
              })}
            </nav>
          </div>

          {nearbyProject ? (
            <div className="interaction-banner" aria-live="polite">
              <strong>Near {nearbyProject.shortLabel}</strong>
              <span>Press Enter or tap the room object to open the card.</span>
            </div>
          ) : null}

          <div className="mobile-pad" aria-label="Touch movement controls">
            {touchDirections.map((direction) => (
              <button
                key={direction.id}
                aria-label={direction.label}
                className={`pad-button pixel-pad pad-${direction.id}`}
                onPointerCancel={() => setDirection(direction.id, false)}
                onPointerDown={(event) => {
                  event.stopPropagation()
                  setDirection(direction.id, true)
                }}
                onPointerLeave={() => setDirection(direction.id, false)}
                onPointerUp={(event) => {
                  event.stopPropagation()
                  setDirection(direction.id, false)
                }}
                type="button"
              >
                {direction.symbol}
              </button>
            ))}
            <button
              className="pad-button pixel-pad pad-action"
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

      <ProjectPanel project={selectedProject} onClose={() => setSelectedId(null)} />
    </main>
  )
}
