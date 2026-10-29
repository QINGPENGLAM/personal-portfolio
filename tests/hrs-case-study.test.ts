import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import HrsCaseStudyPage from '@/app/projects/hrs-publication-pipeline/page'

describe('HRS case-study draft', () => {
  it('presents the original five interview chapters in order without hard-coded talk timings', () => {
    const html = renderToStaticMarkup(createElement(HrsCaseStudyPage))
    const positions = ['hrs-problem', 'hrs-workflow', 'hrs-deployment', 'hrs-development', 'hrs-results'].map((id) => html.indexOf(`id="${id}"`))
    expect(positions.every((position) => position >= 0)).toBe(true)
    expect(positions).toEqual([...positions].sort((a, b) => a - b))
    expect(html.indexOf('id="hrs-concerns"')).toBeGreaterThan(positions[4])
    expect(html).toContain('Optional / Engineering considerations')
    expect(html).not.toContain('href="#hrs-concerns"')
    expect(html).not.toMatch(/0:55|1:25|1:35|7:00/)
    for (const label of ['AI-assisted development', 'Results + lessons']) expect(html).toContain(label)
  })

  it('connects each node to a labeled popup and retains its explanation in the page', () => {
    const html = renderToStaticMarkup(createElement(HrsCaseStudyPage))
    expect(html).not.toContain('<details')
    expect(html).toContain('aria-haspopup="dialog"')
    expect(html).toContain('aria-controls="hrs-dialog-gmail"')
    expect(html).toContain('id="hrs-dialog-gmail"')
    expect(html).toContain('aria-labelledby="hrs-dialog-gmail-title"')
    expect(html).toContain('aria-label="Close Gmail intake details"')
    expect(html).toContain('<noscript>')
    for (const label of ['Gmail intake', 'Google Scholar parser', 'Web of Science parser', 'PostgreSQL', 'Cloud Run Job', 'Cloud SQL', 'Cloud Scheduler']) {
      expect(html).toContain(label)
    }
    expect(html).toContain('previously processed')
  })

  it('distinguishes the intended required AI stage from current opt-in implementation', () => {
    const html = renderToStaticMarkup(createElement(HrsCaseStudyPage))
    expect(html).toContain('AI screening')
    expect(html).toContain('aria-controls="hrs-dialog-ai"')
    expect(html).toContain('id="hrs-dialog-ai"')
    expect(html).toContain('Required before Sheet output')
    expect(html).toContain('AI incomplete—manual review needed')
    expect(html).toContain('The current runtime remains opt-in')
    expect(html).not.toContain('This is a required stage, not a requirement for a successful classification.')
    expect(html).toContain('aria-label="AI screening evidence-to-decision flow"')
    expect(html).toContain('Paper source')
    expect(html).toContain('Verified PubMed record + abstract')
    expect(html).toContain('Identity-checked, permission-aware text')
    expect(html).toContain('exact original text and stored source ranges')
    expect(html).toContain('Uses HRS data')
    expect(html).toContain('Mentions only*')
    expect(html).toContain('Insufficient evidence')
    expect(html).toContain('Human decision')
    expect(html).toContain('Staff decide; AI never adds or removes records')
    expect(html).toContain('Google Sheet + CSV')
    expect(html).toContain('three-paper full-text pilot recorded one known LASI false positive')
    expect(html).toContain('soft admission limit, not a guaranteed bill cap')
    expect(html).not.toContain('The current pipeline remains opt-in and has not yet been changed to enforce this policy; the paused cloud deployment has not been updated or verified with this newer stage.')
    expect(html).not.toContain('This branch is a placeholder')
  })

  it('presents tool-enabled implementation, fresh review, triage and a bounded review loop', () => {
    const html = renderToStaticMarkup(createElement(HrsCaseStudyPage))
    for (const label of ['ChatGPT for design refinement', 'Codex for incremental implementation', 'Review in a fresh context', 'Triage by impact', 'Fix and re-review', 'Refine the brief and own the result']) {
      expect(html).toContain(label)
    }
    expect(html).toContain('1 / Structure and implementation')
    expect(html).toContain('2 / Evaluation and refinement')
    expect(html).toContain('without the implementation chat history')
    expect(html).toContain('requirements, constraints, diff, relevant code and tests')
    expect(html).toContain('After three review rounds, pause')
    expect(html).toContain('Syntax errors, type errors and broken SQL are correctness issues')
    expect(html).toContain('SQLite-to-PostgreSQL')
    expect(html).toContain('https://claude.dev/blog/solving-code-review-at-anthropic/')
    expect(html).not.toContain('The WoS counterexample')
  })

  it('connects project outcomes to AI structure and cloud reflections without claiming measured impact', () => {
    const html = renderToStaticMarkup(createElement(HrsCaseStudyPage))
    expect(html).toContain('What the project delivers')
    expect(html).toContain('Structure AI assistance more deliberately')
    expect(html).toContain('Cloud involved more than I expected')
    expect(html).toContain('What I would do differently next time')
    expect(html).toContain('what must stay unchanged')
    expect(html).toContain('execution, persistent storage, scheduling, permissions, OAuth and secret configuration')
    expect(html).toContain('Newer local AI changes still require separate cloud validation')
    expect(html).toContain('not measured time savings or AI accuracy')
  })
})
