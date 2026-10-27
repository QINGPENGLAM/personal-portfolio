import { expect, it } from 'vitest'
import { experiences } from '@/data/experience'
import { timelineItems } from '@/data/timeline'

it('includes both user-supplied IA roles in their dated chronology', () => {
  expect(experiences.map(role => role.id)).toEqual(['si539-ia', 'usaa', 'isr', 'eng101-ia', 'hillel'])
  expect(experiences.find(role => role.id === 'si539-ia')).toMatchObject({
    role: 'Instructional Assistant — SI 539', startDate: 'Aug. 2026', endDate: 'Present',
    course: 'Web Design: Responsiveness and Accessibility', outcomes: [], technologies: [],
  })
  expect(experiences.find(role => role.id === 'eng101-ia')).toMatchObject({
    role: 'Instructional Assistant — ENG 101', startDate: 'Oct. 2024', endDate: 'June 2025',
    course: 'Introduction to Engineering', outcomes: [], technologies: [],
  })
  expect(timelineItems.find(item => item.id === 'experience-si539-ia')?.sortKey).toBe('2026-08')
  expect(timelineItems.find(item => item.id === 'experience-eng101-ia')?.sortKey).toBe('2024-10')
})

it('opens homepage experience through labeled popups instead of inline disclosures', async () => {
  const { createElement } = await import('react')
  const { renderToStaticMarkup } = await import('react-dom/server')
  const { RecruiterView } = await import('@/components/RecruiterView')
  const html = renderToStaticMarkup(createElement(RecruiterView))
  expect(html).not.toContain('<details')
  expect(html).toContain('aria-haspopup="dialog"')
  expect(html).toContain('id="experience-dialog-si539-ia"')
  expect(html).toContain('aria-labelledby="experience-dialog-si539-ia-title"')
  expect(html).toContain('aria-label="Close Instructional Assistant — SI 539 details"')
  expect(html).toContain('<noscript>')
})
