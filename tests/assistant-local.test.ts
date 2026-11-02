import { describe, expect, it } from 'vitest'
import { answerPortfolioQuestion } from '@/lib/assistant'
import { suggestedAssistantQuestions } from '@/data/assistant-suggestions'

describe('expanded local portfolio guide', () => {
  it.each([
    ['Who is QingPeng?', '/about', 'QingPeng'],
    ['请介绍一下你自己', '/about', 'QingPeng'],
    ['What is his GPA?', '/about#education', '3.8'],
    ['他在哪里上大学？', '/about#education', 'University of Michigan'],
    ['Where is he based?', '/contact', 'Ann Arbor'],
    ['Where can I download the resume?', '/resume', 'résumé'],
    ['What is his email address?', '/contact', 'qpl@umich.edu'],
    ['Tell me about DevDoctor', '/projects/devdoctor', 'DevDoctor'],
    ['How is DevDoctor tested?', '/projects/devdoctor', '260+'],
    ['How does Immich search work?', '/projects/immich-ai-photo-search', 'Hybrid'],
    ['What did he build for Zelda?', '/projects/zelda-recreation', 'Stalfos'],
    ['P2 的武器升级是什么？', '/projects/modular-weapon-arena', 'Fire'],
    ['What did he do at USAA?', '/experience#usaa', '12 reusable'],
    ['Tell me about SI 539 teaching', '/experience#si539-ia', 'accessible'],
    ['What did he do at ISR?', '/experience#isr', 'pipelines'],
    ['Tell me about Hillel', '/experience#hillel', 'Michigan Hillel'],
    ['HRS uses which database?', '/projects/hrs-publication-pipeline', 'PostgreSQL'],
    ['Is HRS AI screening already deployed?', '/projects/hrs-publication-pipeline', 'proposed'],
    ['HRS 的 AI 筛选已经上线了吗？', '/projects/hrs-publication-pipeline', '计划'],
    ['Which Unity games did he build?', '/projects/modular-weapon-arena', 'Unity'],
    ['Where is his source code?', '/projects/archive', 'GitHub'],
  ])('answers %s using public facts', (question, href, fact) => {
    const result = answerPortfolioQuestion(question)
    expect(result.available).toBe(true)
    expect(result.answer).toContain(fact)
    expect(result.links.some(link => link.href === href)).toBe(true)
    expect(result.answer.length).toBeLessThanOrEqual(1600)
  })
  it('gives project-specific answers before broad keyword routes', () => {
    const answer = answerPortfolioQuestion('What backend stack does Immich use?')
    expect(answer.answer).toContain('Express')
    expect(answer.links[0].href).toBe('/projects/immich-ai-photo-search')
    expect(answer.answer).not.toContain('FastAPI')
    expect(answerPortfolioQuestion('Does he know JavaScript?').answer).toContain('JavaScript')
    expect(answerPortfolioQuestion('Does he know JavaScript?').answer).not.toMatch(/^Java appears/)
    expect(answerPortfolioQuestion('Does he use C++?').answer).toContain('C++')
  })
  it('keeps unspecified personal and recruiting facts unavailable', () => {
    for (const q of ['What is his salary?', 'Does he need visa sponsorship?', 'What is his date of birth?', 'When can he start full time?', 'What is his favorite restaurant?', 'What is the capital of France?', 'Explain the internet']) {
      expect(answerPortfolioQuestion(q).available).toBe(false)
    }
  })
  it('all suggested buttons have an actual local answer', () => {
    expect(suggestedAssistantQuestions.length).toBeGreaterThanOrEqual(20)
    for (const q of suggestedAssistantQuestions) expect(answerPortfolioQuestion(q).available, q).toBe(true)
  })
})
