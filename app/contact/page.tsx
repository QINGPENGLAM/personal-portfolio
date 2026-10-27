import { ContactForm } from '@/components/contact/ContactForm'
import { ContactContent } from '@/components/contact/ContactContent'
import { SectionPage } from '@/components/SectionPage'
import { createPageMetadata } from '@/lib/site'

export const metadata = createPageMetadata('Contact', 'Contact QingPeng Lam about software engineering roles, technical projects, and product collaboration.', '/contact')

export default function ContactPage() {
  return (
    <SectionPage eyebrow="Contact" title="Let’s build something useful." intro="Send a concise message through the validated form, or use any direct channel below. The fallback email path always remains available.">
      <ContactContent form={<ContactForm />} />
    </SectionPage>
  )
}
