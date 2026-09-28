import { expect, test } from '@playwright/test'

test('opens Zelda from its card with responsive content and no source link', async ({ page }) => {
  await page.goto('/projects/')
  const card = page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'The Legend of Zelda Recreation', exact: true }) })
  await expect(card.getByRole('link', { name: /Download Game/ })).toHaveAttribute('href', 'https://github.com/QINGPENGLAM/zelda-p1-downloads/releases/download/v1.0/Zelda-P1-Game.zip')
  await card.getByRole('link', { name: /Read case study/ }).click()
  await expect(page).toHaveURL(/\/projects\/zelda-recreation\/$/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('The Legend of Zelda Recreation')
  await expect(page.getByText('EECS 494 – Introduction to Game Development · University of Michigan', { exact: true })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'My Contributions', exact: true })).toBeVisible()
  await expect(page.locator('.contribution-list li')).toHaveCount(14)
  await expect(page.getByRole('heading', { name: 'Technologies', exact: true })).toBeVisible()
  await expect(page.getByRole('link', { name: /Download Game/ })).toHaveAttribute('href', 'https://github.com/QINGPENGLAM/zelda-p1-downloads/releases/download/v1.0/Zelda-P1-Game.zip')
  await expect(page.locator('.case-study-content a[href*="github.com"]:not([href*="/releases/download/"])')).toHaveCount(0)
  await expect(page.locator('a[href*="GAME_DOWNLOAD_URL"]')).toHaveCount(0)
  const images = page.locator('.case-study-visual img')
  await expect(images).toHaveCount(2)
  for (const image of await images.all()) {
    await image.scrollIntoViewIfNeeded()
    await expect(image).toBeVisible()
    await expect.poll(() => image.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
})
