import { createReadStream, existsSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import { extname, join, normalize, resolve } from 'node:path'

const outputDirectory = resolve(process.cwd(), 'out')
const portArgument = process.argv.indexOf('--port')
const port = Number(portArgument >= 0 ? process.argv[portArgument + 1] : 3100)
const basePath = '/personal-portfolio'

if (!existsSync(join(outputDirectory, 'index.html'))) {
  throw new Error('Static export not found. Run the production build before Playwright.')
}

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
}

function resolveRequestPath(requestUrl) {
  const url = new URL(requestUrl ?? '/', 'http://localhost')
  const decodedPath = decodeURIComponent(url.pathname)
  const withoutBasePath = decodedPath === basePath ? '/' : decodedPath.startsWith(`${basePath}/`) ? decodedPath.slice(basePath.length) : decodedPath
  const normalizedPath = normalize(withoutBasePath).replace(/^(\.\.(\/|\\|$))+/, '')
  let filePath = join(outputDirectory, normalizedPath)

  if (!filePath.startsWith(outputDirectory)) return null
  if (existsSync(filePath) && statSync(filePath).isDirectory()) filePath = join(filePath, 'index.html')
  if (!existsSync(filePath) && !extname(filePath)) filePath = join(filePath, 'index.html')
  return existsSync(filePath) && statSync(filePath).isFile() ? filePath : null
}

const server = createServer((request, response) => {
  const filePath = resolveRequestPath(request.url)
  if (!filePath) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    response.end('Not found')
    return
  }

  const contentType = contentTypes[extname(filePath)] ?? 'application/octet-stream'
  response.writeHead(200, { 'Cache-Control': 'no-store', 'Content-Type': contentType })
  createReadStream(filePath).pipe(response)
})

server.listen(port, '127.0.0.1', () => {
  console.log(`Static portfolio available at http://localhost:${port}`)
})
