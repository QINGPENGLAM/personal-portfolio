import { describe, expect, it } from 'vitest'
import { githubRepositories } from '@/data/github-repositories'
import { buildRepositoryInsights } from '@/lib/github-insights'

describe('Phase 10 repository insights', () => {
  const insights = buildRepositoryInsights(githubRepositories)

  it('keeps every deployment record in exactly one evidence status', () => {
    expect(insights.verifiedLive + insights.unavailableLive + insights.notConfigured).toBe(insights.total)
    expect(insights).toMatchObject({ total: 39, pagesEnabled: 20, verifiedLive: 18, unavailableLive: 2, notConfigured: 19 })
  })

  it('groups every repository by language and latest recorded push year', () => {
    expect(insights.languages.reduce((total, item) => total + item.count, 0)).toBe(39)
    expect(insights.pushYears.reduce((total, item) => total + item.count, 0)).toBe(39)
    expect(insights.languages[0]).toEqual({ label: 'JavaScript', count: 13 })
    expect(insights.languages).toContainEqual({ label: 'TypeScript', count: 1 })
  })

  it('keeps the recorded push range explicit', () => {
    expect(insights.firstRecordedPush).toBe('2024-09-16')
    expect(insights.latestRecordedPush).toBe('2026-08-11')
  })
})
