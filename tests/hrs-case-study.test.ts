import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import HrsCaseStudyPage from '@/app/projects/hrs-publication-pipeline/page'

describe('HRS case-study draft', () => {
  it('presents the problem, workflow and deployment in reading order without a timer', () => {
    const html = renderToStaticMarkup(createElement(HrsCaseStudyPage))
    const positions = ['hrs-problem', 'hrs-workflow', 'hrs-deployment'].map((id) => html.indexOf(`id="${id}"`))
    expect(positions.every((position) => position >= 0)).toBe(true)
    expect(positions).toEqual([...positions].sort((a, b) => a - b))
    expect(html).not.toMatch(/0:55|1:25|1:35|7:00/)
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
    expect(html).toContain('Opt-in queue stage · disabled by default')
    expect(html).toContain('aria-label="AI screening process"')
    expect(html).toContain('Match source')
    expect(html).toContain('Read text')
    expect(html).toContain('Check evidence')
    expect(html).toContain('Possible AI outcomes')
    expect(html).toContain('Uses HRS data')
    expect(html).toContain('Mentions only')
    expect(html).toContain('Not enough evidence')
    expect(html).toContain('go to staff review')
    expect(html).toContain('Google Sheet + CSV')
  })
})
