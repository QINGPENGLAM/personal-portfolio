import { expect, test } from '@playwright/test'

test('plays the selected music, loops, adjusts volume and continues across routes', async ({ page }) => {
  const audioRequests: string[] = []
  page.on('request', request => { if (request.url().endsWith('.mp3')) audioRequests.push(request.url()) })
  await page.goto('/projects/archive/')
  await expect(page.getByRole('button', { name: 'Play background music' })).toBeVisible()
  await expect(page.locator('audio')).not.toHaveAttribute('src')
  const range = await page.request.get('/personal-portfolio/audio/calm-ambient-dreamscape.mp3', { headers: { Range: 'bytes=0-31' } })
  expect(range.status()).toBe(206)
  expect(range.headers()['content-range']).toBe('bytes 0-31/7108608')
  expect((await range.body()).length).toBe(32)
  await page.getByRole('button', { name: 'Play background music' }).click()
  await expect(page.getByRole('button', { name: 'Pause background music' })).toHaveAttribute('aria-pressed', 'true')
  await expect.poll(() => page.locator('audio').evaluate((audio: HTMLAudioElement) => audio.currentTime)).toBeGreaterThan(0)
  const playback = await page.locator('audio').evaluate((audio: HTMLAudioElement) => ({ loop: audio.loop, volume: audio.volume, paused: audio.paused }))
  expect(playback).toMatchObject({ loop: true, paused: false })
  // Audio backends can quantize volume; 4 decimals remains far below the 1% UI step.
  expect(playback.volume).toBeCloseTo(0.2, 4)
  expect(audioRequests[0]).toContain('/personal-portfolio/audio/calm-ambient-dreamscape.mp3')
  await expect.poll(() => page.locator('audio').evaluate((audio: HTMLAudioElement) => Number.isFinite(audio.duration) && audio.duration > 200)).toBe(true)
  await page.locator('audio').evaluate((audio: HTMLAudioElement) => { audio.currentTime = audio.duration - 0.25 })
  await expect.poll(() => page.locator('audio').evaluate((audio: HTMLAudioElement) => audio.currentTime)).toBeLessThan(2)
  // Seeking may outlast the transient panel; reopen it like a visitor would.
  await page.getByRole('button', { name: 'Adjust music volume' }).click()
  await page.getByRole('slider', { name: 'Music volume', exact: true }).fill('35')
  expect(await page.locator('audio').evaluate((audio: HTMLAudioElement) => audio.volume)).toBeCloseTo(0.35, 4)
  await page.locator('audio').evaluate((audio: HTMLAudioElement) => { audio.dataset.continuity = 'same-player' })
  await page.locator('.archive-subnav').getByRole('link', { name: 'Selected case studies' }).click()
  await expect(page.locator('audio')).toHaveAttribute('data-continuity', 'same-player')
  expect(await page.locator('audio').evaluate((audio: HTMLAudioElement) => audio.paused)).toBe(false)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  await page.getByRole('button', { name: 'Pause background music' }).click()
  expect(await page.locator('audio').evaluate((audio: HTMLAudioElement) => audio.paused)).toBe(true)
  await page.reload()
  await expect(page.getByRole('button', { name: 'Play background music' })).toHaveAttribute('aria-pressed', 'false')
  await expect(page.locator('audio')).not.toHaveAttribute('src')
})

test('offers a retry if the browser rejects playback', async ({ page }) => {
  await page.addInitScript(() => {
    const nativePlay = HTMLMediaElement.prototype.play
    let attempts = 0
    HTMLMediaElement.prototype.play = function () {
      attempts += 1
      if (attempts === 1) return Promise.reject(new DOMException('Playback failed', 'NotSupportedError'))
      return nativePlay.call(this)
    }
  })
  await page.goto('/projects/archive/')
  await page.getByRole('button', { name: 'Play background music' }).click()
  await expect(page.getByRole('status')).toContainText('Music could not play. Please try again.')
  await expect(page.getByRole('button', { name: 'Play background music' })).toHaveAttribute('aria-pressed', 'false')
  await page.getByRole('button', { name: 'Play background music' }).click()
  await expect(page.getByRole('button', { name: 'Pause background music' })).toBeVisible()
})

