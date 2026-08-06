import { experienceSchema } from './schemas'

export const experiences = experienceSchema.array().parse([
  {
    id: 'usaa',
    company: 'USAA',
    role: 'Software Engineering Intern',
    location: 'San Antonio, TX',
    startDate: 'May 2026',
    endDate: 'Present',
    summary: 'Building AI-assisted developer workflows, investigating application issues, and contributing search features across internal systems.',
    contributions: [
      'Built 12 reusable C# AI skills and MCP integrations across 22 workflows and 6 internal projects.',
      'Investigated 120+ application and CI/CD issues across containerized Podman and Docker environments.',
      'Developed search features across 6 Coveo Atomic applications using JavaScript, Python, and C#.',
    ],
    outcomes: ['12 reusable AI skills across 22 workflows and 6 internal projects.', '120+ application and CI/CD issues investigated.', 'Search features delivered across 6 Coveo Atomic applications.'],
    technologies: ['C#', 'MCP', 'Coveo Atomic', 'JavaScript', 'Python', 'GitLab CI/CD', 'Docker', 'Podman'],
  },
  {
    id: 'isr',
    company: 'University of Michigan Institute for Social Research',
    role: 'Data Systems Engineering Intern',
    location: 'Ann Arbor, MI',
    startDate: 'Aug. 2025',
    endDate: 'May 2026',
    summary: 'Built data pipelines, APIs, and reporting tools that made research datasets easier to validate, understand, and use.',
    contributions: [
      'Built Python and SQL pipelines for cleaning, validation, deduplication, and downstream analysis.',
      'Developed REST APIs and reporting dashboards used by 200+ researchers and program stakeholders.',
      'Automated recurring data preparation, report generation, bibliography management, and documentation workflows.',
    ],
    outcomes: ['Reporting dashboards and APIs supported 200+ researchers and program stakeholders.'],
    technologies: ['Python', 'SQL', 'REST APIs', 'Data Pipelines', 'Dashboards'],
  },
  {
    id: 'hillel',
    company: 'Michigan Hillel',
    role: 'Software Engineer Intern',
    location: 'Ann Arbor, MI',
    startDate: 'Aug. 2024',
    endDate: 'June 2025',
    summary: 'Consolidated operational data and built reporting systems for program planning and recurring analysis.',
    contributions: [
      'Built Python, pandas, NumPy, and SQL ETL pipelines covering 3,000+ records from multiple sources.',
      'Reduced reporting errors by 35% through data cleaning and validation workflows.',
      'Developed JavaScript and Tableau dashboards backed by SQL data models.',
    ],
    outcomes: ['3,000+ records consolidated across multiple sources.', 'Reporting errors reduced by 35% through cleaning and validation.'],
    technologies: ['Python', 'pandas', 'NumPy', 'SQL', 'JavaScript', 'Tableau', 'ETL'],
  },
])
