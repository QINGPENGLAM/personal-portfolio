const image = (path) => new URL(`../../image/${path}`, import.meta.url).href
const githubRepo = (repo) => `https://github.com/QINGPENGLAM/${repo}`
const githubPages = (repo) => `https://qingpenglam.github.io/${repo}/`

function githubProject({
  category = 'GitHub Project',
  live = false,
  liveHref,
  period = 'Public GitHub repo',
  previewAlt,
  previewFit,
  previewSrc,
  repo,
  source = 'Public GitHub profile',
  stack,
  summary,
  title,
}) {
  return {
    id: repo,
    title,
    category,
    period,
    summary,
    stack,
    ...(previewSrc
      ? {
          previewAlt,
          previewFit,
          previewSrc,
        }
      : {}),
    links: [
      { label: 'Code', href: githubRepo(repo) },
      ...(live || liveHref
        ? [
            {
              label: 'Live Page',
              href: liveHref ?? githubPages(repo),
            },
          ]
        : []),
    ],
    source,
  }
}

function courseProject({ live = false, repo, stack, title }) {
  return githubProject({
    repo,
    title,
    category: 'Course Assignment',
    period: 'Winter 2025 course work',
    summary:
      'A public course assignment preserved from the GitHub archive with the source repo and any still-reachable static deployment.',
    stack,
    live,
  })
}

export const portfolioExperience = [
  {
    id: 'usaa-swe',
    title: 'Software Engineering Intern',
    company: 'USAA',
    period: 'May 2026 - Present',
    location: 'San Antonio, TX',
    summary:
      'Builds backend developer tooling with MCP servers and AI skills to automate debugging, log retrieval, issue triage, root cause analysis, code-change support, Git pushes, and merge request workflows.',
    highlights: [
      'Engineered reusable automation modules and maintained a shared skills repository packaged as a Git submodule for cross-team adoption.',
      'Built a custom MCP server that exposes team-specific engineering tools through a reusable interface for AI-assisted workflows.',
      'Worked across technical and business workflows to turn repetitive manual processes into maintainable internal tools.',
    ],
    stack: ['MCP Servers', 'AI Skills', 'Developer Tools', 'Git Workflows'],
  },
  {
    id: 'isr-data-systems',
    title: 'Data Systems Engineering Intern',
    company: 'University of Michigan Institute for Social Research',
    period: 'Aug. 2025 - Present',
    location: 'Ann Arbor, MI',
    summary:
      'Designs, develops, and deploys RESTful APIs and data dashboards to process, validate, and visualize structured datasets for more than 200 stakeholders.',
    highlights: [
      'Translated product and user requirements into end-to-end backend data features with cross-functional partners.',
      'Handled monitoring, debugging, root cause analysis, and query optimization in production-style data systems.',
      'Improved dashboard responsiveness by roughly 15 percent by identifying and reducing system bottlenecks.',
    ],
    stack: ['REST APIs', 'Dashboards', 'SQL', 'Performance Debugging'],
  },
  {
    id: 'hillel-software-engineer',
    title: 'Software Engineer Intern',
    company: 'Michigan Hillel',
    period: 'Aug. 2024 - June 2025',
    location: 'Ann Arbor, MI',
    summary:
      'Developed automated data processing pipelines and analytics workflows that cleaned, transformed, and validated 3,000+ records while improving reporting reliability.',
    highlights: [
      'Built Python, pandas, NumPy, and SQL pipelines that reduced reporting errors by 35 percent.',
      'Created SQL-backed dashboards and product analytics workflows with JavaScript and Tableau.',
      'Collaborated with engineers and IT staff to integrate APIs and improve system consistency and maintainability.',
    ],
    stack: ['Python', 'pandas', 'SQL', 'Tableau'],
  },
  {
    id: 'psu-research',
    title: 'Research Assistant',
    company: 'Penn State University',
    period: 'January 2024 - June 2024',
    location: 'Penn State University',
    summary:
      'Conducted machine learning research, implemented models with Python and TensorFlow, and contributed to algorithm development, testing, and experiment design.',
    highlights: [
      'Improved model performance by roughly 5-10 percent through iterative testing and tuning.',
      'Ran more than 100 experiments to compare optimization directions and validate results.',
      'Contributed to research writing and presentation materials alongside technical model work.',
    ],
    stack: ['Python', 'TensorFlow', 'Machine Learning', 'Research'],
  },
  {
    id: 'nycs-office',
    title: 'Office Assistant',
    company: 'New York Chinese School',
    period: 'June 2021 - February 2023',
    location: 'New York Chinese School',
    summary:
      'Managed administrative reports, maintained student records, and coordinated communication between parents, teachers, and staff.',
    highlights: [
      'Managed operational data for more than 150 students.',
      'Reduced record retrieval time by around 20 percent through better organization.',
      'Improved day-to-day administrative efficiency by roughly 25 percent.',
    ],
    stack: ['Operations', 'Data Entry', 'Documentation', 'Coordination'],
  },
  {
    id: 'amnh-guide',
    title: 'Museum Guide Intern',
    company: 'American Museum of Natural History',
    period: 'June 2022 - August 2022',
    location: 'American Museum of Natural History',
    summary:
      'Supported visitor wayfinding, exhibit introductions, and public-facing communication while helping create a stronger museum experience.',
    highlights: [
      'Helped visitors navigate exhibits and museum spaces with clarity and empathy.',
      'Practiced public speaking and educational explanation in a fast-moving environment.',
      'Built comfort with presentation, communication, and audience engagement.',
    ],
    stack: ['Public Speaking', 'Visitor Experience', 'Communication'],
  },
  {
    id: 'aplus-academy',
    title: 'Teaching Assistant',
    company: 'A+ Academy',
    period: 'June 2020 - August 2020',
    location: 'A+ Academy',
    summary:
      'Assisted with SHSAT preparation, homework support, and individualized student guidance focused on confidence and independent learning.',
    highlights: [
      'Supported students through one-on-one academic help and practice review.',
      'Helped reinforce study habits, confidence, and structured learning routines.',
      'Worked closely with teachers on curriculum support and classroom preparation.',
    ],
    stack: ['Teaching Support', 'Mentorship', 'Education'],
  },
]

