import { expect, test } from '@playwright/test'
import { assistantStories } from '../data/assistant-stories'

test('browses story topics, answers locally and links to the published story', async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  let aiRequests = 0
  await page.route('**/*', route => {
    if (/openrouter\.ai|portfolio-assistant\.[^/]+\.workers\.dev|assistant\.test/.test(route.request().url())) {
      aiRequests++
      return route.abort()
    }
    return route.continue()
  })
  await page.goto('/personal-portfolio/')
  await page.getByRole('button', { name: 'Ask portfolio', exact: true }).click()
  const topic = page.getByRole('group', { name: 'Question topics' })
  await expect(topic.getByRole('button', { name: 'All', exact: true })).toHaveAttribute('aria-pressed', 'true')
  await topic.getByRole('button', { name: 'Problem solving & growth', exact: true }).click()
  await expect(topic.getByRole('button', { name: 'Problem solving & growth', exact: true })).toHaveAttribute('aria-pressed', 'true')
  await expect(page.getByRole('button', { name: 'Who is QingPeng?', exact: true })).toHaveCount(0)
  const story = assistantStories.find(story => story.id === 'gmail-pagination')!
  const choice = page.getByRole('button', { name: story.question, exact: true })
  await choice.scrollIntoViewIfNeeded()
  await expect(page.getByRole('textbox')).toBeInViewport()
  await page.screenshot({ path: `/tmp/story-choices-${testInfo.project.name}.png` })
  await choice.click()
  await expect(page.locator('.assistant-messages article').last()).toContainText(story.answer)
  await expect(page.getByText('Prepared answer · portfolio sources', { exact: true })).toBeVisible()
  const source = page.getByRole('link', { name: story.title, exact: false })
  await expect(source).toHaveAttribute('href', `/personal-portfolio/about/#story-${story.id}`)
  expect(aiRequests).toBe(0)
  await source.click()
  await expect(page.locator(`#story-${story.id}`)).toContainText(story.answer)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
})
