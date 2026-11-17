import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'
import AboutPage from '@/app/about/page'
import { assistantStories } from '@/data/assistant-stories'
import { assistantQuestionGroups, suggestedAssistantQuestions } from '@/data/assistant-suggestions'
import { assistantCorpus } from '@/data/assistant-corpus'
import { answerPortfolioQuestion } from '@/lib/assistant'
import { askAssistant } from '@/lib/assistant-client'

describe('curated public story choices', () => {
  it('publishes six story sources and groups every question exactly once', () => {
    expect(assistantStories).toHaveLength(6)
    expect(assistantQuestionGroups.map(group => group.label)).toEqual(['About', 'Experience', 'Projects', 'Problem solving & growth'])
    expect(new Set(suggestedAssistantQuestions).size).toBe(suggestedAssistantQuestions.length)
    const html = renderToStaticMarkup(createElement(AboutPage))
    for (const story of assistantStories) {
      expect(suggestedAssistantQuestions).toContain(story.question)
      expect(html).toContain(`id="story-${story.id}"`)
      expect(html).toContain(story.answer.replaceAll('&', '&amp;').replaceAll('>', '&gt;').replaceAll('<', '&lt;').replaceAll('"', '&quot;').replaceAll("'", '&#x27;'))
      const result = answerPortfolioQuestion(story.question)
      expect(result.answer).toBe(story.answer)
      expect(result.links[0].href).toBe(`/about#story-${story.id}`)
      expect(assistantCorpus.some(source => source.href === result.links[0].href && source.text.includes(story.answer))).toBe(true)
    }
  })

  it('answers all premade choices locally even with a configured AI endpoint', async () => {
    const fetcher = vi.fn()
    for (const question of suggestedAssistantQuestions) {
      const answer = await askAssistant(question, [], 'https://assistant.test', undefined, fetcher)
      expect(answer.mode, question).toBe('local')
      expect(answer.available, question).toBe(true)
    }
    expect(fetcher).not.toHaveBeenCalled()
  })
})
