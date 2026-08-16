import { githubRepositorySchema } from './schemas'

export const githubRepositorySnapshot = {
  capturedAt: '2026-08-16',
  liveCheckedAt: '2026-08-16',
  profileUrl: 'https://github.com/QINGPENGLAM',
  note: 'Public repository metadata captured from the GitHub profile. Exact GitHub Pages URLs were checked independently; only HTTP 200 HTML responses are published as live demos.',
} as const

const verifiedLiveDeployments = {
  'personal-portfolio': { url: 'https://qingpenglam.github.io/personal-portfolio/', title: 'QingPeng Lam · Software Engineer' },
  'project-0010-n8n-workflow-hub-demo': { url: 'https://qingpenglam.github.io/project-0010-n8n-workflow-hub-demo/', title: 'project-0010-n8n-workflow-hub-demo' },
  'project-0007-personal-ai-workbench': { url: 'https://qingpenglam.github.io/project-0007-personal-ai-workbench/', title: 'project-0007-personal-ai-workbench' },
  'project-0006-immich-ai-photo-search-mvp': { url: 'https://qingpenglam.github.io/project-0006-immich-ai-photo-search-mvp/', title: 'project-0006-immich-ai-photo-search-mvp' },
  'project-0008-linear-clock-dial-lab': { url: 'https://qingpenglam.github.io/project-0008-linear-clock-dial-lab/', title: 'project-0008-linear-clock-dial-lab' },
  HandMotionMusic: { url: 'https://qingpenglam.github.io/HandMotionMusic/', title: 'Palm Synth Blaster' },
  AutoPoster: { url: 'https://qingpenglam.github.io/AutoPoster/', title: 'Generative Poster Factory' },
  'arthistory-RPG': { url: 'https://qingpenglam.github.io/arthistory-RPG/', title: 'Art History RPG | arthistory-RPG' },
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
  { name: 'personal-portfolio', codeUrl: 'https://github.com/QINGPENGLAM/personal-portfolio', description: 'Recruiter-focused Next.js portfolio with validated content, case studies, accessibility, tests, and an optional 3D world.', primaryLanguage: 'TypeScript', pushedAt: '2026-08-11', hasPages: true },
  { name: 'project-0010-n8n-workflow-hub-demo', codeUrl: 'https://github.com/QINGPENGLAM/project-0010-n8n-workflow-hub-demo', description: 'n8n workflow evaluation plus a lightweight no-key link summarizer that writes CSV records and sends macOS notifications.', primaryLanguage: 'HTML', pushedAt: '2026-07-06', hasPages: true },
  { name: 'project-0009-montage-product-video-generator', codeUrl: 'https://github.com/QINGPENGLAM/project-0009-montage-product-video-generator', description: 'Documentation and rendered artifacts from a Next.js and Remotion product-video generation experiment.', primaryLanguage: null, pushedAt: '2026-07-06', hasPages: true },
  { name: 'project-0007-personal-ai-workbench', codeUrl: 'https://github.com/QINGPENGLAM/project-0007-personal-ai-workbench', description: 'Reproducible local Open WebUI PDF RAG evaluation with citations, health checks, and documented limitations.', primaryLanguage: null, pushedAt: '2026-07-06', hasPages: true },
  { name: 'project-0006-immich-ai-photo-search-mvp', codeUrl: 'https://github.com/QINGPENGLAM/project-0006-immich-ai-photo-search-mvp', description: 'Node and Express photo-search MVP with captions, EXIF metadata, embeddings, hybrid retrieval, and SHA-256 deduplication.', primaryLanguage: 'JavaScript', pushedAt: '2026-07-06', hasPages: true },
  { name: 'project-0008-linear-clock-dial-lab', codeUrl: 'https://github.com/QINGPENGLAM/project-0008-linear-clock-dial-lab', description: 'Offline-first evening reflection journal PWA with local storage, search, and optional Supabase snapshot sync.', primaryLanguage: 'JavaScript', pushedAt: '2026-06-30', hasPages: true },
  { name: 'AI-Town', codeUrl: 'https://github.com/QINGPENGLAM/AI-Town', description: 'Local multiplayer NPC social simulation with deterministic story progression and JSON-backed room persistence.', primaryLanguage: 'JavaScript', pushedAt: '2026-06-18', hasPages: true },
  { name: 'QINGPENGLAM', codeUrl: 'https://github.com/QINGPENGLAM/QINGPENGLAM', description: 'GitHub profile README for QingPeng Lam, a software engineering student building AI, web, and interactive systems.', primaryLanguage: null, pushedAt: '2026-06-13', hasPages: false },
  { name: 'HandMotionMusic', codeUrl: 'https://github.com/QINGPENGLAM/HandMotionMusic', description: 'Browser rhythm game controlled with MediaPipe hand gestures, calibration, Web Audio, and mouse fallbacks.', primaryLanguage: 'JavaScript', pushedAt: '2026-06-13', hasPages: true },
  { name: 'AutoPoster', codeUrl: 'https://github.com/QINGPENGLAM/AutoPoster', description: 'Seeded generative poster factory built with p5.js and Vite, with shareable URL state and PNG export.', primaryLanguage: 'JavaScript', pushedAt: '2026-08-11', hasPages: true },
  { name: 'Portfolio', codeUrl: 'https://github.com/QINGPENGLAM/Portfolio', description: 'Legacy React portfolio featuring animated sections, project summaries, and interactive navigation.', primaryLanguage: 'JavaScript', pushedAt: '2026-04-11', hasPages: true },
  { name: 'PersonalPortfolio', codeUrl: 'https://github.com/QINGPENGLAM/PersonalPortfolio', description: 'Archived placeholder for an earlier portfolio setup; current work lives in the personal-portfolio repository.', primaryLanguage: null, pushedAt: '2026-08-11', hasPages: false },
  { name: 'myOwnRedis', codeUrl: 'https://github.com/QINGPENGLAM/myOwnRedis', description: 'Educational C++ Redis-inspired key-value server with nonblocking I/O, TLV messages, hash tables, and AVL trees.', primaryLanguage: 'C++', pushedAt: '2026-08-11', hasPages: false },
  { name: 'Raytracer', codeUrl: 'https://github.com/QINGPENGLAM/Raytracer', description: 'C++ CPU ray tracer with spheres, planes, triangles, boxes, cylinders, shadows, reflection, and refraction.', primaryLanguage: 'C++', pushedAt: '2026-08-11', hasPages: false },
  { name: 'UnityKitchenGame', codeUrl: 'https://github.com/QINGPENGLAM/UnityKitchenGame', description: 'Archived placeholder for a Unity kitchen game; no game source is currently committed.', primaryLanguage: null, pushedAt: '2026-08-11', hasPages: false },
  { name: 'client_project_w25', codeUrl: 'https://github.com/QINGPENGLAM/client_project_w25', description: 'Accessible multi-page University of Michigan student-success resource portal with carousels and a feedback form.', primaryLanguage: 'HTML', pushedAt: '2025-03-28', hasPages: true },
  { name: 'hw6-2025', codeUrl: 'https://github.com/QINGPENGLAM/hw6-2025', description: 'JavaScript custom video-controls exercise with playback, speed, skip, mute, volume, and visual filters.', primaryLanguage: 'JavaScript', pushedAt: '2025-03-24', hasPages: true },
  { name: 'dicussion9-JS', codeUrl: 'https://github.com/QINGPENGLAM/dicussion9-JS', description: 'JavaScript DOM-manipulation course exercise themed around University of Michigan football.', primaryLanguage: 'HTML', pushedAt: '2025-03-19', hasPages: true },
  { name: 'hw5_2025', codeUrl: 'https://github.com/QINGPENGLAM/hw5_2025', description: 'Responsive Flexbox pricing and gallery exercise for a web-development course.', primaryLanguage: 'CSS', pushedAt: '2025-03-16', hasPages: true },
  { name: 'discussion8-form', codeUrl: 'https://github.com/QINGPENGLAM/discussion8-form', description: 'Accessible recommendations form exercise styled with CSS and submitted through Formspree.', primaryLanguage: 'CSS', pushedAt: '2025-03-12', hasPages: true },
  { name: 'hw3_2025', codeUrl: 'https://github.com/QINGPENGLAM/hw3_2025', description: 'Responsive CSS Grid company-layout exercise for a web-development course.', primaryLanguage: 'CSS', pushedAt: '2025-02-12', hasPages: true },
  { name: 'hw2-w25', codeUrl: 'https://github.com/QINGPENGLAM/hw2-w25', description: 'HTML and CSS course exercise explaining four commonly misunderstood Uno rules.', primaryLanguage: 'CSS', pushedAt: '2025-01-23', hasPages: true },
  { name: 'hw1-w25', codeUrl: 'https://github.com/QINGPENGLAM/hw1-w25', description: 'Introductory multi-page personal website built for a web-development course.', primaryLanguage: 'CSS', pushedAt: '2025-01-15', hasPages: true },
  { name: 'discussion1', codeUrl: 'https://github.com/QINGPENGLAM/discussion1', description: 'Archived introductory course repository containing discussion documentation only.', primaryLanguage: null, pushedAt: '2025-01-15', hasPages: true },
  { name: 'FITgym', codeUrl: 'https://github.com/QINGPENGLAM/FITgym', description: 'React and Tailwind workout generator using training split, target muscles, and fitness goals.', primaryLanguage: 'JavaScript', pushedAt: '2024-11-15', hasPages: false },
  { name: 'NASA-REACT', codeUrl: 'https://github.com/QINGPENGLAM/NASA-REACT', description: 'React NASA Astronomy Picture of the Day viewer with API-key configuration and daily local caching.', primaryLanguage: 'JavaScript', pushedAt: '2024-11-14', hasPages: false },
  { name: 'todolist', codeUrl: 'https://github.com/QINGPENGLAM/todolist', description: 'React and Vite todo application with create, edit, delete, completion, and localStorage persistence.', primaryLanguage: 'JavaScript', pushedAt: '2024-11-14', hasPages: false },
  { name: 'project1', codeUrl: 'https://github.com/QINGPENGLAM/project1', description: 'C++ multi-level route solver supporting BFS, DFS, elevators, path reconstruction, and map or list output.', primaryLanguage: 'C++', pushedAt: '2024-09-16', hasPages: false },
  { name: 'Econbusiness', codeUrl: 'https://github.com/QINGPENGLAM/Econbusiness', description: 'Static bracelet storefront prototype with responsive product sections, ratings, and promotional content.', primaryLanguage: 'HTML', pushedAt: '2026-08-11', hasPages: false },
  { name: 'XIWENPORT', codeUrl: 'https://github.com/QINGPENGLAM/XIWENPORT', description: 'Static visual-art portfolio presenting illustration and design projects in a scrolling gallery.', primaryLanguage: 'HTML', pushedAt: '2026-08-11', hasPages: false },
  { name: 'gov-project', codeUrl: 'https://github.com/QINGPENGLAM/gov-project', description: 'Static educational interview project presenting questions, responses, and a summary about the American Dream.', primaryLanguage: 'HTML', pushedAt: '2026-08-11', hasPages: false },
  { name: 'arthistory-RPG', codeUrl: 'https://github.com/QINGPENGLAM/arthistory-RPG', description: 'Unity third-person art-history RPG prototype with navigation, combat, inventory, equipment, items, and dialogue.', primaryLanguage: 'C#', pushedAt: '2026-08-11', hasPages: true },
  { name: 'topicshare', codeUrl: 'https://github.com/QINGPENGLAM/topicshare', description: 'Static educational reference site with notes on math, economics, SAT preparation, C++, and computer science.', primaryLanguage: 'HTML', pushedAt: '2026-08-11', hasPages: false },
  { name: 'E-Commerce', codeUrl: 'https://github.com/QINGPENGLAM/E-Commerce', description: 'Static multi-page fashion storefront prototype with responsive navigation, product galleries, cart, and account layouts.', primaryLanguage: 'HTML', pushedAt: '2026-08-11', hasPages: false },
  { name: 'food-ordering-', codeUrl: 'https://github.com/QINGPENGLAM/food-ordering-', description: 'Vanilla JavaScript food-ordering UI with cuisine filters, in-memory cart, quantities, totals, and responsive layout.', primaryLanguage: 'JavaScript', pushedAt: '2026-08-11', hasPages: false },
  { name: 'cube-game', codeUrl: 'https://github.com/QINGPENGLAM/cube-game', description: 'Unity 3D cube runner with physics movement, obstacle collisions, level progression, and distance scoring.', primaryLanguage: 'ShaderLab', pushedAt: '2026-08-11', hasPages: false },
  { name: 'random-spawn-dodge', codeUrl: 'https://github.com/QINGPENGLAM/random-spawn-dodge', description: 'Unity 2D dodge prototype with safe-lane obstacle generation, increasing fall speed, and time-based scoring.', primaryLanguage: 'ShaderLab', pushedAt: '2026-08-11', hasPages: false },
  { name: 'Tic-Tac-Toe', codeUrl: 'https://github.com/QINGPENGLAM/Tic-Tac-Toe', description: 'Vanilla JavaScript tic-tac-toe game with an unbeatable minimax computer opponent.', primaryLanguage: 'JavaScript', pushedAt: '2026-08-11', hasPages: false },
  { name: 'Calculator', codeUrl: 'https://github.com/QINGPENGLAM/Calculator', description: 'Vanilla JavaScript browser calculator for basic arithmetic, decimal input, clear, and delete controls.', primaryLanguage: 'JavaScript', pushedAt: '2026-08-11', hasPages: false },
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
