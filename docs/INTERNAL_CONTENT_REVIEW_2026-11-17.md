# Internal website content review — 2026-11-17

Owner review only. This file is outside public/ and is not imported by the website or assistant. It is not included in the static website export; it remains visible to anyone with repository access.

Removed project TODOs, future improvements, speculative HRS scaling scenarios, and the unimplemented required-AI policy. HRS now describes the existing opt-in behavior rather than implying the proposed policy is implemented. Testing limitations, attribution, privacy notices, and factual repository descriptions remain public.

The diffs below preserve the exact original text (lines beginning with `-`) and its public replacement (`+`).

## app/projects/page.tsx

```diff
--- app/projects/page.tsx
+++ app/projects/page.tsx
@@ -3,5 +3,5 @@
 import { ProjectsExplorer } from '@/components/projects/ProjectsExplorer'
 import { githubRepositories } from '@/data/github-repositories'
-import { projectContentPlaceholders, projects } from '@/data/projects'
+import { projects } from '@/data/projects'
 import { createPageMetadata } from '@/lib/site'
 
@@ -32,5 +32,4 @@
         ))}
       </section>
-      <details className="content-placeholders"><summary>Unresolved content placeholders ({projectContentPlaceholders.length})</summary><ul>{projectContentPlaceholders.map((item) => <li key={item}>{item}</li>)}</ul></details>
     </SectionPage>
   )
```

## data/projects.ts

```diff
--- data/projects.ts
+++ data/projects.ts
@@ -331,14 +331,8 @@
       "reflection": {
         "learned": "An assistant platform needs durable state, observable execution, ownership enforcement, and explicit cleanup as much as it needs a model integration.",
-        "next": [
-          "Complete the independent automated real-runtime lifecycle suite.",
-          "Extend supported-host storage and recovery acceptance.",
-          "Validate a deployment separately before publishing any live-service claim."
-        ]
+        "next": []
       }
     },
-    "placeholders": [
-      "No public application deployment is configured; use the repository’s local simulated demo instructions."
-    ]
+    "placeholders": []
   },
   {
@@ -411,8 +405,8 @@
       reflection: {
         learned: 'AI remediation becomes credible when safety boundaries, model lifecycle, tenant isolation, and recovery are designed as first-class product behavior.',
-        next: ['Add approved public repository and interface evidence.', 'Continue validating hosted release and operational controls before making production claims.'],
+        next: [],
       },
     },
-    placeholders: ['Add a public repository URL if one becomes available.', 'Add approved screenshots and an architecture diagram.', 'Add a verified hosted demo URL if deployed.'],
+    placeholders: [],
   },
   {
@@ -484,8 +478,8 @@
       reflection: {
         learned: 'AI search quality depends as much on resilient ingestion, format compatibility, and idempotency as it does on the model itself.',
-        next: ['Replace the current illustration with approved product screenshots.', 'Add an approved deployment architecture diagram and broader retrieval evaluation.'],
+        next: [],
       },
     },
-    placeholders: ['Replace the current product illustration with approved interface screenshots.', 'Add an approved architecture diagram.'],
+    placeholders: [],
   },
   {
@@ -583,6 +577,2 @@
 ])
 
-export const projectContentPlaceholders = [
-  'Add one to three additional resume-supported flagship projects if desired.',
-  ...projects.flatMap((project) => project.placeholders.map((item) => `${project.title}: ${item}`)),
-]
```

## components/case-study/CaseStudyContent.tsx

```diff
--- components/case-study/CaseStudyContent.tsx
+++ components/case-study/CaseStudyContent.tsx
@@ -110,5 +110,5 @@
       <section className="case-study-section reflection-section" aria-labelledby={`${project.slug}-reflection`}>
         <div><p className="eyebrow">Reflection</p><h2 id={`${project.slug}-reflection`}>What this project clarified.</h2></div>
-        <div><p>{project.caseStudy.reflection.learned}</p><h3>What I would improve next</h3><ul>{project.caseStudy.reflection.next.map((item) => <li key={item}>{item}</li>)}</ul></div>
+        <div><p>{project.caseStudy.reflection.learned}</p></div>
       </section>
 
```

## components/hrs/HrsCaseStudy.tsx

