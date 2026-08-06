'use client'

import { Instance, Instances, Sparkles } from '@react-three/drei'
import { worldLandmarks } from '@/data/world'
import type { QualitySettings } from '@/lib/world'
import { WorldScenery } from './WorldScenery'

const treePositions: Array<[number, number, number]> = [
  [-12, 0, -7], [-10.5, 0, -9], [-5, 0, -11], [5.5, 0, -10], [11, 0, -8], [12, 0, -1],
  [12.5, 0, 6], [9.8, 0, 11], [13, 0, 2], [-13, 0, 1], [-10, 0, 10], [-12.5, 0, 5],
  [-7, 0, 5.5], [7.3, 0, 3.4], [-4.5, 0, -6.5], [4.2, 0, -6.4], [-1.5, 0, 8.5], [3.1, 0, 7.8],
]

const mountainPositions: Array<[number, number, number]> = [
  [-20, 1.8, -20], [-14, 1.4, -23], [-7, 2.2, -24], [2, 1.5, -25], [10, 2.4, -23], [18, 1.7, -20],
]

function WorldPath({ destination, theme }: { destination: readonly [number, number, number]; theme: 'day' | 'night' }) {
  const [x, , z] = destination
  const length = Math.hypot(x, z)
  const angle = Math.atan2(x, z)

  return (
    <mesh position={[x / 2, 0.055, z / 2]} rotation={[0, angle, 0]} receiveShadow>
      <boxGeometry args={[0.48, 0.07, length]} />
      <meshStandardMaterial color={theme === 'night' ? '#314f62' : '#a8a58f'} emissive={theme === 'night' ? '#276982' : '#665f42'} emissiveIntensity={theme === 'night' ? 0.5 : 0.08} roughness={0.82} />
    </mesh>
  )
}

export function WorldEnvironment({ quality, reducedMotion, theme }: { quality: QualitySettings; reducedMotion: boolean; theme: 'day' | 'night' }) {
  const treeCount = Math.max(6, Math.round(treePositions.length * quality.sceneryDensity))
  const activeTrees = treePositions.slice(0, treeCount)
  const isNight = theme === 'night'

  return (
    <>
      <color attach="background" args={[isNight ? '#061126' : '#81bde3']} />
      <fog attach="fog" args={[isNight ? '#102441' : '#b8d8e7', 19, 48]} />

      <ambientLight color={isNight ? '#7586c9' : '#fff0d2'} intensity={isNight ? 0.65 : 1.35} />
      <hemisphereLight args={[isNight ? '#6e87d8' : '#d7efff', isNight ? '#07110d' : '#6d8057', isNight ? 0.8 : 1.8]} />
      <directionalLight castShadow={quality.shadows} color={isNight ? '#a8c6ff' : '#fff2c2'} intensity={isNight ? 2.2 : 3.5} position={[-9, 16, 8]} shadow-mapSize={[quality.mode === 'high' ? 2048 : 1024, quality.mode === 'high' ? 2048 : 1024]} />

      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[17, 72]} />
        <meshStandardMaterial color={isNight ? '#10271f' : '#5f8851'} roughness={0.95} />
      </mesh>

      <mesh position={[0, -0.13, 1.7]} rotation={[-Math.PI / 2, 0, -0.08]}>
        <planeGeometry args={[2.2, 27]} />
        <meshPhysicalMaterial color={isNight ? '#1d75a5' : '#62bde3'} emissive={isNight ? '#1c628a' : '#2089ae'} emissiveIntensity={isNight ? 0.65 : 0.14} metalness={0.15} roughness={0.22} transparent opacity={0.86} />
      </mesh>

      {worldLandmarks.map((landmark) => <WorldPath destination={landmark.position} key={landmark.id} theme={theme} />)}

      <Instances limit={treePositions.length} range={activeTrees.length} castShadow={quality.shadows}>
        <cylinderGeometry args={[0.18, 0.3, 2.3, 7]} />
        <meshStandardMaterial color={isNight ? '#2a1a24' : '#5b3d2d'} roughness={0.92} />
        {activeTrees.map((position, index) => <Instance key={`trunk-${index}`} position={[position[0], 1.15, position[2]]} rotation={[0, index * 0.73, 0]} />)}
      </Instances>

      <Instances limit={treePositions.length} range={activeTrees.length} castShadow={quality.shadows}>
        <icosahedronGeometry args={[1.18, quality.mode === 'high' ? 2 : 1]} />
        <meshStandardMaterial color={isNight ? '#a456a7' : '#eaa6c9'} emissive={isNight ? '#672d7d' : '#bb6f99'} emissiveIntensity={isNight ? 0.62 : 0.12} roughness={0.78} />
        {activeTrees.map((position, index) => <Instance key={`crown-${index}`} position={[position[0], 2.6 + (index % 3) * 0.12, position[2]]} scale={index % 2 === 0 ? 1 : 0.82} rotation={[index * 0.2, index * 0.5, 0]} />)}
      </Instances>

      <Instances limit={mountainPositions.length} range={mountainPositions.length}>
        <coneGeometry args={[5.8, 9, 7]} />
        <meshStandardMaterial color={isNight ? '#13253a' : '#668094'} roughness={1} />
        {mountainPositions.map((position, index) => <Instance key={`mountain-${index}`} position={position} scale={index % 2 === 0 ? 1 : 0.72} rotation={[0, index * 0.65, 0]} />)}
      </Instances>

      <WorldScenery quality={quality} reducedMotion={reducedMotion} theme={theme} />

      <Sparkles count={quality.particleCount} color={isNight ? '#a9eaff' : '#fff2bf'} opacity={isNight ? 0.8 : 0.42} scale={[32, 13, 32]} size={isNight ? 2.5 : 1.7} speed={reducedMotion ? 0 : isNight ? 0.2 : 0.08} />
    </>
  )
}
