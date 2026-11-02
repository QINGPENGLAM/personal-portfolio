import { education } from '@/data/education'
import { experiences } from '@/data/experience'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'
import { skillGroups } from '@/data/skills'
import { hrsWorkflow, hrsDatabase, hrsCloud, hrsEvaluation } from '@/data/hrs-case-study'
import { getSkillEvidence } from './skills'

type AssistantLink = { href: string; label: string }
export type AssistantAnswer = { answer: string; links: AssistantLink[]; available: boolean }

function projectLinks() {
  return projects.map((project) => ({ href: `/projects/${project.slug}`, label: project.title }))
}

function mentions(text: string, value: string) {
  const escaped = value.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return new RegExp(`(^|[^a-z0-9])${escaped}($|[^a-z0-9])`).test(text)
}
const projectAliases: Record<string, string[]> = {
  devdoctor: ['devdoctor', 'dev doctor'],
  'immich-ai-photo-search': ['immich', 'photo search', '照片搜索'],
  'zelda-recreation': ['zelda', 'p1', '塞尔达'],
  'modular-weapon-arena': ['p2', 'modular weapon', 'arena shooter', '武器升级'],
}
const experienceAliases: Record<string, string[]> = {
  usaa: ['usaa'], isr: ['isr', 'institute for social research', '社会研究所'],
  'si539-ia': ['si 539', 'si539'], 'eng101-ia': ['eng 101', 'eng101', 'engineering 101'],
  hillel: ['hillel'],
}

