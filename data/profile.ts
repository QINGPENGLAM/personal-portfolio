import { profileSchema } from './schemas'

export const profile = profileSchema.parse({
  name: 'QingPeng Lam',
  role: 'Software Engineer',
  headline: 'I build intelligent software systems, developer tools, and interactive digital experiences.',
  introduction:
    'I am a computer science student and software engineer who enjoys turning complex systems into useful, understandable products. My recent work spans AI-assisted developer workflows, data engineering, search, and full-stack applications.',
  educationSummary: 'B.S. Computer Science, Minor in UX Design · University of Michigan · Expected Dec. 2026',
  email: 'qpl@umich.edu',
  githubUrl: 'https://github.com/QINGPENGLAM',
  linkedinUrl: 'https://www.linkedin.com/in/qingpeng-lam/',
  resumePath: '/resume/QingPengLam_Resume.pdf',
  locations: ['San Antonio, TX', 'Ann Arbor, MI'],
})
