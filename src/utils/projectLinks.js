export function getProjectLinks(project) {
  if (project?.links?.length) {
    return project.links
  }

  const links = []

  if (project?.repoUrl) {
    links.push({
      href: project.repoUrl,
      label: project.repoLabel ?? 'Code',
    })
  }

  if (project?.liveUrl) {
    links.push({
      href: project.liveUrl,
      label: project.liveLabel ?? 'Live Page',
    })
  }

  return links
}
