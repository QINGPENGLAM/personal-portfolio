'use client'

import { Float } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group } from 'three'

export function AICore({ reducedMotion, theme }: { reducedMotion: boolean; theme: 'day' | 'night' }) {
  const innerRingRef = useRef<Group>(null)
  const outerRingRef = useRef<Group>(null)
  const elapsedRef = useRef(0)
  const energyColor = theme === 'night' ? '#72e6ff' : '#4a8cff'
  const violet = theme === 'night' ? '#8f7cff' : '#7454e8'

  useFrame((_, delta) => {
    if (reducedMotion) return
    elapsedRef.current += delta
    if (innerRingRef.current) {
      innerRingRef.current.rotation.y += delta * 0.35
      innerRingRef.current.rotation.x = Math.sin(elapsedRef.current * 0.4) * 0.18
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z -= delta * 0.2
      outerRingRef.current.rotation.y += delta * 0.12
    }
  })

  return (
    <group position={[0, 2.65, 0]}>
      <Float floatIntensity={reducedMotion ? 0 : 0.3} rotationIntensity={reducedMotion ? 0 : 0.12} speed={reducedMotion ? 0 : 1.2}>
        <mesh castShadow>
          <icosahedronGeometry args={[1.05, 2]} />
          <meshStandardMaterial color={energyColor} emissive={energyColor} emissiveIntensity={theme === 'night' ? 2.8 : 1.3} metalness={0.22} roughness={0.2} transparent opacity={0.78} />
        </mesh>
        <group ref={innerRingRef}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.72, 0.075, 10, 64]} />
            <meshStandardMaterial color={violet} emissive={violet} emissiveIntensity={2.2} metalness={0.6} roughness={0.18} />
          </mesh>
          <mesh rotation={[0.7, 0.25, 0.4]}>
            <torusGeometry args={[1.45, 0.045, 8, 48]} />
            <meshStandardMaterial color={energyColor} emissive={energyColor} emissiveIntensity={1.9} />
          </mesh>
        </group>
        <group ref={outerRingRef}>
          <mesh rotation={[0.3, 0.8, 0.2]}>
            <torusGeometry args={[2.18, 0.035, 8, 64]} />
            <meshStandardMaterial color={energyColor} emissive={energyColor} emissiveIntensity={1.4} transparent opacity={0.74} />
          </mesh>
        </group>
      </Float>
      <pointLight color={energyColor} distance={13} intensity={theme === 'night' ? 18 : 9} decay={2} />
      <mesh position={[0, -1.62, 0]} receiveShadow>
        <cylinderGeometry args={[1.9, 2.45, 0.55, 12]} />
        <meshStandardMaterial color={theme === 'night' ? '#132238' : '#788ca3'} metalness={0.72} roughness={0.3} />
      </mesh>
      <mesh position={[0, -1.3, 0]}>
        <cylinderGeometry args={[1.45, 1.65, 0.18, 32]} />
        <meshStandardMaterial color={energyColor} emissive={energyColor} emissiveIntensity={1.4} />
      </mesh>
    </group>
  )
}
