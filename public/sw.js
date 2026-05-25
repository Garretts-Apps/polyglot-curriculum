/**
 * Polyglot Curriculum service worker.
 *
 *   Cache strategy
 *   --------------
 *   - HTML/navigation requests : network-first (so users always get fresh
 *     phase content when online); cached fallback when offline.
 *   - Static assets (CSS/JS/images/manifest/icons) : cache-first.
 *   - /api/* and /auth/*       : never cached — always network.
 *
 *   Bump CACHE_VERSION whenever you change the precache list or strategy
 *   so the activate handler can purge old caches.
 */

/* eslint-disable */
'use strict';

const CACHE_VERSION = 'v1';
const PRECACHE = `polyglot-precache-${CACHE_VERSION}`;
const RUNTIME = `polyglot-runtime-${CACHE_VERSION}`;

const PRECACHE_URLS = [
  '/',
  '/intake',
  '/settings',
  '/login',
  '/manifest.webmanifest',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon-maskable.png',
  '/apple-touch-icon.png',
];

// ─── install ────────────────────────────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(PRECACHE)
      .then((cache) =>
        // addAll is atomic; if any URL fails, the whole install fails.
        // We use individual adds so a 404 on one page doesn't break install.
        Promise.all(
          PRECACHE_URLS.map((url) =>
            cache.add(url).catch(() => {
              /* tolerate misses during install */
            }),
          ),
        ),
      )
      .then(() => self.skipWaiting()),
  );
});

// ─── activate ───────────────────────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  const expected = new Set([PRECACHE, RUNTIME]);
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => !expected.has(k)).map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

// ─── fetch ──────────────────────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Only handle GETs from the same origin.
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Skip auth + api entirely.
  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/auth/')) {
    return;
  }

  const isNavigation =
    req.mode === 'navigate' ||
    (req.headers.get('accept') || '').includes('text/html');

  if (isNavigation) {
    // Network-first for HTML.
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(RUNTIME).then((c) => c.put(req, copy)).catch(() => {});
          return res;
        })
        .catch(() =>
          caches.match(req).then(
            (cached) =>
              cached ||
              caches.match('/') ||
              new Response('offline', {
                status: 503,
                headers: { 'Content-Type': 'text/plain' },
              }),
          ),
        ),
    );
    return;
  }

  // Cache-first for static assets.
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req)
        .then((res) => {
          // Only cache successful, basic (same-origin) responses.
          if (!res || res.status !== 200 || res.type !== 'basic') return res;
          const copy = res.clone();
          caches.open(RUNTIME).then((c) => c.put(req, copy)).catch(() => {});
          return res;
        })
        .catch(() => cached);
    }),
  );
});
