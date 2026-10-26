import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import HrsCaseStudyPage from '@/app/projects/hrs-publication-pipeline/page'

describe('HRS case-study draft', () => {
  it('presents all five interview chapters in order without hard-coded talk timings', () => {
    const html = renderToStaticMarkup(createElement(HrsCaseStudyPage))
    const positions = ['hrs-problem', 'hrs-workflow', 'hrs-deployment', 'hrs-development', 'hrs-results'].map((id) => html.indexOf(`id="${id}"`))
    expect(positions.every((position) => position >= 0)).toBe(true)
    expect(positions).toEqual([...positions].sort((a, b) => a - b))
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

  it('describes the implemented opt-in AI stage and its human-review boundaries', () => {
    const html = renderToStaticMarkup(createElement(HrsCaseStudyPage))
    expect(html).toContain('AI screening')
    expect(html).toContain('aria-controls="hrs-dialog-ai"')
    expect(html).toContain('id="hrs-dialog-ai"')
    expect(html).toContain('Optional queue pass · disabled by default')
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
    expect(html).toContain('the paused cloud deployment has not been updated or verified')
    expect(html).not.toContain('This branch is a placeholder')
  })

  it('explains AI-assisted development, the harness limits, and the WoS partial-alert counterexample', () => {
    const html = renderToStaticMarkup(createElement(HrsCaseStudyPage))
    expect(html).toContain('ChatGPT for design refinement')
    expect(html).toContain('Codex for incremental implementation')
    expect(html).toContain('Harness-controlled evaluation')
    expect(html).toContain('The recorded real-project check-only run passed all eight parser tests without invoking Codex')
    expect(html).toContain('Scope checks detect out-of-scope changes after execution')
    expect(html).toContain('Showing 5 of the 6')
    expect(html).toContain('marks the email partial')
  })

  it('separates functional results from model-quality and rollout limits', () => {
    const html = renderToStaticMarkup(createElement(HrsCaseStudyPage))
    expect(html).toContain('487 tests against mocked external services and disposable PostgreSQL')
    expect(html).toContain('was a known false positive')
    expect(html).toContain('independently staff-labeled evaluation set')
    expect(html).toContain('Newer local AI work has not been deployed or verified there')
    expect(html).toContain('preserve human decisions')
  })
})
