const image = (path) => new URL(`../../image/${path}`, import.meta.url).href

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

export const portfolioOnlyProjects = [
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
  {
    id: 'react-todo-list',
    title: 'React Todo List',
    category: 'Archive Project',
    period: 'React archive',
    summary:
      'A React todo application with local storage, task completion states, deletion flows, and persistent data between sessions.',
    stack: ['React', 'LocalStorage', 'CSS'],
    links: [{ label: 'Live Demo', href: 'https://todolistqp.netlify.app' }],
    source: 'React projects page',
  },
  {
    id: 'nasa-api-display',
    title: 'NASA API Display',
    category: 'Archive Project',
    period: 'React archive',
    summary:
      'A React-based NASA API viewer focused on keeping space-related content current through API-driven updates.',
    stack: ['React', 'Redux', 'Firebase'],
    links: [{ label: 'Live Demo', href: 'https://nasaqp.netlify.app' }],
    source: 'React projects page',
  },
  {
    id: 'gym-fit',
    title: 'Gym Fit',
    category: 'Archive Project',
    period: 'React archive',
    summary:
      'A gym progress application for tracking personal workout development and visualizing performance trends over time.',
    stack: ['React', 'Material UI', 'Chart.js'],
    links: [{ label: 'Live Demo', href: 'https://fitqp.netlify.app' }],
    source: 'React projects page',
  },
  {
    id: 'food-ordering-site',
    title: 'Food Ordering Website',
    category: 'Archive Project',
    period: 'Early web project',
    summary:
      'An early business-focused ordering experience built with JavaScript to explore menus, selection flows, and customer-facing interaction.',
    previewSrc: image('foodordering.png'),
    previewAlt: 'Food ordering website preview',
    previewFit: 'cover',
    stack: ['JavaScript', 'HTML', 'CSS'],
    links: [{ label: 'Live Demo', href: 'https://qingpengfoodordering.netlify.app' }],
    source: 'Legacy web portfolio',
  },
  {
    id: 'random-spawn-dodge',
    title: '2D UI Game',
    category: 'Archive Project',
    period: 'Early Unity game',
    summary:
      'A first 2D Unity game experiment focused on C# scripting, randomness, and arcade-style survival mechanics.',
    previewSrc: image('Game Over.png'),
    previewAlt: '2D UI game preview',
    previewFit: 'cover',
    stack: ['Unity', 'C#', '2D Game'],
    links: [{ label: 'GitHub Repo', href: 'https://github.com/QINGPENGLAM/random-spawn-dodge' }],
    source: 'Legacy web portfolio',
  },
  {
    id: 'cube-game',
    title: '2.5D Cube Game',
    category: 'Archive Project',
    period: 'Early Unity game',
    summary:
      'A first Unity3D project using C# scripts to explore world interaction, spatial movement, and the foundations of 2.5D gameplay.',
    previewSrc: image('cubegame.png'),
    previewAlt: '2.5D cube game preview',
    previewFit: 'cover',
    stack: ['Unity3D', 'C#', 'Gameplay Systems'],
    links: [{ label: 'GitHub Repo', href: 'https://github.com/QINGPENGLAM/cube-game' }],
    source: 'Legacy web portfolio',
  },
]
