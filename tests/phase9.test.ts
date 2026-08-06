import { describe, expect, it } from 'vitest'
import { githubRepositories, githubRepositorySnapshot } from '@/data/github-repositories'

describe('Phase 9 verified live evidence', () => {
  it('records the exact outcome of every Pages-enabled repository check', () => {
    expect(githubRepositorySnapshot.liveCheckedAt).toBe('2026-08-06')
    expect(githubRepositories.filter((repository) => repository.hasPages)).toHaveLength(20)
    expect(githubRepositories.filter((repository) => repository.liveStatus === 'verified')).toHaveLength(17)
    expect(githubRepositories.filter((repository) => repository.liveStatus === 'unavailable')).toHaveLength(3)
  })

  it('publishes live links only with a check date and observed HTML title', () => {
    for (const repository of githubRepositories) {
      if (repository.liveStatus === 'verified') {
        expect(repository.liveUrl).toMatch(/^https:\/\/qingpenglam\.github\.io\//)
        expect(repository.liveTitle).toBeTruthy()
        expect(repository.liveCheckedAt).toBe('2026-08-06')
      } else {
        expect(repository.liveUrl).toBeNull()
        expect(repository.liveTitle).toBeNull()
      }
    }
  })

  it('retains failed candidates as unavailable evidence instead of links', () => {
    const unavailableNames = githubRepositories.filter((repository) => repository.liveStatus === 'unavailable').map((repository) => repository.name)
    expect(unavailableNames).toEqual(['project-0009-montage-product-video-generator', 'AI-Town', 'arthistory-RPG'])
  })
})
