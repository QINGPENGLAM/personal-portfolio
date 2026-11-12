import { expect, test } from '@playwright/test'

const title = 'Personal AI Assistant Platform'

test('discovers the assistant platform and its separate public source', async ({ page }) => {
  await page.goto('/projects/')
  const card = page.locator('.project-card').filter({ has: page.getByRole('heading', { name: title, exact: true }) })
  await expect(card).toBeVisible()
  await card.getByRole('link', { name: /Read case study/ }).click()
  await expect(page).toHaveURL(/\/projects\/personal-ai-assistant-platform\/$/)
  await expect(page.getByRole('heading', { name: title, exact: true })).toBeVisible()
  await expect(page.getByRole('link', { name: 'View code', exact: true })).toHaveAttribute('href', 'https://github.com/QINGPENGLAM/personal-ai-assistant-platform')
  await expect(page.getByText(/full automated real-runtime suite is incomplete/i)).toBeVisible()
  await expect(page.getByRole('link', { name: 'Open live demo', exact: true })).toHaveCount(0)
  const preview = page.locator('.case-study-visual img')
  await expect(preview).toBeVisible()
  expect(await preview.evaluate(image => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
})