```diff
--- components/hrs/HrsCaseStudy.tsx
+++ components/hrs/HrsCaseStudy.tsx
@@ -1,4 +1,4 @@
 import Link from 'next/link'
-import { hrsCloud, hrsConcerns, hrsDatabase, hrsDevelopment, hrsEvaluation, hrsResults, hrsWorkflow, type HrsNode } from '@/data/hrs-case-study'
+import { hrsCloud, hrsDatabase, hrsDevelopment, hrsEvaluation, hrsResults, hrsWorkflow, type HrsNode } from '@/data/hrs-case-study'
 import { HrsNode as Node } from './HrsNode'
 import styles from './HrsCaseStudy.module.css'
@@ -78,5 +78,5 @@
             <div className={styles.aiStep}>
               <Node node={hrsWorkflow.ai} />
-              <p>Required pre-output stage. If screening cannot finish, export “AI incomplete—manual review needed”. Staff make the final decision.</p>
+              <p>Optional AI screening supports the review queue. Staff make the final decision.</p>
             </div>
             <Connector />
@@ -133,5 +133,5 @@
       <section id="hrs-results" className={styles.section} aria-labelledby="hrs-results-heading">
         <p className="eyebrow">05 / Results and lessons</p>
-        <h2 id="hrs-results-heading">What I built, learned, and would improve.</h2>
+        <h2 id="hrs-results-heading">What I built and learned.</h2>
         <p className={styles.sectionIntro}>A working review workflow, better structure for AI assistance, and a clearer understanding of the work involved in cloud deployment.</p>
         <div className={styles.storyGrid}>
@@ -147,12 +147,4 @@
       </section>
 
-      <section id="hrs-concerns" className={styles.section} aria-labelledby="hrs-concerns-heading">
-        <p className="eyebrow">Optional / Engineering considerations</p>
-        <h2 id="hrs-concerns-heading">What if the system grows—or something fails?</h2>
-        <p className={styles.sectionIntro}>Questions I think through beyond the normal workflow: what could become a bottleneck, how I would respond, and what each solution would trade off. Click a scenario to explore the reasoning.</p>
-        <div className={styles.storyGrid}>
-          {hrsConcerns.map((node) => <Node node={node} key={node.id} />)}
-        </div>
-      </section>
 
       <div className={styles.end}><span>More of my work</span><Link href="/projects">Back to projects <span aria-hidden="true">↗</span></Link></div>
```

## data/hrs-case-study.ts

