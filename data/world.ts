export type WorldLandmarkKind = 'projects' | 'experience' | 'about' | 'skills' | 'education' | 'resume' | 'contact'
export type WorldPanelKind = Extract<WorldLandmarkKind, 'experience' | 'about' | 'skills' | 'education'>

export type WorldLandmark = {
  id: WorldLandmarkKind
  label: string
  detail: string
  href: string
  position: readonly [number, number, number]
  cameraOffset: readonly [number, number, number]
  accent: string
}

export const worldLandmarks: readonly WorldLandmark[] = [
  {
    id: 'projects',
    label: 'Project District',
    detail: 'Selected engineering systems',
    href: '/projects',
    position: [-8, 0, -4],
    cameraOffset: [6, 4.4, 7],
    accent: '#8f7cff',
  },
  {
    id: 'experience',
    label: 'Experience Tower',
    detail: 'Professional timeline',
    href: '/experience',
    position: [8, 0, -5],
    cameraOffset: [6.5, 5.4, 7.5],
    accent: '#72e6ff',
  },
  {
    id: 'about',
    label: 'About Observatory',
    detail: 'Background and working style',
    href: '/about',
    position: [10, 0, 3],
    cameraOffset: [6, 4.2, 7],
    accent: '#da7dff',
  },
  {
    id: 'skills',
    label: 'Skills Workshop',
    detail: 'Technical toolkit',
    href: '/skills',
    position: [-10, 0, 3],
    cameraOffset: [6.4, 4.6, 7.2],
    accent: '#43d9d0',
  },
  {
    id: 'education',
    label: 'Education Archive',
    detail: 'University of Michigan',
    href: '/about#education',
    position: [-11, 0, 5],
    cameraOffset: [5.4, 4.1, 6.4],
    accent: '#f2c879',
  },
  {
    id: 'resume',
    label: 'Résumé Terminal',
    detail: 'View or download PDF',
    href: '/resume',
    position: [-8, 0, 9],
    cameraOffset: [5.2, 3.8, 6.2],
    accent: '#9cb8ff',
  },
  {
    id: 'contact',
    label: 'Contact Portal',
    detail: 'Start a conversation',
    href: '/contact',
    position: [10, 0, 8],
    cameraOffset: [5.8, 4.4, 6.8],
    accent: '#ff8bd8',
  },
] as const

export function getWorldLandmark(id: WorldLandmarkKind | null) {
  return worldLandmarks.find((landmark) => landmark.id === id) ?? null
}

export const worldPanelIds: readonly WorldPanelKind[] = ['experience', 'about', 'skills', 'education']

export function isWorldPanelKind(id: string | null): id is WorldPanelKind {
  return worldPanelIds.some((panelId) => panelId === id)
}
