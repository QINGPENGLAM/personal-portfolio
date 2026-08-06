import { describe, expect, it } from 'vitest'
import { worldLandmarks } from '@/data/world'
import { getWorldTourStop, worldTourStops } from '@/data/world-tour'

describe('Phase 7 guided world', () => {
  it('keeps tour stops ordered, unique, and shareable', () => {
    expect(worldTourStops).toHaveLength(5)
    expect(new Set(worldTourStops.map((stop) => stop.id)).size).toBe(worldTourStops.length)
    expect(getWorldTourStop('identity')?.landmarkId).toBeNull()
    expect(getWorldTourStop('missing')).toBeNull()
  })

  it('connects every landmark tour stop to a real destination', () => {
    const landmarkIds = new Set(worldLandmarks.map((landmark) => landmark.id))
    for (const stop of worldTourStops) {
      expect(stop.href.startsWith('/')).toBe(true)
      expect(stop.cameraTarget.position).toHaveLength(3)
      expect(stop.cameraTarget.cameraOffset).toHaveLength(3)
      if (stop.landmarkId) expect(landmarkIds.has(stop.landmarkId)).toBe(true)
    }
  })
})
