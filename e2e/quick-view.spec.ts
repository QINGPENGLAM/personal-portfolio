import { expect, test } from '@playwright/test'

test('animates Quick Portfolio View without replacing the document', async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => { document.documentElement.dataset.quickViewDocument = 'original' })
  const target = page.locator('#quick-view')
  const destination = await target.evaluate(element => scrollY + element.getBoundingClientRect().top - 96)
  await page.locator('.selene-dust-actions').getByRole('link', { name: /Quick Portfolio View/ }).click()
  await expect(page).toHaveURL(/#quick-view$/)
  const during = await page.evaluate(() => new Promise<number>(resolve => requestAnimationFrame(() => resolve(scrollY))))
  expect(during).toBeGreaterThan(0)
  expect(during).toBeLessThan(destination - 5)
  await expect(target).toBeFocused()
  await expect.poll(() => target.evaluate(element => element.getBoundingClientRect().top)).toBeCloseTo(96, 0)
  await expect(page.locator('html')).toHaveAttribute('data-quick-view-document', 'original')
})

test('keeps Quick Portfolio View instant for reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await page.locator('.selene-actions').getByRole('link', { name: /Quick Portfolio View/ }).click()
  await expect(page.locator('#quick-view')).toBeFocused()
  await expect.poll(() => page.locator('#quick-view').evaluate(element => element.getBoundingClientRect().top)).toBeCloseTo(96, 0)
})
