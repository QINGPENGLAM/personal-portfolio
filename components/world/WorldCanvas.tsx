'use client'

import { Canvas } from '@react-three/fiber'
import { useRef, type MutableRefObject } from 'react'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import type { WorldLandmarkKind } from '@/data/world'
import type { MovementInput, QualitySettings } from '@/lib/world'
import type { CameraFocusTarget } from './PlayerController'
import { WorldScene } from './WorldScene'

export default function WorldCanvas({ activeId, activeProjectSlug, cameraTarget, isVisible, movementRef, onQualityDecline, onReady, onSelect, onSelectProject, quality, reducedMotion, theme }: {
  activeId: WorldLandmarkKind | null
  activeProjectSlug: string | null
  cameraTarget: CameraFocusTarget | null
  isVisible: boolean
  movementRef: MutableRefObject<MovementInput>
  onQualityDecline: () => void
  onReady: () => void
  onSelect: (id: WorldLandmarkKind | null) => void
  onSelectProject: (slug: string) => void
  quality: QualitySettings
  reducedMotion: boolean
  theme: 'day' | 'night'
}) {
  const controlsRef = useRef<OrbitControlsImpl>(null)

  return (
    <Canvas
      camera={{ far: 80, fov: 48, near: 0.1, position: [0, 6, 21] }}
      dpr={quality.dpr}
      frameloop={isVisible ? 'always' : 'demand'}
      gl={{ alpha: false, antialias: quality.antialias, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => {
        gl.domElement.setAttribute('aria-label', 'Interactive fantasy portfolio world')
        gl.domElement.setAttribute('role', 'img')
        gl.domElement.tabIndex = 0
        onReady()
      }}
      onPointerMissed={() => onSelect(null)}
      shadows={quality.shadows ? 'basic' : false}
    >
      <WorldScene
        activeId={activeId}
        activeProjectSlug={activeProjectSlug}
        cameraTarget={cameraTarget}
        controlsRef={controlsRef}
        movementRef={movementRef}
        onQualityDecline={onQualityDecline}
        onSelect={(id) => onSelect(id)}
        onSelectProject={onSelectProject}
        quality={quality}
        reducedMotion={reducedMotion}
        theme={theme}
      />
    </Canvas>
  )
}
