import { useEffect, useRef, useState } from 'react'
import PixelRoom from './components/PixelRoom'
import ProjectPanel from './components/ProjectPanel'
import { projects } from './data/projects'

const startPosition = {
  x: 53,
  y: 78,
}

const playerRadius = 2.35

const walkablePolygon = [
  { x: 18, y: 56 },
  { x: 58, y: 39 },
  { x: 86, y: 52 },
  { x: 73, y: 84 },
  { x: 26, y: 85 },
]

const blockingVolumes = [
  { xMin: 16, xMax: 36, yMin: 57, yMax: 80 },
  { xMin: 18, xMax: 27, yMin: 56, yMax: 65 },
  { xMin: 50, xMax: 66, yMin: 40, yMax: 60 },
  { xMin: 66, xMax: 74, yMin: 40, yMax: 61 },
  { xMin: 77, xMax: 95, yMin: 58, yMax: 78 },
  { xMin: 81, xMax: 88, yMin: 67, yMax: 77 },
]

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

function pointInPolygon(point, polygon) {
  let isInside = false

  for (let index = 0, previous = polygon.length - 1; index < polygon.length; previous = index, index += 1) {
    const currentPoint = polygon[index]
    const previousPoint = polygon[previous]
    const intersects =
      currentPoint.y > point.y !== previousPoint.y > point.y &&
      point.x <
        ((previousPoint.x - currentPoint.x) * (point.y - currentPoint.y)) / (previousPoint.y - currentPoint.y) +
          currentPoint.x

    if (intersects) {
      isInside = !isInside
    }
  }

  return isInside
}

function overlapsBlockingVolume(position) {
  return blockingVolumes.some((volume) => {
    const nearestX = clamp(position.x, volume.xMin, volume.xMax)
    const nearestY = clamp(position.y, volume.yMin, volume.yMax)
    return Math.hypot(position.x - nearestX, position.y - nearestY) < playerRadius
  })
}

function isBlocked(position) {
  if (!pointInPolygon(position, walkablePolygon)) {
    return true
  }

  return overlapsBlockingVolume(position)
}

function findNearbyProject(playerPosition) {
  let closestProject = null
  let closestDistance = Number.POSITIVE_INFINITY

  for (const project of projects) {
    const accessPosition = project.accessPosition ?? project.roomPosition
    const dx = playerPosition.x - accessPosition.x
    const dy = (playerPosition.y - accessPosition.y) * 1.08
    const distance = Math.hypot(dx, dy)

    if (distance < closestDistance) {
      closestDistance = distance
      closestProject = project
    }
  }

  if (closestDistance > 10.8) {
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
  const [showRoomHints, setShowRoomHints] = useState(true)

  const nearbyProject = findNearbyProject(playerPosition)
  const activeId = hoveredId ?? selectedId ?? nearbyProject?.id ?? null
  const selectedProject = projects.find((project) => project.id === selectedId) ?? null

  useEffect(() => {
    nearbyProjectRef.current = nearbyProject?.id ?? null
  }, [nearbyProject])

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setShowRoomHints(false)
    }, 2200)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [])

  useEffect(() => {
    let animationFrameId = 0
    let lastTimestamp = performance.now()

    const updatePlayer = (timestamp) => {
      const delta = Math.min((timestamp - lastTimestamp) / 16.67, 2.2)
      lastTimestamp = timestamp

      setPlayerPosition((previousPosition) => {
        let targetX = previousPosition.x
        let targetY = previousPosition.y
        const speed = 0.52 * delta

        if (movementRef.current.forward) {
          targetY -= speed * 1.15
        }

        if (movementRef.current.backward) {
          targetY += speed * 1.15
        }

        if (movementRef.current.left) {
          targetX -= speed
        }

        if (movementRef.current.right) {
          targetX += speed
        }

        targetX = clamp(targetX, 18, 86)
        targetY = clamp(targetY, 34, 84)

        let nextPosition = previousPosition

        const xOnlyPosition = {
          x: targetX,
          y: previousPosition.y,
        }

        if (!isBlocked(xOnlyPosition)) {
          nextPosition = xOnlyPosition
        }

        const yOnlyPosition = {
          x: nextPosition.x,
          y: targetY,
        }

        if (!isBlocked(yOnlyPosition)) {
          nextPosition = yOnlyPosition
        }

        if (nextPosition.x === previousPosition.x && nextPosition.y === previousPosition.y) {
          return previousPosition
        }

        return nextPosition
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
      if (event.code === 'KeyH') {
        setShowRoomHints((currentValue) => !currentValue)
        event.preventDefault()
        return
      }

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
        <div className="scene-frame scene-frame-pixel">
          <div className={`scene-copy${showRoomHints ? '' : ' is-muted'}`}>
            <p className="eyebrow">Playable Profile Room</p>
            <h1 id="room-portfolio-title">Walk the room.</h1>
          </div>

          <div className={`scene-guide${showRoomHints ? '' : ' is-muted'}`} aria-label="Room controls">
            <span>Move · WASD / Arrows</span>
            <span>Open · Enter</span>
            <span>Hints · H</span>
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

          {nearbyProject ? (
            <div className="interaction-banner" aria-live="polite">
              <strong>{nearbyProject.roomLabel}</strong>
              <span>Press Enter to open</span>
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

      <ProjectPanel
        activeId={activeId}
        onClose={() => setSelectedId(null)}
        onSelect={openProject}
        project={selectedProject}
        projects={projects}
      />
    </main>
  )
}
