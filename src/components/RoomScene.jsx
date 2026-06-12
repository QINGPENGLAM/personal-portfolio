import { RoundedBox } from '@react-three/drei/core/RoundedBox'
import { Html } from '@react-three/drei/web/Html'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

const ROOM_LIMITS = {
  minX: -3.75,
  maxX: 3.75,
  minZ: -3.2,
  maxZ: 2.95,
}

const PLAYER_RADIUS = 0.28
const CAMERA_HEIGHT = 5.95
const CAMERA_OFFSET = new THREE.Vector3(7.4, CAMERA_HEIGHT, 8.6)
const UP_AXIS = new THREE.Vector3(0, 1, 0)
const PLAYER_START = {
  x: 0,
  z: 2.25,
  yaw: 0,
}

const OBSTACLES = [
  { minX: -3.8, maxX: -1.55, minZ: -0.25, maxZ: 2.8 },
  { minX: -2.55, maxX: -1.6, minZ: -0.2, maxZ: 0.9 },
  { minX: 0.15, maxX: 1.75, minZ: -3.75, maxZ: -2.15 },
  { minX: 1.7, maxX: 2.9, minZ: -3.35, maxZ: -1.35 },
  { minX: 2.65, maxX: 4.0, minZ: -1.35, maxZ: 2.2 },
  { minX: 2.15, maxX: 3.2, minZ: 1.2, maxZ: 2.45 },
]

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function collides(x, z) {
  return OBSTACLES.some((obstacle) => {
    const nearestX = clamp(x, obstacle.minX, obstacle.maxX)
    const nearestZ = clamp(z, obstacle.minZ, obstacle.maxZ)
    return Math.hypot(x - nearestX, z - nearestZ) < PLAYER_RADIUS
  })
}

function Frame({ position, rotation = [0, 0, 0], scale = [1, 1, 1], tone = '#d6e5ea' }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh>
        <boxGeometry args={[0.62, 0.86, 0.05]} />
        <meshStandardMaterial color="#2e3745" />
      </mesh>
      <mesh position={[0, 0, 0.03]}>
        <boxGeometry args={[0.5, 0.74, 0.025]} />
        <meshStandardMaterial color="#f9fbfd" />
      </mesh>
      <mesh position={[0.03, 0.04, 0.045]}>
        <boxGeometry args={[0.2, 0.26, 0.01]} />
        <meshStandardMaterial color={tone} />
      </mesh>
    </group>
  )
}

function StationLabel({ project }) {
  return (
    <Html center distanceFactor={9.5} position={[0, 0.7, 0]}>
      <div className="object-badge">
        <strong>{project.stationLabel}</strong>
        <span>{project.shortLabel}</span>
      </div>
    </Html>
  )
}

