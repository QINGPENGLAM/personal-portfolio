import { writeFileSync } from 'node:fs'
import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

async function expectReadable(page: Page, selector?: string) {
  const builder = new AxeBuilder({ page }).withRules(['color-contrast']).exclude('canvas')
  if (selector) builder.include(selector)
  const results = await builder.analyze()
  const failures = results.violations.flatMap(violation => violation.nodes.map(node => ({
    target: node.target, checks: node.any.map(check => check.data),
  })))
  writeFileSync(test.info().outputPath('contrast.json'), JSON.stringify(failures, null, 2))
  expect(failures.map(item => `${item.target.join(' ')}: ${item.checks.map(check => check?.contrastRatio).join(',')}`)).toEqual([])
}

for (const route of ['/', '/about/', '/resume/', '/projects/', '/projects/devdoctor/', '/projects/immich-ai-photo-search/', '/projects/zelda-recreation/', '/projects/modular-weapon-arena/', '/projects/archive/', '/projects/insights/', '/experience/', '/skills/', '/contact/', '/projects/hrs-publication-pipeline/', '/world/?fallback=1']) {
  test(`keeps light-theme text readable on ${route}`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' })
    await page.addInitScript(() => localStorage.setItem('qingpeng-portfolio-theme', 'day'))
    await page.goto(route)
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'day')
    await page.evaluate(async () => {
      await Promise.all(document.body.getAnimations().filter(animation => animation instanceof CSSTransition).map(animation => animation.finished.catch(() => {})))
    })
    await expectReadable(page)
    if (route === '/') {
      await page.locator('#project-deck').screenshot({ path: `/tmp/light-projects-${test.info().project.name}.png` })
      await page.locator('#quick-view').screenshot({ path: `/tmp/light-experience-${test.info().project.name}.png` })
    }
  })
}


test('keeps light-theme contact feedback and role/workflow popups readable', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' })
  await page.addInitScript(() => localStorage.setItem('qingpeng-portfolio-theme', 'day'))
  await page.goto('/')
  const contact = page.locator('#contact')
  await contact.scrollIntoViewIfNeeded()
  await contact.getByRole('textbox', { name: /^Email/ }).fill('not-an-email')
  await expect(contact.locator('#contact-email-error')).toBeVisible()
  await expectReadable(page, '#contact')
  await page.locator('.experience-list > li').nth(1).getByRole('button').click()
  await expect(page.getByRole('dialog', { name: 'Software Engineering Intern', exact: true })).toBeVisible()
  await expectReadable(page, 'dialog[open]')
  await page.keyboard.press('Escape')
  await page.goto('/projects/hrs-publication-pipeline/')
  await page.locator('#hrs-node-gmail').click()
  await expect(page.getByRole('dialog', { name: 'Gmail intake', exact: true })).toBeVisible()
  await expectReadable(page, 'dialog[open]')
  await page.screenshot({ path: `/tmp/light-theme-popup-${test.info().project.name}.png` })
})
