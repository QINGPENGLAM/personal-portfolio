import { Earthrise } from '@/components/selene/Earthrise'
import { ProjectReel } from '@/components/selene/ProjectReel'
import { RecruiterView } from '@/components/RecruiterView'
import { projects } from '@/data/projects'

export default function HomePage() {
  const reelProjects = projects.map(project => ({
    id: project.id, slug: project.slug, title: project.title,
    description: project.shortDescription, image: project.screenshots[0] ?? null,
    alt: project.screenshotAlt ?? `${project.title} project illustration`,
    tags: project.technologies.slice(0, 3), accent: project.landmark.accent,
  }))
  return <main><Earthrise /><ProjectReel projects={reelProjects} /><RecruiterView /></main>
}
