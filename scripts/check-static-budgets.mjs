import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { gzipSync } from 'node:zlib'

const outputDirectory = join(process.cwd(), 'out')

if (!existsSync(outputDirectory)) {
  throw new Error('Static export not found. Run npm run build before checking budgets.')
}

function filesUnder(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name)
    return entry.isDirectory() ? filesUnder(path) : [path]
  })
}

function scriptGzipSize(htmlPath) {
  const html = readFileSync(htmlPath, 'utf8')
  const sources = [...html.matchAll(/<script[^>]+src="([^"]+\.js)"/g)].map((match) => match[1])
  const uniqueFiles = new Set(sources.map((source) => join(outputDirectory, source.replace(/^\/personal-portfolio\//, '').replace(/^\//, ''))))
  return [...uniqueFiles].reduce((total, file) => total + gzipSync(readFileSync(file)).byteLength, 0)
}

const routeBudgets = [
  { label: 'homepage initial JavaScript (gzip)', path: join(outputDirectory, 'index.html'), max: 275 * 1024 },
  { label: 'world shell initial JavaScript (gzip)', path: join(outputDirectory, 'world', 'index.html'), max: 290 * 1024 },
]

const allFiles = filesUnder(outputDirectory)
const jsFiles = allFiles.filter((file) => file.endsWith('.js'))
const cssFiles = allFiles.filter((file) => file.endsWith('.css'))
const largestJavaScript = Math.max(...jsFiles.map((file) => gzipSync(readFileSync(file)).byteLength))
const largestStylesheet = Math.max(...cssFiles.map((file) => gzipSync(readFileSync(file)).byteLength))
const totalExport = allFiles.reduce((total, file) => total + statSync(file).size, 0)
const checks = [
  ...routeBudgets.map((budget) => ({ label: budget.label, actual: scriptGzipSize(budget.path), max: budget.max })),
  { label: 'largest JavaScript chunk (gzip)', actual: largestJavaScript, max: 310_000 },
  { label: 'largest stylesheet (gzip)', actual: largestStylesheet, max: 22_000 },
  { label: 'complete static export', actual: totalExport, max: 12_000_000 },
]

for (const check of checks) {
  const result = check.actual <= check.max ? 'PASS' : 'FAIL'
  console.log(`${result} ${check.label}: ${Math.round(check.actual / 1024)} KiB / ${Math.round(check.max / 1024)} KiB`)
}

const failures = checks.filter((check) => check.actual > check.max)
if (failures.length) throw new Error(`Static performance budget exceeded: ${failures.map((failure) => failure.label).join(', ')}`)
