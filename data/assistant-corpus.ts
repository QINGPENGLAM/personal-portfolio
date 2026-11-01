import { profile } from './profile'
import { education } from './education'
import { experiences } from './experience'
import { projects } from './projects'
import { githubRepositories, githubRepositorySnapshot } from './github-repositories'
import { skillGroups } from './skills'
import { hrsWorkflow, hrsDatabase, hrsCloud, hrsDevelopment, hrsEvaluation } from './hrs-case-study'
import { getSkillEvidence } from '../lib/skills'

export type AssistantSource = { id: string; title: string; text: string; href: string; status: 'published' | 'proposed' }
const chunks: AssistantSource[] = []
function add(id: string, title: string, href: string, text: string, proposed = false) {
  // Paragraph slices retain a stable source id and keep a single source bounded.
  for (let i = 0; i < text.length; i += 1800) chunks.push({
    id: `${id}-${i / 1800}`, title, href, status: proposed ? 'proposed' : 'published',
    text: `${proposed ? 'PROPOSED, NOT IMPLEMENTED: ' : ''}${text.slice(i, i + 1800)}`,
  })
}
add('identity', profile.name, '/about', [profile.name, profile.role, profile.headline, profile.introduction, profile.educationSummary].join('\n'))
add('education', 'Education', '/about#education', Object.entries(education).map(([key, value]) => `${key}: ${value}`).join('\n'))
add('contact', 'Contact QingPeng', '/contact', `Contact QingPeng. Email: ${profile.email}. GitHub: ${profile.githubUrl}. LinkedIn: ${profile.linkedinUrl}`)
for (const e of experiences) add(`experience-${e.id}`, `${e.company}: ${e.role}`, '/experience', [e.company, e.role, e.location, e.startDate, e.endDate, e.summary, ...e.contributions, ...e.outcomes, ...e.technologies].join('\n'))
for (const p of projects) {
  const fields = { overview: [p.shortDescription, p.fullOverview, p.problem, p.role], contributions: p.directContributions, engineering: [...p.technicalChallenges, ...p.solutions, ...p.architecture], results: p.measurableResults, technologies: p.technologies }
  for (const [section, values] of Object.entries(fields)) add(`project-${p.slug}-${section}`, section === 'overview' ? `${p.title} · Selected project` : p.title, `/projects/${p.slug}`, `${section === 'overview' ? 'Selected project overview: ' : ''}${p.title}: ${section}\n${values.join('\n')}`)
  if (p.caseStudy) {
    const c = p.caseStudy
    add(`project-${p.slug}-case`, p.title, `/projects/${p.slug}`, JSON.stringify({ audience: c.audience, constraints: c.constraints, architectureNodes: c.architectureNodes, architectureEdges: c.architectureEdges, requestFlow: c.requestFlow, decisions: c.decisions, testing: c.testing, learned: c.reflection.learned }))
    c.reflection.next.forEach((next, i) => add(`project-${p.slug}-next-${i}`, `${p.title}: future work`, `/projects/${p.slug}`, next, true))
  }
}
for (const group of skillGroups) for (const skill of group.items) {
  const evidence = getSkillEvidence(skill)
  add(`skill-${encodeURIComponent(skill.toLowerCase())}`, skill, '/skills', `Skill: ${skill}\n${evidence.length ? evidence.map(e => `${e.title}: ${e.summary}. ${e.reason}`).join('\n') : 'Listed skill; no further project evidence published.'}`)
}
for (const r of githubRepositories) if (r.description) add(`repo-${r.name}`, r.name, '/projects', `${r.name}: ${r.description}\nLanguage: ${r.primaryLanguage ?? 'unspecified'}. Metadata snapshot: ${githubRepositorySnapshot.capturedAt}; not proof of current deployment.`)
for (const [section, nodes] of Object.entries({ workflow: Object.values(hrsWorkflow), database: hrsDatabase, cloud: hrsCloud, development: hrsDevelopment, evaluation: hrsEvaluation })) {
  for (const n of nodes) add(`hrs-${section}-${n.id}`, `HRS: ${n.title}`, '/projects/hrs-publication-pipeline', [n.title, n.caption, n.explanation, ...n.points].join('\n'), ('planned' in n && n.planned === true) || /intended workflow|AI screening/i.test(n.explanation))
}
export const assistantCorpus: readonly AssistantSource[] = chunks
