import { expect, test } from '@playwright/test'

const projects = ['Calculator', 'food-ordering-', 'topicshare', 'Tic-Tac-Toe', 'cube-game', 'random-spawn-dodge', 'arthistory-RPG']

test('loads the seven archived project previews while preserving filters and code links', async ({ page }) => {
  await page.goto('/projects/archive/')
  await expect(page.locator('.archive-card')).toHaveCount(39)
  await expect(page.locator('.archive-preview')).toHaveCount(7)
  for (const name of projects) {
    await page.getByLabel('Search repositories').fill(name)
    const card = page.locator('.archive-card').filter({ has: page.getByRole('heading', { name, exact: true }) })
    const image = card.getByRole('img')
    await image.scrollIntoViewIfNeeded()
    await expect(image).toBeVisible()
    await expect.poll(() => image.evaluate((node: HTMLImageElement) => node.complete && node.naturalWidth > 0)).toBe(true)
    await expect(image).toHaveAttribute('src', /^\/personal-portfolio\/project-previews\/archive\/.+\.webp$/)
    await expect(card.getByRole('link', { name: `View ${name} code on GitHub` })).toHaveAttribute('href', `https://github.com/QINGPENGLAM/${name}`)
    expect(await image.evaluate(node => getComputedStyle(node).objectFit)).toBe('contain')
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  }
  await page.getByLabel('Search repositories').fill('Raytracer')
  await expect(page.locator('.archive-card')).toHaveCount(1)
  await expect(page.locator('.archive-preview')).toHaveCount(0)
  await page.getByLabel('Search repositories').clear()
  await page.getByLabel('Language').selectOption('C++')
  await expect(page.locator('.archive-card')).toHaveCount(3)
  await page.getByLabel('Language').selectOption('All')
  await page.getByLabel('Availability').selectOption('verified')
  await expect(page.locator('.archive-card')).toHaveCount(18)
})
