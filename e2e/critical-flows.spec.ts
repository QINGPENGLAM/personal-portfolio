import { expect, test } from '@playwright/test'

test('loads the recruiter-first homepage and quick view', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Building software')
  await page.getByRole('link', { name: 'Quick Portfolio View' }).click()
  await expect(page).toHaveURL(/#quick-view$/)
  await expect(page.getByRole('heading', { name: 'The useful details, immediately.' })).toBeVisible()
})

test('opens a project directly with readable case-study content', async ({ page }) => {
  await page.goto('/projects/devdoctor/')
  await expect(page.getByRole('heading', { level: 1, name: 'DevDoctor' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Follow one request through the architecture.' })).toBeVisible()
  await expect(page.getByRole('navigation', { name: 'Related project navigation' })).toBeVisible()
})

test('browses the complete repository archive with verified demo evidence', async ({ page }) => {
  await page.goto('/projects/archive/')
  await expect(page.getByRole('heading', { level: 1, name: 'Every public build, without the sales pitch.' })).toBeVisible()
  await expect(page.getByText('Showing 39 of 39 public repositories.')).toBeVisible()
  await page.getByLabel('Language').selectOption('C++')
  await expect(page.getByText('Showing 3 of 39 public repositories.')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'myOwnRedis' })).toBeVisible()
  await page.getByLabel('Search repositories').fill('Redis')
  await expect(page.getByText('Showing 1 of 39 public repositories.')).toBeVisible()
  await expect(page.getByRole('link', { name: 'View myOwnRedis code on GitHub' })).toHaveAttribute('href', 'https://github.com/QINGPENGLAM/myOwnRedis')
  await page.getByLabel('Search repositories').clear()
  await page.getByLabel('Language').selectOption('All')
  await page.getByLabel('Availability').selectOption('verified')
  await expect(page.getByText('Showing 17 of 39 public repositories.')).toBeVisible()
  await expect(page.getByRole('link', { name: 'Open HandMotionMusic verified live demo' })).toHaveAttribute('href', 'https://qingpenglam.github.io/HandMotionMusic/')
})

test('explains repository insights without overstating the metadata', async ({ page }) => {
  await page.goto('/projects/insights/')
  await expect(page.getByRole('heading', { level: 1, name: 'Read the build history at a glance.' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'What the repository history actually shows.' })).toBeVisible()
  await expect(page.getByText(/latest recorded push—not its creation date/)).toBeVisible()
  await expect(page.getByRole('definition').filter({ hasText: '17' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Browse all repositories →' })).toHaveAttribute('href', /\/projects\/archive\/$/)
})

test('keeps the resume available without client-side JavaScript', async ({ page }) => {
  await page.goto('/resume/')
  const download = page.getByRole('link', { name: 'Download PDF' })
  await expect(download).toHaveAttribute('download', '')
  await expect(download).toHaveAttribute('href', /QingPengLam_Resume\.pdf$/)
})

test('validates the contact form and focuses the first invalid field', async ({ page }) => {
  await page.goto('/contact/')
  await expect(page.getByRole('button', { name: 'Send message' })).toBeEnabled()
  await page.getByRole('button', { name: 'Send message' }).click()
  await expect(page.locator('.contact-status[role="alert"]')).toContainText('Review the highlighted fields')
  await expect(page.getByLabel('Name')).toBeFocused()
  await expect(page.getByLabel('Name')).toHaveAttribute('aria-invalid', 'true')
})

test('supports the skip link using only the keyboard', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('#main-content')).toBeFocused()
})

test('honors the operating-system reduced-motion preference', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/projects/devdoctor/')
  await expect.poll(() => page.evaluate(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(true)
  await expect(page.getByText(/Animation is paused to respect your reduced-motion preference/)).toBeVisible()
})

test('provides a complete no-WebGL fallback', async ({ page }) => {
  await page.goto('/world/?fallback=1')
  await expect(page.getByRole('heading', { name: 'The portfolio is still fully available.' })).toBeVisible()
  await expect(page.getByRole('link', { name: /Project District/ })).toBeVisible()
  await expect(page.getByRole('link', { name: /DevDoctor/ })).toBeVisible()
})

test('opens a project from the interactive world', async ({ page }, testInfo) => {
  test.skip(
    process.env.PLAYWRIGHT_WORLD !== '1' || testInfo.project.name !== 'chromium',
    'The GPU-backed interaction runs in a fresh Chromium process; fallbacks run across every browser project.',
  )
  await page.goto('/world/')
  const canvas = page.getByRole('img', { name: 'Interactive fantasy portfolio world' })
  const fallback = page.getByRole('heading', { name: 'The portfolio is still fully available.' })
  await expect(canvas.or(fallback)).toBeVisible({ timeout: 20_000 })
  if (await canvas.isVisible()) {
    await page.getByRole('button', { name: 'Guided tour' }).click()
    await expect(page.getByRole('complementary', { name: 'Guided world tour' })).toBeVisible()
    await expect(page).toHaveURL(/tour=identity/)
    await page.getByRole('button', { name: 'Next stop' }).click()
    await expect(page).toHaveURL(/tour=projects/)
    await page.getByRole('button', { name: 'Exit tour' }).click()
    await expect(page).not.toHaveURL(/tour=/)
    const devDoctorNode = page.getByRole('button', { name: 'Open DevDoctor project case study' })
    await devDoctorNode.focus()
    await expect(devDoctorNode).toBeFocused()
    await page.keyboard.press('Enter')
    await expect(page.getByRole('dialog', { name: /DevDoctor/ })).toBeVisible({ timeout: 10_000 })
  } else {
    await expect(page.getByRole('link', { name: /DevDoctor/ })).toBeVisible()
  }
})

test('keeps mobile navigation and page content inside the viewport', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-chrome', 'Mobile layout is covered by the mobile browser project.')
  await page.goto('/projects/')
  await page.locator('.mobile-navigation summary').click()
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible()
  const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)
  expect(hasOverflow).toBe(false)
})
