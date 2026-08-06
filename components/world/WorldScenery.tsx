'use client'

import { Instance, Instances } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { DoubleSide, type Group, type MeshStandardMaterial } from 'three'
import type { QualitySettings } from '@/lib/world'

const lanternPositions: Array<[number, number, number]> = [
  [-1.8, 0, 4.2], [1.5, 0, 5.6], [-3.2, 0, -2.6], [3.6, 0, -3.2],
  [-6.1, 0, 1.2], [6.2, 0, 1.3], [-7.6, 0, 7.2], [7.8, 0, 6.5],
]

const steppingStonePositions: Array<[number, number, number]> = Array.from({ length: 18 }, (_, index) => {
  const z = -7.5 + index * 0.86
  return [Math.sin(index * 1.7) * 0.45, 0.02, z]
})

function EnergyFalls({ reducedMotion, theme }: { reducedMotion: boolean; theme: 'day' | 'night' }) {
  const ribbonMaterialsRef = useRef<Array<MeshStandardMaterial | null>>([])
  const dropletsRef = useRef<Array<Group | null>>([])
  const elapsedRef = useRef(0)
  const color = theme === 'night' ? '#72e6ff' : '#5dc7ed'

  useFrame((_, delta) => {
    if (reducedMotion) return
    elapsedRef.current += Math.min(delta, 0.05)
    ribbonMaterialsRef.current.forEach((material, index) => {
      if (!material) return
      material.emissiveIntensity = 1.1 + Math.sin(elapsedRef.current * 1.4 + index) * 0.24
      material.opacity = 0.42 + Math.sin(elapsedRef.current * 1.1 + index * 0.8) * 0.08
    })
    dropletsRef.current.forEach((group, index) => {
      if (!group) return
      const progress = (elapsedRef.current * 0.28 + index / dropletsRef.current.length) % 1
      group.position.y = 8.3 - progress * 8.4
      group.position.x = Math.sin(progress * Math.PI * 2 + index) * 0.35
    })
  })

  return (
    <group position={[0, 0, -15]}>
      <mesh castShadow position={[0, 3.1, -0.9]} rotation={[0, 0.18, 0]}>
        <coneGeometry args={[5.7, 10.5, 8]} />
        <meshStandardMaterial color={theme === 'night' ? '#172a40' : '#6d8492'} roughness={0.96} />
      </mesh>
      <mesh castShadow position={[-2.6, 1.6, 0.1]} rotation={[0.1, 0.4, -0.15]}>
        <dodecahedronGeometry args={[2.4, 0]} />
        <meshStandardMaterial color={theme === 'night' ? '#1f3447' : '#778b8c'} roughness={0.92} />
      </mesh>
      {[-0.48, 0, 0.48].map((x, index) => (
        <mesh key={x} position={[x, 4.25, 2.35]}>
          <planeGeometry args={[0.78, 8.8, 1, 10]} />
          <meshStandardMaterial
            color={color}
            depthWrite={false}
            emissive={color}
            emissiveIntensity={1.2}
            opacity={0.48}
            ref={(material) => { ribbonMaterialsRef.current[index] = material }}
            side={DoubleSide}
            transparent
          />
        </mesh>
      ))}
      {Array.from({ length: 7 }, (_, index) => (
        <group key={index} position={[0, 8.3 - index * 1.1, 2.48]} ref={(group) => { dropletsRef.current[index] = group }}>
          <mesh><octahedronGeometry args={[0.1, 0]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.6} /></mesh>
        </group>
      ))}
      <mesh position={[0, 0.15, 2.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.2, 36]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={theme === 'night' ? 0.85 : 0.2} opacity={0.58} transparent />
      </mesh>
    </group>
  )
}

function FloatingIsland({ position, scale = 1, theme }: { position: [number, number, number]; scale?: number; theme: 'day' | 'night' }) {
  return (
    <group position={position} scale={scale}>
      <mesh castShadow rotation={[0.2, 0, Math.PI]}><coneGeometry args={[2.15, 3.5, 7]} /><meshStandardMaterial color={theme === 'night' ? '#25394b' : '#82928d'} roughness={0.92} /></mesh>
      <mesh castShadow position={[0, 1.3, 0]}><cylinderGeometry args={[1.9, 2.15, 0.65, 7]} /><meshStandardMaterial color={theme === 'night' ? '#244732' : '#678b55'} roughness={0.9} /></mesh>
      <mesh position={[0, 2.15, 0]}><coneGeometry args={[0.95, 2.1, 7]} /><meshStandardMaterial color={theme === 'night' ? '#6c3c83' : '#df91bd'} emissive={theme === 'night' ? '#562a70' : '#a55e86'} emissiveIntensity={theme === 'night' ? 0.6 : 0.08} /></mesh>
      <mesh position={[0, -1.95, 0]}><octahedronGeometry args={[0.18, 0]} /><meshStandardMaterial color="#8deaff" emissive="#8deaff" emissiveIntensity={2.3} /></mesh>
    </group>
  )
}

export function WorldScenery({ quality, reducedMotion, theme }: { quality: QualitySettings; reducedMotion: boolean; theme: 'day' | 'night' }) {
  const isNight = theme === 'night'
  const detailed = quality.mode !== 'performance'
  const lanternCount = Math.max(4, Math.round(lanternPositions.length * quality.sceneryDensity))

  return (
    <>
      <EnergyFalls reducedMotion={reducedMotion} theme={theme} />

      <Instances limit={lanternPositions.length} range={lanternCount} castShadow={quality.shadows}>
        <cylinderGeometry args={[0.07, 0.11, 1.25, 6]} />
        <meshStandardMaterial color={isNight ? '#2d2730' : '#6d5948'} roughness={0.82} />
        {lanternPositions.slice(0, lanternCount).map((position, index) => <Instance key={`lantern-post-${index}`} position={[position[0], 0.63, position[2]]} />)}
      </Instances>
      <Instances limit={lanternPositions.length} range={lanternCount}>
        <octahedronGeometry args={[0.17, 0]} />
        <meshStandardMaterial color={isNight ? '#ffd990' : '#fff0c4'} emissive={isNight ? '#ffae54' : '#e2a542'} emissiveIntensity={isNight ? 2.4 : 0.35} />
        {lanternPositions.slice(0, lanternCount).map((position, index) => <Instance key={`lantern-light-${index}`} position={[position[0], 1.35, position[2]]} />)}
      </Instances>

      {detailed ? (
        <>
          <Instances limit={steppingStonePositions.length} range={steppingStonePositions.length} receiveShadow>
            <cylinderGeometry args={[0.52, 0.62, 0.12, 7]} />
            <meshStandardMaterial color={isNight ? '#405361' : '#a9a48f'} emissive={isNight ? '#214d62' : '#776f51'} emissiveIntensity={isNight ? 0.32 : 0.04} roughness={0.9} />
            {steppingStonePositions.map((position, index) => <Instance key={`stone-${index}`} position={position} rotation={[0, index * 0.73, 0]} scale={index % 3 === 0 ? 1.18 : 0.9} />)}
          </Instances>
          <FloatingIsland position={[-14, 6.8, -5]} theme={theme} />
          <FloatingIsland position={[14.5, 8.4, -8.5]} scale={0.78} theme={theme} />
          <FloatingIsland position={[12.5, 5.8, 11]} scale={0.58} theme={theme} />
          <mesh position={[-13, 13, -26]}>
            <sphereGeometry args={[2.3, 20, 14]} />
            <meshBasicMaterial color={isNight ? '#d9e4ff' : '#fff1bf'} opacity={isNight ? 0.78 : 0.32} transparent />
          </mesh>
          <mesh position={[-13, 13, -26]}>
            <ringGeometry args={[2.8, 3.4, 40]} />
            <meshBasicMaterial color={isNight ? '#9aabff' : '#fff5d2'} opacity={0.16} side={DoubleSide} transparent />
          </mesh>
        </>
      ) : null}
    </>
  )
}
