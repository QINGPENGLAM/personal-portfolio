import { useEffect, useRef, useState } from 'react'
import Experience3D from './components/Experience3D'
import ProjectPanel from './components/ProjectPanel'
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

export default function App() {
  const movementRef = useRef(createInputState())
  const nearbyProjectRef = useRef(null)
  const [hoveredId, setHoveredId] = useState(null)
  const [nearbyId, setNearbyId] = useState(null)
  const [selectedId, setSelectedId] = useState(null)
  const [showRoomHints, setShowRoomHints] = useState(true)

  const nearbyProject = projects.find((project) => project.id === nearbyId) ?? null
  const selectedProject = projects.find((project) => project.id === selectedId) ?? null
  const activeId = hoveredId ?? selectedId ?? nearbyId ?? null

  useEffect(() => {
    if (selectedId) {
      clearInputState(movementRef.current)
    }
  }, [selectedId])

  useEffect(() => {
    nearbyProjectRef.current = nearbyId
  }, [nearbyId])

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setShowRoomHints(false)
    }, 2800)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [])

  useEffect(() => {
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
      const modifierKeys = new Set(['ShiftLeft', 'ShiftRight', 'ControlLeft', 'ControlRight', 'AltLeft', 'AltRight', 'MetaLeft', 'MetaRight'])

      if (selectedId) {
        if (modifierKeys.has(event.code)) {
          return
        }

        setSelectedId(null)
        setHoveredId(null)
        event.preventDefault()
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
        setSelectedId(null)
        setHoveredId(null)
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
  }, [hoveredId])

  const setDirection = (direction, pressed) => {
    movementRef.current[direction] = pressed
  }

  const openProject = (projectId) => {
    setSelectedId(projectId)
  }

  return (
    <main className="app-shell">
      <section className="experience-stage" aria-labelledby="room-portfolio-title">
        <div className="scene-frame">
          <div className={`scene-copy${showRoomHints ? '' : ' is-muted'}`}>
            <p className="eyebrow">3D Room Portfolio MVP</p>
            <h1 id="room-portfolio-title">Walk the room, open the work.</h1>
            <p>
              Minimal playable demo inspired by Room Portfolio: six stations, keyboard movement, clickable project
              cards, and a live room you can share instead of a static profile.
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
              onClearSelection={() => setSelectedId(null)}
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

          <ProjectPanel onClose={() => setSelectedId(null)} project={selectedProject} />
        </div>
      </section>
    </main>
  )
}
