import { worldTourStopSchema, type WorldTourStop } from './schemas'

const tourStopsInput = [
  {
    id: 'identity',
    eyebrow: '01 · Connected identity',
    title: 'A portfolio built like a system.',
    description: 'The central AI core links engineering work, professional experience, technical skills, and the human story behind them.',
    href: '/about',
    actionLabel: 'Meet QingPeng',
    landmarkId: null,
    cameraTarget: { position: [0, 2.65, 0], cameraOffset: [0, 3.8, 10.5] },
    accent: '#72e6ff',
  },
  {
    id: 'projects',
    eyebrow: '02 · Selected systems',
    title: 'Engineering evidence comes first.',
    description: 'Project landmarks open evidence-backed case studies covering architecture, tradeoffs, testing, and verified outcomes.',
    href: '/projects',
    actionLabel: 'View project case studies',
    landmarkId: 'projects',
    cameraTarget: { position: [-8, 0, -4], cameraOffset: [6, 4.4, 7] },
    accent: '#8f7cff',
  },
  {
    id: 'systems',
    eyebrow: '03 · Technical toolkit',
    title: 'Skills stay connected to proof.',
    description: 'The workshop maps technologies to the projects and roles where they appear instead of relying on arbitrary proficiency scores.',
    href: '/skills',
    actionLabel: 'Explore skill evidence',
    landmarkId: 'skills',
    cameraTarget: { position: [-10, 0, 3], cameraOffset: [6.4, 4.6, 7.2] },
    accent: '#43d9d0',
  },
  {
    id: 'journey',
    eyebrow: '04 · Professional journey',
    title: 'A clear timeline, with deeper detail nearby.',
    description: 'Experience, education, and major projects remain easy to scan while expandable dossiers preserve the technical context.',
    href: '/experience',
    actionLabel: 'Open the timeline',
    landmarkId: 'experience',
    cameraTarget: { position: [8, 0, -5], cameraOffset: [6.5, 5.4, 7.5] },
    accent: '#72e6ff',
  },
  {
    id: 'connect',
    eyebrow: '05 · Open channel',
    title: 'The world ends with a simple next step.',
    description: 'Recruiters can leave the 3D experience at any time, download the résumé, or use direct contact information without navigating a maze.',
    href: '/contact',
    actionLabel: 'Start a conversation',
    landmarkId: 'contact',
    cameraTarget: { position: [10, 0, 8], cameraOffset: [5.8, 4.4, 6.8] },
    accent: '#ff8bd8',
  },
] satisfies WorldTourStop[]

export const worldTourStops = worldTourStopSchema.array().min(1).parse(tourStopsInput)
export type WorldTourStopId = WorldTourStop['id']

export function getWorldTourStop(id: string | null) {
  return worldTourStops.find((stop) => stop.id === id) ?? null
}
