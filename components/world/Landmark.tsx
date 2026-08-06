'use client'

import { Float, Html } from '@react-three/drei'
import type { WorldLandmark } from '@/data/world'

function ProjectDistrict({ accent, active }: { accent: string; active: boolean }) {
  return (
    <group>
      {[-1.15, 0, 1.15].map((x, index) => (
        <mesh castShadow key={x} position={[x, 1 + index * 0.25, index % 2 ? 0.1 : -0.25]}>
          <boxGeometry args={[1.55, 2 + index * 0.5, 1.55]} />
          <meshStandardMaterial color={index === 1 ? '#26334c' : '#1b2a3d'} emissive={accent} emissiveIntensity={active ? 0.55 : 0.12} metalness={0.5} roughness={0.45} />
        </mesh>
      ))}
      <mesh position={[0, 2.75, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.8, 0.13, 8, 24]} /><meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.4} /></mesh>
    </group>
  )
}

function ExperienceTower({ accent, active }: { accent: string; active: boolean }) {
  return (
    <group>
      {[0, 1, 2].map((level) => <mesh castShadow key={level} position={[0, 0.65 + level * 1.2, 0]}><cylinderGeometry args={[1.45 - level * 0.2, 1.65 - level * 0.15, 1.15, 8]} /><meshStandardMaterial color="#1a2c45" emissive={accent} emissiveIntensity={active ? 0.42 : 0.09} metalness={0.45} roughness={0.4} /></mesh>)}
      <mesh position={[0, 4.4, 0]}><octahedronGeometry args={[0.65]} /><meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.8} /></mesh>
    </group>
  )
}

function Observatory({ accent, active }: { accent: string; active: boolean }) {
  return (
    <group>
      <mesh castShadow position={[0, 0.8, 0]}><cylinderGeometry args={[1.75, 2, 1.55, 12]} /><meshStandardMaterial color="#243346" emissive={accent} emissiveIntensity={active ? 0.38 : 0.08} roughness={0.5} /></mesh>
      <mesh castShadow position={[0, 1.75, 0]}><sphereGeometry args={[1.45, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2]} /><meshStandardMaterial color="#2b3c58" emissive={accent} emissiveIntensity={active ? 0.55 : 0.18} metalness={0.62} roughness={0.22} /></mesh>
      <mesh position={[0.6, 2.5, 0]} rotation={[0, 0, -0.65]}><cylinderGeometry args={[0.18, 0.27, 2.1, 8]} /><meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.1} /></mesh>
    </group>
  )
}

function SkillsWorkshop({ accent, active }: { accent: string; active: boolean }) {
  return (
    <group>
      <mesh castShadow position={[0, 0.72, 0]}><boxGeometry args={[3.4, 1.35, 2.5]} /><meshStandardMaterial color="#193238" emissive={accent} emissiveIntensity={active ? 0.4 : 0.09} roughness={0.58} /></mesh>
      {[-1, 0, 1].map((x, index) => <mesh key={x} position={[x, 1.75 + (index % 2) * 0.35, 0]} rotation={[Math.PI / 2, 0, index * 0.32]}><torusGeometry args={[0.48, 0.12, 7, 12]} /><meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.15} metalness={0.65} /></mesh>)}
    </group>
  )
}

function EducationArchive({ accent, active }: { accent: string; active: boolean }) {
  return (
    <group>
      <mesh castShadow position={[0, 0.25, 0]}><boxGeometry args={[3.3, 0.5, 2.2]} /><meshStandardMaterial color="#393226" /></mesh>
      {[-1.15, 1.15].map((x) => <mesh castShadow key={x} position={[x, 1.7, 0]}><cylinderGeometry args={[0.27, 0.33, 2.9, 10]} /><meshStandardMaterial color="#776e5b" emissive={accent} emissiveIntensity={active ? 0.28 : 0.04} /></mesh>)}
      <mesh castShadow position={[0, 3.1, 0]}><boxGeometry args={[3.5, 0.42, 2.4]} /><meshStandardMaterial color="#574b39" /></mesh>
      <mesh position={[0, 2.05, -0.85]}><boxGeometry args={[1.65, 1.2, 0.18]} /><meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.2} /></mesh>
    </group>
  )
}

