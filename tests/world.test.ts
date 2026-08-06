import { describe, expect, it } from 'vitest'
import { worldLandmarks } from '@/data/world'
import { clampWorldPosition, getMovementAxes, resolveQualityMode } from '@/lib/world'

describe('world configuration', () => {
  it('keeps landmark ids and routes unique', () => {
    expect(new Set(worldLandmarks.map((landmark) => landmark.id)).size).toBe(worldLandmarks.length)
    expect(new Set(worldLandmarks.map((landmark) => landmark.href)).size).toBe(worldLandmarks.length)
  })

  it('normalizes diagonal movement', () => {
    const movement = getMovementAxes({ forward: true, backward: false, left: false, right: true })
    expect(Math.hypot(movement.x, movement.z)).toBeCloseTo(1)
  })

  it('keeps the player inside the intentional world boundary', () => {
    expect(clampWorldPosition(30, 0, 14)).toEqual({ x: 14, z: 0 })
    expect(clampWorldPosition(2, 3, 14)).toEqual({ x: 2, z: 3 })
  })

  it('chooses conservative automatic quality for mobile and reduced motion', () => {
    expect(resolveQualityMode('automatic', { width: 390, devicePixelRatio: 3, reducedMotion: false }).mode).toBe('performance')
    expect(resolveQualityMode('automatic', { width: 1600, devicePixelRatio: 1, reducedMotion: true, deviceMemory: 16 }).mode).toBe('performance')
    expect(resolveQualityMode('automatic', { width: 1600, devicePixelRatio: 1.5, reducedMotion: false, deviceMemory: 16 }).mode).toBe('high')
  })
})
