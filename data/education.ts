import { educationSchema } from './schemas'

export const education = educationSchema.parse({
  institution: 'University of Michigan',
  degree: 'Bachelor of Science in Computer Science',
  minor: 'UX Design',
  location: 'Ann Arbor, MI',
  startDate: 'Aug. 2024',
  endDate: 'Dec. 2026',
  gpa: '3.8',
})
