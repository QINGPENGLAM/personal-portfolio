import { projects } from '@/data/projects'

export const projectFocusAreas = ['All', ...Array.from(new Set(projects.flatMap((project) => project.focusAreas)))] as const

export function getProjectBySlug(slug: string | null | undefined) {
  return projects.find((project) => project.slug === slug) ?? null
}

export function filterProjects(focusArea: string) {
  return focusArea === 'All' ? projects : projects.filter((project) => project.focusAreas.includes(focusArea))
}

export function getAdjacentProjects(slug: string) {
  const currentIndex = projects.findIndex((project) => project.slug === slug)
  if (currentIndex < 0) return { previous: null, next: null }

  return {
    previous: projects[(currentIndex - 1 + projects.length) % projects.length] ?? null,
    next: projects[(currentIndex + 1) % projects.length] ?? null,
  }
}
