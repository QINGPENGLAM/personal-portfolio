# Proposed RAG provider change — Cloudflare Workers AI

Status: declined on2026-11-01 (America/Detroit). User explicitly chose to retain
OpenRouter free models. This document is a historical alternative, not an active
implementation plan. No Workers AI binding, inference call, plan upgrade or
payment change has been made. Do not resume migration without a new user request.

Problem: deployed OpenRouter free routing intermittently returns503/429. A pinned
NVIDIA free endpoint rejected data_collection:deny (404/data-policy). The pinned
Phala/Xing free route answered the graduation question correctly in1.78s, but a
Chinese proposed-status sample failed output validation and a subsequent sample
was throttled. This is not stable live readiness. Never relax the approved privacy
policy or use a paid OpenRouter fallback to mask this problem.

Proposal: keep the existing Worker URL, public allowlisted lexical retrieval,
source/citation contract, local fallback, persistent10-attempt/UTC-day and3/minute
address-hash quotas. Replace its inference adapter with Cloudflare Workers AI
through an AI binding on the already configured Workers Free account. Pin
@cf/meta/llama-3.3-70b-instruct-fp8-fast, currently listed in the active catalog and
JSON Mode support list and not among models requiring a paid billing method.
Use its JSON mode with the same available/answer/citationIds schema; validate
again server-side. Keep600 output tokens and20-second response deadline; failed
or cancelled attempts count and are never retried/refunded automatically.

Cost: Workers AI currently includes10,000 Neurons per day. Workers Free operations
fail when allocation is exhausted; do not upgrade plan or configure AI Gateway
credits. This account's other AI usage, exact request cost, latency and model
availability have not been verified. The existing10-attempt cap remains an
independent safety backstop, not a promise of free capacity being available.

Privacy: questions/recent bounded chat and public excerpts would be processed by
Cloudflare Workers AI rather than OpenRouter/model providers. Update the UI
service disclosure and setup docs. Do not add AI Gateway logs/caching, server
chat storage or raw question/output logging. Cloudflare documents no training of
Customer Content and standard inference retention only as needed for processing,
with operational metadata and stated policy exceptions. Do not promise absolute
zero retention across every service. Keep the existing OpenRouter secret private;
no need to read it or request a new API key for the AI binding.

Before any deployment: tests for adapter payload/result validation, provider
selection fail-closed, unknown citations, timeout/quota/fallback; existing lint,
types/unit/build/budgets and configured mocked browser checks. After authorized
setup, a few quota-counted live English/Chinese, follow-up, unsupported question
and planned-vs-implemented samples establish actual readiness. No stable-quality
claim from mocks alone. Any first-use license/terms acceptance is handled by user.

Official references checked2026-11-01 (America/Detroit):
- https://developers.cloudflare.com/workers-ai/platform/pricing/
- https://developers.cloudflare.com/workers-ai/platform/data-usage/
- https://developers.cloudflare.com/workers-ai/features/json-mode/
- https://developers.cloudflare.com/workers-ai/models/
