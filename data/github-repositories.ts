import { githubRepositorySchema } from './schemas'

export const githubRepositorySnapshot = {
  capturedAt: '2026-08-06',
  liveCheckedAt: '2026-08-06',
  profileUrl: 'https://github.com/QINGPENGLAM',
  note: 'Public repository metadata captured from the GitHub profile. Exact GitHub Pages URLs were checked independently; only HTTP 200 HTML responses are published as live demos.',
} as const

const verifiedLiveDeployments = {
  'personal-portfolio': { url: 'https://qingpenglam.github.io/personal-portfolio/', title: 'QingPeng Lam | Portfolio' },
  'project-0010-n8n-workflow-hub-demo': { url: 'https://qingpenglam.github.io/project-0010-n8n-workflow-hub-demo/', title: 'project-0010-n8n-workflow-hub-demo' },
  'project-0007-personal-ai-workbench': { url: 'https://qingpenglam.github.io/project-0007-personal-ai-workbench/', title: 'project-0007-personal-ai-workbench' },
  'project-0006-immich-ai-photo-search-mvp': { url: 'https://qingpenglam.github.io/project-0006-immich-ai-photo-search-mvp/', title: 'project-0006-immich-ai-photo-search-mvp' },
  'project-0008-linear-clock-dial-lab': { url: 'https://qingpenglam.github.io/project-0008-linear-clock-dial-lab/', title: 'project-0008-linear-clock-dial-lab' },
  HandMotionMusic: { url: 'https://qingpenglam.github.io/HandMotionMusic/', title: 'Palm Synth Blaster' },
  AutoPoster: { url: 'https://qingpenglam.github.io/AutoPoster/', title: 'Generative Poster Factory' },
  Portfolio: { url: 'https://qingpenglam.github.io/Portfolio/', title: 'QingPeng Lam | Portfolio' },
  client_project_w25: { url: 'https://qingpenglam.github.io/client_project_w25/', title: 'Student Success Portal' },
  'hw6-2025': { url: 'https://qingpenglam.github.io/hw6-2025/', title: 'hw7-2022 | hw6-2025' },
  'dicussion9-JS': { url: 'https://qingpenglam.github.io/dicussion9-JS/', title: 'University of Michigan Football Activity' },
  hw5_2025: { url: 'https://qingpenglam.github.io/hw5_2025/', title: 'hw5-flex | hw5_2025' },
  'discussion8-form': { url: 'https://qingpenglam.github.io/discussion8-form/', title: 'Submit Recommendations' },
  hw3_2025: { url: 'https://qingpenglam.github.io/hw3_2025/', title: 'Newer Company Inc.' },
  'hw2-w25': { url: 'https://qingpenglam.github.io/hw2-w25/', title: "4 Uno Rules You're Playing Wrong" },
  'hw1-w25': { url: 'https://qingpenglam.github.io/hw1-w25/', title: 'About Me' },
  discussion1: { url: 'https://qingpenglam.github.io/discussion1/', title: 'discussion1' },
} satisfies Record<string, { url: string; title: string }>

