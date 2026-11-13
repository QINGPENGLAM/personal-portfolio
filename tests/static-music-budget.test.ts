import { mkdtempSync, mkdirSync, writeFileSync, truncateSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'
import { describe, expect, it } from 'vitest'

const script = fileURLToPath(new URL('../scripts/check-static-budgets.mjs', import.meta.url))
function checkBudget(musicBytes: number, otherBytes = 0) {
  const root = mkdtempSync(join(tmpdir(), 'portfolio-budget-'))
  try {
    mkdirSync(join(root, 'out/world'), { recursive: true })
    mkdirSync(join(root, 'out/audio'), { recursive: true })
    for (const file of ['index.html', 'world/index.html', 'app.js', 'app.css', 'extra.bin', 'audio/calm-ambient-dreamscape.mp3']) writeFileSync(join(root, 'out', file), '')
    truncateSync(join(root, 'out/audio/calm-ambient-dreamscape.mp3'), musicBytes)
    truncateSync(join(root, 'out/extra.bin'), otherBytes)
    return spawnSync(process.execPath, [script], { cwd: root, encoding: 'utf8' })
  } finally { rmSync(root, { recursive: true, force: true }) }
}

describe('optional background music budget', () => {
  it('reports optional music separately while accounting for the complete export', () => {
    const result = checkBudget(7_108_608)
    expect(result.status).toBe(0)
    expect(result.stdout).toContain('PASS optional background music')
    expect(result.stdout).toContain('PASS static export excluding optional music')
    expect(result.stdout).toContain('PASS complete static export')
  })
  it('enforces the 12.2 MB course-page content cap for everything other than the selected music file', () => {
    const result = checkBudget(0, 12_200_001)
    expect(result.status).not.toBe(0)
    expect(result.stdout).toContain('FAIL static export excluding optional music')
  })
  it('accepts the content allowance boundary', () => {
    expect(checkBudget(0, 12_200_000).status).toBe(0)
  })
  it('rejects music above its explicit 7.2 MB allowance', () => {
    const result = checkBudget(7_200_001)
    expect(result.status).not.toBe(0)
    expect(result.stdout).toContain('FAIL optional background music')
  })
})
