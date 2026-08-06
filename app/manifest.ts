import type { MetadataRoute } from 'next'
import { siteConfig, withBasePath } from '@/lib/site'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'QingPeng Lam · Software Engineer',
    short_name: 'QingPeng Lam',
    description: siteConfig.description,
    display: 'standalone',
    background_color: '#030711',
    theme_color: '#07101e',
    start_url: withBasePath('/'),
  }
}