const githubArchiveProjects = [
  githubProject({
    repo: 'project-0009-montage-product-video-generator',
    title: 'Montage Product Video Generator',
    category: 'Project',
    period: 'Public repo · July 2026',
    summary:
      'A creator-tooling concept focused on controllable product video generation with reference analysis instead of opaque one-click editing.',
    stack: ['Video Automation', 'Reference Analysis', 'Creator Tools'],
  }),
  githubProject({
    repo: 'personal-portfolio',
    title: 'Personal Portfolio',
    category: 'Portfolio Repo',
    period: 'Public repo · 2022',
    summary:
      'A public deployable portfolio repo that remains live on GitHub Pages and documents an earlier version of the personal site.',
    stack: ['JavaScript', 'Portfolio', 'GitHub Pages'],
    live: true,
  }),
  githubProject({
    repo: 'Portfolio',
    title: 'Portfolio (Legacy Build)',
    category: 'Portfolio Repo',
    period: 'Public repo · 2026',
    summary:
      'An older portfolio deployment kept in the public archive as a separate GitHub Pages build.',
    stack: ['JavaScript', 'Frontend', 'GitHub Pages'],
    live: true,
  }),
  githubProject({
    repo: 'PersonalPortfolio',
    title: 'PersonalPortfolio',
    category: 'Portfolio Repo',
    period: 'Public repo · 2026',
    summary:
      'A public portfolio snapshot repo kept in the archive even though its GitHub Pages deployment is not currently reachable.',
    stack: ['Frontend', 'Portfolio', 'Archive'],
  }),
  githubProject({
    repo: 'QINGPENGLAM',
    title: 'GitHub Profile README',
    category: 'Profile Repo',
    period: 'Public repo · 2025',
    summary:
      'The public profile repository used for GitHub account presentation, profile copy, and pinned profile content.',
    stack: ['Markdown', 'GitHub Profile', 'Public Positioning'],
  }),
  githubProject({
    repo: 'client_project_w25',
    title: 'Client Project W25',
    category: 'Course Project',
    period: 'Winter 2025 client work',
    summary:
      'A public client-style class project kept online as part of the GitHub Pages course archive.',
    stack: ['HTML', 'CSS', 'Client Project'],
    live: true,
  }),
  courseProject({
    repo: 'hw6-2025',
    title: 'Homework 6 (W25)',
    stack: ['JavaScript', 'Frontend', 'GitHub Pages'],
    live: true,
  }),
  courseProject({
    repo: 'dicussion9-JS',
    title: 'Discussion 9 JavaScript',
    stack: ['HTML', 'JavaScript', 'GitHub Pages'],
    live: true,
  }),
  courseProject({
    repo: 'hw5_2025',
    title: 'Homework 5 (W25)',
    stack: ['CSS', 'Frontend', 'GitHub Pages'],
    live: true,
  }),
  courseProject({
    repo: 'discussion8-form',
    title: 'Discussion 8 Form',
    stack: ['CSS', 'Forms', 'GitHub Pages'],
    live: true,
  }),
  courseProject({
    repo: 'hw3_2025',
    title: 'Homework 3 (W25)',
    stack: ['CSS', 'Frontend', 'GitHub Pages'],
    live: true,
  }),
  courseProject({
    repo: 'hw2-w25',
    title: 'Homework 2 (W25)',
    stack: ['CSS', 'Frontend', 'GitHub Pages'],
    live: true,
  }),
  courseProject({
    repo: 'hw1-w25',
    title: 'Homework 1 (W25)',
    stack: ['CSS', 'Frontend', 'GitHub Pages'],
    live: true,
  }),
  courseProject({
    repo: 'discussion1',
    title: 'Discussion 1',
    stack: ['HTML', 'Frontend', 'GitHub Pages'],
    live: true,
  }),
  githubProject({
    repo: 'FITgym',
    title: 'Gym Fit',
    category: 'Archive Project',
    period: 'React archive',
    summary:
      'A gym progress application for tracking personal workout development and visualizing performance trends over time.',
    stack: ['React', 'Material UI', 'Chart.js'],
    liveHref: 'https://fitqp.netlify.app',
    source: 'React projects page',
  }),
  githubProject({
    repo: 'NASA-REACT',
    title: 'NASA API Display',
    category: 'Archive Project',
    period: 'React archive',
    summary:
      'A React-based NASA API viewer focused on keeping space-related content current through API-driven updates.',
    stack: ['React', 'Redux', 'Firebase'],
    liveHref: 'https://nasaqp.netlify.app',
    source: 'React projects page',
  }),
  githubProject({
    repo: 'todolist',
    title: 'React Todo List',
    category: 'Archive Project',
    period: 'React archive',
    summary:
      'A React todo application with local storage, task completion states, deletion flows, and persistent data between sessions.',
    stack: ['React', 'LocalStorage', 'CSS'],
    liveHref: 'https://todolistqp.netlify.app',
    source: 'React projects page',
  }),
  githubProject({
    repo: 'project1',
    title: 'Project 1 (C++)',
    category: 'Systems Project',
    period: 'Public repo · 2024',
    summary:
      'A public C++ project from the earlier systems archive, kept in the portfolio with its source repository.',
    stack: ['C++', 'Systems', 'Course Work'],
  }),
  githubProject({
    repo: 'Econbusiness',
    title: 'Econ Business Site',
    category: 'Archive Project',
    period: 'Public repo · 2023',
    summary:
      'An earlier HTML-based web build preserved in the public archive as part of the broader website portfolio history.',
    stack: ['HTML', 'CSS', 'Web Design'],
  }),
  githubProject({
    repo: 'gov-project',
    title: 'Government Project',
    category: 'Archive Project',
    period: 'Public repo · 2023',
    summary:
      'A public web archive project kept in the portfolio as part of earlier frontend and information-design work.',
    stack: ['HTML', 'CSS', 'Frontend'],
  }),
  githubProject({
    repo: 'XIWENPORT',
    title: 'XIWENPORT',
    category: 'Archive Project',
    period: 'Public repo · 2023',
    summary:
      'An older HTML-based portfolio-style project retained in the public archive.',
    stack: ['HTML', 'CSS', 'Portfolio'],
  }),
  githubProject({
    repo: 'food-ordering-',
    title: 'Food Ordering Website',
    category: 'Archive Project',
    period: 'Early web project',
    summary:
      'An early business-focused ordering experience built with JavaScript to explore menus, selection flows, and customer-facing interaction.',
    stack: ['JavaScript', 'HTML', 'CSS'],
    liveHref: 'https://qingpengfoodordering.netlify.app',
    previewSrc: image('foodordering.png'),
    previewAlt: 'Food ordering website preview',
    previewFit: 'cover',
    source: 'Legacy web portfolio',
  }),
  githubProject({
    repo: 'arthistory-RPG',
    title: 'Art History RPG Prototype',
    category: 'Game Project',
    period: 'Public repo · 2022',
    summary:
      'An early Unity prototype exploring how art history could be taught through movement, visual discovery, and game-like interaction.',
    stack: ['Unity3D', 'C#', 'Educational Game'],
    previewSrc: image('artstudio.PNG'),
    previewAlt: 'Art History RPG prototype preview',
    previewFit: 'cover',
    source: 'Legacy game archive',
  }),
  githubProject({
    repo: 'E-Commerce',
    title: 'E-Commerce Site',
    category: 'Archive Project',
    period: 'Public repo · 2022',
    summary:
      'An early e-commerce-focused frontend build preserved in the public archive.',
    stack: ['HTML', 'CSS', 'JavaScript'],
  }),
  githubProject({
    repo: 'random-spawn-dodge',
    title: '2D UI Game',
    category: 'Game Project',
    period: 'Early Unity game',
    summary:
      'A first 2D Unity game experiment focused on C# scripting, randomness, and arcade-style survival mechanics.',
    stack: ['Unity', 'C#', '2D Game'],
    previewSrc: image('game.PNG'),
    previewAlt: '2D UI game preview',
    previewFit: 'cover',
    source: 'Legacy web portfolio',
  }),
  githubProject({
    repo: 'cube-game',
    title: '2.5D Cube Game',
    category: 'Game Project',
    period: 'Early Unity game',
    summary:
      'A first Unity3D project using C# scripts to explore world interaction, spatial movement, and the foundations of 2.5D gameplay.',
    stack: ['Unity3D', 'C#', 'Gameplay Systems'],
    previewSrc: image('cubegame.png'),
    previewAlt: '2.5D cube game preview',
    previewFit: 'cover',
    source: 'Legacy web portfolio',
  }),
  githubProject({
    repo: 'topicshare',
    title: 'TopicShare',
    category: 'Archive Project',
    period: 'Public repo · 2022',
    summary:
      'An early HTML-based sharing and content layout project kept in the GitHub archive.',
    stack: ['HTML', 'CSS', 'Frontend'],
  }),
  githubProject({
    repo: 'Tic-Tac-Toe',
    title: 'Tic-Tac-Toe',
    category: 'Archive Project',
    period: 'Public repo · 2022',
    summary:
      'An early JavaScript game implementation preserved in the public GitHub archive.',
    stack: ['JavaScript', 'HTML', 'Game Logic'],
  }),
  githubProject({
    repo: 'Calculator',
    title: 'Calculator',
    category: 'Archive Project',
    period: 'Public repo · 2022',
    summary:
      'A simple calculator build from the early JavaScript archive.',
    stack: ['JavaScript', 'HTML', 'UI Logic'],
  }),
  githubProject({
    repo: 'myOwnRedis',
    title: 'myOwnRedis',
    category: 'Systems Project',
    period: 'Public repo · 2025',
    summary:
      'A C++ systems project exploring data-store and backend implementation ideas in a Redis-inspired direction.',
    stack: ['C++', 'Systems', 'Backend Concepts'],
  }),
  githubProject({
    repo: 'Raytracer',
    title: 'Raytracer',
    category: 'Systems Project',
    period: 'Public repo · 2025',
    summary:
      'A C++ graphics project exploring ray tracing fundamentals and rendering logic.',
    stack: ['C++', 'Computer Graphics', 'Ray Tracing'],
  }),
  githubProject({
    repo: 'UnityKitchenGame',
    title: 'Unity Kitchen Game',
    category: 'Game Project',
    period: 'Public repo · 2025',
    summary:
      'A Unity game project centered on gameplay systems, interaction, and scene-based mechanics.',
    stack: ['Unity', 'C#', 'Gameplay Systems'],
  }),
]

