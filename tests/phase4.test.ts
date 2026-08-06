import { describe, expect, it } from 'vitest'
import { experiences } from '@/data/experience'
import { projects } from '@/data/projects'
import { skillGroups } from '@/data/skills'
import { filterTimeline, timelineItems, timelineTypes } from '@/data/timeline'
import { isWorldPanelKind, worldPanelIds } from '@/data/world'
import { getSkillEvidence, resumeSkills } from '@/lib/skills'

describe('Phase 4 professional story', () => {
  it('keeps timeline identifiers unique and newest milestones first', () => {
    expect(new Set(timelineItems.map((item) => item.id))).toHaveLength(timelineItems.length)
    expect(timelineItems.map((item) => item.sortKey)).toEqual([...timelineItems.map((item) => item.sortKey)].sort().reverse())
  })

  it('filters every timeline type without losing source records', () => {
    expect(filterTimeline('all')).toHaveLength(experiences.length + projects.length + 1)
    for (const type of timelineTypes.slice(1)) {
      const items = filterTimeline(type)
      expect(items.length).toBeGreaterThan(0)
      expect(items.every((item) => item.type === type)).toBe(true)
    }
  })

  it('links project milestones directly to valid case studies', () => {
    const projectLinks = filterTimeline('project').map((item) => item.href)
    expect(projectLinks).toEqual(expect.arrayContaining(projects.map((project) => `/projects/${project.slug}`)))
  })

  it('uses only résumé skills and resolves evidence to published records', () => {
    expect(new Set(resumeSkills)).toHaveLength(resumeSkills.length)
    expect(resumeSkills).toEqual(skillGroups.flatMap((group) => group.items))
    const validIds = new Set([...projects.map((project) => project.id), ...experiences.map((experience) => experience.id)])
    for (const skill of resumeSkills) {
      for (const evidence of getSkillEvidence(skill)) expect(validIds.has(evidence.id)).toBe(true)
    }
  })

  it('limits in-world dossiers to Phase 4 story landmarks', () => {
    expect(worldPanelIds).toEqual(['experience', 'about', 'skills', 'education'])
    for (const id of worldPanelIds) expect(isWorldPanelKind(id)).toBe(true)
    expect(isWorldPanelKind('projects')).toBe(false)
  })
})
