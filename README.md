# Polyglot Curriculum

A personalized self-study tracker for 19 programming languages — Python, C#, TypeScript, Rust, F#, Go, Ruby, JavaScript, TypeScript for JS Devs, Java, Zig, Lisp, Lua, C, C++, T-SQL, PostgreSQL, Haskell, and Assembly — with real in-browser code sandboxes for every knowledge check.

## What it is

This is a single-user, password-protected web application deployed to Vercel that helps you systematically learn many programming languages side-by-side. Each language has 11 phases (levels 0-10), and each phase contains knowledge checks: multiple-choice questions and hands-on code tasks that run in real, language-specific sandboxes. Levels 0–1 of every course walk a true beginner through the first program token-by-token.

Your progress is saved automatically and persists across browser sessions. All learning happens locally or through public, untrusted code execution sandboxes — there are no AI/LLM API calls in the deployed app, and no analytics tracking.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **TypeScript** (strict mode)
- **Tailwind CSS v4**
- **CodeMirror 6** — code editor with syntax highlighting and linting
- **Sandbox runtimes:** all code checks execute inside a sandboxed iframe (`public/sandbox.html`):
  - **Python:** Pyodide (WASM-based CPython in browser)
  - **TypeScript / TypeScript for JS Devs / JavaScript:** in-browser TypeScript compiler → `Function()` VM
  - **Go, Rust, C#, F#, Ruby, Java, Zig, Lua, Lisp, C, C++, Haskell:** lightweight regex transpilers to JavaScript (`src/lib/runner.ts`), run in the `Function()` VM — code tasks are print-based; advanced topics are taught via multiple-choice
  - **T-SQL & PostgreSQL:** sql.js (SQLite compiled to WASM); runnable checks use portable SQL, dialect-specific features taught via multiple-choice
  - **Assembly (x86-64):** a small educational register-VM interpreter

> Each language's display symbol, editor filename, shields.io badge, and accent colour are defined once in `LanguageMeta` (`src/curriculum/types.ts`). Code checks are mechanically validated by `scripts/validate-checks.mjs`, which runs every boilerplate through the real transpilers and asserts its expected output.
- **Storage:** Vercel KV (optional; falls back to localStorage)

## Running locally

```bash
pnpm install
cp .env.example .env.local
# Edit .env.local and set strong credentials
pnpm dev
```

Open http://localhost:3000 in your browser. You'll be redirected to `/login` and prompted for the username and password you set in `.env.local`. On success a signed HTTP-only session cookie (`polyglot_session`) is set for 30 days.

## Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `BASIC_AUTH_USERNAME` | yes | Username accepted by the login form |
| `BASIC_AUTH_PASSWORD` | yes | Strong random password (the app uses constant-time comparison to prevent timing attacks) |
| `AUTH_SECRET` | yes | 32+ char random string used to sign the session cookie (HS256). Generate with `openssl rand -hex 32` |
| `KV_REST_API_URL` | no | Vercel KV REST API endpoint (enables cross-device progress sync) |
| `KV_REST_API_TOKEN` | no | Vercel KV REST API token |

> **Why a signed cookie instead of HTTP Basic Auth?** iOS Safari 17+ flags Basic-Auth-gated sites as "not secure" because the password is base64-encoded on every request. We switched to a login form + HTTP-only signed-cookie session (`jose` HS256) to fix that.

## Deploying to Vercel

Prerequisites: `pnpm add -g vercel` and `vercel login`. Change `BASIC_AUTH_USERNAME` and `BASIC_AUTH_PASSWORD` to strong values before deploying, and generate a strong `AUTH_SECRET`.

```bash
vercel link
vercel env add BASIC_AUTH_USERNAME production
vercel env add BASIC_AUTH_PASSWORD production
# Generate + set a strong cookie signing secret
AUTH_SECRET=$(openssl rand -hex 32)
echo "$AUTH_SECRET" | vercel env add AUTH_SECRET production
# Optional: set up Vercel KV for progress sync
# vercel kv create polyglot-progress
vercel --prod
```

## Project structure

```
src/
  app/                 — Next.js App Router pages, layouts, API routes (incl. /login + /api/auth/*)
  components/          — UI components, sandbox runners, phase views, layout
  components/auth/     — login form (client component)
  curriculum/          — phase data: one TypeScript file per language (10 levels)
  lib/                 — storage/KV utilities, progress hook, sandbox loaders
  lib/auth.ts          — JWT sign/verify helpers (jose, HS256), cookie + public-path constants
  proxy.ts             — Cookie-based auth gate (redirects unauthenticated users to /login)
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
- **Single-user, password-protected:** signed HTTP-only session cookie (HS256 via `jose`) issued after a username/password check; constant-time credential comparison in `src/app/api/auth/login/route.ts`.
- **Security headers:** HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy set in `next.config.ts` via `headers()`.

## License

MIT
