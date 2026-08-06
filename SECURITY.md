# Security and hosting boundary

This repository exports a static portfolio. The browser bundle contains no provider secrets, private email destination, rate-limit salt, or AI key.

## Contact boundary

The optional contact endpoint is a separate Worker-compatible service. It requires an exact allowed origin, validates request content and length, rejects bodies above 12 KB, rate-limits hashed network addresses, uses text-only email content, and keeps provider credentials in server environment variables. Responses are marked `no-store` and do not expose provider errors or secrets.

The form is not a live delivery service until that Worker, its storage binding, and its email provider configuration are deployed and verified. Direct email remains the permanent fallback.

## Static hosting headers

GitHub Pages does not provide repository-level configuration for custom response headers. The site therefore avoids unsafe HTML from visitors, remote scripts, and request-time secrets by design. If the export moves to a host that supports custom headers, configure and verify at least:

- `Content-Security-Policy` scoped to the site’s actual scripts, styles, workers, and configured contact or analytics endpoint
- `Strict-Transport-Security: max-age=31536000; includeSubDomains`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` disabling unused camera, microphone, geolocation, and payment capabilities
- `Cross-Origin-Opener-Policy: same-origin`

Do not copy a speculative CSP into production without testing the exported Next.js scripts and the WebGL worker path. The document-level referrer policy is already included in metadata; stronger response headers remain a hosting responsibility.

## Environment variables

Only `NEXT_PUBLIC_CONTACT_ENDPOINT`, `NEXT_PUBLIC_ANALYTICS_ENDPOINT`, and `NEXT_PUBLIC_BASE_PATH` are allowed in the static browser build. Their values are public by definition. Server secrets belong only in the contact Worker environment described in `server/README.md`.

## Reporting

Report suspected vulnerabilities privately to `qpl@umich.edu`. Do not include secrets or personal visitor data in a public issue.
