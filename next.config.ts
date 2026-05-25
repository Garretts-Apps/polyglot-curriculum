import type { NextConfig } from "next";

// `'unsafe-eval'` is required only in development: React uses `eval` to reconstruct
// server-side error stacks for the in-browser overlay. It is NOT required in production
// builds, where neither React nor Next.js rely on `eval`.
const isDev = process.env.NODE_ENV === "development";

// Content Security Policy: tightened for Safari + modern browsers now that the curriculum
// is MCQ-only (no Pyodide / esbuild-wasm / external playground iframes).
//
// - script-src: drops `'unsafe-eval'` and `'wasm-unsafe-eval'` in production.
//   `'unsafe-inline'` stays because Next.js App Router injects framework inline scripts
//   (flight payloads, `__next_r` request-id) that cannot be nonce-tagged without making
//   every page dynamic — see node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md.
// - style-src: `'unsafe-inline'` stays — Tailwind v4 and Next.js inject inline styles.
// - connect-src: only `'self'` (no CDN fetches).
// - frame-src: removed entirely (no third-party iframes anymore).
// - worker-src: kept with `blob:` for the offline service worker.
// - frame-ancestors 'none': prevents being framed (in addition to X-Frame-Options).
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self' https://fonts.gstatic.com data:",
  "connect-src 'self'",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          // Spectre / cross-site script-attack mitigation. `same-origin` is the strictest
          // value and is safe here: we serve no resources to other origins on purpose.
          {
            key: "Cross-Origin-Resource-Policy",
            value: "same-origin",
          },
          // Disable the browser's link-prefetch DNS probes — we don't depend on them
          // and Safari treats them as a privacy signal.
          {
            key: "X-DNS-Prefetch-Control",
            value: "off",
          },
          // Hint to the browser to keep this origin in its own agent cluster — improves
          // cross-tab isolation against side-channel attacks. Cheap, no compat downside.
          {
            key: "Origin-Agent-Cluster",
            value: "?1",
          },
          {
            key: "Content-Security-Policy",
            value: csp,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
