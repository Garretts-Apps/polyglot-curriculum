'use client';

import { useEffect } from 'react';

/**
 * Mounts client-side and registers the `/sw.js` service worker.
 *
 * Registration is fire-and-forget — failures are logged but never thrown,
 * since SW is a progressive enhancement (PWA install + offline cache).
 *
 * Runs only in browsers that support service workers and only outside of
 * Next.js dev (sw caching during dev causes confusing stale-asset bugs).
 */
export function PWARegister() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!('serviceWorker' in navigator)) return;
    if (process.env.NODE_ENV !== 'production') return;

    const onLoad = () => {
      navigator.serviceWorker.register('/sw.js')
        .then((reg) => {
          // Request notification permissions
          if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission().catch(() => {});
          }

          // Register periodic sync for daily reminders if supported
          if ('periodicSync' in reg) {
            const pReg = reg as any;
            pReg.periodicSync.register('daily-reminder', {
              minInterval: 24 * 60 * 60 * 1000, // 24 hours
            }).catch((err: any) => {
              // eslint-disable-next-line no-console
              console.warn('[pwa] periodic sync registration failed:', err);
            });
          }

          // Sync current progress state to the service worker cache
          const localKey = 'polyglot-curriculum:v1';
          const raw = localStorage.getItem(localKey);
          if (raw) {
            try {
              const state = JSON.parse(raw);
              // Wait for active service worker controller to post message
              if (navigator.serviceWorker.controller) {
                navigator.serviceWorker.controller.postMessage({
                  type: 'SYNC_PROGRESS',
                  state
                });
              } else {
                reg.active?.postMessage({
                  type: 'SYNC_PROGRESS',
                  state
                });
              }
            } catch {}
          }
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.warn('[pwa] service worker registration failed:', err);
        });
    };

    if (document.readyState === 'complete') {
      onLoad();
    } else {
      window.addEventListener('load', onLoad, { once: true });
      return () => window.removeEventListener('load', onLoad);
    }
  }, []);

  return null;
}