```diff
--- data/hrs-case-study.ts
+++ data/hrs-case-study.ts
@@ -54,5 +54,5 @@
     id: 'pubmed', title: 'Reliable PubMed match?', caption: 'Resolve publication metadata',
     explanation: 'Search PubMed for a reliable title match and retrieve the matched record’s PMID, DOI, authors and journal.',
-    points: ['A match provides identifiers for a second HRS check.', 'No reliable match: save an unmatched active candidate. It joins the same review queue as matched candidates before the required AI stage in the intended workflow and then output.', 'PubMed membership does not prove that a paper used HRS data.'],
+    points: ['A match provides identifiers for a second HRS check.', 'No reliable match: save an unmatched active candidate. It joins the same review queue as matched candidates for optional AI screening and CSV/Sheet output.', 'PubMed membership does not prove that a paper used HRS data.'],
   },
   unmatched: {
@@ -73,16 +73,14 @@
   queue: {
     id: 'queue', title: 'Prepare and queue candidates', caption: 'Shared active queue · paper metadata',
-    explanation: 'Collect each paper’s available identity and publication details, then save the candidate in the shared PostgreSQL review queue. A reliable PubMed match that is not already in HRS becomes ready_for_manual_entry; a missing reliable match becomes needs_non_pubmed_review. Both paths feed the AI stage before output in the intended workflow.',
+    explanation: 'Collect each paper’s available identity and publication details, then save the candidate in the shared PostgreSQL review queue. A reliable PubMed match that is not already in HRS becomes ready_for_manual_entry; a missing reliable match becomes needs_non_pubmed_review. Both paths support optional AI screening before output.',
     points: [
       'Email intake already provides the title and source links. When there is a reliable PubMed match, enrich the candidate with its PMID, DOI, journal, authors and HRS leadership matches. Missing fields stay missing; an unmatched candidate is still queued.',
       'These saved details identify the paper and support source lookup and human review. Inside the AI stage, the program separately retrieves, verifies and extracts the abstract or permitted article text supplied to the model; metadata alone is not HRS data-use evidence.',
-      'In the intended workflow, every active candidate passes through the AI stage before CSV and Google Sheet output. Both matched and unmatched paths are included; a still-current result can be reused rather than calling the model again.',
-      'If text is unavailable, the API fails, or batch, time or cost limits prevent screening, export the candidate with the explicit status “AI incomplete—manual review needed”. A successful classification is not required for export.',
-      'Implementation boundary: this is the intended required-stage policy. The current runtime is still opt-in and does not yet enforce the policy or this exact incomplete-status label. Staff retain the final decision.',
+      'AI screening is opt-in. A still-current result can be reused rather than calling the model again.',
     ],
   },
   ai: {
-    id: 'ai', title: 'AI screening', caption: 'Required before Sheet output',
-    explanation: 'In the intended workflow, AI screening is a required pre-output stage for both PubMed-matched and unmatched active candidates. Reuse a still-current result or attempt screening; if it cannot complete, export with “AI incomplete—manual review needed” rather than silently omitting the AI status.',
+    id: 'ai', title: 'AI screening', caption: 'Optional review assistance',
+    explanation: 'AI screening is an opt-in step for PubMed-matched and unmatched active candidates. It provides advisory evidence for staff review and can reuse a still-current result.',
     points: [
       'Sources: a verified PMID can provide a PubMed abstract; a stored article URL can provide bounded HTML/PDF text after identity and processing-permission checks. PMC uses its separate license-aware path. Generic full-text extracts may be partial.',
@@ -91,5 +89,5 @@
       'The local PostgreSQL usage ledger records tracked request costs. Its default $25 monthly threshold is a soft admission limit, not a guaranteed bill cap; unresolved request costs pause further tracked calls.',
       'A three-paper full-text pilot recorded one known LASI false positive: related or harmonized cohorts were mistaken for US HRS use. The result remains documented; exact quotations do not resolve that inference error. Broader staff-labeled validation is still open.',
-      'For the intended output, show either the AI advice with evidence/scope or the explicit incomplete status. AI never adds or removes HRS records or replaces the staff decision.',
+      'AI advice includes its evidence and source scope. AI never adds or removes HRS records or replaces the staff decision.',
     ],
     visualDiagram: {
@@ -101,10 +99,10 @@
       outcomes: ['Uses HRS data', 'Mentions only*', 'Insufficient evidence'],
       humanDecision: 'Staff decide; AI never adds or removes records',
-      fallback: '*“Mentions only” requires complete main text. If screening cannot finish, export “AI incomplete—manual review needed”; partial text, conflicts and uncertain cases stay with staff.',
+      fallback: '*“Mentions only” requires complete main text. Partial text, conflicts and uncertain cases stay with staff.',
     },
   },
   review: {
-    id: 'review', title: 'Google Sheet + CSV', caption: 'Human review + explicit AI status',
-    explanation: 'Export the active queue and completed archive. In the intended workflow, each active candidate arrives after the required AI stage, with either advice and evidence or “AI incomplete—manual review needed”. The Sheet remains the working interface for staff decisions and notes.',
+    id: 'review', title: 'Google Sheet + CSV', caption: 'Human review + publication details',
+    explanation: 'Export the active queue and completed archive. Optional AI advice supports review when screening is enabled. The Sheet remains the working interface for staff decisions and notes.',
     points: ['Preserve existing manual decisions and notes during synchronization.', 'Update both Sheet tabs in one batch to avoid a clear-then-write gap.', 'Human edits between the read and write can still conflict; this is an operational limitation.'],
   },
@@ -194,72 +192,4 @@
 ]
 
-export const hrsConcerns: HrsNode[] = [
-  {
-    "id": "concern-growth",
-    "title": "What if data grows to gigabytes?",
-    "caption": "01 / Data volume + memory",
-    "explanation": "The concern is loading too many records or large article documents into one worker. I would first measure memory use, query latency and processing time.",
-    "points": [
-      "Approach: process records in bounded batches; keep searchable metadata and statuses in PostgreSQL, with large documents in object storage. Add indexes based on actual query patterns.",
-      "Trade-off: document uploads and database writes can fail independently. Stable object keys and reconciliation would help detect missing or orphaned documents.",
-      "Decision point: total data size alone is not a reason to redesign. Change the storage or processing approach when measured resource use becomes a constraint."
-    ]
-  },
-  {
-    "id": "concern-backlog",
-    "title": "What if work arrives faster than it finishes?",
-    "caption": "02 / Backlog + bounded concurrency",
-    "explanation": "Slow article retrieval or AI screening could cause the daily workload to accumulate. I would watch backlog size and the age of the oldest pending candidate.",
-    "points": [
-      "Approach: introduce a durable queue of candidate IDs and a bounded worker pool. Limit concurrency for each external service and acknowledge work after saving its result.",
-      "Trade-off: a queue adds operational complexity and can deliver the same task more than once. Workers would still need safe repeated processing.",
-      "Decision point: introduce a queue when measured backlog or run duration shows that the scheduled batch no longer keeps up."
-    ]
-  },
-  {
-    "id": "concern-api-failures",
-    "title": "What if external APIs fail?",
-    "caption": "03 / Timeouts + bounded retries",
-    "explanation": "Gmail, PubMed, Google Sheets and the model provider can time out, enforce rate limits or return errors. Different failures need different responses.",
-    "points": [
-      "Approach: set request timeouts, use bounded exponential backoff with jitter, honor Retry-After when supplied, and retain progress at the failed stage.",
-      "Trade-off: retries consume time, quota and possibly money. Authentication errors and invalid requests need intervention rather than repeated identical calls.",
-      "Recovery question: a timeout may leave the remote outcome unknown. Check whether an operation is safe to repeat or reconcile its result before retrying."
-    ]
-  },
-  {
-    "id": "concern-crash",
-    "title": "What if a run crashes halfway?",
-    "caption": "04 / Checkpoints + safe repeated writes",
-    "explanation": "A restart should preserve completed work without duplicating papers or unnecessarily repeating expensive operations.",
-    "points": [
-      "Approach: define durable stage boundaries, checkpoint completed work, and use stable identifiers, unique constraints and database transactions. Resume pending work rather than restarting everything.",
-      "Trade-off: a database transaction cannot atomically include an external API call. A model request could succeed just before the process crashes while saving its response.",
-      "Recovery question: record attempts and results where reconciliation matters. Aim for controlled duplicate effects and safe recovery rather than promising end-to-end exactly-once execution."
-    ]
-  },
-  {
-    "id": "concern-sheet-conflicts",
-    "title": "What if staff edit during Sheet sync?",
-    "caption": "05 / Human decisions + edit conflicts",
-    "explanation": "An automated sync could overwrite a reviewer’s decision or notes. Protecting those edits matters more than making every row look immediately up to date.",
-    "points": [
-      "Approach: separate pipeline-owned columns from human-owned fields, match rows by stable candidate ID, compare versions or last-synced values, and preserve conflicts for resolution.",
-      "Traceability: retain an edit history so decisions and conflicting updates can be understood and recovered.",
-      "Trade-off: a read-before-write comparison still has a race between checking and updating. Stronger guarantees may call for a controlled editing interface or database-backed review application."
-    ]
-  },
-  {
-    "id": "concern-ai-quality",
-    "title": "What if AI gets expensive or gives wrong answers?",
-    "caption": "06 / Cost + evidence + human review",
-    "explanation": "Repeated screening can increase spending, while plausible answers can misinterpret real evidence. Cost control and quality evaluation need separate checks.",
-    "points": [
-      "Approach: set spending limits and track usage. Reuse suitable results using the paper, input content, model and prompt version; reevaluate when those inputs change.",
-      "Quality checks: validate structured outputs, verify quoted evidence against supplied text, and evaluate labeled examples including difficult negatives and incomplete documents. Route uncertainty to human review.",
-      "Trade-off: cached results can become stale and stricter evidence rules can increase manual review. A verified quote proves that text exists, not that the model’s interpretation is correct."
-    ]
-  }
-]
 
 export const hrsResults: HrsNode[] = [
@@ -297,14 +227,3 @@
     ],
   },
-  {
-    id: 'results-next-approach',
-    title: 'What I would do differently next time',
-    caption: 'Next time / Validate the boundaries earlier',
-    explanation: 'I would plan the cloud and AI workflow boundaries earlier, then validate a small end-to-end path before expanding the system.',
-    points: [
-      'Map where state lives, which identity accesses each service, and how a failed step can be retried.',
-      'Test a small cloud path with the required access and persistence before assuming the full local workflow will transfer directly.',
-      'Keep AI tasks bounded and acceptance checks explicit. Own the decisions about scope, user needs and what the evidence actually supports.',
-    ],
-  },
-]
+]
```

