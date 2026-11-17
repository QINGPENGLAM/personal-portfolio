# Story-bank choices for the portfolio guide

Status: owner approved the grouped approach and this design on 2026-11-17.

## Purpose
Help portfolio visitors discover concrete examples of QingPeng's work through premade questions and concise English answers based on the supplied October 16 interview story bank.

## Approaches
1. Recommended: group questions into About, Experience, Projects, and Problem solving & growth. Keep the free-text box. Story choices show curated local answers without a model call, so their facts and scope remain stable.
2. Smaller alternative: retain the current flat list and append story questions. Less UI change, but harder to scan.

## Content and behavior
Use the existing chat panel, styles, cancellation, reduced-motion behavior and source links. The first version would offer six stories: Coveo ownership (S01), deliberate use of AI after feedback (S02), shared agent instructions (S03), HRS initiative (S05), Gmail pagination correction (S06), and incomplete WoS alerts (S07). Keep summaries at the workflow/learning level; exclude internal infrastructure and team reassignment details, coaching notes, unanswered questions, speculative future work, and unsupported adoption/impact claims. Use third person, matching the guide's existing voice. S01 remains testing/handoff, not a public production launch. HRS manual time is the original workload, not achieved savings. Current public HRS implementation descriptions take precedence over the older dossier's project-status snapshot.

Example choice: “How did QingPeng improve the HRS email workflow?”
Example answer: “QingPeng initially expanded email retrieval across historical alerts, then recognized that a daily job needed a bounded recent window. He changed the approach to a 30-day window with stored message IDs so repeated runs can skip processed alerts. The lesson was to design for the actual workload and separate daily intake from historical backfill.”

The original dossier stays in Downloads and is not copied into the public repository. Only curated summaries are published. Existing free-text AI remains available; curated stories must have a public on-site source location and the retrieval corpus must use those same summaries. No backend/model/provider/billing changes.

## Proposed story choices and answer drafts

These drafts are for owner approval, not published chat content.

- **How did QingPeng take ownership of an unfamiliar search project?** At USAA, QingPeng took primary responsibility for rebuilding an existing search experience on Coveo. He traced the old interface and network behavior, made a feature-parity checklist, and worked across the interface, API integration, tests and documentation. He sought targeted engineering guidance and handed off the work after testing, review and a team demo. This describes the testing and handoff stage, rather than a confirmed production launch.
- **How has feedback changed the way QingPeng uses AI?** Early in his internship, QingPeng received feedback that working AI-generated code was not enough if he could not explain its design. He began reading existing patterns first, making smaller changes, and using AI for focused analysis and assistance. He reports that later feedback recognized improvement. His takeaway was to understand and own every change he accepts.
- **How did QingPeng make AI-assisted development easier to hand off?** QingPeng created project-specific agent instructions and a shared workspace containing a brief, tasks, worklog and decision history. The aim was to preserve context and align generated changes with the team's existing conventions. He reports that his mentor shared the approach with the team. No numerical productivity gain or company-wide adoption is claimed.
- **What led QingPeng to build the HRS publication pipeline?** While manually reviewing publication alerts at ISR, QingPeng noticed repeated checks that could be automated and proposed a pipeline. He designed intake, separate source parsers, deduplication, publication matching and a persistent review queue. The current case study describes the implemented components and retains staff approval. The original 30–60 minutes a day describes the manual workload, not measured savings.
- **How did QingPeng improve the HRS email workflow?** QingPeng initially expanded email retrieval across historical alerts, then recognized that a daily job needed a bounded recent window. He changed the approach to a 30-day window with stored message IDs so repeated runs can skip processed alerts. The lesson was to design for the actual workload and separate daily intake from historical backfill.
- **How did QingPeng investigate missing publication records?** One Web of Science alert reported six publications, while its email body contained only five. QingPeng inspected the original HTML and found that the remaining record was behind a link. He added a comparison between expected and parsed counts and a partial status, rather than calling the alert complete. This records the missing evidence; it does not claim automatic recovery of every omitted paper.

## Verification
Cover grouped choice navigation, bounded scrolling on desktop/mobile, source anchors, local answers with no network call even when AI is configured, cancellation, existing questions, and retrieval of the curated summaries. Run lint/types/unit tests, production base-path build, budgets, targeted browsers, and configured-service mocks. Commit/push only after checks; observe the new workflow and live deployment before claiming publication.
