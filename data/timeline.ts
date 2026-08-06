import { education } from './education'
import { experiences } from './experience'
import { projects } from './projects'
import { timelineItemSchema, type TimelineItem } from './schemas'

const experienceSortKeys: Record<string, string> = {
  usaa: '2026-05',
  isr: '2025-08',
  hillel: '2024-08',
}

const projectSortKeys: Record<string, string> = {
  devdoctor: '2026-06',
  'immich-ai-photo-search': '2026-02',
}

export const timelineItems: TimelineItem[] = timelineItemSchema.array().parse([
  ...experiences.map((experience) => ({
    id: `experience-${experience.id}`,
    type: 'experience' as const,
    startDate: experience.startDate,
    endDate: experience.endDate,
    sortKey: experienceSortKeys[experience.id],
    title: experience.role,
    organization: experience.company,
    summary: experience.summary,
    technologies: experience.technologies,
    href: `/experience#${experience.id}`,
  })),
  ...projects.map((project) => {
    const [startDate, endDate] = project.date.split(' - ')
    return {
      id: `project-${project.slug}`,
      type: 'project' as const,
      startDate,
      endDate,
      sortKey: projectSortKeys[project.slug],
      title: project.title,
      organization: 'Independent engineering project',
      summary: project.shortDescription,
      technologies: project.technologies,
      href: `/projects/${project.slug}`,
    }
  }),
  {
    id: 'education-university-of-michigan',
    type: 'education' as const,
    startDate: education.startDate,
    endDate: education.endDate,
    sortKey: '2024-08',
    title: education.degree,
    organization: education.institution,
    summary: `Minor in ${education.minor} · GPA ${education.gpa}`,
    technologies: [],
    href: '/about#education',
  },
]).sort((a, b) => b.sortKey.localeCompare(a.sortKey) || a.title.localeCompare(b.title))

export const timelineTypes = ['all', 'experience', 'project', 'education'] as const
export type TimelineFilter = (typeof timelineTypes)[number]

export function filterTimeline(type: TimelineFilter) {
  return type === 'all' ? timelineItems : timelineItems.filter((item) => item.type === type)
}
