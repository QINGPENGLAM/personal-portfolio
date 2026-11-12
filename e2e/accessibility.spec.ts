import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

const routes = ['/', '/about/', '/resume/', '/projects/', '/projects/archive/', '/projects/insights/', '/projects/personal-ai-assistant-platform/', '/projects/devdoctor/', '/projects/immich-ai-photo-search/', '/projects/zelda-recreation/', '/projects/modular-weapon-arena/', '/projects/hrs-publication-pipeline/', '/experience/', '/skills/', '/contact/', '/world/?fallback=1']

async function expectAccessible(page: Page) {
  await page.evaluate(async () => {
    await document.fonts.ready
    await Promise.all(document.body.getAnimations({ subtree: true })
      .filter(animation => animation.effect?.getComputedTiming().iterations !== Infinity)
      .map(animation => animation.finished.catch(() => {})))
  })
  const results = await new AxeBuilder({ page }).analyze()
  expect(results.violations.map(violation => ({
    rule: violation.id,
    nodes: violation.nodes.map(node => ({ target: node.target, reason: node.failureSummary })),
  }))).toEqual([])
}

for (const theme of ['day', 'night'] as const) {
  for (const route of routes) {
    test(`has no automated accessibility violations on ${route} in ${theme} theme`, async ({ page }, testInfo) => {
      test.skip(!['chromium', 'mobile-chrome'].includes(testInfo.project.name), 'Audit desktop and mobile layouts; other engines run the user-flow suite.')
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.addInitScript(value => localStorage.setItem('qingpeng-portfolio-theme', value), theme)
      await page.goto(route)
      // Audit settled styles after hydration and theme transitions.
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme)
      await page.evaluate(async () => {
        await document.fonts.ready
        await Promise.all(document.body.getAnimations({ subtree: true })
          .filter(animation => animation instanceof CSSTransition)
          .map(animation => animation.finished.catch(() => {})))
      })
      await expectAccessible(page)
    })
  }
}

test('keeps animated homepage, carousel and open dialogs accessible', async ({ page }, testInfo) => {
  test.skip(!['chromium', 'mobile-chrome'].includes(testInfo.project.name), 'Audit interactive states on desktop and mobile layouts.')
  await page.addInitScript(() => localStorage.setItem('qingpeng-portfolio-theme', 'night'))
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'night')
  await expectAccessible(page)
  await page.locator('#project-deck').scrollIntoViewIfNeeded()
  await page.getByRole('button', { name: 'Next project', exact: true }).click()
  await expect(page.locator('.reel-progress > span').first()).toHaveText(/^02\s*\/\s*\d+$/)
  await expectAccessible(page)
  await page.locator('.experience-list > li').nth(1).getByRole('button').click()
  await expect(page.locator('dialog[open]')).toBeVisible()
  await expectAccessible(page)
  await page.keyboard.press('Escape')
  await expect(page.locator('dialog[open]')).toHaveCount(0)
  await page.getByRole('button', { name: 'Ask portfolio', exact: true }).click()
  await expect(page.getByRole('dialog', { name: 'Portfolio guide' })).toBeVisible()
  await expectAccessible(page)
})
