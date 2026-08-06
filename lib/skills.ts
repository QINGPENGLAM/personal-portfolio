import { experiences } from '@/data/experience'
import { projects } from '@/data/projects'
import { skillGroups } from '@/data/skills'

export type SkillEvidence =
  | { id: string; kind: 'project'; title: string; summary: string; href: string }
  | { id: string; kind: 'experience'; title: string; summary: string; href: string }

export const resumeSkills = skillGroups.flatMap((group) => group.items)

export function getSkillEvidence(skill: string): SkillEvidence[] {
  const normalizedSkill = skill.toLowerCase()
  const projectEvidence: SkillEvidence[] = projects
    .filter((project) => project.technologies.some((technology) => technology.toLowerCase() === normalizedSkill))
    .map((project) => ({ id: project.id, kind: 'project', title: project.title, summary: project.shortDescription, href: `/projects/${project.slug}` }))
  const experienceEvidence: SkillEvidence[] = experiences
    .filter((experience) => experience.technologies.some((technology) => technology.toLowerCase() === normalizedSkill))
    .map((experience) => ({ id: experience.id, kind: 'experience', title: `${experience.role} · ${experience.company}`, summary: experience.summary, href: `/experience#${experience.id}` }))

  return [...projectEvidence, ...experienceEvidence]
}
