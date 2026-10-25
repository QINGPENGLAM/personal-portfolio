import { easeOutCubic, lerp, range } from './math'

/** Original six-layer choreography, with Earthrise starting after the dust clears. */
export function sceneAt(p: number) {
  const veil = 1 - range(p, 0, 0.18)
  const exit = range(p, 0.7, 1)
  const settle = easeOutCubic(range(p, 0, 0.5))
  const rise = easeOutCubic(range(p, 0.18, 0.5))
  const rim = easeOutCubic(range(p, 0.28, 0.58))
  const up = easeOutCubic(range(p, 0.36, 0.62))
  const ground = easeOutCubic(range(p, 0.34, 0.6))
  const titleIn = easeOutCubic(range(p, 0.08, 0.24))
  return {
    veil, rise,
    skyY: lerp(0, -6, p), skyScale: lerp(1.14, 1, settle),
    earthY: lerp(34, 0, rise) - exit * 12, earthScale: lerp(0.92, 1, rise),
    moonscapeY: lerp(9, 0, settle) - exit * 26,
    frameY: -exit * 44, frameScale: lerp(1.6, 1, rim), frameOpacity: rim,
    astronautY: lerp(28, 0, up) - exit * 58, astronautOpacity: Math.min(1, up * 2),
    groundY: lerp(36, 0, ground) - exit * 78,
    titleOpacity: titleIn * (1 - range(p, 0.42, 0.52)),
    titleTracking: lerp(0.6, 0.14, titleIn),
    hudOpacity: range(p, 0.02, 0.1) * (1 - range(p, 0.62, 0.72)),
  }
}