function InteractionMarker({ color, groundRing = true, mode = 'idle', position = [0, 0, 0] }) {
  const ringRef = useRef()
  const orbRef = useRef()
  const glowRef = useRef()
  const beamRef = useRef()

  useFrame((state) => {
    const time = state.clock.elapsedTime
    const phase = mode === 'active' ? 4.8 : mode === 'nearby' ? 4 : 2.6
    const pulse = 1 + Math.sin(time * phase) * 0.1
    const floatY = 0.94 + Math.sin(time * 2.8) * 0.05

    if (ringRef.current) {
      ringRef.current.scale.setScalar(pulse)
      ringRef.current.material.opacity = mode === 'active' ? 0.98 : mode === 'nearby' ? 0.86 : 0.62
    }

    if (orbRef.current) {
      const orbScale = mode === 'active' ? 1.24 : mode === 'nearby' ? 1.12 : 1.02
      orbRef.current.position.y = floatY
      orbRef.current.scale.setScalar(orbScale * pulse)
      orbRef.current.material.emissiveIntensity = mode === 'active' ? 2.45 : mode === 'nearby' ? 1.9 : 1.35
    }

    if (glowRef.current) {
      glowRef.current.position.y = floatY
      glowRef.current.scale.setScalar((mode === 'active' ? 1.5 : 1.28) * pulse)
      glowRef.current.material.opacity = mode === 'active' ? 0.34 : mode === 'nearby' ? 0.24 : 0.18
    }

    if (beamRef.current) {
      beamRef.current.position.y = 0.46
      beamRef.current.scale.y = 1 + Math.sin(time * 2.2) * 0.06
      beamRef.current.material.opacity = mode === 'active' ? 0.58 : mode === 'nearby' ? 0.46 : 0.32
    }
  })

  return (
    <group position={position}>
      {groundRing ? (
        <>
          <mesh ref={ringRef} position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.32, 0.5, 48]} />
            <meshBasicMaterial color={color} opacity={0.62} transparent />
          </mesh>
          <mesh position={[0, 0.042, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.22, 40]} />
            <meshBasicMaterial color={color} opacity={mode === 'idle' ? 0.2 : 0.3} transparent />
          </mesh>
        </>
      ) : null}

      <mesh ref={beamRef} position={[0, 0.46, 0]}>
        <cylinderGeometry args={[0.016, 0.016, 0.92, 12]} />
        <meshBasicMaterial color={color} opacity={0.32} transparent />
      </mesh>

      <mesh ref={glowRef} position={[0, 0.94, 0]}>
        <sphereGeometry args={[0.22, 18, 18]} />
        <meshBasicMaterial color={color} opacity={0.18} transparent />
      </mesh>

      <mesh ref={orbRef} position={[0, 0.94, 0]}>
        <octahedronGeometry args={[0.11, 0]} />
        <meshStandardMaterial color="#ffffff" emissive={color} emissiveIntensity={1.05} />
      </mesh>
    </group>
  )
}