const supplementalProjects = [
  {
    id: 'consulting-kpi-dashboard',
    title: 'Consulting KPI Dashboard',
    category: 'Resume Project',
    period: 'Jan. 2025 - June 2025',
    summary:
      'A full-stack analytics application where users upload CSV files and review interactive KPI visualizations through a React interface backed by APIs and SQL storage.',
    stack: ['React', 'Flask/Node.js', 'SQL', 'REST APIs'],
    links: [],
    source: 'Resume project',
  },
  {
    id: 'personal-finance-tracker',
    title: 'Personal Finance Tracker',
    category: 'Resume Project',
    period: 'Aug. 2023 - Jan. 2024',
    summary:
      'A user-facing finance app for tracking spending, categorizing transactions, and visualizing financial trends with relational schemas and RESTful API design.',
    stack: ['Python', 'SQL', 'REST APIs', 'Web Development'],
    links: [],
    source: 'Resume project',
  },
  {
    id: 'prepare-care',
    title: 'Pre Pare/Care',
    category: 'Archive Project',
    period: 'Student planning concept',
    summary:
      'A concept app for helping students discover majors, plan activities, and build clearer long-term preparation paths during the college application process.',
    previewSrc: image('social media design.png'),
    previewAlt: 'Pre Pare Care concept screen',
    previewFit: 'cover',
    stack: ['Product Concept', 'Student Tools', 'UX Planning'],
    links: [],
    source: 'Legacy concept',
  },
]

export const portfolioOnlyProjects = [...githubArchiveProjects, ...supplementalProjects]
