# Optional portfolio RAG service

The frontend remains a GitHub Pages static export. This separate Cloudflare
Worker retrieves only allowlisted public portfolio data and makes one free-only
OpenRouter request. No secret is bundled with the site. With no frontend endpoint,
the existing local guide works without contacting AI.

## Pilot status — 2026-11-01

Worker: `https://portfolio-assistant.qingpenglam.workers.dev`. User configured both
secrets privately and confirmed Workers Free. User-private GET /api/v1/key check
reported used0/limit50/remaining50 before recent evaluation; daily exhaustion was
not established for that queried key. OpenRouter routing remains unreliable.

After the published frontend showed fallback, one default-router probe returned
upstream429 (not the site's quota). A catalog-verified free NVIDIA pin rejected
the current data policy (404/data-policy). The zero-price JSON-capable
xingchen-agi/xing4.0-29b-a4b:free route answered expected graduation correctly
in1.78s, but a Chinese proposed-status sample failed output validation and the
next was throttled. This route is currently pinned in the Worker; stable quality
is not established. Five further agent calls in this fix pass,12 across the setup
in total spanning the natural UTC-day rollover. No cap reset/increase or refunds.

Quota errors now expose only day/minute scope and a bounded retry delay. Client
changes distinguish site daily/minute limits, provider throttling, timeout and
unavailability; notices use readable separate typography. The reported ambiguous
education question now returns published expected graduation with an explicit
unknown-current-class-year/birth-year boundary even in local fallback. Source
aliases retrieve the actual education source. Frontend fixes are local and not
published yet;107 units,8 mocked desktop/mobile checks, lint/types/build/budgets
pass. Raw invalid model content remains undisclosed; only static output error
categories can be returned. Strict citations/privacy remain enforced.

User explicitly chose to retain OpenRouter free models on2026-11-01. The
alternative in ../../docs/superpowers/specs/2026-11-01-portfolio-rag-cloudflare-ai.md
is declined historical context, not an active plan. No Workers AI binding/call/
upgrade/payment change has been made. Keep the current free-only pinned route,
strict privacy/citation checks and website-wide10-attempt/UTC-day cap. Provider
rate limits and invalid output can still trigger local fallback; stable live
availability and Chinese/adversarial quality remain unverified.

Pages workflow now keeps the broad regression build unconfigured, then rebuilds
with the real endpoint, runs mocked assistant browser tests and rechecks budgets
before artifact upload. This avoids spending live model quota in CI. The workflow
changes were published in commit0cf9508; Actions41358531180 passed quality and
deploy on2026-11-01. Live homepage returns200 and its public assistant bundle
contains the configured Worker URL. Configured AI browser gate:12 passed using
mocked service traffic (no live model calls in CI). No extra live inference was
performed during publication verification. Core suite had one existing contact
form case pass on retry; broad live conversational quality remains pending.

## Private setup

1. Create a separate OpenRouter key for this portfolio. Do not copy the course
   agentic server's key. Check account-wide free quota and data policies; its
   other applications share that quota. Never paste keys in chat.
2. Use a Cloudflare account with SQLite Durable Objects available. Review the
   current plan's limits. This configuration uses one global Durable Object,
   ten attempts per UTC day, three per minute per salted address hash. Failed
   requests count; no retry/refund. Changing the object name or deleting its
   storage resets accounting, so do not do that during a pilot day.
3. For local work, copy `.dev.vars.example` to `.dev.vars` in this folder and fill
   values privately. For a deployed Worker, set `OPENROUTER_API_KEY` and
   `ASSISTANT_RATE_LIMIT_SALT` using the private terminal prompts below, never `vars` or
   `NEXT_PUBLIC_*`. Use a random salt of at least 32 random bytes.
   ```sh
   npx wrangler secret put OPENROUTER_API_KEY --config server/assistant/wrangler.jsonc
   npx wrangler secret put ASSISTANT_RATE_LIMIT_SALT --config server/assistant/wrangler.jsonc
   ```

   These commands change the deployed service; run them only during authorized
   account setup. The user completed private secret setup; do not expose values during troubleshooting.
4. Set `ASSISTANT_ALLOWED_ORIGIN` to the exact website origin (no path), currently
   `https://qingpenglam.github.io`. Keep `ASSISTANT_MODEL=openrouter/free` or a
   specific `vendor/model:free`. Other models are rejected; no paid fallback.
5. From the repository root, a supported Node version and Wrangler 4 can run:
   `npx wrangler dev --config server/assistant/wrangler.jsonc --local`.
   Local browser development needs allowed origin `http://localhost:3000` and
   `NEXT_PUBLIC_ASSISTANT_ENDPOINT=http://localhost:8787` in the dev environment.
   Production frontend builds accept only HTTPS endpoints.
6. Deployment is a separate authorized action:
   `npx wrangler deploy --config server/assistant/wrangler.jsonc`.
   Then configure the private secrets, set the public HTTPS Worker URL in
   `NEXT_PUBLIC_ASSISTANT_ENDPOINT` **at frontend build time**, rebuild and publish
   the static site. Restart/rebuild after changing this variable. GitHub Desktop
   pushing source alone would not configure an absent build variable; this
   repository now supplies the endpoint in its release-build workflow step.
7. Before public enablement, verify a few bounded live English/Chinese questions,
   a follow-up, proposed HRS status, insufficient evidence and actual account
   usage. Do not claim live model availability from mocked tests.

## Boundaries

- Actual streamed request <=8192 bytes, question <=240 characters; last four
  messages <=480 characters each. Responses <=1600 characters with server-resolved
  page links. Corpus is lexical retrieval, not vector embeddings.
- At most six source chunks /8000 source-text characters, plus small identity
  context. Published content only; no internal notes/files/arbitrary URL fetches.
- `data_collection:deny`, `require_parameters:true`, JSON output requested.
  A free route with those capabilities may be unavailable. That causes a clearly
  labeled local fallback; it does not relax privacy routing or use a paid model.
  This is not a promise of zero retention by every service.
- CORS is not authentication. Origin spoofing is possible; the persistent global
  cap is the cost backstop. Missing quota binding/configuration fails closed.
- No chat text, raw IPs, provider errors or keys are logged by application code.
  Storage contains current-day counts and at most ten salted hashes, cleared by
  a midnight alarm. Cloudflare platform retention and provider policies are
  separate; review them before public use. Observability is disabled here.
- Citation validation prevents invented source links, but does not prove each
  generated claim. Public factual/adversarial evaluation is still required.
- No model request occurs during normal offline unit/build checks. Local Worker
  runtime checks must use a missing key or an explicitly mocked upstream.

Official references: [OpenRouter free router](https://openrouter.ai/openrouter/free),
[provider routing](https://openrouter.ai/docs/guides/routing/provider-selection),
[Cloudflare SQLite storage](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/),
[Durable Object pricing](https://developers.cloudflare.com/durable-objects/platform/pricing/).
