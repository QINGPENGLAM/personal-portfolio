import type { Page } from '@playwright/test'

/** Safari on macOS uses Option-Tab for all controls unless Full Keyboard Access
 * is enabled. Do not change the machine's setting just to run a browser test. */
export async function pressTab(page: Page, reverse = false) {
  const option = process.platform === 'darwin' && page.context().browser()?.browserType().name() === 'webkit'
  await page.keyboard.press(`${option ? 'Alt+' : ''}${reverse ? 'Shift+' : ''}Tab`)
}