## data/assistant-corpus.ts

```diff
--- data/assistant-corpus.ts
+++ data/assistant-corpus.ts
@@ -27,5 +27,4 @@
     const c = p.caseStudy
     add(`project-${p.slug}-case`, p.title, `/projects/${p.slug}`, JSON.stringify({ audience: c.audience, constraints: c.constraints, architectureNodes: c.architectureNodes, architectureEdges: c.architectureEdges, requestFlow: c.requestFlow, decisions: c.decisions, testing: c.testing, learned: c.reflection.learned }))
-    c.reflection.next.forEach((next, i) => add(`project-${p.slug}-next-${i}`, `${p.title}: future work`, `/projects/${p.slug}`, next, true))
   }
 }
@@ -36,5 +35,5 @@
 for (const r of githubRepositories) if (r.description) add(`repo-${r.name}`, r.name, '/projects', `${r.name}: ${r.description}\nLanguage: ${r.primaryLanguage ?? 'unspecified'}. Metadata snapshot: ${githubRepositorySnapshot.capturedAt}; not proof of current deployment.`)
 for (const [section, nodes] of Object.entries({ workflow: Object.values(hrsWorkflow), database: hrsDatabase, cloud: hrsCloud, development: hrsDevelopment, evaluation: hrsEvaluation })) {
-  for (const n of nodes) add(`hrs-${section}-${n.id}`, `HRS: ${n.title}`, '/projects/hrs-publication-pipeline', [n.title, n.caption, n.explanation, ...n.points].join('\n'), ('planned' in n && n.planned === true) || /intended workflow|AI screening/i.test(n.explanation))
+  for (const n of nodes) add(`hrs-${section}-${n.id}`, `HRS: ${n.title}`, '/projects/hrs-publication-pipeline', [n.title, n.caption, n.explanation, ...n.points].join('\n'))
 }
 export const assistantCorpus: readonly AssistantSource[] = chunks
```

