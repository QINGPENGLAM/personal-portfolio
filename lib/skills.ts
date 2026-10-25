import { experiences } from '@/data/experience'
import { githubRepositories } from '@/data/github-repositories'
import { projects } from '@/data/projects'
import { skillGroups } from '@/data/skills'
import { projectSkillNotes, repositoryTechnologyEvidence, skillRepositorySnapshot, unityRepositoryEvidence } from '@/data/skill-evidence'

export type SkillEvidence = {
  id: string
  kind: 'project' | 'repository' | 'experience'
  title: string
  summary: string
  href: string
  reason: string
  sourceUrl: string
  sourceLabel: string
  checkedAt?: string
  codeUrl?: string
}

export const portfolioSkills = skillGroups.flatMap(group => group.items)
// Compatibility for existing consumers; the list now also includes project-supported skills.
export const resumeSkills = portfolioSkills
const normalize = (value: string) => value.trim().toLowerCase()

export function getSkillEvidence(skill: string): SkillEvidence[] {
  const key = normalize(skill)
  const displaySkill = portfolioSkills.find(item => normalize(item) === key)
  if (!displaySkill) return []
  const languageNames = key === 'html/css' ? ['html', 'css'] : [key]
  const matches = (values: string[]) => values.some(value => normalize(value) === key)
  const projectEvidence: SkillEvidence[] = []
  const repositoryEvidence: SkillEvidence[] = []

  for (const repository of githubRepositories) {
    const languages = skillRepositorySnapshot.repositories.find(item => item.name === repository.name)?.languages ?? {}
    const matchedLanguages = Object.keys(languages).filter(language => languageNames.includes(normalize(language)))
    const technology = repositoryTechnologyEvidence.find(item => item.repository === repository.name && normalize(item.skill) === key)
    const unitySource = key === 'unity' ? unityRepositoryEvidence.find(source => source.repository === repository.name) : undefined
    const isUnity = Boolean(unitySource)
    if (!matchedLanguages.length && !technology && !isUnity) continue
    const project = projects.find(item => item.githubUrl === repository.codeUrl)
    repositoryEvidence.push({
      id: project?.id ?? repository.name,
      kind: project ? 'project' : 'repository',
      title: project?.title ?? repository.name,
      summary: project?.shortDescription ?? repository.description ?? 'Public source repository.',
      href: project ? `/projects/${project.slug}` : repository.codeUrl,
      codeUrl: repository.codeUrl,
      reason: technology?.reason ?? (isUnity
        ? 'The public source contains Unity gameplay scripts; language totals also include imported assets.'
        : `GitHub reports ${matchedLanguages.join(' and ')} in this repository. Language totals describe files, not proficiency or authorship.`),
      sourceUrl: technology?.sourceUrl ?? (isUnity ? unitySource!.sourceUrl : `${repository.codeUrl}/search?l=${encodeURIComponent(matchedLanguages[0])}`),
      sourceLabel: technology?.sourceLabel ?? (isUnity ? 'Unity project source' : 'GitHub language breakdown'),
      checkedAt: skillRepositorySnapshot.checkedAt,
    })
  }

  for (const project of projects) {
    const note = Object.entries(projectSkillNotes[project.id] ?? {}).find(([name]) => normalize(name) === key)?.[1]
    if (!matches(project.technologies) && !note) continue
    const existing = repositoryEvidence.findIndex(item => item.id === project.id && item.kind === 'project')
    if (existing >= 0) repositoryEvidence.splice(existing, 1)
    projectEvidence.push({
      id: project.id, kind: 'project', title: project.title, summary: project.shortDescription,
      href: `/projects/${project.slug}`, reason: note ?? `The published case study lists ${displaySkill} in this project's technology stack.`,
      sourceUrl: `/projects/${project.slug}`, sourceLabel: 'Published case study',
      ...(project.githubUrl ? { codeUrl: project.githubUrl } : {}),
    })
  }

  // HRS has its own published workflow route rather than a world landmark entry.
  const hrsReasons: Record<string, string> = {
    python: 'The cloud walkthrough describes a scheduled container job running the Python publication pipeline.',
    postgresql: 'The database walkthrough explains PostgreSQL persistence, relational records and advisory locking.',
    sql: 'The database walkthrough describes relational tables, transactions and the SQLite-to-PostgreSQL migration.',
  }
  if (hrsReasons[key]) projectEvidence.push({
    id: 'hrs-publication-pipeline', kind: 'project', title: 'HRS Publication Pipeline',
    summary: 'Publication alerts become deduplicated, enriched records and a human review queue.',
    href: '/projects/hrs-publication-pipeline', reason: hrsReasons[key],
    sourceUrl: '/projects/hrs-publication-pipeline', sourceLabel: 'Published workflow',
  })

  const experienceEvidence: SkillEvidence[] = experiences.filter(experience => matches(experience.technologies)).map(experience => ({
    id: experience.id, kind: 'experience', title: `${experience.role} · ${experience.company}`,
    summary: experience.summary, href: `/experience#${experience.id}`,
    reason: experience.contributions.find(contribution => contribution.toLowerCase().includes(key)) ?? `The published role lists ${displaySkill} among its technologies.`,
    sourceUrl: `/experience#${experience.id}`, sourceLabel: 'Published experience',
  }))
  // A repository-backed case study also belongs ahead of standalone repositories.
  return [...projectEvidence, ...repositoryEvidence.filter(item => item.kind === 'project'), ...repositoryEvidence.filter(item => item.kind === 'repository'), ...experienceEvidence]
}
