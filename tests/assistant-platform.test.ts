import { describe, expect, it } from 'vitest'
import { getProjectBySlug } from '@/lib/projects'

describe('Personal AI Assistant Platform project', () => {
  it('links the standalone public copy and describes the implemented harness', () => {
    const project = getProjectBySlug('personal-ai-assistant-platform')
    expect(project).not.toBeNull()
    expect(project?.githubUrl).toBe('https://github.com/QINGPENGLAM/personal-ai-assistant-platform')
    expect(project?.liveDemoUrl).toBeNull()
    expect(project?.technologies).toEqual(expect.arrayContaining(['React', 'TypeScript', 'Python', 'FastAPI', 'SQLite', 'Docker', 'MCP']))
    expect(project?.fullOverview).toContain('Codex app server')
  })

  it('separates simulated tests and manual acceptance from incomplete real automation', () => {
    const project = getProjectBySlug('personal-ai-assistant-platform')
    expect(project?.caseStudy?.testing.join(' ')).toMatch(/simulated/i)
    expect(project?.caseStudy?.testing.join(' ')).toMatch(/manual/i)
    expect(project?.caseStudy?.testing.join(' ')).toMatch(/incomplete/i)
    expect(project?.placeholders.join(' ')).toMatch(/public.*deployment/i)
  })
})
