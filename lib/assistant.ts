import { education } from '@/data/education'
import { experiences } from '@/data/experience'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'
import { skillGroups } from '@/data/skills'
import { getSkillEvidence } from './skills'

export type AssistantLink = { href: string; label: string }
export type AssistantAnswer = { answer: string; links: AssistantLink[]; available: boolean }

function projectLinks() {
  return projects.map((project) => ({ href: `/projects/${project.slug}`, label: project.title }))
}

export function answerPortfolioQuestion(question: string): AssistantAnswer {
  const normalized = question.trim().toLowerCase()
  const projectQuestion = normalized.includes('project') || normalized.includes('strongest') || normalized.includes('built')
  const backendQuestion = normalized.includes('backend') || normalized.includes('api') || normalized.includes('server')
  const reliabilityQuestion = normalized.includes('reliab') || normalized.includes('production') || normalized.includes('testing')
  const technologyQuestion = normalized.includes('technolog') || normalized.includes('stack') || normalized.includes('use most') || normalized.includes('skill')
  const experienceQuestion = normalized.includes('experience') || normalized.includes('role') || normalized.includes('intern')

  if (reliabilityQuestion) {
    return {
      available: true,
      answer: 'DevDoctor demonstrates controlled diagnosis, validation, human approval, migration safety, and model-serving checks. Immich AI Photo Search demonstrates format recovery, resumable ingestion, hybrid retrieval fallbacks, and SHA-256 duplicate prevention.',
      links: projectLinks(),
    }
  }

  if (backendQuestion) {
    return {
      available: true,
      answer: 'The clearest backend evidence is DevDoctor with Python, FastAPI, PostgreSQL, Ray Serve, and MLflow; Immich AI Photo Search with Node.js and Express; and the Institute for Social Research role with Python, SQL pipelines, REST APIs, and reporting systems.',
      links: [{ href: '/projects/devdoctor', label: 'DevDoctor' }, { href: '/projects/immich-ai-photo-search', label: 'Immich AI Photo Search' }, { href: '/experience#isr', label: 'Data systems experience' }],
    }
  }

  if (projectQuestion) {
    return {
      available: true,
      answer: `The featured engineering projects are ${projects.map((project) => project.title).join(' and ')}. Their case studies document architecture, direct contributions, measured results, testing evidence, and tradeoffs.`,
      links: projectLinks(),
    }
  }

  if (technologyQuestion) {
    return {
      available: true,
      answer: 'Python is the broadest recurring language across the published roles and DevDoctor. Other documented strengths include SQL, JavaScript, C#, FastAPI, PostgreSQL, Docker, Node.js, Express, Ray Serve, MLflow, Transformers.js, vector search, and REST APIs.',
      links: [{ href: '/skills', label: 'Explore skill evidence' }, { href: '/projects', label: 'Project stacks' }],
    }
  }

  if (experienceQuestion) {
    return {
      available: true,
      answer: `The approved portfolio includes ${experiences.length} professional roles spanning AI-assisted developer workflows, data systems engineering, APIs, ETL, reporting, search, and product-facing dashboards. Open the experience timeline for dates, contributions, and measured outcomes.`,
      links: [{ href: '/experience', label: 'Experience timeline' }],
    }
  }

  if (normalized.includes('education') || normalized.includes('university') || normalized.includes('degree')) {
    return {
      available: true,
      answer: `${education.degree}, Minor in ${education.minor}, at ${education.institution}. The portfolio lists an expected graduation of ${education.endDate} and GPA ${education.gpa}.`,
      links: [{ href: '/about#education', label: 'Education detail' }],
    }
  }

  if (normalized.includes('contact') || normalized.includes('email')) {
    return {
      available: true,
      answer: `Use the contact page or email ${profile.email}. The assistant does not send messages or speak on QingPeng's behalf.`,
      links: [{ href: '/contact', label: 'Contact QingPeng' }],
    }
  }

  const matchedSkill = skillGroups.flatMap((group) => group.items).find((skill) => normalized.includes(skill.toLowerCase()))
  if (matchedSkill) {
    const evidence = getSkillEvidence(matchedSkill)
    return {
      available: evidence.length > 0,
      answer: evidence.length ? `${matchedSkill} appears in ${evidence.length} published portfolio ${evidence.length === 1 ? 'record' : 'records'}.` : `${matchedSkill} is listed in the approved résumé skills, but no detailed project or role evidence is published for it yet.`,
      links: evidence.map((item) => ({ href: item.href, label: item.title })),
    }
  }

  return {
    available: false,
    answer: 'That information is not available in the approved portfolio data. Try a suggested recruiter question, review the résumé, or contact QingPeng directly.',
    links: [{ href: '/resume', label: 'View résumé' }, { href: '/contact', label: 'Contact page' }],
  }
}

export const suggestedAssistantQuestions = [
  'What are QingPeng’s strongest software engineering projects?',
  'What backend systems has QingPeng built?',
  'Which projects demonstrate production reliability?',
  'What technologies does QingPeng use most?',
  'Show me experience relevant to this role.',
] as const
