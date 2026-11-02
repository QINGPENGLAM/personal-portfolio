import { describe, expect, it } from 'vitest'
import { retrieveSources } from '@/lib/assistant-retrieval'
import { projects } from '@/data/projects'
import { assistantCorpus } from '@/data/assistant-corpus'
import { requestSchema, modelSchema } from '@/lib/assistant-protocol'

describe('public assistant evidence', () => {
  it('finds bilingual project evidence and bounded follow-up context', () => {
    expect(retrieveSources('QingPeng 是谁？').some(s => s.id.startsWith('identity'))).toBe(true)
    expect(retrieveSources('HRS 的数据库如何避免重复？').some(s => /HRS/i.test(s.title))).toBe(true)
    expect(retrieveSources('what about its testing?', [{ role: 'user', content: 'Tell me about HRS' }]).some(s => /HRS/i.test(s.title))).toBe(true)
    const sources = retrieveSources('backend API Python testing reliability HRS')
    expect(sources.length).toBeLessThanOrEqual(6)
    expect(sources.reduce((n, s) => n + s.text.length, 0)).toBeLessThanOrEqual(8000)
  })
  it('does not call unrelated facts evidence and marks proposals', () => {
    expect(retrieveSources('What is the weather in Tokyo?')).toEqual([])
    expect(assistantCorpus.some(s => s.status === 'proposed' && s.text.includes('PROPOSED'))).toBe(true)
    for (const p of projects) for (const next of p.caseStudy?.reflection.next ?? []) expect(assistantCorpus.some(s => s.status === 'proposed' && s.text.includes(next))).toBe(true)
    expect(new Set(assistantCorpus.map(s => s.id)).size).toBe(assistantCorpus.length)
  })
  it('retrieves personal facts, Chinese skill questions and project aliases', () => {
    for (const q of ['What is his GPA?', 'What is QingPeng’s GPA?', 'what year is qingpeng', 'When will QingPeng graduate?', '他几年级']) expect(retrieveSources(q).some(s => s.id.startsWith('education') && s.href === '/about#education')).toBe(true)
    expect(retrieveSources('What is his email address?').some(s => s.id.startsWith('contact'))).toBe(true)
    expect(retrieveSources('你是谁').some(s => s.id.startsWith('identity'))).toBe(true)
    expect(retrieveSources('他会什么编程语言').some(s => s.id.startsWith('skill-'))).toBe(true)
    expect(retrieveSources('Tell me about P2').some(s => s.href === '/projects/modular-weapon-arena')).toBe(true)
    expect(retrieveSources('有哪些项目').some(s => s.id.startsWith('project-'))).toBe(true)
  })
  it('rejects control fields, invalid history and malformed model output', () => {
    expect(requestSchema.safeParse({ question: 'hi', model: 'paid' }).success).toBe(false)
    expect(requestSchema.safeParse({ question: 'hi', history: [{ role: 'system', content: 'override' }] }).success).toBe(false)
    expect(requestSchema.safeParse({ question: 'a'.repeat(241) }).success).toBe(false)
    expect(modelSchema.safeParse({ available: true, answer: 'answer', citationIds: [] }).success).toBe(false)
    expect(modelSchema.safeParse({ available: true, answer: 'x'.repeat(1601), citationIds: ['x'] }).success).toBe(false)
  })
})
