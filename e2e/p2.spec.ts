import { expect, test } from '@playwright/test'

test('opens P2 from its card with supplied screenshots and its playable-build link', async ({ page }) => {
  await page.goto('/projects/')
  const card = page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Modular Weapon Arena Prototype', exact: true }) })
  await expect(card.getByRole('link', { name: /Download Game/ })).toHaveAttribute('href', 'https://github.com/QINGPENGLAM/p2-game-downloads/releases/download/v1.0/P2Build.zip')
  await card.getByRole('link', { name: /Read case study/ }).click()
  await expect(page).toHaveURL(/\/projects\/modular-weapon-arena\/$/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Modular Weapon Arena Prototype')
  for (const name of ['Core mechanics', 'Controls', 'Iteration', 'My Contributions', 'Technologies']) {
    await expect(page.getByRole('heading', { name, exact: true })).toBeVisible()
  }
  await expect(page.getByRole('link', { name: /Download Game/ })).toHaveAttribute('href', 'https://github.com/QINGPENGLAM/p2-game-downloads/releases/download/v1.0/P2Build.zip')
  await expect(page.locator('.case-study-content a[href*="github.com"]:not([href*="/releases/download/"])')).toHaveCount(0)
  await expect(page.locator('a[href*="P2_GAME_DOWNLOAD_URL"]')).toHaveCount(0)
  const images = page.locator('.case-study-visual img')
  await expect(images).toHaveCount(2)
  for (const image of await images.all()) {
    await image.scrollIntoViewIfNeeded()
    await expect(image).toBeVisible()
    await expect.poll(() => image.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
})
