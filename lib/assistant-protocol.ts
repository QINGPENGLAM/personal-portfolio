import { z } from 'zod'

export const historySchema = z.object({ role: z.enum(['user', 'assistant']), content: z.string().trim().min(1).max(480) }).strict()
export const requestSchema = z.object({
  question: z.string().trim().min(1).max(240),
  history: z.array(historySchema).max(4).default([]),
}).strict()
export type AssistantRequest = z.infer<typeof requestSchema>
export const modelSchema = z.object({
  available: z.boolean(), answer: z.string().trim().min(1).max(1600),
  citationIds: z.array(z.string().min(1).max(120)).max(6),
}).strict().refine(v => !v.available || v.citationIds.length > 0)
// Only portfolio page paths can become links in the browser.
export const sourcePath = z.string().regex(/^\/(?:projects(?:\/[a-z0-9-]+)?|about|experience|skills|education|contact|resume)?\/?(?:#[a-z0-9-]+)?$/)
export const responseSchema = z.object({
  mode: z.enum(['ai', 'insufficient']), available: z.boolean(),
  answer: z.string().trim().min(1).max(1600),
  links: z.array(z.object({ href: sourcePath, label: z.string().min(1).max(180) }).strict()).max(6),
}).strict().refine(v => v.mode !== 'ai' || !v.available || v.links.length > 0)
export type AssistantResponse = z.infer<typeof responseSchema>
