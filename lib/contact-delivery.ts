import type { ContactSubmission } from './contact'

const web3FormsEndpoint = 'https://api.web3forms.com/submit'
// Web3Forms access keys are public form identifiers, not private API credentials.
const web3FormsAccessKey = '7f865341-9fd8-455e-8210-41dec02358d9'

type DeliveryResult = { success?: boolean; message?: string; body?: { message?: string } }

export async function sendContactMessage(
  submission: ContactSubmission,
  signal: AbortSignal,
  endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || web3FormsEndpoint,
) {
  const web3Forms = endpoint === web3FormsEndpoint
  const { name, email, company, message, website } = submission
  const payload = web3Forms ? {
    access_key: web3FormsAccessKey,
    subject: `Portfolio message from ${name}`,
    name, email, company, message,
    botcheck: Boolean(website),
  } : submission
  const response = await fetch(endpoint, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload), signal,
  })
  const result = await response.json().catch(() => null) as DeliveryResult | null
  if (!response.ok || (web3Forms && result?.success !== true)) {
    throw new Error(result?.message ?? result?.body?.message ?? 'The message could not be sent.')
  }
}
