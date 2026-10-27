import { expect, test } from '@playwright/test'

test('ignores a late carousel resize callback after navigating away', async ({ page }) => {
  await page.addInitScript(() => {
    const NativeResizeObserver = window.ResizeObserver
    window.ResizeObserver = class extends NativeResizeObserver {
      constructor(callback: ResizeObserverCallback) {
        super(callback)
        const observe = this.observe.bind(this)
        this.observe = (target, options) => {
          if (target.matches('.project-reel-track')) {
            Object.assign(window, { fireLateReelResize: () => callback([], this) })
          }
          observe(target, options)
        }
      }
    }
  })
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/')
  await expect(page.getByRole('button', { name: 'Next project', exact: true })).toBeEnabled()
  await page.locator('.reel-all-projects').click()
  await expect(page).toHaveURL(/\/projects\/$/)
  await expect(page.locator('#project-deck')).toHaveCount(0)
  await page.evaluate(() => {
    const callback = (window as Window & { fireLateReelResize?: () => void }).fireLateReelResize
    if (!callback) throw new Error('Carousel resize callback was not captured')
    callback()
  })
  expect(errors).toEqual([])
  await page.getByRole('link', { name: 'QingPeng Lam home' }).click()
  const next = page.getByRole('button', { name: 'Next project', exact: true })
  await next.click()
  await expect(page.locator('.reel-progress > span').first()).toHaveText(/^02\s*\/\s*\d+$/)
  expect(errors).toEqual([])
})
