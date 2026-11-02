import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.route('**/*', route => /openrouter\.ai|\.workers\.dev/.test(route.request().url()) ? route.abort() : route.continue())
})

test('shows animated preparation and progressively reveals an honestly labeled local reply', async ({ page }) => {
  await page.goto('/personal-portfolio/')
  await page.getByRole('button', { name: 'Ask portfolio', exact: true }).click()
  await page.evaluate(() => {
    const root = document.querySelector('.assistant-messages')!
    const prefixes: string[] = []
    ;(window as Window & { replyPrefixes?: string[] }).replyPrefixes = prefixes
    new MutationObserver(() => {
      const text = root.querySelector('article:last-child p')?.textContent ?? ''
      if (text.startsWith('The clearest backend')) prefixes.push(text)
    }).observe(root, { childList: true, subtree: true, characterData: true })
  })
  await page.getByRole('button', { name: 'What backend systems has QingPeng built?', exact: true }).click()
  await expect(page.locator('.assistant-dots')).toBeVisible()
  await expect(page.getByText('Local demo · approved data only')).toBeVisible()
  await expect(page.getByRole('link', { name: 'DevDoctor', exact: true })).toHaveCount(0)
  await expect(page.getByRole('link', { name: 'DevDoctor', exact: true })).toBeVisible()
  await expect(page.locator('.assistant-messages article').last()).toContainText('reporting systems.')
  await expect(page.locator('.assistant-dots')).toHaveCount(0)
  const prefixes = await page.evaluate(() => (window as Window & { replyPrefixes?: string[] }).replyPrefixes ?? [])
  expect(new Set(prefixes).size).toBeGreaterThan(1)
  expect(prefixes[0].length).toBeLessThan(prefixes.at(-1)!.length)
})
test('cancels the presentation and permits a fresh question without a stale reply', async ({ page }) => {
  await page.goto('/personal-portfolio/')
  await page.getByRole('button', { name: 'Ask portfolio', exact: true }).click()
  await page.getByRole('button', { name: 'What backend systems has QingPeng built?', exact: true }).click()
  await expect(page.locator('.assistant-dots')).toBeVisible()
  await page.getByRole('button', { name: 'Cancel request', exact: true }).click()
  await expect(page.getByText('Request cancelled.', { exact: true })).toBeVisible()
  await page.getByRole('textbox').fill('What is his GPA?')
  await page.getByRole('button', { name: 'Ask', exact: true }).click()
  await expect(page.getByRole('link', { name: 'Education detail' })).toBeVisible()
  await expect(page.locator('.assistant-messages article').last()).toContainText('3.8')
  await expect(page.getByRole('link', { name: 'DevDoctor', exact: true })).toHaveCount(0)
})
test('does not require animation timers when reduced motion is requested', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/personal-portfolio/')
  await page.getByRole('button', { name: 'Ask portfolio', exact: true }).click()
  await page.clock.install()
  await page.getByRole('button', { name: 'What backend systems has QingPeng built?', exact: true }).click()
  await expect(page.getByRole('link', { name: 'DevDoctor', exact: true })).toBeVisible()
  await expect(page.locator('.assistant-dots')).toHaveCount(0)
})
