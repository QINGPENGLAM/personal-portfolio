import { describe, expect, it } from 'vitest'
import { projects } from '@/data/projects'
import { filterProjects, getAdjacentProjects, getProjectBySlug, projectFocusAreas } from '@/lib/projects'

describe('Phase 3 project experience', () => {
  it('resolves every project through its shareable slug', () => {
    for (const project of projects) expect(getProjectBySlug(project.slug)?.id).toBe(project.id)
    expect(getProjectBySlug('unsupported-project')).toBeNull()
  })

  it('filters projects only through evidence-backed focus areas', () => {
    expect(filterProjects('All')).toHaveLength(projects.length)
    for (const focusArea of projectFocusAreas.slice(1)) {
      expect(filterProjects(focusArea).length).toBeGreaterThan(0)
      expect(filterProjects(focusArea).every((project) => project.focusAreas.includes(focusArea))).toBe(true)
    }
  })

  it('keeps architecture edges and request flows referentially valid', () => {
    for (const project of projects) {
      const nodeIds = new Set(project.caseStudy.architectureNodes.map((node) => node.id))
      for (const edge of project.caseStudy.architectureEdges) {
        expect(nodeIds.has(edge.source)).toBe(true)
        expect(nodeIds.has(edge.target)).toBe(true)
      }
      for (const nodeId of project.caseStudy.requestFlow) expect(nodeIds.has(nodeId)).toBe(true)
    }
  })

  it('places unique project landmarks inside the explorable world', () => {
    const positions = projects.map((project) => project.landmark.position.join(','))
    expect(new Set(positions).size).toBe(projects.length)
    for (const project of projects) {
      expect(Math.abs(project.landmark.position[0])).toBeLessThanOrEqual(14)
      expect(Math.abs(project.landmark.position[2])).toBeLessThanOrEqual(14)
    }
  })

  it('provides circular related-project navigation', () => {
    for (const project of projects) {
      const adjacent = getAdjacentProjects(project.slug)
      expect(adjacent.next).not.toBeNull()
      expect(adjacent.previous).not.toBeNull()
    }
  })
})
