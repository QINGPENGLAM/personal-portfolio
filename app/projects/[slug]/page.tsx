import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CaseStudyContent } from '@/components/case-study/CaseStudyContent'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'
import { getProjectBySlug } from '@/lib/projects'
import { siteConfig } from '@/lib/site'

export const dynamicParams = false

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const project = getProjectBySlug((await params).slug)
  if (!project) return { title: 'Project not found' }

  return {
    title: `${project.title} Case Study`,
    description: project.shortDescription,
    alternates: { canonical: `/projects/${project.slug}/` },
    openGraph: {
      title: `${project.title} · Engineering Case Study`,
      description: project.shortDescription,
      images: [{ alt: `${project.title} engineering case study by QingPeng Lam`, height: 630, url: siteConfig.ogImage, width: 1200 }],
      type: 'article',
      url: `/projects/${project.slug}/`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} · Engineering Case Study`,
      description: project.shortDescription,
      images: [siteConfig.ogImage],
    },
  }
}

export default async function ProjectCaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProjectBySlug((await params).slug)
  if (!project) notFound()

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: project.title,
    description: project.shortDescription,
    author: { '@type': 'Person', name: profile.name, url: siteConfig.canonicalUrl },
    codeRepository: project.githubUrl ?? undefined,
    programmingLanguage: project.technologies,
    url: `${siteConfig.canonicalUrl}/projects/${project.slug}/`,
  }

  return (
    <main className="case-study-page">
      <div className="case-study-page-nav"><Link href="/projects">← All projects</Link><Link href="/world">View project landmarks in the world <span aria-hidden="true">◇</span></Link></div>
      <CaseStudyContent project={project} />
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} type="application/ld+json" />
    </main>
  )
}
