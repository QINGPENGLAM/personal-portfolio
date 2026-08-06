'use client'

import { useState } from 'react'
import { ProjectCard } from '@/components/ProjectCard'
import { filterProjects, projectFocusAreas } from '@/lib/projects'

export function ProjectsExplorer() {
  const [activeFocus, setActiveFocus] = useState('All')
  const filteredProjects = filterProjects(activeFocus)

  return (
    <section aria-labelledby="project-explorer-heading" className="project-explorer">
      <div className="project-filter-heading"><div><p className="eyebrow">Project explorer</p><h2 id="project-explorer-heading">Filter by engineering focus.</h2></div><p aria-live="polite">Showing {filteredProjects.length} of {filterProjects('All').length} case studies.</p></div>
      <div aria-label="Filter projects by focus" className="project-filters" role="group">
        {projectFocusAreas.map((focusArea) => <button aria-pressed={activeFocus === focusArea} key={focusArea} onClick={() => setActiveFocus(focusArea)} type="button">{focusArea}</button>)}
      </div>
      <div className="project-grid page-project-grid">{filteredProjects.map((project) => <ProjectCard key={project.id} project={project} />)}</div>
    </section>
  )
}
