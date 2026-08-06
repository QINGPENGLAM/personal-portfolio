import { z } from 'zod'

export const contactSubmissionSchema = z.object({
  name: z.string().trim().min(2, 'Enter your name.').max(80, 'Keep your name under 80 characters.'),
  email: z.email('Enter a valid email address.').max(160),
  company: z.string().trim().max(120, 'Keep the company name under 120 characters.'),
  message: z.string().trim().min(20, 'Please include at least 20 characters.').max(2000, 'Keep the message under 2,000 characters.'),
  website: z.string().max(0, 'Spam check failed.'),
  startedAt: z.number().int().positive(),
})

export type ContactSubmission = z.infer<typeof contactSubmissionSchema>

export type ContactValidationResult =
  | { success: true; data: ContactSubmission }
  | { success: false; fieldErrors: Partial<Record<keyof ContactSubmission, string>> }

export function validateContactSubmission(input: unknown, now = Date.now()): ContactValidationResult {
  const parsed = contactSubmissionSchema.safeParse(input)
  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof ContactSubmission, string>> = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]
      if (typeof key === 'string' && !(key in fieldErrors)) fieldErrors[key as keyof ContactSubmission] = issue.message
    }
    return { success: false, fieldErrors }
  }

  const elapsed = now - parsed.data.startedAt
  if (elapsed < 2500 || elapsed > 2 * 60 * 60 * 1000) {
    return { success: false, fieldErrors: { message: elapsed < 2500 ? 'Please take a moment before submitting.' : 'This form expired. Refresh and try again.' } }
  }

  return { success: true, data: parsed.data }
}
