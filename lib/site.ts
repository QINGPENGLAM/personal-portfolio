import type { Metadata } from 'next'

export const siteConfig = {
  canonicalUrl: 'https://qingpenglam.github.io/personal-portfolio',
  description: 'QingPeng Lam is a software engineer building AI workflows, data systems, and interactive digital products.',
  ogImage: 'https://qingpenglam.github.io/personal-portfolio/og.png',
  title: 'QingPeng Lam · Software Engineer',
}

export function createPageMetadata(title: string, description: string, path: string): Metadata {
  const canonicalPath = path === '/' ? '/' : `${path.replace(/\/$/, '')}/`
  const socialTitle = `${title} · QingPeng Lam`

  return {
    title,
    description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title: socialTitle,
      description,
      images: [{ alt: 'QingPeng Lam software engineering portfolio world', height: 630, url: siteConfig.ogImage, width: 1200 }],
      type: 'website',
      url: canonicalPath,
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [siteConfig.ogImage],
    },
  }
}

export function withBasePath(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`
}
