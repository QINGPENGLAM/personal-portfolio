# Contact worker

The static GitHub Pages portfolio cannot execute request-time Next.js route handlers. `contact-worker.ts` is the separate server boundary for Phase 5 form delivery.

Deploy it to a Worker-compatible runtime and configure:

- `CONTACT_ALLOWED_ORIGIN` — exact deployed portfolio origin
- `CONTACT_FROM_EMAIL` — verified sender identity
- `CONTACT_TO_EMAIL` — private destination address
- `EMAIL_API_KEY` — provider secret, never exposed to the browser
- `EMAIL_API_URL` — optional provider-compatible endpoint; defaults to Resend
- `RATE_LIMIT_SALT` — secret used before IP-derived rate-limit keys are stored
- `RATE_LIMIT` — KV-compatible binding used for five submissions per ten minutes

Then build the portfolio with `NEXT_PUBLIC_CONTACT_ENDPOINT` set to the deployed worker URL. The worker validates field lengths and email format, rejects the honeypot, enforces a minimum completion time, restricts CORS, rate-limits hashed addresses, and sends only through the configured provider.

Phase 6 additionally caps request bodies at 12 KB and returns `no-store`, origin-varying security headers. The repository supplies and tests this adapter but does not deploy it or create provider credentials.
