import { describe, expect, it } from 'vitest'
import { githubRepositories, githubRepositorySnapshot } from '@/data/github-repositories'
import { projects } from '@/data/projects'

describe('Phase 8 repository evidence', () => {
  it('publishes a dated snapshot of every current public repository', () => {
    expect(githubRepositorySnapshot.capturedAt).toBe('2026-08-06')
    expect(githubRepositories).toHaveLength(39)
    expect(new Set(githubRepositories.map((repository) => repository.name))).toHaveLength(39)
    expect(new Set(githubRepositories.map((repository) => repository.codeUrl))).toHaveLength(39)
  })

  it('keeps missing GitHub descriptions explicit instead of filling them with marketing copy', () => {
    expect(githubRepositories.filter((repository) => repository.description === null).length).toBeGreaterThanOrEqual(38)
  })

  it('does not turn GitHub Pages metadata into an unverified live link', () => {
    expect(githubRepositories.some((repository) => repository.hasPages)).toBe(true)
    for (const repository of githubRepositories.filter((item) => item.liveStatus !== 'verified')) expect(repository.liveUrl).toBeNull()
  })

  it('connects the supported Immich case study to its verified repository', () => {
    const project = projects.find((item) => item.slug === 'immich-ai-photo-search')
    expect(project?.githubUrl).toBe('https://github.com/QINGPENGLAM/project-0006-immich-ai-photo-search-mvp')
  })
})
