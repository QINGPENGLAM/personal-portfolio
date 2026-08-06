import type { MetadataRoute } from 'next'
import { directRoutes } from '@/data/navigation'
import { projects } from '@/data/projects'
import { siteConfig } from '@/lib/site'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const primaryRoutes: MetadataRoute.Sitemap = directRoutes.map((route) => ({
    url: `${siteConfig.canonicalUrl}${route === '/' ? '' : route}`,
    changeFrequency: route === '/' ? 'monthly' : 'yearly',
    priority: route === '/' ? 1 : 0.7,
  }))

  return [
    ...primaryRoutes,
    {
      url: `${siteConfig.canonicalUrl}/projects/archive/`,
      changeFrequency: 'monthly' as const,
      priority: 0.65,
    },
    {
      url: `${siteConfig.canonicalUrl}/projects/insights/`,
      changeFrequency: 'monthly' as const,
      priority: 0.65,
    },
    ...projects.map((project) => ({
      url: `${siteConfig.canonicalUrl}/projects/${project.slug}/`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
