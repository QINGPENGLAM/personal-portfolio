'use client'

import { Float, Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, type CSSProperties, type RefObject } from 'react'
import type { Group } from 'three'
import type { Project } from '@/data/schemas'

function DevDoctorLandmark({ active, accent, animatedRef }: { active: boolean; accent: string; animatedRef: RefObject<Group | null> }) {
  return (
    <group>
      <mesh castShadow position={[0, 1.25, 0]}><cylinderGeometry args={[1.05, 1.35, 2.4, 8]} /><meshStandardMaterial color="#1c2942" emissive={accent} emissiveIntensity={active ? .45 : .12} metalness={.7} roughness={.3} /></mesh>
      <group ref={animatedRef}>
        {[.55, 1.3, 2.05].map((y, index) => <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, index * .3, 0]}><torusGeometry args={[1.25 + index * .08, .07, 8, 32]} /><meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={active ? 2.1 : 1.05} /></mesh>)}
      </group>
      <mesh position={[0, 2.95, 0]}><octahedronGeometry args={[.52]} /><meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={2.2} /></mesh>
    </group>
  )
}

function ImmichLandmark({ active, accent, animatedRef }: { active: boolean; accent: string; animatedRef: RefObject<Group | null> }) {
  return (
    <group>
      <mesh castShadow position={[0, .55, 0]}><cylinderGeometry args={[1.5, 1.8, 1, 12]} /><meshStandardMaterial color="#173238" emissive={accent} emissiveIntensity={active ? .34 : .08} metalness={.4} roughness={.48} /></mesh>
      <mesh castShadow position={[0, 1.45, 0]}><sphereGeometry args={[1.18, 18, 12, 0, Math.PI * 2, 0, Math.PI / 2]} /><meshStandardMaterial color="#234852" emissive={accent} emissiveIntensity={active ? .55 : .16} metalness={.58} roughness={.25} /></mesh>
      <group ref={animatedRef} position={[0, 2.25, 0]} rotation={[0, 0, -.45]}>
        <mesh><cylinderGeometry args={[.42, .62, 1.9, 12]} /><meshStandardMaterial color="#263e4d" metalness={.7} roughness={.24} /></mesh>
        <mesh position={[0, 1, 0]}><sphereGeometry args={[.5, 18, 12]} /><meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={active ? 2.4 : 1.25} transparent opacity={.78} /></mesh>
      </group>
    </group>
  )
}

export function ProjectLandmark({ active, onSelect, project, theme }: { active: boolean; onSelect: (slug: string) => void; project: Project; theme: 'day' | 'night' }) {
  const animatedRef = useRef<Group>(null)
  const elapsedRef = useRef(0)

  useFrame((_, delta) => {
    elapsedRef.current += delta
    if (!animatedRef.current) return
    animatedRef.current.rotation.y += delta * (active ? .8 : .22)
    animatedRef.current.position.y = active ? Math.sin(elapsedRef.current * 2) * .12 : 0
  })

  return (
    <group
      onClick={(event) => { event.stopPropagation(); onSelect(project.slug) }}
      onPointerOut={() => { document.body.style.cursor = '' }}
      onPointerOver={(event) => { event.stopPropagation(); document.body.style.cursor = 'pointer' }}
      position={project.landmark.position}
    >
      {project.slug === 'devdoctor'
        ? <DevDoctorLandmark accent={project.landmark.accent} active={active} animatedRef={animatedRef} />
        : <ImmichLandmark accent={project.landmark.accent} active={active} animatedRef={animatedRef} />}
      <Float floatIntensity={.2} rotationIntensity={0} speed={1.4}>
        <mesh position={[0, 4.15, 0]}><octahedronGeometry args={[.22]} /><meshStandardMaterial color={project.landmark.accent} emissive={project.landmark.accent} emissiveIntensity={2.8} /></mesh>
      </Float>
      <Html center distanceFactor={10} position={[0, 4.75, 0]} transform={false} zIndexRange={[22, 0]}>
        <button
          aria-label={`Inspect ${project.title} project landmark`}
          className={`scene-marker project-scene-marker${active ? ' is-active' : ''}`}
          onClick={(event) => { event.stopPropagation(); onSelect(project.slug) }}
          style={{ '--landmark-accent': project.landmark.accent } as CSSProperties}
          type="button"
        ><span aria-hidden="true" /><strong>{project.title}</strong><small>{project.landmark.type}</small></button>
      </Html>
      {active ? <pointLight color={project.landmark.accent} distance={7} intensity={theme === 'night' ? 9 : 4.5} position={[0, 2.6, 0]} /> : null}
    </group>
  )
}
