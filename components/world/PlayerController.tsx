'use client'

import { OrbitControls } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef, type MutableRefObject, type RefObject } from 'react'
import { Group, MathUtils, Vector3 } from 'three'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { clampWorldPosition, getMovementAxes, type MovementInput } from '@/lib/world'

export type CameraFocusTarget = {
  position: readonly [number, number, number]
  cameraOffset: readonly [number, number, number]
}

const keyMap: Record<string, keyof MovementInput> = {
  KeyW: 'forward', ArrowUp: 'forward', KeyS: 'backward', ArrowDown: 'backward', KeyA: 'left', KeyD: 'right',
}

const up = new Vector3(0, 1, 0)
const playerFocusOffset = new Vector3(0, 1.15, 0)
const followCameraOffset = new Vector3(0, 5.2, 9.5)
const followTargetOffset = new Vector3(0, 1.1, 0)

function isEditableTarget(target: EventTarget | null) {
  return target instanceof HTMLElement && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
}

export function PlayerController({ activeLandmark, controlsRef, movementRef, reducedMotion }: {
  activeLandmark: CameraFocusTarget | null
  controlsRef: RefObject<OrbitControlsImpl | null>
  movementRef: MutableRefObject<MovementInput>
  reducedMotion: boolean
}) {
  const playerRef = useRef<Group>(null)
  const keyboardRef = useRef<MovementInput>({ forward: false, backward: false, left: false, right: false })
  const wasFocusedRef = useRef(false)
  const forwardRef = useRef(new Vector3())
  const rightRef = useRef(new Vector3())
  const moveRef = useRef(new Vector3())
  const previousPositionRef = useRef(new Vector3())
  const targetRef = useRef(new Vector3())
  const desiredCameraRef = useRef(new Vector3())
  const { camera } = useThree()

  useEffect(() => {
    const handleKey = (event: KeyboardEvent, pressed: boolean) => {
      if (isEditableTarget(event.target)) return
      const direction = keyMap[event.code]
      if (!direction) return
      keyboardRef.current[direction] = pressed
      event.preventDefault()
    }
    const down = (event: KeyboardEvent) => handleKey(event, true)
    const up = (event: KeyboardEvent) => handleKey(event, false)
    const clear = () => { keyboardRef.current = { forward: false, backward: false, left: false, right: false } }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    window.addEventListener('blur', clear)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
      window.removeEventListener('blur', clear)
    }
  }, [])

  useFrame((_, rawDelta) => {
    const player = playerRef.current
    const controls = controlsRef.current
    if (!player || !controls) return

    const delta = Math.min(rawDelta, 0.05)
    const smoothing = reducedMotion ? 1 : 1 - Math.exp(-delta * 5.5)

    if (activeLandmark) {
      wasFocusedRef.current = true
      targetRef.current.set(activeLandmark.position[0], activeLandmark.position[1] + 1.75, activeLandmark.position[2])
      desiredCameraRef.current.set(
        activeLandmark.position[0] + activeLandmark.cameraOffset[0],
        activeLandmark.position[1] + activeLandmark.cameraOffset[1],
        activeLandmark.position[2] + activeLandmark.cameraOffset[2],
      )
      controls.target.lerp(targetRef.current, smoothing)
      camera.position.lerp(desiredCameraRef.current, smoothing)
      controls.update()
      return
    }

    if (wasFocusedRef.current) {
      targetRef.current.copy(player.position).add(playerFocusOffset)
      desiredCameraRef.current.copy(player.position).add(followCameraOffset)
      controls.target.lerp(targetRef.current, smoothing)
      camera.position.lerp(desiredCameraRef.current, smoothing)
      if (camera.position.distanceTo(desiredCameraRef.current) < 0.12) wasFocusedRef.current = false
      controls.update()
      return
    }

    const combinedInput: MovementInput = {
      forward: keyboardRef.current.forward || movementRef.current.forward,
      backward: keyboardRef.current.backward || movementRef.current.backward,
      left: keyboardRef.current.left || movementRef.current.left,
      right: keyboardRef.current.right || movementRef.current.right,
    }
    const axes = getMovementAxes(combinedInput)
    previousPositionRef.current.copy(player.position)

    if (axes.x !== 0 || axes.z !== 0) {
      camera.getWorldDirection(forwardRef.current)
      forwardRef.current.y = 0
      forwardRef.current.normalize()
      rightRef.current.crossVectors(forwardRef.current, up).normalize()
      moveRef.current.copy(rightRef.current).multiplyScalar(axes.x).addScaledVector(forwardRef.current, -axes.z).normalize()
      player.position.addScaledVector(moveRef.current, delta * 4.2)
      const clamped = clampWorldPosition(player.position.x, player.position.z)
      player.position.x = clamped.x
      player.position.z = clamped.z
      player.rotation.y = MathUtils.damp(player.rotation.y, Math.atan2(moveRef.current.x, moveRef.current.z), 12, delta)
    }

    const movementDelta = moveRef.current.copy(player.position).sub(previousPositionRef.current)
    camera.position.add(movementDelta)
    targetRef.current.copy(player.position).add(followTargetOffset)
    controls.target.lerp(targetRef.current, 1 - Math.exp(-delta * 10))
    controls.update()

  })

  return (
    <>
      <group ref={playerRef} position={[0, 0, 13]}>
        <mesh castShadow position={[0, 1.1, 0]}><capsuleGeometry args={[0.36, 0.92, 6, 10]} /><meshStandardMaterial color="#172230" roughness={0.8} /></mesh>
        <mesh castShadow position={[0, 2.02, 0]}><sphereGeometry args={[0.4, 14, 10]} /><meshStandardMaterial color="#141924" roughness={0.92} /></mesh>
        <mesh castShadow position={[0, 1.2, 0.35]}><boxGeometry args={[0.68, 0.82, 0.26]} /><meshStandardMaterial color="#4a3227" roughness={0.8} /></mesh>
        <mesh position={[0, 1.35, 0.5]}><octahedronGeometry args={[0.13]} /><meshStandardMaterial color="#72e6ff" emissive="#72e6ff" emissiveIntensity={1.6} /></mesh>
        <mesh castShadow position={[-0.22, 0.28, 0]}><capsuleGeometry args={[0.13, 0.45, 4, 8]} /><meshStandardMaterial color="#111722" /></mesh>
        <mesh castShadow position={[0.22, 0.28, 0]}><capsuleGeometry args={[0.13, 0.45, 4, 8]} /><meshStandardMaterial color="#111722" /></mesh>
      </group>
      <OrbitControls ref={controlsRef} enableDamping enablePan={false} maxDistance={15} maxPolarAngle={Math.PI / 2.05} minDistance={5.8} minPolarAngle={0.65} target={[0, 1.1, 13]} />
    </>
  )
}
