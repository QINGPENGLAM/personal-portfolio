import { expect, test } from '@playwright/test'

test('loads approved portfolio answers when a visitor asks a question', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Ask portfolio', exact: true }).click()
  await page.getByRole('button', { name: 'What backend systems has QingPeng built?', exact: true }).click()
  await expect(page.getByText(/The clearest backend evidence is DevDoctor/)).toBeVisible()
  await expect(page.getByRole('link', { name: 'DevDoctor', exact: true })).toBeVisible()
})

test('offers a readable fallback when the answer module cannot load', async ({ page }) => {
  // An optional music stream must not gate the guide's readiness.
  await page.route('**/audio/*.mp3', () => {})
  await page.addInitScript(() => {
    window.addEventListener('DOMContentLoaded', () => { void fetch('/personal-portfolio/audio/calm-ambient-dreamscape.mp3').catch(() => {}) })
  })
  await page.goto('/')
  // Opening the guide proves hydration is ready without waiting for audio.
  await page.getByRole('button', { name: 'Ask portfolio', exact: true }).click()
  await expect(page.getByRole('button', { name: 'What backend systems has QingPeng built?', exact: true })).toBeVisible()
  // Only the answer module remains lazy after the guide shell is interactive.
  await page.route('**/_next/static/chunks/*.js', route => route.abort())
  await page.getByRole('button', { name: 'What backend systems has QingPeng built?', exact: true }).click()
  await expect(page.getByText('The portfolio guide could not load. Please try again or browse the projects page.')).toBeVisible()
  await expect(page.getByRole('link', { name: 'Browse projects', exact: true })).toBeVisible()
  await page.getByRole('textbox', { name: 'Ask about QingPeng’s portfolio' }).fill('Try again')
  await expect(page.getByRole('button', { name: 'Ask', exact: true })).toBeEnabled()
})