export default function RoomScene({
  activeId,
  inputState,
  nearbyId,
  onHoverChange,
  onNearbyChange,
  onSelect,
  projects,
  selectedId,
}) {
  const playerRef = useRef()
  const playerStateRef = useRef({ ...PLAYER_START })
  const nearbyIdRef = useRef(null)
  const projectById = useMemo(() => Object.fromEntries(projects.map((project) => [project.id, project])), [projects])

  useFrame((state, delta) => {
    const current = playerStateRef.current
    const turnDirection = (inputState.turnLeft ? 1 : 0) - (inputState.turnRight ? 1 : 0)
    current.yaw += turnDirection * delta * 1.7

    const focusPoint = new THREE.Vector3(current.x * 0.22 + 0.2, 1.05, current.z * 0.14 - 0.55)
    const cameraOffset = CAMERA_OFFSET.clone().applyAxisAngle(UP_AXIS, current.yaw)
    const cameraPosition = focusPoint.clone().add(cameraOffset)
    const forward = focusPoint.clone().sub(cameraPosition).setY(0).normalize()
    const right = new THREE.Vector3().crossVectors(forward, UP_AXIS).normalize()

    const strafe = (inputState.right ? 1 : 0) - (inputState.left ? 1 : 0)
    const advance = (inputState.forward ? 1 : 0) - (inputState.backward ? 1 : 0)
    const movement = new THREE.Vector3()
      .addScaledVector(right, strafe)
      .addScaledVector(forward, advance)
      .setY(0)

    if (movement.lengthSq() > 0) {
      movement.normalize()
    }

    const speed = 2.5 * delta
    const nextX = clamp(current.x + movement.x * speed, ROOM_LIMITS.minX, ROOM_LIMITS.maxX)
    const nextZ = clamp(current.z + movement.z * speed, ROOM_LIMITS.minZ, ROOM_LIMITS.maxZ)

    let resolvedX = current.x
    let resolvedZ = current.z

    if (!collides(nextX, current.z)) {
      resolvedX = nextX
    }

    if (!collides(resolvedX, nextZ)) {
      resolvedZ = nextZ
    }

    current.x = resolvedX
    current.z = resolvedZ

    if (playerRef.current) {
      const walking = movement.lengthSq() > 0.0001
      const bob = walking ? Math.sin(state.clock.elapsedTime * 10) * 0.02 : 0
      playerRef.current.position.set(current.x, 0.22 + bob, current.z)
      if (walking) {
        playerRef.current.rotation.y = Math.atan2(movement.x, movement.z)
      }
    }

    let closestProject = null
    let closestDistance = Number.POSITIVE_INFINITY

    for (const project of projects) {
      const [projectX, , projectZ] = project.scenePosition
      const distance = Math.hypot(current.x - projectX, current.z - projectZ)

      if (distance < closestDistance) {
        closestDistance = distance
        closestProject = project
      }
    }

    const nextNearbyId = closestDistance < 1.3 ? closestProject?.id ?? null : null

    if (nearbyIdRef.current !== nextNearbyId) {
      nearbyIdRef.current = nextNearbyId
      onNearbyChange(nextNearbyId)
    }

    state.camera.position.lerp(cameraPosition, 0.08)
    state.camera.lookAt(focusPoint)
  })

  const stationState = (id) => {
    const project = projectById[id]
    const selected = id === selectedId
    const nearby = id === nearbyId
    const highlighted = id === activeId || selected || nearby
    return {
      project,
      highlighted,
      mode: selected || id === activeId ? 'active' : nearby ? 'nearby' : 'idle',
      selected,
      nearby,
      eventHandlers: {
        onClick: (event) => {
          event.stopPropagation()
          onSelect(id)
        },
        onPointerOut: (event) => {
          event.stopPropagation()
          onHoverChange(null)
        },
        onPointerOver: (event) => {
          event.stopPropagation()
          onHoverChange(id)
        },
      },
    }
  }

  const terrarium = stationState('ai-town-terrarium')
  const bookshelf = stationState('hillel-bookshelf')
  const monitor = stationState('usaa-monitor')
  const lamp = stationState('handmotion-lamp')
  const gallery = stationState('isr-gallery')
  const kiosk = stationState('art-history-kiosk')

  return (
    <group>
      <group position={[0, -0.12, 0]}>
        <mesh receiveShadow>
          <boxGeometry args={[9.2, 0.28, 7.8]} />
          <meshStandardMaterial color="#a9b5c4" />
        </mesh>
      </group>

      <mesh position={[0, 0.02, 0]} receiveShadow>
        <boxGeometry args={[8.55, 0.06, 7.15]} />
        <meshStandardMaterial color="#d9e0ea" />
      </mesh>

      <group position={[0, 0.04, 0]}>
        {[
          { color: '#727882', position: [-2.8, 0.01, -2.15], size: [1.9, 0.03, 1.6] },
          { color: '#666c76', position: [-0.85, 0.01, -2.15], size: [1.9, 0.03, 1.6] },
          { color: '#767c86', position: [1.1, 0.01, -2.15], size: [1.9, 0.03, 1.6] },
          { color: '#6a707a', position: [2.9, 0.01, -2.15], size: [1.25, 0.03, 1.6] },
          { color: '#7a808a', position: [-2.8, 0.01, -0.35], size: [1.9, 0.03, 1.6] },
          { color: '#707680', position: [-0.85, 0.01, -0.35], size: [1.9, 0.03, 1.6] },
          { color: '#7b818b', position: [1.1, 0.01, -0.35], size: [1.9, 0.03, 1.6] },
          { color: '#707680', position: [2.9, 0.01, -0.35], size: [1.25, 0.03, 1.6] },
          { color: '#737983', position: [-2.8, 0.01, 1.45], size: [1.9, 0.03, 1.55] },
          { color: '#696f79', position: [-0.85, 0.01, 1.45], size: [1.9, 0.03, 1.55] },
          { color: '#767c86', position: [1.1, 0.01, 1.45], size: [1.9, 0.03, 1.55] },
          { color: '#6e747e', position: [2.9, 0.01, 1.45], size: [1.25, 0.03, 1.55] },
        ].map((tile) => (
          <mesh key={`${tile.position.join('-')}`} position={tile.position} receiveShadow>
            <boxGeometry args={tile.size} />
            <meshStandardMaterial color={tile.color} roughness={0.95} />
          </mesh>
        ))}
      </group>

      <mesh position={[0, 1.55, -3.78]} receiveShadow>
        <boxGeometry args={[9.2, 3.2, 0.22]} />
        <meshStandardMaterial color="#edf1f6" />
      </mesh>
      <mesh position={[-4.38, 1.55, 0]} receiveShadow>
        <boxGeometry args={[0.22, 3.2, 7.8]} />
        <meshStandardMaterial color="#eff3f8" />
      </mesh>
      <mesh position={[4.38, 1.55, -0.88]} receiveShadow>
        <boxGeometry args={[0.22, 3.2, 5.25]} />
        <meshStandardMaterial color="#f0f3f8" />
      </mesh>

      <mesh position={[0, 3.08, -3.55]}>
        <boxGeometry args={[8.8, 0.08, 0.08]} />
        <meshStandardMaterial color="#f7ecff" emissive="#f7ecff" emissiveIntensity={0.35} />
      </mesh>
      <mesh position={[-4.12, 3.08, 0]}>
        <boxGeometry args={[0.08, 0.08, 7.35]} />
        <meshStandardMaterial color="#edf1ff" emissive="#edf1ff" emissiveIntensity={0.22} />
      </mesh>
      <mesh position={[4.12, 3.08, -0.88]}>
        <boxGeometry args={[0.08, 0.08, 4.86]} />
        <meshStandardMaterial color="#edf1ff" emissive="#edf1ff" emissiveIntensity={0.18} />
      </mesh>

      <group position={[-2.78, 0.6, 1.08]}>
        <RoundedBox args={[2.15, 0.34, 3.1]} castShadow radius={0.05} receiveShadow>
          <meshStandardMaterial color="#424752" roughness={0.95} />
        </RoundedBox>
        <mesh castShadow position={[0, 0.26, 0]}>
          <boxGeometry args={[1.95, 0.18, 2.85]} />
          <meshStandardMaterial color="#eceef3" />
        </mesh>
        <RoundedBox args={[1.95, 0.3, 2.15]} castShadow position={[0, 0.45, 0.28]} radius={0.08}>
          <meshStandardMaterial color="#2e3239" roughness={1} />
        </RoundedBox>
        <mesh castShadow position={[-0.38, 0.7, -0.86]}>
          <boxGeometry args={[0.58, 0.16, 0.74]} />
          <meshStandardMaterial color="#545962" />
        </mesh>
        <mesh castShadow position={[0.34, 0.7, -0.76]}>
          <boxGeometry args={[0.64, 0.16, 0.84]} />
          <meshStandardMaterial color="#4a4f58" />
        </mesh>
      </group>

      <group position={[-2.08, 0.72, -0.02]} {...lamp.eventHandlers}>
        <InteractionMarker color={lamp.project.color} mode={lamp.mode} />
        <RoundedBox args={[0.72, 0.58, 0.68]} castShadow radius={0.05} receiveShadow>
          <meshStandardMaterial color="#f1f4f8" />
        </RoundedBox>
        <mesh castShadow position={[0, -0.06, 0.01]}>
          <boxGeometry args={[0.58, 0.15, 0.52]} />
          <meshStandardMaterial color="#2a2f39" />
        </mesh>
        <mesh castShadow position={[-0.15, 0.26, -0.06]}>
          <cylinderGeometry args={[0.06, 0.08, 0.28, 18]} />
          <meshStandardMaterial color="#141821" />
        </mesh>
        <mesh castShadow position={[-0.15, 0.49, -0.06]}>
          <sphereGeometry args={[0.15, 22, 22]} />
          <meshStandardMaterial
            color="#f5e7ff"
            emissive={lamp.highlighted ? '#d59aff' : '#b772ff'}
            emissiveIntensity={lamp.highlighted ? 1.6 : 1.15}
          />
        </mesh>
        <mesh castShadow position={[0.13, 0.22, 0.06]}>
          <boxGeometry args={[0.15, 0.08, 0.15]} />
          <meshStandardMaterial color="#f0d35d" />
        </mesh>
        <mesh castShadow position={[0.17, 0.16, -0.14]}>
          <boxGeometry args={[0.08, 0.18, 0.08]} />
          <meshStandardMaterial color="#151920" />
        </mesh>
        <mesh position={[0, 0.3, 0]} {...lamp.eventHandlers}>
          <sphereGeometry args={[0.52, 14, 14]} />
          <meshBasicMaterial opacity={0.001} transparent />
        </mesh>
        {lamp.highlighted ? <StationLabel project={lamp.project} /> : null}
      </group>

      <group position={[-3.68, 1.9, 0.6]}>
        <Frame position={[0, 0.34, -0.72]} tone="#d8e1df" />
        <Frame position={[0.2, -0.9, -0.2]} tone="#d9d5f1" />
      </group>

      <group position={[-4.24, 1.74, -0.5]} rotation={[0, Math.PI / 2, 0]}>
        <mesh>
          <boxGeometry args={[2.2, 1.45, 0.05]} />
          <meshStandardMaterial color="#edf1f6" />
        </mesh>
        <mesh position={[0, 0, 0.03]}>
          <boxGeometry args={[1.9, 1.15, 0.02]} />
          <meshStandardMaterial color="#90a8ae" opacity={0.72} transparent />
        </mesh>
      </group>
      <group position={[-3.32, 0.86, -0.92]}>
        <mesh castShadow position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.18, 0.24, 0.12, 16]} />
          <meshStandardMaterial color="#b97649" />
        </mesh>
        <mesh castShadow position={[0, 0.28, 0]}>
          <sphereGeometry args={[0.32, 18, 18]} />
          <meshStandardMaterial color="#4d9754" />
        </mesh>
        <mesh castShadow position={[0.42, 0.2, -0.2]}>
          <cylinderGeometry args={[0.14, 0.18, 0.1, 16]} />
          <meshStandardMaterial color="#eceef2" />
        </mesh>
        <mesh castShadow position={[0.42, 0.46, -0.2]}>
          <sphereGeometry args={[0.22, 18, 18]} />
          <meshStandardMaterial color="#89c286" />
        </mesh>
        <mesh castShadow position={[0.54, 0.86, -0.28]} rotation={[0, 0, 0.35]}>
          <cylinderGeometry args={[0.015, 0.015, 0.6, 10]} />
          <meshStandardMaterial color="#8b6d63" />
        </mesh>
        <mesh castShadow position={[0.62, 1.13, -0.34]}>
          <sphereGeometry args={[0.08, 14, 14]} />
          <meshStandardMaterial color="#d980bb" />
        </mesh>
      </group>

      <group position={[0.95, 0, -3.1]} {...terrarium.eventHandlers}>
        <InteractionMarker color={terrarium.project.color} mode={terrarium.mode} />
        <RoundedBox args={[1.46, 2.9, 0.72]} castShadow position={[0, 1.45, 0]} radius={0.08} receiveShadow>
          <meshStandardMaterial color="#f4f6f9" />
        </RoundedBox>
        {[-0.78, 0.0, 0.78].map((level, index) => (
          <group key={level} position={[0, 1.38 + level, 0.07]}>
            <mesh castShadow position={[0, 0, 0]}>
              <boxGeometry args={[1.18, 0.68, 0.08]} />
              <meshStandardMaterial color="#d4eee0" opacity={0.24} transparent />
            </mesh>
            <mesh position={[0, -0.22, 0]}>
              <boxGeometry args={[1.1, 0.14, 0.42]} />
              <meshStandardMaterial color={index === 2 ? '#e7ddc4' : '#d9c8a1'} />
            </mesh>
            <mesh castShadow position={[-0.26, -0.09, 0.02]}>
              <sphereGeometry args={[0.13, 14, 14]} />
              <meshStandardMaterial color="#8e8a7c" />
            </mesh>
            <mesh castShadow position={[0.12, -0.04, 0.04]}>
              <sphereGeometry args={[0.17, 14, 14]} />
              <meshStandardMaterial color="#6d736a" />
            </mesh>
            <mesh castShadow position={[0.26, 0.08, 0.04]}>
              <boxGeometry args={[0.08, 0.32, 0.08]} />
              <meshStandardMaterial color="#786250" />
            </mesh>
            <mesh castShadow position={[0.02, 0.06, 0.03]}>
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshStandardMaterial color="#6ebd72" />
            </mesh>
            <mesh castShadow position={[0.29, 0.16, 0.04]}>
              <sphereGeometry args={[0.09, 16, 16]} />
              <meshStandardMaterial color="#9dcca0" />
            </mesh>
            <mesh position={[-0.31, 0.12, 0.05]} rotation={[0.2, 0.5, 0]}>
              <boxGeometry args={[0.42, 0.03, 0.03]} />
              <meshStandardMaterial color="#f4fbf7" opacity={0.6} transparent />
            </mesh>
          </group>
        ))}
        <mesh castShadow position={[0, 0.34, 0]}>
          <boxGeometry args={[1.18, 0.58, 0.52]} />
          <meshStandardMaterial color="#252a33" />
        </mesh>
        <mesh position={[0, 1.55, 0.38]} {...terrarium.eventHandlers}>
          <boxGeometry args={[1.55, 2.95, 0.9]} />
          <meshBasicMaterial opacity={0.001} transparent />
        </mesh>
        {terrarium.highlighted ? <StationLabel project={terrarium.project} /> : null}
      </group>

      <group position={[2.25, 0, -2.25]} {...bookshelf.eventHandlers}>
        <InteractionMarker color={bookshelf.project.color} mode={bookshelf.mode} />
        <RoundedBox args={[1.15, 2.55, 0.65]} castShadow position={[0, 1.28, 0]} radius={0.06} receiveShadow>
          <meshStandardMaterial color="#f4f6fa" />
        </RoundedBox>
        {[-0.72, -0.12, 0.48, 1.08].map((height) => (
          <mesh castShadow key={height} position={[0, 1.28 + height, 0]}>
            <boxGeometry args={[1.05, 0.08, 0.6]} />
            <meshStandardMaterial color="#d0d9e4" />
          </mesh>
        ))}
        {[
          [-0.26, 2.0, 0.08, '#7d79c2'],
          [-0.08, 2.02, 0.08, '#d8b468'],
          [0.1, 1.96, 0.08, '#6ea0c5'],
          [0.28, 1.99, 0.08, '#be6755'],
          [-0.24, 0.82, 0.08, '#23262f'],
          [-0.03, 0.78, 0.08, '#373c46'],
          [0.18, 0.86, 0.08, '#1d2129'],
        ].map(([x, y, z, color]) => (
          <mesh castShadow key={`${x}-${y}`} position={[x, y, z]}>
            <boxGeometry args={[0.11, 0.42, 0.18]} />
            <meshStandardMaterial color={color} />
          </mesh>
        ))}
        <mesh castShadow position={[0.12, 1.42, 0.06]}>
          <boxGeometry args={[0.28, 0.12, 0.22]} />
          <meshStandardMaterial color="#f6f5f2" />
        </mesh>
        <mesh position={[0, 1.35, 0.32]} {...bookshelf.eventHandlers}>
          <boxGeometry args={[1.22, 2.65, 0.86]} />
          <meshBasicMaterial opacity={0.001} transparent />
        </mesh>
        {bookshelf.highlighted ? <StationLabel project={bookshelf.project} /> : null}
      </group>

      <group position={[3.3, 0, 0.05]}>
        <mesh position={[0, 1.18, 0]} receiveShadow>
          <boxGeometry args={[0.1, 0.05, 2.46]} />
          <meshStandardMaterial color="#f7f8fb" />
        </mesh>
        <mesh position={[-0.43, 0.65, 0]} receiveShadow>
          <boxGeometry args={[0.78, 1.1, 2.36]} />
          <meshStandardMaterial color="#edf2f7" />
        </mesh>
        <mesh position={[0.02, 0.59, 0]} receiveShadow>
          <boxGeometry args={[0.14, 1.22, 2.28]} />
          <meshStandardMaterial color="#d7e0ea" />
        </mesh>
        <group position={[-0.15, 1.42, -0.16]} {...monitor.eventHandlers}>
          <InteractionMarker color={monitor.project.color} groundRing={false} mode={monitor.mode} position={[0.08, 0.12, 0.54]} />
          <mesh castShadow>
            <boxGeometry args={[0.06, 0.74, 0.98]} />
            <meshStandardMaterial color="#252f39" />
          </mesh>
          <mesh castShadow position={[-0.04, 0, 0]}>
            <boxGeometry args={[0.01, 0.58, 0.82]} />
            <meshStandardMaterial color={monitor.highlighted ? '#80a8ff' : '#6182ad'} emissive="#90aff8" emissiveIntensity={monitor.highlighted ? 0.85 : 0.35} />
          </mesh>
          <mesh castShadow position={[-0.06, -0.44, 0]}>
            <cylinderGeometry args={[0.05, 0.08, 0.28, 18]} />
            <meshStandardMaterial color="#5d6573" />
          </mesh>
          <mesh castShadow position={[-0.07, -0.6, 0]}>
            <boxGeometry args={[0.08, 0.04, 0.34]} />
            <meshStandardMaterial color="#e7edf3" />
          </mesh>
          <mesh position={[0, 0.08, 0]} {...monitor.eventHandlers}>
            <boxGeometry args={[0.65, 1.1, 1.16]} />
            <meshBasicMaterial opacity={0.001} transparent />
          </mesh>
          {monitor.highlighted ? <StationLabel project={monitor.project} /> : null}
        </group>

        <mesh castShadow position={[-0.12, 1.08, 0.62]}>
          <boxGeometry args={[0.06, 0.02, 0.56]} />
          <meshStandardMaterial color="#eef2f6" />
        </mesh>
        <mesh castShadow position={[-0.18, 1.08, 1.02]}>
          <boxGeometry args={[0.12, 0.02, 0.18]} />
          <meshStandardMaterial color="#dfe6ee" />
        </mesh>
        <mesh castShadow position={[-0.08, 1.46, 0.88]}>
          <cylinderGeometry args={[0.03, 0.03, 0.44, 12]} />
          <meshStandardMaterial color="#f1f4f8" />
        </mesh>
        <mesh castShadow position={[0, 1.7, 0.88]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#fafbfd" />
        </mesh>
        <mesh castShadow position={[-0.2, 1.12, -0.9]}>
          <boxGeometry args={[0.16, 0.24, 0.16]} />
          <meshStandardMaterial color="#ced9e3" />
        </mesh>
      </group>

      <group position={[3.35, 0, 0.15]}>
        <mesh castShadow position={[-0.8, 0.88, 0.05]} {...kiosk.eventHandlers}>
          <InteractionMarker color={kiosk.project.color} mode={kiosk.mode} position={[0.02, -0.52, 0.02]} />
          <boxGeometry args={[0.72, 1.2, 0.56]} />
          <meshStandardMaterial color="#f7f9fb" />
        </mesh>
        <mesh castShadow position={[-0.84, 1.02, 0.05]}>
          <boxGeometry args={[0.05, 0.52, 0.34]} />
          <meshStandardMaterial color="#24303a" />
        </mesh>
        <mesh castShadow position={[-0.87, 1.02, 0.05]}>
          <boxGeometry args={[0.01, 0.38, 0.24]} />
          <meshStandardMaterial color="#7ecfc0" emissive="#8cf2da" emissiveIntensity={kiosk.highlighted ? 0.8 : 0.32} />
        </mesh>
        <mesh castShadow position={[-0.8, 0.38, 0.05]}>
          <boxGeometry args={[0.54, 0.16, 0.42]} />
          <meshStandardMaterial color="#242933" />
        </mesh>
        <mesh position={[-0.8, 0.92, 0.05]} {...kiosk.eventHandlers}>
          <boxGeometry args={[0.92, 1.38, 0.76]} />
          <meshBasicMaterial opacity={0.001} transparent />
        </mesh>
        {kiosk.highlighted ? <StationLabel project={kiosk.project} /> : null}
      </group>

      <group position={[3.98, 1.92, -0.38]} rotation={[0, -Math.PI / 2, 0]} {...gallery.eventHandlers}>
        <InteractionMarker color={gallery.project.color} groundRing={false} mode={gallery.mode} position={[0.12, 0.12, 0.62]} />
        <Frame position={[0, 0.34, -0.48]} rotation={[0, 0, 0]} scale={[0.8, 0.8, 1]} tone="#d7e3e9" />
        <Frame position={[0, -0.28, 0.12]} rotation={[0, 0, 0]} scale={[0.8, 0.8, 1]} tone="#eadabf" />
        <Frame position={[0, 0.1, 0.66]} rotation={[0, 0, 0]} scale={[0.8, 0.8, 1]} tone="#d8d4f4" />
        <mesh position={[0, 0.04, 0.12]} {...gallery.eventHandlers}>
          <boxGeometry args={[0.72, 2.2, 3.0]} />
          <meshBasicMaterial opacity={0.001} transparent />
        </mesh>
        {gallery.highlighted ? <StationLabel project={gallery.project} /> : null}
      </group>

      <group ref={playerRef} position={[PLAYER_START.x, 0.22, PLAYER_START.z]}>
        <mesh position={[0, -0.18, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.18, 0.3, 28]} />
          <meshBasicMaterial color="#d6dfec" opacity={0.7} transparent />
        </mesh>

        <mesh castShadow position={[-0.08, -0.02, 0.04]}>
          <cylinderGeometry args={[0.045, 0.05, 0.14, 14]} />
          <meshStandardMaterial color="#232937" />
        </mesh>
        <mesh castShadow position={[0.08, -0.02, 0.04]}>
          <cylinderGeometry args={[0.045, 0.05, 0.14, 14]} />
          <meshStandardMaterial color="#232937" />
        </mesh>
        <mesh castShadow position={[-0.08, -0.1, 0.08]}>
          <sphereGeometry args={[0.055, 14, 14]} />
          <meshStandardMaterial color="#f3f4f8" />
        </mesh>
        <mesh castShadow position={[0.08, -0.1, 0.08]}>
          <sphereGeometry args={[0.055, 14, 14]} />
          <meshStandardMaterial color="#f3f4f8" />
        </mesh>

        <RoundedBox args={[0.32, 0.34, 0.22]} castShadow position={[0, 0.18, 0]} radius={0.08} receiveShadow>
          <meshStandardMaterial color="#2f3647" />
        </RoundedBox>
        <RoundedBox args={[0.12, 0.16, 0.1]} castShadow position={[0, 0.18, -0.15]} radius={0.04}>
          <meshStandardMaterial color="#404a5f" />
        </RoundedBox>
        <mesh castShadow position={[0, 0.19, 0.12]}>
          <boxGeometry args={[0.14, 0.08, 0.04]} />
          <meshStandardMaterial color="#d9b8ff" emissive="#d9b8ff" emissiveIntensity={0.3} />
        </mesh>
        <mesh castShadow position={[-0.23, 0.18, 0.01]} rotation={[0, 0, 0.25]}>
          <capsuleGeometry args={[0.035, 0.18, 6, 10]} />
          <meshStandardMaterial color="#2f3647" />
        </mesh>
        <mesh castShadow position={[0.23, 0.18, 0.01]} rotation={[0, 0, -0.25]}>
          <capsuleGeometry args={[0.035, 0.18, 6, 10]} />
          <meshStandardMaterial color="#2f3647" />
        </mesh>

        <mesh castShadow position={[0, 0.45, 0]}>
          <sphereGeometry args={[0.18, 22, 22]} />
          <meshStandardMaterial color="#f5d8c6" />
        </mesh>
        <mesh castShadow position={[0, 0.53, -0.01]} scale={[1.04, 0.86, 1.02]}>
          <sphereGeometry args={[0.18, 22, 22]} />
          <meshStandardMaterial color="#1f2634" />
        </mesh>
        <mesh castShadow position={[-0.06, 0.44, 0.16]}>
          <sphereGeometry args={[0.017, 10, 10]} />
          <meshStandardMaterial color="#151922" />
        </mesh>
        <mesh castShadow position={[0.06, 0.44, 0.16]}>
          <sphereGeometry args={[0.017, 10, 10]} />
          <meshStandardMaterial color="#151922" />
        </mesh>
        <mesh castShadow position={[0, 0.35, 0.16]} rotation={[0.15, 0, 0]}>
          <torusGeometry args={[0.032, 0.006, 6, 18, Math.PI]} />
          <meshStandardMaterial color="#d89088" />
        </mesh>
        <mesh castShadow position={[-0.1, 0.59, -0.02]}>
          <sphereGeometry args={[0.055, 14, 14]} />
          <meshStandardMaterial color="#1f2634" />
        </mesh>
        <mesh castShadow position={[0.1, 0.59, -0.02]}>
          <sphereGeometry args={[0.055, 14, 14]} />
          <meshStandardMaterial color="#1f2634" />
        </mesh>
      </group>
    </group>
  )
}
