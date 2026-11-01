# Portfolio RAG — approved first version

Status: user approved the recommended design on2026-11-01. User requested upgrading Ask portfolio from
fixed-rule answers to retrieval-grounded generation, and identified existing
free NVIDIA/OpenRouter usage in the separate agentic course project. Provider
selection was delegated to the assistant. Product implementation and offline tests are complete; private configuration, live inference and deployment remain pending.

## Goal
Keep the current chat widget, allow natural questions and short follow-ups,
and generate concise answers from the portfolio's published facts with links
to the relevant pages. Answer in the question's language. Unsupported questions
must receive an explicit insufficient-information answer rather than invented
experience, metrics, deployment history or claims about QingPeng's intentions.

## Approaches and recommendation
1. Recommended: OpenRouter free inference through a separate Cloudflare Worker.
   Reuse the OpenAI-compatible chat protocol already present in agentic, without
   sharing its private course endpoint or modifying that project. Keep public
   questions and quota controls separate from its application traffic.
2. NVIDIA hosted trial API: usable for experimentation, but official NIM guidance
   distinguishes prototyping/development from serving real production users.
   Do not assume the user's trial entitlement supports a permanent public site.
3. Paid hosted generation: potentially more predictable availability but deferred
   because the user has an existing free-provider route and prefers starting there.

User approved the recommended provider and architecture.
Default model route: openrouter/free. It is free-only but can select different
models; quality/latency must be evaluated before making a stable-quality claim.
Permit a configured pinned :free model later. Reject all other model IDs at
startup/request validation. Never fall back to a paid model/provider automatically.

## Existing implementation and deployment
The Next.js app uses output:'export' and GitHub Pages. The current widget imports
lib/assistant.ts dynamically and routes keyword matches to canned answers.
server/contact-worker.ts is an optional separate Worker pattern, not a deployed
assistant service. No assistant endpoint or provider secret is currently configured.
agentic/harnessd/runners.py reads /home/ubuntu/agentic/runners.toml and resolves
secret environment variable names. The local checkout has no runners.toml, so
its active model IDs and remaining account quotas have not been verified.

## Data and retrieval
Create a buildable, server-side corpus using an explicit public-data allowlist:
profile, education, experiences, selected projects/case studies, skills and source
evidence, repository descriptions, and the published HRS workflow/deployment
content. Every chunk has a stable ID, title, bounded text, page path and status.
HRS planned nodes and optional engineering proposals remain labeled proposed;
no future concern may be summarized as a past incident or implemented feature.
Never ingest internal project notes, env files, private code or arbitrary URLs.

V1 uses lightweight lexical ranking with explicit English/Chinese project,
skill and topic aliases, not a vector database or a claim of semantic embeddings.
Rank chunks, retain up to six relevant chunks within 8,000 characters, and attach
small identity context. Use the current question first; at most two prior user
questions provide follow-up context at lower weight. With no relevant evidence,
return insufficient information without a model call. Evaluate paraphrases and
both languages; add embeddings later only if retrieval quality needs them.

## Request flow and response contract
Browser -> configured HTTPS Worker endpoint -> validated/bounded question and
history -> retrieve corpus chunks -> atomically reserve quota -> one OpenRouter
chat-completions request -> validate answer/citation IDs -> return text and links.

Input: question (1–240 characters) and at most four role-limited user/assistant
history messages (each <=480 characters). Limit actual UTF-8 body to8KB, even
when Content-Length is absent. Accept no client-supplied sources, system prompts or model selection;
reject unexpected control fields. No external web search, tools or side effects.

Model output JSON: {available:boolean, answer:string, citationIds:string[]}.
Answer max1,600 characters. Citation IDs must be selected from retrieved chunks;
resolve their URLs server-side from the corpus, never from model-supplied URLs.
If an available answer has no valid source, output is malformed, citations are
unknown, or the model returns only reasoning/empty content, use a labeled local
fallback. Retrieval documents and conversation text are data, not instructions.
These checks bound output and links; they do not mathematically guarantee that
every generated statement is true. Adversarial and factual evals remain required.

