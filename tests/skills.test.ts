import { describe, expect, it } from 'vitest'
import { githubRepositories } from '@/data/github-repositories'
import { skillRepositorySnapshot } from '@/data/skill-evidence'
import { skillGroups } from '@/data/skills'
import { getSkillEvidence } from '@/lib/skills'

const titles = (skill: string) => getSkillEvidence(skill).map(item => item.title)

describe('sourced skill evidence', () => {
  it('covers every archived repository exactly once with a dated language snapshot', () => {
    const names = skillRepositorySnapshot.repositories.map(item => item.name)
    expect(new Set(names).size).toBe(names.length)
    expect([...names].sort()).toEqual(githubRepositories.map(item => item.name).sort())
    expect(skillRepositorySnapshot.checkedAt).toBe('2026-10-25')
  })
  it('connects C++ to the three public systems projects', () => {
    expect(titles('C++')).toEqual(expect.arrayContaining(['myOwnRedis', 'Raytracer', 'project1']))
  })
  it('includes secondary C# language evidence without equating shaders with authored skill', () => {
    expect(titles('C#')).toEqual(expect.arrayContaining(['cube-game', 'random-spawn-dodge', 'arthistory-RPG']))
    expect(getSkillEvidence('ShaderLab')).toEqual([])
  })
  it('combines HTML/CSS matches and deduplicates each repository', () => {
    const evidence = getSkillEvidence('HTML/CSS')
    expect(titles('HTML/CSS')).toContain('client_project_w25')
    expect(new Set(evidence.map(item => item.id)).size).toBe(evidence.length)
  })
  it('adds supported skills and normalizes whitespace/case without fuzzy matches', () => {
    expect(skillGroups.flatMap(group => group.items)).toEqual(expect.arrayContaining(['TypeScript', 'Unity', 'Next.js']))
    expect(getSkillEvidence('  c++ ')).toEqual(getSkillEvidence('C++'))
    expect(getSkillEvidence('Java')).toEqual([])
    expect(getSkillEvidence('anything')).toEqual([])
  })
  it('merges a case study with its source repository', () => {
    const evidence = getSkillEvidence('JavaScript')
    expect(evidence.filter(item => item.href === '/projects/immich-ai-photo-search')).toHaveLength(1)
    expect(titles('JavaScript')).not.toContain('project-0006-immich-ai-photo-search-mvp')
    expect(evidence.find(item => item.href === '/projects/immich-ai-photo-search')).toHaveProperty('codeUrl', 'https://github.com/QINGPENGLAM/project-0006-immich-ai-photo-search-mvp')
  })
  it('uses explicit source evidence for frameworks and concepts', () => {
    expect(titles('React')).toEqual(expect.arrayContaining(['personal-portfolio', 'FITgym', 'NASA-REACT', 'todolist']))
    expect(titles('Embeddings')).toContain('Immich AI Photo Search')
    expect(titles('Model Serving')).toContain('DevDoctor')
    expect(titles('Unit Testing')).toContain('DevDoctor')
    expect(titles('React')).not.toContain('Calculator')
    expect(titles('Unity')).not.toContain('UnityKitchenGame')
  })
  it('provides a reason and an inspectable source for every connection', () => {
    for (const skill of skillGroups.flatMap(group => group.items)) {
      for (const item of getSkillEvidence(skill)) {
        expect(item.reason.length).toBeGreaterThan(10)
        expect(item.sourceUrl).toMatch(/^(https:\/\/github\.com\/QINGPENGLAM\/|\/projects\/|\/experience#)/)
        if (item.kind === 'repository') expect(githubRepositories.some(repo => repo.codeUrl === item.href)).toBe(true)
      }
    }
  })
  it('keeps language data separate from framework and proficiency claims', () => {
    const item = getSkillEvidence('C++').find(item => item.title === 'myOwnRedis')!
    expect(item.reason).toContain('GitHub reports C++')
    expect(item.checkedAt).toBe('2026-10-25')
    expect(getSkillEvidence('PyTorch')).toEqual([])
    expect(getSkillEvidence('TensorFlow')).toEqual([])
  })
})
