import { describe, expect, it } from 'vitest'
import { education } from '@/data/education'
import { experiences } from '@/data/experience'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'
import { skillGroups } from '@/data/skills'

describe('portfolio content', () => {
  it('keeps core recruiter content available', () => {
    expect(profile.name).toBe('QingPeng Lam')
    expect(experiences).toHaveLength(3)
    expect(projects.length).toBeGreaterThanOrEqual(2)
    expect(skillGroups.length).toBeGreaterThanOrEqual(4)
    expect(education.institution).toBe('University of Michigan')
  })

  it('uses unique project identifiers and slugs', () => {
    expect(new Set(projects.map((project) => project.id)).size).toBe(projects.length)
    expect(new Set(projects.map((project) => project.slug)).size).toBe(projects.length)
  })

  it('marks absent project links as null instead of fabricating URLs', () => {
    const devDoctor = projects.find((project) => project.slug === 'devdoctor')
    expect(devDoctor?.githubUrl).toBeNull()
    expect(devDoctor?.placeholders.length).toBeGreaterThan(0)
  })

  it('keeps every metric attached to a described project or role', () => {
    for (const project of projects) expect(project.measurableResults.length).toBeGreaterThan(0)
    for (const experience of experiences) {
      expect(experience.contributions.length).toBeGreaterThan(0)
      expect(experience.outcomes.length).toBeGreaterThan(0)
    }
  })
})
