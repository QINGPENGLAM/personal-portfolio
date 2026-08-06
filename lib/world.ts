export type QualityMode = 'automatic' | 'high' | 'balanced' | 'performance'
export type ResolvedQualityMode = Exclude<QualityMode, 'automatic'>

export type QualitySignals = {
  width: number
  devicePixelRatio: number
  reducedMotion: boolean
  deviceMemory?: number
}

export type QualitySettings = {
  mode: ResolvedQualityMode
  dpr: [number, number]
  shadows: boolean
  particleCount: number
  sceneryDensity: number
  antialias: boolean
}

const qualitySettings: Record<ResolvedQualityMode, QualitySettings> = {
  high: { mode: 'high', dpr: [1, 2], shadows: true, particleCount: 130, sceneryDensity: 1, antialias: true },
  balanced: { mode: 'balanced', dpr: [1, 1.5], shadows: true, particleCount: 76, sceneryDensity: 0.72, antialias: true },
  performance: { mode: 'performance', dpr: [1, 1], shadows: false, particleCount: 34, sceneryDensity: 0.42, antialias: false },
}

export function resolveQualityMode(mode: QualityMode, signals: QualitySignals): QualitySettings {
  if (mode !== 'automatic') return qualitySettings[mode]

  if (signals.reducedMotion || signals.width < 720 || signals.devicePixelRatio > 2.5 || (signals.deviceMemory !== undefined && signals.deviceMemory <= 4)) {
    return qualitySettings.performance
  }

  if (signals.width >= 1440 && signals.devicePixelRatio <= 2 && (signals.deviceMemory === undefined || signals.deviceMemory >= 8)) {
    return qualitySettings.high
  }

  return qualitySettings.balanced
}

export type MovementInput = {
  forward: boolean
  backward: boolean
  left: boolean
  right: boolean
}

export function getMovementAxes(input: MovementInput) {
  const x = Number(input.right) - Number(input.left)
  const z = Number(input.backward) - Number(input.forward)
  const length = Math.hypot(x, z)

  if (length <= 1) return { x, z }
  return { x: x / length, z: z / length }
}

export function clampWorldPosition(x: number, z: number, radius = 14) {
  const distance = Math.hypot(x, z)
  if (distance <= radius) return { x, z }
  const scale = radius / distance
  return { x: x * scale, z: z * scale }
}