function ResumeTerminal({ accent, active }: { accent: string; active: boolean }) {
  return (
    <group>
      <mesh castShadow position={[0, 1.35, 0]} rotation={[-0.1, 0, 0]}><boxGeometry args={[2.7, 2.5, 0.4]} /><meshStandardMaterial color="#202b3a" metalness={0.62} roughness={0.3} /></mesh>
      <mesh position={[0, 1.48, -0.23]} rotation={[-0.1, 0, 0]}><planeGeometry args={[2.15, 1.75]} /><meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={active ? 2 : 1.2} /></mesh>
      <mesh castShadow position={[0, 0.3, 0.3]}><cylinderGeometry args={[0.48, 0.72, 0.6, 8]} /><meshStandardMaterial color="#303a48" /></mesh>
    </group>
  )
}

function ContactPortal({ accent, active }: { accent: string; active: boolean }) {
  return (
    <group>
      <mesh castShadow position={[0, 1.85, 0]}><torusGeometry args={[1.65, 0.32, 12, 32]} /><meshStandardMaterial color="#30324d" emissive={accent} emissiveIntensity={active ? 1 : 0.28} metalness={0.64} roughness={0.25} /></mesh>
      <mesh position={[0, 1.85, 0]}><circleGeometry args={[1.32, 32]} /><meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={active ? 2.2 : 1.25} transparent opacity={0.62} /></mesh>
      <mesh castShadow position={[0, 0.2, 0]}><boxGeometry args={[3.8, 0.38, 1.5]} /><meshStandardMaterial color="#282b3a" /></mesh>
    </group>
  )
}

function LandmarkModel({ landmark, active }: { landmark: WorldLandmark; active: boolean }) {
  const props = { accent: landmark.accent, active }
  if (landmark.id === 'projects') return <ProjectDistrict {...props} />
  if (landmark.id === 'experience') return <ExperienceTower {...props} />
  if (landmark.id === 'about') return <Observatory {...props} />
  if (landmark.id === 'skills') return <SkillsWorkshop {...props} />
  if (landmark.id === 'education') return <EducationArchive {...props} />
  if (landmark.id === 'resume') return <ResumeTerminal {...props} />
  return <ContactPortal {...props} />
}

export function Landmark({ active, landmark, onSelect, theme }: { active: boolean; landmark: WorldLandmark; onSelect: (id: WorldLandmark['id']) => void; theme: 'day' | 'night' }) {
  return (
    <group
      onClick={(event) => { event.stopPropagation(); onSelect(landmark.id) }}
      onPointerOut={() => { document.body.style.cursor = '' }}
      onPointerOver={(event) => { event.stopPropagation(); document.body.style.cursor = 'pointer' }}
      position={landmark.position}
    >
      <LandmarkModel active={active} landmark={landmark} />
      <Float floatIntensity={0.28} rotationIntensity={0} speed={1.5}>
        <mesh position={[0, 4.9, 0]}>
          <octahedronGeometry args={[0.26]} />
          <meshStandardMaterial color={landmark.accent} emissive={landmark.accent} emissiveIntensity={2.5} />
        </mesh>
      </Float>
      <Html center distanceFactor={11} position={[0, 5.55, 0]} transform={false} zIndexRange={[20, 0]}>
        <button
          aria-label={`Focus ${landmark.label}`}
          className={`scene-marker${active ? ' is-active' : ''}`}
          onClick={(event) => { event.stopPropagation(); onSelect(landmark.id) }}
          style={{ '--landmark-accent': landmark.accent } as React.CSSProperties}
          type="button"
        >
          <span aria-hidden="true" />
          <strong>{landmark.label}</strong>
          <small>{landmark.detail}</small>
        </button>
      </Html>
      {active ? <pointLight color={landmark.accent} distance={8} intensity={theme === 'night' ? 8 : 4} position={[0, 3, 0]} /> : null}
    </group>
  )
}
