import { describe, expect, it } from 'vitest'
import { directRoutes, navigation } from '@/data/navigation'

describe('direct portfolio navigation', () => {
  it('provides recruiter-accessible section routes', () => {
    expect(directRoutes).toEqual(expect.arrayContaining(['/', '/world', '/about', '/projects', '/experience', '/skills', '/contact', '/resume']))
  })

  it('uses unique navigation labels and URLs', () => {
    expect(new Set(navigation.map((item) => item.href)).size).toBe(navigation.length)
    expect(new Set(navigation.map((item) => item.label)).size).toBe(navigation.length)
  })
})
