# Polyglot Curriculum

A personalized self-study tracker for six programming languages — Python, C#, TypeScript, Rust, F#, and Go — with real in-browser code sandboxes for every knowledge check.

## What it is

This is a single-user, password-protected web application deployed to Vercel that helps you systematically learn six programming languages side-by-side. Each language has 10 phases (levels 1-10), and each phase contains knowledge checks: multiple-choice questions and hands-on code tasks that run in real, language-specific sandboxes.

Your progress is saved automatically and persists across browser sessions. All learning happens locally or through public, untrusted code execution sandboxes — there are no AI/LLM API calls in the deployed app, and no analytics tracking.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **TypeScript** (strict mode)
- **Tailwind CSS v4**
- **CodeMirror 6** — code editor with syntax highlighting and linting
- **Sandbox runtimes:**
  - **Python:** Pyodide (WASM-based CPython in browser)
  - **TypeScript/JavaScript:** esbuild-wasm transpiler + `Function()` VM
  - **Rust:** play.rust-lang.org proxy
  - **Go:** go.dev playground proxy
  - **F#:** fable.io REPL iframe
  - **C#:** dotnetfiddle.net iframe
- **Storage:** Vercel KV (optional; falls back to localStorage)

## Running locally

```bash
pnpm install
cp .env.example .env.local
# Edit .env.local and set strong credentials
pnpm dev
```

Open http://localhost:3000 in your browser. You'll be prompted for HTTP Basic Auth credentials using the username and password you set in `.env.local`.

## Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `BASIC_AUTH_USERNAME` | yes | Username for HTTP Basic Auth gating |
| `BASIC_AUTH_PASSWORD` | yes | Strong random password (the app uses constant-time comparison to prevent timing attacks) |
| `KV_REST_API_URL` | no | Vercel KV REST API endpoint (enables cross-device progress sync) |
| `KV_REST_API_TOKEN` | no | Vercel KV REST API token |

## Deploying to Vercel

Prerequisites: `pnpm add -g vercel` and `vercel login`. Change `BASIC_AUTH_USERNAME` and `BASIC_AUTH_PASSWORD` to strong values before deploying.

```bash
vercel link
vercel env add BASIC_AUTH_USERNAME production
vercel env add BASIC_AUTH_PASSWORD production
# Optional: set up Vercel KV for progress sync
# vercel kv create polyglot-progress
vercel --prod
```

## Project structure

```
src/
  app/                 — Next.js App Router pages, layouts, API routes
  components/          — UI components, sandbox runners, phase views, layout
  curriculum/          — phase data: one TypeScript file per language (10 levels)
  lib/                 — storage/KV utilities, progress hook, sandbox loaders
  proxy.ts             — HTTP Basic Auth (username/password check, constant-time comparison)
next.config.ts         — security headers: HSTS, CSP, X-Frame-Options, Referrer-Policy, etc.
```

## Knowledge check types

**Multiple choice:** 3–4 options with immediate explanation shown after you submit.

**Code task:** Starter code in CodeMirror, "Run" button executes your code in the appropriate sandbox:
- Output is compared against expected stdout, or
- Assertions (JavaScript/Python) are run after your code and must pass

## Sandbox implementation notes

Sandbox execution is a compromise between safety, language coverage, and browser limitations:

- **Python (Pyodide):** Full CPython 3.12 running in browser. First load is ~6–10 MB. No external library installs; only stdlib + bundled scientific stack.
- **TypeScript:** esbuild-wasm transpiles to JavaScript in browser, runs via `Function()`. Single-user app, no untrusted user code, so runtime isolation is acceptable.
- **Rust:** Server-side proxy to play.rust-lang.org/execute. Compilation happens on Rust's servers; we return stderr/stdout. Code limited to 5000 characters per request.
- **Go:** Server-side proxy to go.dev/_/compile. Same model as Rust. Code limited to 5000 characters per request.
- **F# & C#:** iframes pointing to fable.io/repl and dotnetfiddle.net respectively. Cross-origin isolation means we can't read their output directly; instead, we ask you to mark the check as reviewed after running it.

### Known external-service risks

fable.io and dotnetfiddle.net are external services we do not control. If they go down or change their embed policies (e.g., set X-Frame-Options: DENY), F# and C# checks will fail to load. Mitigation: the read-only starter code panel still lets you copy/paste into the live sites in a new tab.

## Privacy & security

- **No analytics:** no tracking. Two third-party CDN origins are required at runtime — cdn.jsdelivr.net for Pyodide (Python) and esbuild-wasm (TypeScript). CSP restricts script-src to that origin only.
- **No AI/LLM calls:** all code is real, all sandboxes are public or local.
- **Single-user, password-protected:** HTTP Basic Auth over HTTPS; constant-time password comparison in `src/proxy.ts`.
- **Security headers:** HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy set in `next.config.ts` via `headers()`.

## License

MIT