## components/ProjectDownload.tsx

```diff
--- components/ProjectDownload.tsx
+++ components/ProjectDownload.tsx
@@ -3,5 +3,5 @@
 
   if (url === 'GAME_DOWNLOAD_URL' || url === 'P2_GAME_DOWNLOAD_URL') {
-    return <span className="project-download"><button className="button button-primary" disabled type="button">Download Game</button><small className="download-status">Download link coming soon</small></span>
+    return null
   }
 
```

## lib/assistant-client.ts

```diff
--- lib/assistant-client.ts
+++ lib/assistant-client.ts
@@ -38,5 +38,5 @@
   if (error.reason === 'timeout') return 'Local guide · AI timed out. Please try later.'
   if (error.reason === 'output') return 'Local guide · AI returned an unusable answer. Showing published portfolio facts.'
-  if (error.error === 'unconfigured') return 'Local guide · AI service is not configured.'
+  if (error.error === 'unconfigured') return 'Local guide · AI is temporarily unavailable.'
   return 'Local guide · Free AI service is temporarily unavailable.'
 }
@@ -44,5 +44,5 @@
   signal?.throwIfAborted()
   const endpoint = assistantEndpoint(configuredEndpoint)
-  let notice = endpoint ? 'Local guide · AI could not be reached. Please try later.' : 'Local guide · AI endpoint is not configured correctly.'
+  let notice = endpoint ? 'Local guide · AI could not be reached. Please try later.' : 'Local guide · Showing published portfolio facts.'
   if (endpoint) {
     const controller = new AbortController()
```

## lib/assistant.ts

```diff
--- 
+++ 
@@ -41,5 +41,5 @@
     let text: string
     if (/\bai\b|screening|筛选|人工智能/.test(normalized)) {
-      text = chinese ? '公开案例把 AI 筛选描述为计划中的目标流程，不能据此确认已经上线。计划中 AI 只提供建议与证据，工作人员保留最终决定；无法完成时标记为需要人工审核。' : 'HRS AI screening is a proposed/intended workflow in the public case study, not confirmation that it is deployed. The design keeps staff in control and marks incomplete screening for manual review.'
+      text = chinese ? 'HRS 的 AI 筛选是可选的辅助审核步骤，提供建议和来源证据，由工作人员保留最终决定。公开案例没有确认该步骤已部署到云端。' : 'HRS AI screening is an optional advisory step that provides suggestions and source evidence. Staff retain the final decision. The public case study does not confirm cloud deployment of this step.'
     } else {
       const node = /database|postgres|数据库|存储/.test(normalized) ? hrsDatabase.find(n => n.id === 'db-why')
@@ -48,5 +48,5 @@
         : /test|验证|测试/.test(normalized) ? hrsEvaluation[0] : undefined
       text = node ? `${node.title}: ${node.explanation} ${node.points.slice(0, 2).join(' ')}`
-        : 'The HRS publication pipeline processes Google Scholar and Web of Science alerts, extracts publication metadata, checks for existing records, and maintains a PostgreSQL review queue for staff. The case study separately describes proposed AI screening.'
+        : 'The HRS publication pipeline processes Google Scholar and Web of Science alerts, extracts publication metadata, checks for existing records, and maintains a PostgreSQL review queue for staff. Optional AI screening provides advisory evidence for staff review.'
       if (chinese) text = `公开案例资料（以下保留原文）：${text}`
     }
```

## Owner decision — 2026-11-17
Restored category 3: all six HRS engineering scenarios and their original explanations. They appear as hypothetical engineering considerations, with conditional wording rather than claims of completed implementation. The historical removal diff above remains for reference. Other removed categories remain excluded.
