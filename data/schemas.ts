import { z } from 'zod'

const nonEmptyText = z.string().trim().min(1)
const optionalUrl = z.url().nullable()

export const profileSchema = z.object({
  name: nonEmptyText,
  role: nonEmptyText,
  headline: nonEmptyText,
  introduction: nonEmptyText,
  educationSummary: nonEmptyText,
  email: z.email(),
  githubUrl: z.url(),
  linkedinUrl: z.url(),
  resumePath: nonEmptyText,
  locations: z.array(nonEmptyText).min(1),
})

export const experienceSchema = z.object({
  id: nonEmptyText,
  company: nonEmptyText,
  role: nonEmptyText,
  location: nonEmptyText,
  startDate: nonEmptyText,
  endDate: nonEmptyText,
  summary: nonEmptyText,
  contributions: z.array(nonEmptyText).min(1),
  outcomes: z.array(nonEmptyText).min(1),
  technologies: z.array(nonEmptyText).min(1),
})

export const projectSchema = z.object({
  id: nonEmptyText,
  slug: nonEmptyText,
  title: nonEmptyText,
  shortDescription: nonEmptyText,
  fullOverview: nonEmptyText,
  problem: nonEmptyText,
  role: nonEmptyText,
  directContributions: z.array(nonEmptyText).min(1),
  technicalChallenges: z.array(nonEmptyText).min(1),
  solutions: z.array(nonEmptyText).min(1),
  architecture: z.array(nonEmptyText).min(1),
  measurableResults: z.array(nonEmptyText).min(1),
  focusAreas: z.array(nonEmptyText).min(1),
  technologies: z.array(nonEmptyText).min(1),
  screenshots: z.array(nonEmptyText),
  githubUrl: optionalUrl,
  liveDemoUrl: optionalUrl,
  status: z.enum(['active', 'completed']),
  date: nonEmptyText,
  landmark: z.object({
    type: nonEmptyText,
    position: z.tuple([z.number(), z.number(), z.number()]),
    cameraOffset: z.tuple([z.number(), z.number(), z.number()]),
    accent: nonEmptyText,
  }),
  caseStudy: z.object({
    audience: nonEmptyText,
    constraints: z.array(nonEmptyText).min(1),
    architectureNodes: z.array(z.object({
      id: nonEmptyText,
      label: nonEmptyText,
      responsibility: nonEmptyText,
      kind: z.enum(['source', 'interface', 'service', 'model', 'data', 'worker', 'control', 'destination']),
    })).min(2),
    architectureEdges: z.array(z.object({
      source: nonEmptyText,
      target: nonEmptyText,
      label: nonEmptyText,
    })).min(1),
    requestFlow: z.array(nonEmptyText).min(2),
    decisions: z.array(z.object({
      challenge: nonEmptyText,
      decision: nonEmptyText,
      tradeoff: nonEmptyText,
      outcome: nonEmptyText,
    })).min(1),
    testing: z.array(nonEmptyText).min(1),
    reflection: z.object({
      learned: nonEmptyText,
      next: z.array(nonEmptyText).min(1),
    }),
  }),
  placeholders: z.array(nonEmptyText),
})

export const educationSchema = z.object({
  institution: nonEmptyText,
  degree: nonEmptyText,
  minor: nonEmptyText,
  location: nonEmptyText,
  startDate: nonEmptyText,
  endDate: nonEmptyText,
  gpa: nonEmptyText,
})

export const skillGroupSchema = z.object({
  label: nonEmptyText,
  items: z.array(nonEmptyText).min(1),
})

export const timelineItemSchema = z.object({
  id: nonEmptyText,
  type: z.enum(['experience', 'project', 'education']),
  startDate: nonEmptyText,
  endDate: nonEmptyText,
  sortKey: z.string().regex(/^\d{4}-\d{2}$/),
  title: nonEmptyText,
  organization: nonEmptyText,
  summary: nonEmptyText,
  technologies: z.array(nonEmptyText),
  href: nonEmptyText.nullable(),
})

export const worldTourStopSchema = z.object({
  id: z.enum(['identity', 'projects', 'systems', 'journey', 'connect']),
  eyebrow: nonEmptyText,
  title: nonEmptyText,
  description: nonEmptyText,
  href: nonEmptyText,
  actionLabel: nonEmptyText,
  landmarkId: z.enum(['projects', 'experience', 'about', 'skills', 'education', 'resume', 'contact']).nullable(),
  cameraTarget: z.object({
    position: z.tuple([z.number(), z.number(), z.number()]),
    cameraOffset: z.tuple([z.number(), z.number(), z.number()]),
  }),
  accent: nonEmptyText,
})

export const githubRepositorySchema = z.object({
  name: nonEmptyText,
  codeUrl: z.url(),
  description: nonEmptyText.nullable(),
  primaryLanguage: nonEmptyText.nullable(),
  pushedAt: z.iso.date(),
  hasPages: z.boolean(),
  liveUrl: optionalUrl,
  liveTitle: nonEmptyText.nullable(),
  liveStatus: z.enum(['verified', 'unavailable', 'not-configured']),
  liveCheckedAt: z.iso.date().nullable(),
})

export type Profile = z.infer<typeof profileSchema>
export type Experience = z.infer<typeof experienceSchema>
export type Project = z.infer<typeof projectSchema>
export type Education = z.infer<typeof educationSchema>
export type SkillGroup = z.infer<typeof skillGroupSchema>
export type TimelineItem = z.infer<typeof timelineItemSchema>
export type WorldTourStop = z.infer<typeof worldTourStopSchema>
export type GitHubRepository = z.infer<typeof githubRepositorySchema>
