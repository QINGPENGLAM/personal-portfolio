// Curated public summaries of owner-approved interview stories. Raw coaching notes stay outside the repository.
export const assistantStories = [
  {
    "id": "coveo-ownership",
    "title": "Rebuilding an unfamiliar search experience",
    "question": "How did QingPeng take ownership of an unfamiliar search project?",
    "answer": "At USAA, QingPeng took primary responsibility for rebuilding an existing search experience on Coveo. He traced the old interface and network behavior, made a feature-parity checklist, and worked across the interface, API integration, tests and documentation. He sought targeted engineering guidance and handed off the work after testing, review and a team demo. This describes the testing and handoff stage, rather than a confirmed production launch.",
    "relatedHref": "/experience#usaa"
  },
  {
    "id": "ai-feedback",
    "title": "Learning to own AI-assisted changes",
    "question": "How has feedback changed the way QingPeng uses AI?",
    "answer": "Early in his internship, QingPeng received feedback that working AI-generated code was not enough if he could not explain its design. He began reading existing patterns first, making smaller changes, and using AI for focused analysis and assistance. He reports that later feedback recognized improvement. His takeaway was to understand and own every change he accepts.",
    "relatedHref": "/experience#usaa"
  },
  {
    "id": "agent-workspace",
    "title": "Preserving context for AI-assisted development",
    "question": "How did QingPeng make AI-assisted development easier to hand off?",
    "answer": "QingPeng created project-specific agent instructions and a shared workspace containing a brief, tasks, worklog and decision history. The aim was to preserve context and align generated changes with the team's existing conventions. He reports that his mentor shared the approach with the team. The improvement centered on clearer context, consistent conventions and easier handoffs.",
    "relatedHref": "/experience#usaa"
  },
  {
    "id": "hrs-initiative",
    "title": "Finding an opportunity in a manual workflow",
    "question": "What led QingPeng to build the HRS publication pipeline?",
    "answer": "While manually reviewing publication alerts at ISR, QingPeng noticed repeated checks that could be automated and proposed a pipeline. He designed intake, separate source parsers, deduplication, publication matching and a persistent review queue. The current case study describes the implemented components and retains staff approval. The manual review had taken about 30–60 minutes a day.",
    "relatedHref": "/projects/hrs-publication-pipeline"
  },
  {
    "id": "gmail-pagination",
    "title": "Matching email retrieval to the daily workload",
    "question": "How did QingPeng improve the HRS email workflow?",
    "answer": "QingPeng initially expanded email retrieval across historical alerts, then recognized that a daily job needed a bounded recent window. He changed the approach to a 30-day window with stored message IDs so repeated runs can skip processed alerts. The lesson was to design for the actual workload and separate daily intake from historical backfill.",
    "relatedHref": "/projects/hrs-publication-pipeline"
  },
  {
    "id": "wos-completeness",
    "title": "Checking the source behind a missing record",
    "question": "How did QingPeng investigate missing publication records?",
    "answer": "One Web of Science alert reported six publications, while its email body contained only five. QingPeng inspected the original HTML and found that the remaining record was behind a link. He added a comparison between expected and parsed counts and a partial status, rather than calling the alert complete. The partial status keeps missing evidence visible for review.",
    "relatedHref": "/projects/hrs-publication-pipeline"
  }
] as const

export function getAssistantStory(question: string) {
  const normalized = question.trim().toLowerCase()
  return assistantStories.find(story => story.question.toLowerCase() === normalized)
}
