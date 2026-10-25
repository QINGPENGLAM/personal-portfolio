import { describe, expect, it } from 'vitest'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { Earthrise } from '@/components/selene/Earthrise'
import { withBasePath } from '@/lib/site'
import { sceneAt } from '@/lib/selene/scene'

describe('portfolio Earthrise choreography', () => {
  it('clears the dust before the Earth begins rising', () => {
    for (const p of [0, 0.04, 0.1, 0.179, 0.18]) expect(sceneAt(p).rise).toBe(0)
    expect(sceneAt(0.18).veil).toBe(0)
    expect(sceneAt(0.181).rise).toBeGreaterThan(0)
    expect(sceneAt(0.5).rise).toBe(1)
  })
  it('resolves the personal title and hands off to the existing portfolio', () => {
    expect(sceneAt(0.3).titleOpacity).toBe(1)
    expect(sceneAt(1).titleOpacity).toBe(0)
    expect(sceneAt(1).groundY).toBe(-78)
    expect(sceneAt(1).hudOpacity).toBe(0)
  })
})

 it('server-renders personal destinations and local responsive layers without a JS gate', () => {
  const html = renderToStaticMarkup(createElement(Earthrise))
  expect(html).toContain('QINGPENG LAM')
  expect(html).toContain('href="/world"')
  expect(html).toContain('href="/#quick-view"')
  expect(html).toContain(withBasePath('/resume/QingPengLam_Resume.pdf'))
  for (const layer of ['sky', 'earth', 'moonscape', 'frame', 'astronaut', 'ground']) {
    expect(html).toContain(withBasePath(`/layers/d/${layer}.webp`))
    expect(html).toContain(withBasePath(`/layers/m/${layer}.webp`))
  }
  expect(html).not.toContain('selene-live')
  expect(html).not.toContain('opacity:0')
  expect(html).not.toContain('r2.dev')
 })