const repositoryMetadata = [
  { name: 'personal-portfolio', codeUrl: 'https://github.com/QINGPENGLAM/personal-portfolio', description: null, primaryLanguage: 'JavaScript', pushedAt: '2026-07-08', hasPages: true },
  { name: 'project-0010-n8n-workflow-hub-demo', codeUrl: 'https://github.com/QINGPENGLAM/project-0010-n8n-workflow-hub-demo', description: null, primaryLanguage: 'HTML', pushedAt: '2026-07-06', hasPages: true },
  { name: 'project-0009-montage-product-video-generator', codeUrl: 'https://github.com/QINGPENGLAM/project-0009-montage-product-video-generator', description: null, primaryLanguage: null, pushedAt: '2026-07-06', hasPages: true },
  { name: 'project-0007-personal-ai-workbench', codeUrl: 'https://github.com/QINGPENGLAM/project-0007-personal-ai-workbench', description: null, primaryLanguage: null, pushedAt: '2026-07-06', hasPages: true },
  { name: 'project-0006-immich-ai-photo-search-mvp', codeUrl: 'https://github.com/QINGPENGLAM/project-0006-immich-ai-photo-search-mvp', description: null, primaryLanguage: 'JavaScript', pushedAt: '2026-07-06', hasPages: true },
  { name: 'project-0008-linear-clock-dial-lab', codeUrl: 'https://github.com/QINGPENGLAM/project-0008-linear-clock-dial-lab', description: null, primaryLanguage: 'JavaScript', pushedAt: '2026-06-30', hasPages: true },
  { name: 'AI-Town', codeUrl: 'https://github.com/QINGPENGLAM/AI-Town', description: null, primaryLanguage: 'JavaScript', pushedAt: '2026-06-18', hasPages: true },
  { name: 'QINGPENGLAM', codeUrl: 'https://github.com/QINGPENGLAM/QINGPENGLAM', description: null, primaryLanguage: null, pushedAt: '2026-06-13', hasPages: false },
  { name: 'HandMotionMusic', codeUrl: 'https://github.com/QINGPENGLAM/HandMotionMusic', description: null, primaryLanguage: 'JavaScript', pushedAt: '2026-06-13', hasPages: true },
  { name: 'AutoPoster', codeUrl: 'https://github.com/QINGPENGLAM/AutoPoster', description: null, primaryLanguage: 'JavaScript', pushedAt: '2026-06-13', hasPages: true },
  { name: 'Portfolio', codeUrl: 'https://github.com/QINGPENGLAM/Portfolio', description: null, primaryLanguage: 'JavaScript', pushedAt: '2026-04-11', hasPages: true },
  { name: 'PersonalPortfolio', codeUrl: 'https://github.com/QINGPENGLAM/PersonalPortfolio', description: null, primaryLanguage: null, pushedAt: '2026-04-11', hasPages: false },
  { name: 'myOwnRedis', codeUrl: 'https://github.com/QINGPENGLAM/myOwnRedis', description: null, primaryLanguage: 'C++', pushedAt: '2025-11-21', hasPages: false },
  { name: 'Raytracer', codeUrl: 'https://github.com/QINGPENGLAM/Raytracer', description: null, primaryLanguage: 'C++', pushedAt: '2025-11-09', hasPages: false },
  { name: 'UnityKitchenGame', codeUrl: 'https://github.com/QINGPENGLAM/UnityKitchenGame', description: null, primaryLanguage: null, pushedAt: '2025-05-08', hasPages: false },
  { name: 'client_project_w25', codeUrl: 'https://github.com/QINGPENGLAM/client_project_w25', description: null, primaryLanguage: 'HTML', pushedAt: '2025-03-28', hasPages: true },
  { name: 'hw6-2025', codeUrl: 'https://github.com/QINGPENGLAM/hw6-2025', description: null, primaryLanguage: 'JavaScript', pushedAt: '2025-03-24', hasPages: true },
  { name: 'dicussion9-JS', codeUrl: 'https://github.com/QINGPENGLAM/dicussion9-JS', description: null, primaryLanguage: 'HTML', pushedAt: '2025-03-19', hasPages: true },
  { name: 'hw5_2025', codeUrl: 'https://github.com/QINGPENGLAM/hw5_2025', description: null, primaryLanguage: 'CSS', pushedAt: '2025-03-16', hasPages: true },
  { name: 'discussion8-form', codeUrl: 'https://github.com/QINGPENGLAM/discussion8-form', description: null, primaryLanguage: 'CSS', pushedAt: '2025-03-12', hasPages: true },
  { name: 'hw3_2025', codeUrl: 'https://github.com/QINGPENGLAM/hw3_2025', description: null, primaryLanguage: 'CSS', pushedAt: '2025-02-12', hasPages: true },
  { name: 'hw2-w25', codeUrl: 'https://github.com/QINGPENGLAM/hw2-w25', description: null, primaryLanguage: 'CSS', pushedAt: '2025-01-23', hasPages: true },
  { name: 'hw1-w25', codeUrl: 'https://github.com/QINGPENGLAM/hw1-w25', description: 'initial', primaryLanguage: 'CSS', pushedAt: '2025-01-15', hasPages: true },
  { name: 'discussion1', codeUrl: 'https://github.com/QINGPENGLAM/discussion1', description: null, primaryLanguage: null, pushedAt: '2025-01-15', hasPages: true },
  { name: 'FITgym', codeUrl: 'https://github.com/QINGPENGLAM/FITgym', description: null, primaryLanguage: 'JavaScript', pushedAt: '2024-11-15', hasPages: false },
  { name: 'NASA-REACT', codeUrl: 'https://github.com/QINGPENGLAM/NASA-REACT', description: null, primaryLanguage: 'JavaScript', pushedAt: '2024-11-14', hasPages: false },
  { name: 'todolist', codeUrl: 'https://github.com/QINGPENGLAM/todolist', description: null, primaryLanguage: 'JavaScript', pushedAt: '2024-11-14', hasPages: false },
  { name: 'project1', codeUrl: 'https://github.com/QINGPENGLAM/project1', description: null, primaryLanguage: 'C++', pushedAt: '2024-09-16', hasPages: false },
  { name: 'Econbusiness', codeUrl: 'https://github.com/QINGPENGLAM/Econbusiness', description: null, primaryLanguage: 'HTML', pushedAt: '2023-06-09', hasPages: false },
  { name: 'XIWENPORT', codeUrl: 'https://github.com/QINGPENGLAM/XIWENPORT', description: null, primaryLanguage: 'HTML', pushedAt: '2023-05-17', hasPages: false },
  { name: 'gov-project', codeUrl: 'https://github.com/QINGPENGLAM/gov-project', description: null, primaryLanguage: 'HTML', pushedAt: '2023-02-17', hasPages: false },
  { name: 'arthistory-RPG', codeUrl: 'https://github.com/QINGPENGLAM/arthistory-RPG', description: null, primaryLanguage: 'C#', pushedAt: '2023-01-22', hasPages: true },
  { name: 'topicshare', codeUrl: 'https://github.com/QINGPENGLAM/topicshare', description: null, primaryLanguage: 'HTML', pushedAt: '2022-12-27', hasPages: false },
  { name: 'E-Commerce', codeUrl: 'https://github.com/QINGPENGLAM/E-Commerce', description: null, primaryLanguage: 'HTML', pushedAt: '2022-12-27', hasPages: false },
  { name: 'food-ordering-', codeUrl: 'https://github.com/QINGPENGLAM/food-ordering-', description: null, primaryLanguage: 'JavaScript', pushedAt: '2022-12-23', hasPages: false },
  { name: 'cube-game', codeUrl: 'https://github.com/QINGPENGLAM/cube-game', description: null, primaryLanguage: 'ShaderLab', pushedAt: '2022-12-23', hasPages: false },
  { name: 'random-spawn-dodge', codeUrl: 'https://github.com/QINGPENGLAM/random-spawn-dodge', description: null, primaryLanguage: 'ShaderLab', pushedAt: '2022-12-21', hasPages: false },
  { name: 'Tic-Tac-Toe', codeUrl: 'https://github.com/QINGPENGLAM/Tic-Tac-Toe', description: null, primaryLanguage: 'JavaScript', pushedAt: '2022-12-19', hasPages: false },
  { name: 'Calculator', codeUrl: 'https://github.com/QINGPENGLAM/Calculator', description: null, primaryLanguage: 'JavaScript', pushedAt: '2022-12-19', hasPages: false },
]

export const githubRepositories = githubRepositorySchema.array().parse(repositoryMetadata.map((repository) => {
  const liveDeployment = verifiedLiveDeployments[repository.name as keyof typeof verifiedLiveDeployments]
  return {
    ...repository,
    liveUrl: liveDeployment?.url ?? null,
    liveTitle: liveDeployment?.title ?? null,
    liveStatus: liveDeployment ? 'verified' : repository.hasPages ? 'unavailable' : 'not-configured',
    liveCheckedAt: repository.hasPages ? githubRepositorySnapshot.liveCheckedAt : null,
  }
}))

export const githubRepositoryLanguages = [
  'All',
  ...Array.from(new Set(githubRepositories.map((repository) => repository.primaryLanguage ?? 'Not reported'))).sort(),
] as const
