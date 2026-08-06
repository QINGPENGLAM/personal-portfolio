import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { AnalyticsListener } from '@/components/analytics/AnalyticsListener'
import { AudioProvider } from '@/components/audio/AudioProvider'
import { PortfolioAssistant } from '@/components/chat/PortfolioAssistant'
import { EasterEggLayer } from '@/components/easter-egg/EasterEggLayer'
import { SiteHeader } from '@/components/SiteHeader'
import { profile } from '@/data/profile'
import { siteConfig } from '@/lib/site'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.canonicalUrl),
  title: {
    default: siteConfig.title,
    template: `%s · ${profile.name}`,
  },
  description: siteConfig.description,
  applicationName: 'QingPeng Lam Portfolio',
  authors: [{ name: profile.name, url: siteConfig.canonicalUrl }],
  alternates: { canonical: '/' },
  category: 'technology',
  creator: profile.name,
  keywords: ['software engineer', 'AI systems', 'backend engineering', 'data engineering', 'developer tools', 'interactive portfolio'],
  manifest: `${siteConfig.canonicalUrl}/manifest.webmanifest`,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    images: [{ alt: 'QingPeng Lam software engineering portfolio world', height: 630, url: siteConfig.ogImage, width: 1200 }],
    locale: 'en_US',
    siteName: 'QingPeng Lam Portfolio',
    type: 'website',
    url: '/',
  },
  referrer: 'strict-origin-when-cross-origin',
  robots: {
    follow: true,
    index: true,
    googleBot: { follow: true, index: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark light',
  themeColor: [
    { color: '#030711', media: '(prefers-color-scheme: dark)' },
    { color: '#eaf2fb', media: '(prefers-color-scheme: light)' },
  ],
}

const personStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'University of Michigan' },
  sameAs: [profile.githubUrl, profile.linkedinUrl],
  url: siteConfig.canonicalUrl,
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html data-scroll-behavior="smooth" lang="en" suppressHydrationWarning>
      <body>
        <AudioProvider>
          <AnalyticsListener />
          <a className="skip-link" href="#main-content">Skip to content</a>
          <SiteHeader />
          <div id="main-content" tabIndex={-1}>{children}</div>
          <footer className="site-footer">
            <p>Designed as a clear portfolio first, an explorable world second.</p>
            <p>© {new Date().getFullYear()} {profile.name}</p>
          </footer>
          <PortfolioAssistant />
          <EasterEggLayer />
        </AudioProvider>
        <noscript><div className="noscript-note">JavaScript is disabled. The recruiter portfolio, direct routes, résumé, email, and project content remain available; the 3D world and optional assistant require JavaScript.</div></noscript>
        <script dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData).replace(/</g, '\\u003c') }} type="application/ld+json" />
      </body>
    </html>
  )
}
