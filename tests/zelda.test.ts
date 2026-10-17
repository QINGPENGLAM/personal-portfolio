import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { ProjectDownload } from '@/components/ProjectDownload'
import { getProjectBySlug } from '@/lib/projects'
import { timelineItems } from '@/data/timeline'
import { projectSchema } from '@/data/schemas'

describe('Zelda playable build', () => {
  it('publishes the supplied contributions without a source repository', () => {
    const project = getProjectBySlug('zelda-recreation')
    expect(project).not.toBeNull()
    expect(project?.directContributions).toHaveLength(14)
    expect(project?.githubUrl).toBeNull()
    expect(timelineItems.some((item) => item.id === 'project-zelda-recreation')).toBe(false)
    expect(project?.downloadUrl).toBe('https://github.com/QINGPENGLAM/zelda-p1-downloads/releases/download/v1.0/Zelda-P1-Game.zip')
  })

  it('keeps the placeholder non-navigable', () => {
    const html = renderToStaticMarkup(createElement(ProjectDownload, { url: 'GAME_DOWNLOAD_URL' }))
    expect(html).toContain('disabled')
    expect(html).toContain('Download Game')
    expect(html).not.toContain('href=')
  })

  it('accepts the P2 placeholder but never turns it into a link', () => {
    const html = renderToStaticMarkup(createElement(ProjectDownload, { url: 'P2_GAME_DOWNLOAD_URL' }))
    expect(html).toContain('disabled')
    expect(html).not.toContain('href=')
    const project = getProjectBySlug('zelda-recreation')
    expect(projectSchema.safeParse({ ...project, downloadUrl: 'P2_GAME_DOWNLOAD_URL' }).success).toBe(true)
  })

  it('links the playable release when configured and rejects source repository URLs', () => {
    const url = 'https://github.com/example/game-builds/releases/download/v1/game.zip'
    expect(renderToStaticMarkup(createElement(ProjectDownload, { url }))).toContain(`href="${url}"`)
    const project = getProjectBySlug('zelda-recreation')
    expect(projectSchema.safeParse({ ...project, downloadUrl: url }).success).toBe(true)
    expect(projectSchema.safeParse({ ...project, downloadUrl: 'https://github.com/example/unity-source' }).success).toBe(false)
  })
})