export function answerPortfolioQuestion(question: string): AssistantAnswer {
  const normalized = question.trim().toLowerCase()
  const chinese = /[\u3400-\u9fff]/.test(question)
  // Specific subjects precede broad words such as "built", "backend" and "testing".
  if (/salary|sponsorship|visa|citizenship|date of birth|birthday|full.time.*start|start.*full.time|薪资|签证|国籍|出生|入职时间/.test(normalized)) {
    return { available: false, answer: chinese ? '公开作品集没有提供这项个人或招聘信息，请直接联系 QingPeng 确认。' : 'That information is not available in the public portfolio. Please contact QingPeng to confirm.', links: [{ href: '/contact', label: 'Contact QingPeng' }] }
  }
  if (/\bhrs\b|publication pipeline|文献流程|论文流程/.test(normalized)) {
    const href = '/projects/hrs-publication-pipeline'
    let text: string
    if (/\bai\b|screening|筛选|人工智能/.test(normalized)) {
      text = chinese ? '公开案例把 AI 筛选描述为计划中的目标流程，不能据此确认已经上线。计划中 AI 只提供建议与证据，工作人员保留最终决定；无法完成时标记为需要人工审核。' : 'HRS AI screening is a proposed/intended workflow in the public case study, not confirmation that it is deployed. The design keeps staff in control and marks incomplete screening for manual review.'
    } else {
      const node = /database|postgres|数据库|存储/.test(normalized) ? hrsDatabase.find(n => n.id === 'db-why')
        : /dedup|duplicate|去重|重复/.test(normalized) ? hrsWorkflow.storage
        : /cloud|deploy|云|部署/.test(normalized) ? hrsCloud.find(n => n.id === 'cloud-why')
        : /test|验证|测试/.test(normalized) ? hrsEvaluation[0] : undefined
      text = node ? `${node.title}: ${node.explanation} ${node.points.slice(0, 2).join(' ')}`
        : 'The HRS publication pipeline processes Google Scholar and Web of Science alerts, extracts publication metadata, checks for existing records, and maintains a PostgreSQL review queue for staff. The case study separately describes proposed AI screening.'
      if (chinese) text = `公开案例资料（以下保留原文）：${text}`
    }
    return { available: true, answer: text, links: [{ href, label: 'HRS publication pipeline' }] }
  }
  const namedProjects = projects.filter(p => (projectAliases[p.slug] ?? [p.title]).some(alias => mentions(normalized, alias)))
  if (namedProjects.length) {
    const project = namedProjects[0]
    let detail: string
    if (namedProjects.length > 1) detail = namedProjects.map(p => `${p.title}: ${p.shortDescription}`).join(' ')
    else if (/tech|stack|backend|language|技术|语言/.test(normalized)) detail = `Published stack: ${project.technologies.join(', ')}.`
    else if (/test|reliab|验证|测试|可靠/.test(normalized)) detail = (project.caseStudy?.testing ?? project.measurableResults).join(' ')
    else if (/contribut|role|what.*(?:build|did)|贡献|负责/.test(normalized)) detail = `${project.role}. ${project.directContributions.slice(0, 3).join(' ')}`
    else if (/architecture|how.*work|search|架构|原理/.test(normalized)) detail = project.architecture.join('. ')
    else if (/result|metric|成果|结果/.test(normalized)) detail = project.measurableResults.join('. ')
    else detail = `${project.shortDescription} ${project.directContributions[0]}`
    return { available: true, answer: `${project.title}: ${detail}`, links: namedProjects.map(p => ({ href: `/projects/${p.slug}`, label: p.title })) }
  }
  const experience = experiences.find(e => (experienceAliases[e.id] ?? [e.company]).some(alias => mentions(normalized, alias)))
  if (experience) return {
    available: true,
    answer: `${experience.company} — ${experience.role} (${experience.startDate}–${experience.endDate}, as listed). ${experience.summary} ${experience.contributions.slice(0, 2).join(' ')}`,
    links: [{ href: `/experience#${experience.id}`, label: experience.company }],
  }
  if (/who is|introduce|about (?:him|qingpeng)|介绍|你是谁/.test(normalized)) return { available: true, answer: chinese ? `${profile.name} 是计算机科学学生和软件工程师，关注 AI 开发工具、数据工程、搜索和全栈应用。` : `${profile.name} is a ${profile.role} and computer science student. ${profile.introduction}`, links: [{ href: '/about', label: 'About QingPeng' }] }
  if (/resume|résumé|cv\b|简历/.test(normalized)) return { available: true, answer: chinese ? '可以在简历页面预览和下载公开版 résumé。' : 'Open the résumé page to preview or download the published PDF.', links: [{ href: '/resume', label: 'View résumé' }] }
  if (/where.*(?:based|live|located)|location|在哪|所在地/.test(normalized) && !/university|大学|学校/.test(normalized)) return { available: true, answer: `${chinese ? '公开地点信息' : 'Published locations'}: ${profile.locations.join(' · ')}.`, links: [{ href: '/contact', label: 'Contact QingPeng' }] }
  if (/github|source code|repositories|源码|代码仓库/.test(normalized)) return { available: true, answer: 'The GitHub archive links public repositories and dated metadata. Individual project pages show published code and demo links when available.', links: [{ href: '/projects/archive', label: 'GitHub repository archive' }, { href: profile.githubUrl, label: 'GitHub profile' }] }
  if (/unity|game projects|games.*(?:build|made)|游戏项目/.test(normalized)) {
    const games = projects.filter(p => p.technologies.includes('Unity'))
    return { available: true, answer: `Published Unity projects: ${games.map(p => `${p.title} — ${p.shortDescription}`).join(' ')}`, links: games.map(p => ({ href: `/projects/${p.slug}`, label: p.title })) }
  }
  if (/gpa|成绩|绩点|minor|专业|学历|degree|education|university|大学|毕业|graduat/.test(normalized)) return { available: true, answer: chinese ? `${education.institution}，${education.degree}，辅修 ${education.minor}，预计 ${education.endDate} 毕业，公开 GPA 为 ${education.gpa}。` : `${education.degree}, Minor in ${education.minor}, at ${education.institution}. Expected graduation: ${education.endDate}; published GPA: ${education.gpa}.`, links: [{ href: '/about#education', label: 'Education detail' }] }
  if (/email|contact|reach him|联系|邮箱/.test(normalized)) return { available: true, answer: chinese ? `公开联系邮箱：${profile.email}。请使用联系页面联系 QingPeng。` : `Use the contact page or email ${profile.email}. The guide does not send messages on QingPeng's behalf.`, links: [{ href: '/contact', label: 'Contact QingPeng' }] }
  const explicitSkill = skillGroups.flatMap(g => g.items).find(skill => mentions(normalized, skill))
  if (explicitSkill) {
    const evidence = getSkillEvidence(explicitSkill)
    return { available: evidence.length > 0, answer: evidence.length ? `${explicitSkill} appears in ${evidence.length} published portfolio records. Examples: ${evidence.slice(0, 3).map(e => e.title).join(', ')}. These are source connections, not proficiency ratings.` : `${explicitSkill} is listed, but no detailed project evidence is published yet.`, links: evidence.slice(0, 4).map(e => ({ href: e.href, label: e.title })) }
  }
  const projectQuestion = /项目|作品/.test(normalized) || normalized.includes('project') || normalized.includes('strongest') || normalized.includes('built')
  const backendQuestion = /后端|服务器/.test(normalized) || normalized.includes('backend') || /\bapis?\b/.test(normalized) || normalized.includes('server')
  const reliabilityQuestion = /测试|可靠/.test(normalized) || normalized.includes('reliab') || normalized.includes('production') || normalized.includes('testing')
  const technologyQuestion = /技能|技术栈/.test(normalized) || normalized.includes('technolog') || normalized.includes('stack') || normalized.includes('use most') || normalized.includes('skill')
  const experienceQuestion = /经历|经验|实习|教学/.test(normalized) || normalized.includes('experience') || /\broles?\b|\bintern(?:ship)?s?\b/.test(normalized)

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

  if (/what year is qingpeng|year of study|school year|几年级/.test(normalized)) {
    return {
      available: true,
      answer: `If you mean graduation, the portfolio lists ${education.endDate} as his expected graduation at ${education.institution}. His current year of study and birth year are not explicitly stated.`,
      links: [{ href: '/about#education', label: 'Education detail' }],
    }
  }

  return {
    available: false,
    answer: 'That information is not available in the approved portfolio data. Try a suggested recruiter question, review the résumé, or contact QingPeng directly.',
    links: [{ href: '/resume', label: 'View résumé' }, { href: '/contact', label: 'Contact page' }],
  }
}
