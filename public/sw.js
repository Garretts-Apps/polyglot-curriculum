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

// ─── push notifications & periodic sync ─────────────────────────────────────

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SYNC_PROGRESS') {
    const state = event.data.state;
    event.waitUntil(
      caches.open('polyglot-state').then((cache) => {
        return cache.put('/sw-state', new Response(JSON.stringify(state)));
      }).catch(() => {})
    );
  }
});

self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'daily-reminder') {
    event.waitUntil(showDailyReminder());
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // If a tab is already open, focus it
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      // Otherwise open a new tab
      if (clients.openWindow) return clients.openWindow('/');
    })
  );
});

async function showDailyReminder() {
  try {
    const cache = await caches.open('polyglot-state');
    const response = await cache.match('/sw-state');
    if (!response) return;
    const state = await response.json();

    // 1. Calculate XP and streak
    let xp = 0;
    const activeDates = new Set();
    let targetLang = 'python';
    let targetLevel = 1;
    let highestCompletedLevel = 0;

    for (const [_, progress] of Object.entries(state.phases || {})) {
      if (progress.completed) {
        xp += 500;
        if (progress.completedAt) {
          const dateStr = progress.completedAt.split('T')[0];
          if (dateStr) activeDates.add(dateStr);
        }
        highestCompletedLevel = Math.max(highestCompletedLevel, progress.level);
      } else {
        targetLang = progress.language;
        targetLevel = progress.level;
      }

      for (const [__, check] of Object.entries(progress.checkResults || {})) {
        if (check.status === 'pass') {
          const isCode = check.checkId.includes('-code-');
          xp += isCode ? 150 : 50;
          if (check.lastAttemptAt) {
            const dateStr = check.lastAttemptAt.split('T')[0];
            if (dateStr) activeDates.add(dateStr);
          }
        }
      }
    }

    let streak = 0;
    if (activeDates.size > 0) {
      const sortedDates = Array.from(activeDates).sort();
      const todayStr = new Date().toISOString().split('T')[0];
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      const latestDateStr = sortedDates[sortedDates.length - 1];

      if (latestDateStr === todayStr || latestDateStr === yesterdayStr) {
        streak = 1;
        const curr = new Date(latestDateStr + 'T00:00:00');
        while (true) {
          curr.setDate(curr.getDate() - 1);
          const checkStr = curr.toISOString().split('T')[0];
          if (activeDates.has(checkStr)) {
            streak++;
          } else {
            break;
          }
        }
      }
    }

    const RANKS = [
      { name: 'guest@polyglot', xp: 0 },
      { name: 'script-kiddie', xp: 1 },
      { name: 'byte-hacker', xp: 250 },
      { name: 'stack-pointer', xp: 750 },
      { name: 'buffer-overflow', xp: 1500 },
      { name: 'kernel-panic', xp: 3000 },
      { name: 'shellcode-wizard', xp: 5000 },
      { name: 'garbage-collector', xp: 8000 },
      { name: 'compiler-compiler', xp: 12000 },
      { name: 'category-theorist', xp: 18000 },
      { name: 'root@polyglot', xp: 25000 },
    ];

    let rank = 'guest@polyglot';
    for (const r of RANKS) {
      if (xp >= r.xp) rank = r.name;
    }

    const langNames = {
      python: 'Python',
      typescript: 'TypeScript',
      go: 'Go',
      rust: 'Rust',
      csharp: 'C#',
      fsharp: 'F#',
    };
    const name = langNames[targetLang] || 'coding';

    let title = 'Start your coding quest! 🚀';
    let body = 'Complete your first level Hello World or quiz to start earning XP!';

    if (streak > 0) {
      title = 'Keep the Streak Alive! 🔥';
      body = `Your ${streak}-day coding streak is active. Solve a task in ${name} to level up your ${rank} rank!`;
    } else if (highestCompletedLevel > 0) {
      title = 'Resume your learning path 💻';
      body = `You are currently a ${rank}. Hop back in and check out Level ${targetLevel} of ${name}!`;
    }

    await self.registration.showNotification(title, {
      body: body,
      icon: '/icons/icon-192.png',
      tag: 'daily-reminder',
      renotify: true,
    });
  } catch (e) {
    console.error('Failed to show daily reminder in service worker:', e);
  }
}