test('does not enable music when a canceled start resolves late', async ({ page }) => {
  await page.addInitScript(() => {
    HTMLMediaElement.prototype.play = () => {
      return new Promise<void>(resolve => { Object.assign(window, { finishAudioStart: resolve }) })
    }
  })
  await page.goto('/projects/archive/')
  await page.getByRole('button', { name: 'Play background music' }).click()
  await page.getByRole('button', { name: 'Cancel background music' }).click()
  await page.evaluate(() => (window as unknown as { finishAudioStart: () => void }).finishAudioStart())
  await expect(page.getByRole('button', { name: 'Play background music' })).toHaveAttribute('aria-pressed', 'false')
  expect(await page.locator('audio').evaluate((audio: HTMLAudioElement) => audio.paused)).toBe(true)
})

test('shows a readable retry if the music asset cannot load', async ({ page }) => {
  await page.route('**/audio/calm-ambient-dreamscape.mp3', route => route.fulfill({ status: 404, body: 'Missing music' }))
  await page.goto('/projects/archive/')
  await page.getByRole('button', { name: 'Play background music' }).click()
  await expect(page.getByRole('status')).toContainText('Music could not play. Please try again.')
  await page.unroute('**/audio/calm-ambient-dreamscape.mp3')
  await page.getByRole('button', { name: 'Play background music' }).click()
  await expect(page.getByRole('button', { name: 'Pause background music' })).toHaveAttribute('aria-pressed', 'true')
})

test('removes the track link and fades controls without stopping music', async ({ page }, testInfo) => {
  await page.goto('/projects/archive/')
  await page.getByRole('button', { name: 'Play background music' }).click()
  await expect(page.getByRole('slider', { name: 'Music volume', exact: true })).toBeVisible()
  await expect(page.locator('.audio-control a')).toHaveCount(0)
  // Move clear of the controls so inactivity can hide the panel.
  await page.mouse.move(5, 800)
  await expect(page.getByRole('slider', { name: 'Music volume', exact: true })).toBeHidden({ timeout: 6000 })
  expect(await page.locator('audio').evaluate((audio: HTMLAudioElement) => audio.paused)).toBe(false)
  const volumeControl = page.getByRole('button', { name: 'Adjust music volume' })
  await expect(volumeControl).toBeVisible()
  if (testInfo.project.name === 'mobile-chrome') await volumeControl.tap()
  else await volumeControl.click()
  expect(await page.locator('audio').evaluate((audio: HTMLAudioElement) => audio.paused)).toBe(false)
  await expect(page.getByRole('slider', { name: 'Music volume', exact: true })).toBeVisible()
  await page.getByRole('slider', { name: 'Music volume', exact: true }).focus()
  await page.waitForTimeout(3200)
  await expect(page.getByRole('slider', { name: 'Music volume', exact: true })).toBeVisible()
})


test('keeps music off on load and unrelated clicks or keys, then starts only from its control', async ({ page }) => {
  await page.addInitScript(() => {
    Object.assign(window, { musicAttempts: 0 })
    HTMLMediaElement.prototype.play = function () {
      const state = window as unknown as { musicAttempts: number }
      state.musicAttempts += 1
      return Promise.resolve()
    }
  })
  const audioRequests: string[] = []
  page.on('request', request => { if (request.url().endsWith('.mp3')) audioRequests.push(request.url()) })
  await page.goto('/projects/archive/')
  await expect(page.getByRole('button', { name: 'Play background music' })).toHaveAttribute('aria-pressed', 'false')
  await page.getByRole('heading', { level: 1 }).click()
  await page.keyboard.press('a')
  await expect(page.locator('audio')).not.toHaveAttribute('src')
  expect(await page.evaluate(() => (window as unknown as { musicAttempts: number }).musicAttempts)).toBe(0)
  expect(audioRequests).toEqual([])
  await page.getByRole('button', { name: 'Play background music' }).click()
  await expect(page.getByRole('button', { name: 'Pause background music' })).toHaveAttribute('aria-pressed', 'true')
  expect(await page.evaluate(() => (window as unknown as { musicAttempts: number }).musicAttempts)).toBe(1)
})
