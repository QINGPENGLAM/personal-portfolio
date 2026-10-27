import { expect, test } from '@playwright/test'

test('opens role popups without changing the alternating timeline layout', async ({ page }) => {
  await page.goto('/#quick-view')
  const entries = page.locator('.experience-list > li')
  await expect(entries).toHaveCount(5)
  const course = entries.first()
  await expect(course).toContainText('SI 539')
  await expect(course).toContainText('Aug. 2026 — Present')
  const trigger = course.getByRole('button')
  const before = await course.boundingBox()
  await course.locator('.experience-disclosure').click({ position: { x: 20, y: 70 } })
  const popup = page.getByRole('dialog', { name: 'Instructional Assistant — SI 539', exact: true })
  await expect(popup).toBeVisible()
  await expect.poll(() => popup.evaluate(dialog => {
    const rect = dialog.getBoundingClientRect()
    return rect.top >= 0 && rect.bottom <= innerHeight
  })).toBe(true)
  await expect(popup).toContainText('Contributions')
  await expect(popup).not.toContainText('Measured outcomes')
  await expect(popup).not.toContainText('Technologies')
  await expect(popup.getByRole('button', { name: /Close/ })).toBeFocused()
  await expect(page.locator('body')).toHaveCSS('overflow', 'hidden')
  await page.keyboard.press('Shift+Tab')
  await expect(popup.getByRole('link', { name: /Full role details/ })).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(popup.getByRole('button', { name: /Close/ })).toBeFocused()
  expect((await course.boundingBox())?.height).toBe(before?.height)
  await page.screenshot({ path: `/tmp/experience-popup-${test.info().project.name}.png` })
  await page.keyboard.press('Escape')
  await expect(popup).not.toBeVisible()
  await expect(trigger).toBeFocused()
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden')
  await page.keyboard.press('Enter')
  await expect(popup).toBeVisible()
  await popup.getByRole('button', { name: /Close/ }).click()
  await expect(popup).not.toBeVisible()
  await expect(trigger).toBeFocused()
  await page.keyboard.press('Space')
  await expect(popup).toBeVisible()
  await page.mouse.click(2, 2)
  await expect(popup).not.toBeVisible()
  const usaa = entries.nth(1)
  await usaa.getByRole('button').click()
  const usaaPopup = page.getByRole('dialog', { name: 'Software Engineering Intern', exact: true })
  await expect(usaaPopup).toContainText('12 reusable C# AI skills')
  expect(await usaaPopup.evaluate(dialog => {
    const rect = dialog.getBoundingClientRect()
    return rect.top >= 0 && rect.bottom <= innerHeight && dialog.scrollHeight >= dialog.clientHeight
  })).toBe(true)
  await page.keyboard.press('Escape')
  await expect(usaaPopup).not.toBeVisible()
  const rail = await entries.evaluateAll(items => items.map(item => item.getBoundingClientRect().left))
  expect(new Set(rail).size).toBe(1)
  const geometry = await page.locator('.experience-list').evaluate(list => {
    const bounds = list.getBoundingClientRect()
    const lineOffset = parseFloat(getComputedStyle(list, '::before').left)
    return { left: bounds.left, width: bounds.width, lineOffset,
      cards: [...list.querySelectorAll('.experience-disclosure')].map(card => {
        const rect = card.getBoundingClientRect()
        return { left: rect.left, right: rect.right }
      }) }
  })
  if (test.info().project.name === 'chromium') {
    expect(geometry.lineOffset).toBeCloseTo(geometry.width / 2, 0)
    const center = geometry.left + geometry.lineOffset
    geometry.cards.forEach((card, index) => {
      if (index % 2 === 0) expect(card.right).toBeLessThan(center)
      else expect(card.left).toBeGreaterThan(center)
    })
  }

  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  await page.locator('section[aria-labelledby="experience-heading"]').screenshot({ path: `/tmp/experience-${test.info().project.name}.png` })
  await page.goto('/experience/#eng101-ia')
  await expect(page.locator('#eng101-ia')).toContainText('Introduction to Engineering')
})

test('keeps full experience reachable without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, javaScriptEnabled: false, viewport: { width: 390, height: 844 } })
  const page = await context.newPage()
  await page.goto('/#quick-view', { waitUntil: 'domcontentloaded' })
  const entry = page.locator('.experience-list > li').first()
  await entry.getByRole('link', { name: /Read full role details/ }).click()
  await expect(page).toHaveURL(/experience\/#si539-ia$/)
  await expect(page.locator('#si539-ia')).toContainText('Web Design: Responsiveness and Accessibility')
  await context.close()
})

test('closes role popups with reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/#quick-view')
  await page.locator('.experience-list > li').first().getByRole('button').click()
  const popup = page.getByRole('dialog', { name: 'Instructional Assistant — SI 539', exact: true })
  await expect(popup).toBeVisible()
  await expect(popup).toHaveCSS('animation-name', 'none')
  await page.keyboard.press('Escape')
  await expect(popup).not.toBeVisible()
})
