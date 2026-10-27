import { describe, expect, it } from 'vitest'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import HomePage from '@/app/page'
import { AudioProvider } from '@/components/audio/AudioProvider'
import { projects } from '@/data/projects'
import { nearestProject } from '@/lib/selene/deck'

describe('horizontal project deck', () => {
  it('finds the nearest card after scrolling in either direction', () => {
    expect(nearestProject([100, 450, 800, 1150], 460)).toBe(1)
    expect(nearestProject([-600, -250, 100, 450], 460)).toBe(3)
    expect(nearestProject([450, 800, 1150, 1500], 460)).toBe(0)
    expect(nearestProject([], 460)).toBe(0)
  })
})

it('keeps every project available in the deck before JavaScript runs', () => {
  const html = renderToStaticMarkup(createElement(AudioProvider, null, createElement(HomePage)))
  const deck = html.slice(html.indexOf('id="project-deck"'), html.indexOf('class="recruiter-view"'))
  for (const project of projects) {
    expect(deck).toContain(project.title)
    expect(deck).toContain(`/projects/${project.slug}`)
  }
  expect(deck).toContain('System concept')
  expect(deck).toContain('Concept illustration')
  expect(deck).not.toContain('reel-live')
})

it('shows the project list once and provides left/right controls', () => {
  const html = renderToStaticMarkup(createElement(AudioProvider, null, createElement(HomePage)))
  expect(html).toContain('aria-label="Previous project"')
  expect(html).toContain('aria-label="Next project"')
  expect(html).not.toContain('id="selected-work-heading"')
  for (const project of projects) {
    expect(html.split(`href="/projects/${project.slug}"`).length - 1).toBe(1)
  }
})
