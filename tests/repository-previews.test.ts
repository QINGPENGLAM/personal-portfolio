import { existsSync } from 'node:fs'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { GitHubArchive } from '@/components/projects/GitHubArchive'
import { githubRepositories } from '@/data/github-repositories'
import { repositoryPreviews } from '@/data/repository-previews'

const expectedFiles = {
  Calculator: 'calculator.webp',
  'food-ordering-': 'food-ordering.webp',
  topicshare: 'topicshare.webp',
  'Tic-Tac-Toe': 'tic-tac-toe.webp',
  'cube-game': 'cube-game.webp',
  'random-spawn-dodge': 'random-spawn-dodge.webp',
  'arthistory-RPG': 'art-history-rpg.webp',
}

afterEach(() => vi.unstubAllEnvs())

describe('original repository imagery', () => {
  it('maps exactly the seven corroborated projects to packaged local images', () => {
    expect(Object.keys(repositoryPreviews).sort()).toEqual(Object.keys(expectedFiles).sort())
    for (const [name, file] of Object.entries(expectedFiles)) {
      const preview = repositoryPreviews[name]!
      expect(githubRepositories.some(repository => repository.name === name)).toBe(true)
      expect(preview.src).toBe(`/project-previews/archive/${file}`)
      expect(existsSync(`public${preview.src}`)).toBe(true)
      expect(preview.alt.length).toBeGreaterThan(20)
    }
  })

  it('distinguishes artwork from historical game screens', () => {
    for (const name of ['Calculator', 'food-ordering-', 'topicshare', 'Tic-Tac-Toe']) {
      expect(repositoryPreviews[name]?.caption).toBe('Original project artwork')
    }
    for (const name of ['cube-game', 'arthistory-RPG']) {
      expect(repositoryPreviews[name]?.caption).toBe('Archived gameplay image')
    }
    expect(repositoryPreviews['random-spawn-dodge']?.caption).toBe('Archived game-over screen')
  })

  it('renders images with deployment paths while preserving all 39 cards and source links', () => {
    vi.stubEnv('NEXT_PUBLIC_BASE_PATH', '/personal-portfolio')
    const html = renderToStaticMarkup(createElement(GitHubArchive, { repositories: githubRepositories, snapshotDate: '2026-08-16' }))
    expect(html.match(/<article /g)).toHaveLength(39)
    expect(html.match(/<figure /g)).toHaveLength(7)
    expect(html.match(/loading="lazy"/g)).toHaveLength(7)
    const imageSources = [...html.matchAll(/<img[^>]*src="([^"]*)"/g)].map(([, src]) => new URL(src, "https://test.local").searchParams.get("url") ?? src)
    for (const name of Object.keys(expectedFiles)) {
      const preview = repositoryPreviews[name]!
      expect(imageSources).toContain(`/personal-portfolio${preview.src}`)
      expect(html).toContain(preview.caption)
    }
    for (const repository of githubRepositories) expect(html).toContain(`href="${repository.codeUrl}"`)
    const withoutImage = renderToStaticMarkup(createElement(GitHubArchive, { repositories: githubRepositories.filter(repository => repository.name === 'Raytracer'), snapshotDate: '2026-08-16' }))
    expect(withoutImage).not.toContain('<figure')
    expect(withoutImage).toContain('Raytracer')
  })
})
