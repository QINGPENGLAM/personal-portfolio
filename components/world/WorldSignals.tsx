'use client'

import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Mesh } from 'three'
import { worldLandmarks } from '@/data/world'
import type { QualitySettings } from '@/lib/world'

export function WorldSignals({ quality, reducedMotion, theme }: { quality: QualitySettings; reducedMotion: boolean; theme: 'day' | 'night' }) {
  const signalRefs = useRef<Array<Mesh | null>>([])
  const elapsedRef = useRef(0)
  const activeLandmarks = worldLandmarks.slice(0, quality.mode === 'high' ? worldLandmarks.length : 4)
  const color = theme === 'night' ? '#8deaff' : '#fff4bd'

  useFrame((_, delta) => {
    if (reducedMotion) return
    elapsedRef.current += Math.min(delta, 0.05)
    signalRefs.current.forEach((mesh, index) => {
      const target = activeLandmarks[index]?.position
      if (!mesh || !target) return
      const rawProgress = (elapsedRef.current * 0.12 + index / activeLandmarks.length) % 1
      const progress = rawProgress < 0.5 ? rawProgress * 2 : (1 - rawProgress) * 2
      mesh.position.set(target[0] * progress, 1.2 + Math.sin(progress * Math.PI) * 1.8, target[2] * progress)
      const scale = 0.7 + Math.sin(progress * Math.PI) * 0.55
      mesh.scale.setScalar(scale)
    })
  })

  return <group>{activeLandmarks.map((landmark, index) => <mesh key={landmark.id} position={[landmark.position[0] * 0.5, 2.4, landmark.position[2] * 0.5]} ref={(mesh) => { signalRefs.current[index] = mesh }}><octahedronGeometry args={[0.1, 0]} /><meshStandardMaterial color={color} emissive={landmark.accent} emissiveIntensity={theme === 'night' ? 3 : 1.4} transparent opacity={0.9} /></mesh>)}</group>
}
