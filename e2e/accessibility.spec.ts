import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const routes = ['/', '/projects/', '/projects/archive/', '/projects/insights/', '/experience/', '/skills/', '/contact/', '/world/?fallback=1']

for (const route of routes) {
  test(`has no serious automated accessibility violations on ${route}`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium', 'The semantic audit runs once; user flows still run across the browser matrix.')
    await page.goto(route)
    // ThemeToggle applies the OS preference after hydration. Audit the settled
    // foreground/background pair, not an intermediate dark-to-light transition.
    await expect(page.locator('html')).toHaveAttribute('data-theme', /^(day|night)$/)
    await page.evaluate(async () => {
      await document.fonts.ready
      await Promise.all(document.body.getAnimations({ subtree: true })
        .filter(animation => animation instanceof CSSTransition)
        .map(animation => animation.finished.catch(() => {})))
    })
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .exclude('canvas')
      .analyze()
    const blocking = results.violations.filter((violation) => violation.impact === 'critical' || violation.impact === 'serious')
    expect(blocking, blocking.map((violation) => `${violation.id}: ${violation.help}`).join('\n')).toEqual([])
  })
}
