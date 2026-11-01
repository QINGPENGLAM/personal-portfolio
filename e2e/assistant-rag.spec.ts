import { expect, test } from '@playwright/test'

// Match this test-only setting to the endpoint used at build time.
const endpoint = process.env.PLAYWRIGHT_ASSISTANT_ENDPOINT || 'https://assistant.test'
// Every AI request is intercepted; never call the live model in browser tests.
// No runtime endpoint override or production test hook.
test.describe('configured portfolio AI transport', () => {
  test.skip(!process.env.PLAYWRIGHT_ASSISTANT_RAG, 'Requires the explicitly configured test build')
  test('shows sourced AI text safely and sends short follow-up history', async ({ page }) => {
    const bodies: { question: string; history: unknown[] }[] = []
    await page.route(`${endpoint.replace(/\/$/, '')}/**`, async route => {
      bodies.push(route.request().postDataJSON())
      await route.fulfill({ json: { mode: 'ai', available: true, answer: '<script>not executable</script> HRS uses PostgreSQL.', links: [{ href: '/projects/hrs-publication-pipeline', label: 'HRS source' }] } })
    })
    await page.goto('/personal-portfolio/')
    await page.getByRole('button', { name: 'Ask portfolio' }).click()
    await expect(page.getByText('Questions and recent chat are sent to our AI service and OpenRouter. Please avoid personal or sensitive information.')).toBeVisible()
    await page.getByRole('textbox', { name: 'Ask about QingPeng’s portfolio' }).fill('HRS database?')
    await page.getByRole('button', { name: 'Ask', exact: true }).click()
    await expect(page.getByText('<script>not executable</script> HRS uses PostgreSQL.', { exact: true })).toBeVisible()
    await expect(page.getByRole('link', { name: 'HRS source' })).toHaveAttribute('href', '/personal-portfolio/projects/hrs-publication-pipeline/')
    await page.getByRole('textbox').fill('What about testing?')
    await page.getByRole('button', { name: 'Ask', exact: true }).click()
    await expect.poll(() => bodies.length).toBe(2)
    expect(bodies[1].history).toHaveLength(2)
    await page.keyboard.press('Escape')
    await expect(page.getByRole('button', { name: 'Ask portfolio' })).toBeFocused()
  })
  test('labels local fallback when the service fails', async ({ page }) => {
    await page.route(`${endpoint.replace(/\/$/, '')}/**`, route => route.fulfill({ status: 429, body: '{}' }))
    await page.goto('/personal-portfolio/')
    await page.getByRole('button', { name: 'Ask portfolio' }).click()
    await page.getByRole('textbox').fill('backend systems')
    await page.getByRole('button', { name: 'Ask', exact: true }).click()
    await expect(page.getByText('Local guide · AI unavailable or limit reached.')).toBeVisible()
    await expect(page.getByRole('link', { name: 'DevDoctor', exact: true })).toBeVisible()
  })
  test('cancels an in-flight request', async ({ page }) => {
    await page.route(`${endpoint.replace(/\/$/, '')}/**`, () => {})
    await page.goto('/personal-portfolio/')
    await page.getByRole('button', { name: 'Ask portfolio' }).click()
    await page.getByRole('textbox').fill('HRS database?')
    await page.getByRole('button', { name: 'Ask', exact: true }).click()
    await page.getByRole('button', { name: 'Cancel request' }).click()
    await expect(page.getByText('Request cancelled.')).toBeVisible()
  })
})
