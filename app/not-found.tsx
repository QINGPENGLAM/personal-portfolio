import Link from 'next/link'

export default function NotFound() {
  return <main className="not-found"><p className="eyebrow">404 · Landmark not found</p><h1>This path has not been built yet.</h1><p>Return to the recruiter view or choose another part of the world.</p><div><Link className="button button-primary" href="/">Return home</Link><Link className="button button-secondary" href="/world">Open world map</Link></div></main>
}
