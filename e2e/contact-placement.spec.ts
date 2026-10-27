import { expect, test } from '@playwright/test'

test('places Contact after skills and education and loads its form when reached', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.site-header').getByRole('link', { name: 'Contact', exact: true })).toHaveCount(0)
  const section = page.locator('#contact')
  expect(await page.locator('.recruiter-grid').evaluate(grid => Boolean(grid.compareDocumentPosition(document.querySelector('#contact')!) & Node.DOCUMENT_POSITION_FOLLOWING))).toBe(true)
  await section.scrollIntoViewIfNeeded()
  await expect(section.getByRole('button', { name: 'Send message' })).toBeDisabled()
  await expect(section.getByRole('link', { name: 'qpl@umich.edu', exact: true })).toHaveAttribute('href', 'mailto:qpl@umich.edu')
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  await section.screenshot({ path: `/tmp/home-contact-${test.info().project.name}.png` })
})
