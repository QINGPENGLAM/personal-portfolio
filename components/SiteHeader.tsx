'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navigation } from '@/data/navigation'
import { profile } from '@/data/profile'
import { AudioToggle } from './audio/AudioToggle'
import { ThemeToggle } from './ThemeToggle'

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="site-header">
      <Link aria-label="QingPeng Lam home" className="brand" href="/">
        <span aria-hidden="true" className="brand-mark">QL</span>
        <span className="brand-copy">
          <strong>{profile.name}</strong>
          <span>{profile.role}</span>
        </span>
      </Link>

      <nav aria-label="Primary navigation" className="desktop-navigation">
        {navigation.map((item) => (
          <Link aria-current={pathname === item.href ? 'page' : undefined} href={item.href} key={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="header-actions">
        <Link className="quick-view-link" data-analytics-event="recruiter_view_opened" href="/#quick-view">Recruiter View</Link>
        <AudioToggle />
        <ThemeToggle />
      </div>

      <details className="mobile-navigation">
        <summary aria-label="Open navigation">Menu</summary>
        <nav aria-label="Mobile navigation">
          {navigation.map((item) => (
            <Link href={item.href} key={item.href}>{item.label}</Link>
          ))}
          <Link href="/world">Enter world</Link>
        </nav>
      </details>
    </header>
  )
}
