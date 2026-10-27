import { expect, test } from '@playwright/test'

for (const accepted of [true, false]) {
  test(`handles Web3Forms ${accepted ? 'acceptance' : 'rejection'} without leaving the page`, async ({ page }) => {
    let submitted: Record<string, unknown> | undefined
    await page.route('https://api.web3forms.com/submit', async route => {
      submitted = route.request().postDataJSON()
      await route.fulfill({ json: { success: accepted, message: accepted ? 'Email sent successfully!' : 'Please try again later.' } })
    })
    await page.clock.install()
    await page.goto('/contact/')
    await page.getByLabel('Name').fill('Test Visitor')
    await page.getByRole('textbox', { name: /^Email/ }).fill('visitor@example.com')
    await page.getByLabel('Company').fill('Example')
    await page.getByRole('textbox', { name: /^Message/ }).fill('A test of the portfolio contact form.')
    await page.clock.fastForward(3000)
    await page.getByRole('button', { name: 'Send message' }).click()
    await expect(page.locator('.contact-status')).toContainText(accepted ? 'Message sent.' : 'Please try again later.')
    expect(submitted).toMatchObject({ access_key: '7f865341-9fd8-455e-8210-41dec02358d9', name: 'Test Visitor', email: 'visitor@example.com', company: 'Example', message: 'A test of the portfolio contact form.', botcheck: false })
    expect(submitted).not.toHaveProperty('startedAt')
    await expect(page.getByLabel('Name')).toHaveValue(accepted ? '' : 'Test Visitor')
    await expect(page).toHaveURL(/\/contact\/$/)
  })
}

test('enables Submit only when all required fields are valid, with Company optional', async ({ page }) => {
  let requests = 0
  await page.route('https://api.web3forms.com/submit', async route => {
    requests++
    await route.fulfill({ json: { success: true } })
  })
  await page.clock.install()
  await page.goto('/contact/')
  const name = page.getByRole('textbox', { name: /^Name/ })
  const email = page.getByRole('textbox', { name: /^Email/ })
  const message = page.getByRole('textbox', { name: /^Message/ })
  const submit = page.getByRole('button', { name: 'Send message' })
  await page.clock.fastForward(3000)
  await expect(submit).toBeDisabled()
  await expect(page.locator('#contact-email-error')).toHaveCount(0)
  await name.fill('Test Visitor')
  await email.fill('visitor@example.com')
  await expect(submit).toBeDisabled()
  await message.fill('Too short')
  await expect(submit).toBeDisabled()
  await message.fill('A test of the portfolio contact form.')
  await expect(page.getByLabel('Company')).toHaveValue('')
  await expect(submit).toBeEnabled()
  for (const invalid of ['not-an-email', 'user@', 'user@example', 'user@@example.com', 'user name@example.com']) {
    await email.fill(invalid)
    await expect(submit).toBeDisabled()
    await expect(email).toHaveAttribute('aria-invalid', 'true')
    await expect(page.locator('#contact-email-error')).toHaveText('Enter a valid email address.')
    await expect(page.locator('#contact-email-error')).toBeVisible()
  }
  expect(await page.locator('#contact-email-error').evaluate(element => {
    const [red, green, blue] = getComputedStyle(element).color.match(/\d+/g)!.map(Number)
    return red > green && red > blue
  })).toBe(true)
  await page.locator('.contact-form').screenshot({ path: `/tmp/contact-email-warning-${test.info().project.name}.png` })
  await email.fill('visitor@example.com')
  await expect(email).toHaveAttribute('aria-invalid', 'false')
  await expect(page.locator('#contact-email-error')).toHaveCount(0)
  await name.fill('   ')
  await expect(submit).toBeDisabled()
  await name.fill('Test Visitor')
  await expect(submit).toBeEnabled()
  await message.clear()
  await expect(submit).toBeDisabled()
  await message.fill('A test of the portfolio contact form.')
  await expect(submit).toBeEnabled()
  expect(requests).toBe(0)
  await submit.click()
  await expect(page.locator('.contact-status')).toContainText('Message sent.')
  await expect(submit).toBeDisabled()
  expect(requests).toBe(1)
})
