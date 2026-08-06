'use client'

import { useFrame } from '@react-three/fiber'
import { useRef, type MutableRefObject, type RefObject } from 'react'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { AICore } from './AICore'
import { WorldEnvironment } from './Environment'
import { Landmark } from './Landmark'
import { PlayerController } from './PlayerController'
import type { CameraFocusTarget } from './PlayerController'
import { ProjectLandmark } from './ProjectLandmark'
import { WorldSignals } from './WorldSignals'
import { projects } from '@/data/projects'
import { worldLandmarks, type WorldLandmarkKind } from '@/data/world'
import type { MovementInput, QualitySettings } from '@/lib/world'

function FrameBudgetMonitor({ onDecline }: { onDecline: () => void }) {
  const frameCountRef = useRef(0)
  const accumulatedDeltaRef = useRef(0)
  const reportedRef = useRef(false)

  useFrame((_, delta) => {
    if (reportedRef.current || document.hidden) return
    frameCountRef.current += 1
    accumulatedDeltaRef.current += Math.min(delta, 0.1)

    if (frameCountRef.current >= 180) {
      const averageDelta = accumulatedDeltaRef.current / frameCountRef.current
      if (averageDelta > 0.034) {
        reportedRef.current = true
        onDecline()
      } else {
        frameCountRef.current = 60
        accumulatedDeltaRef.current = averageDelta * 60
      }
    }
  })

  return null
}

export function WorldScene({ activeId, activeProjectSlug, cameraTarget, controlsRef, movementRef, onQualityDecline, onSelect, onSelectProject, quality, reducedMotion, theme }: {
  activeId: WorldLandmarkKind | null
  activeProjectSlug: string | null
  cameraTarget: CameraFocusTarget | null
  controlsRef: RefObject<OrbitControlsImpl | null>
  movementRef: MutableRefObject<MovementInput>
  onQualityDecline: () => void
  onSelect: (id: WorldLandmarkKind) => void
  onSelectProject: (slug: string) => void
  quality: QualitySettings
  reducedMotion: boolean
  theme: 'day' | 'night'
}) {
  const activeLandmark = worldLandmarks.find((landmark) => landmark.id === activeId) ?? null
  const activeProject = projects.find((project) => project.slug === activeProjectSlug) ?? null

  return (
    <>
      <WorldEnvironment quality={quality} reducedMotion={reducedMotion} theme={theme} />
      <AICore reducedMotion={reducedMotion} theme={theme} />
      {quality.mode !== 'performance' ? <WorldSignals quality={quality} reducedMotion={reducedMotion} theme={theme} /> : null}
      {worldLandmarks.map((landmark) => (
        <Landmark active={activeId === landmark.id} key={landmark.id} landmark={landmark} onSelect={onSelect} theme={theme} />
      ))}
      {projects.map((project) => <ProjectLandmark active={activeProjectSlug === project.slug} key={project.slug} onSelect={onSelectProject} project={project} theme={theme} />)}
      <PlayerController activeLandmark={cameraTarget ?? activeProject?.landmark ?? activeLandmark} controlsRef={controlsRef} movementRef={movementRef} reducedMotion={reducedMotion} />
      {quality.mode !== 'performance' ? <FrameBudgetMonitor onDecline={onQualityDecline} /> : null}
    </>
  )
}