Use the existing chat UI and suggested questions. Identify AI responses and local
fallback mode honestly, show source links and disclose that AI questions are sent
to the configured service. Keep existing keyboard/mobile behavior. Do not store
chat history on the server; client history lasts only for the current page session.
Do not log raw questions, provider responses, secrets or raw IP addresses.

## Provider and quota boundaries
Fixed upstream host: https://openrouter.ai/api/v1/chat/completions.
Secrets live only in Worker secrets/local ignored .dev.vars, never NEXT_PUBLIC_*,
static output, source files, model prompts or URLs. Create a separate portfolio
key rather than copying secret material from the course application.

Use only free inference. Set provider data_collection:'deny'; if no eligible
free route is available, fall back. Do not promise zero retention; provider
policy/route eligibility still needs verification during live setup.

Assistant-proposed pilot limits:10 upstream attempts per UTC day globally,
3 attempts per minute per salted address hash, one provider request per turn,
600 output tokens and a20-second upstream timeout. Count failed attempts and
cancellations once a request is dispatched; do not auto-retry. Quota counts
must survive Worker restarts and concurrent calls using a single SQLite-backed
Durable Object with atomic reservation. Keep only the current UTC-day counters
and bounded hash buckets; no chat text. Missing quota binding fails closed.
The website cap does not guarantee spare quota for agentic: OpenRouter's free
limits are account-wide. Account usage must be checked at live setup.

Validate exact allowed Origin and CORS, method/content type/body bounds; CORS is
not authentication. Public callers can spoof Origin, so the global attempt cap
is the actual backstop. At quota/timeout/unavailability, preserve the existing
local guide with an explicit mode message; lack of API configuration keeps the
current site usable without contacting a model.

## Packaging and setup
Keep frontend static on GitHub Pages. Add a standalone Worker entry/config and
its corpus/retrieval adapter under server/assistant/ and shared pure modules.
Use Cloudflare's SQLite Durable Objects so the pilot can use Workers Free within
its published limits. Hosting is not guaranteed free under every account/usage.
Add NEXT_PUBLIC_ASSISTANT_ENDPOINT to the public template; backend-only secret
names are OPENROUTER_API_KEY and ASSISTANT_RATE_LIMIT_SALT, with server model,
allowed-origin and pilot-limit configuration. Reuse current validation tooling;
introduce deployment dependencies only if required after approval.

Live setup needs the user's OpenRouter key and Cloudflare account, configured
privately. Do not ask them to paste keys in chat or read the agentic server's
secrets. Build/test the implementation locally before any deployment approval;
no account changes, live calls, commits, pushes or publication in design work.

## Validation and acceptance
- Deterministic retrieval fixtures: English/Chinese paraphrases, named projects,
  follow-ups, irrelevant questions, and proposed-vs-implemented HRS statements.
- Backend tests: source-only context, valid/invalid citations, malformed/empty
  output, refusal, timeout/429, strict free-model allowlist, body limits, origin
  spoofing not bypassing quota, concurrent atomic cap and day rollover; failures
  counted and no paid retry. Assert no secret in responses or error messages.
- Frontend/browser tests: sourced AI answer, history limits, loading/cancel,
  labeled local fallback, endpoint absent, keyboard/mobile, existing guide flow.
- Existing lint, TypeScript, unit tests, production build, unchanged JS/CSS/core
  budgets and applicable browser gates. No image/music/3D changes are needed.
- Once privately configured and authorized, a few bounded live requests establish
  actual model availability, citation quality, latency and consumed quota. Until
  then report implementation/mocked verification separately from live readiness.

## Official references checked 2026-11-01
- https://openrouter.ai/collections/free-models
- https://openrouter.ai/openrouter/free
- https://openrouter.ai/docs/api_reference/limits
- https://docs.api.nvidia.com/nim/docs/product
- https://developers.cloudflare.com/durable-objects/platform/pricing/
