'use client';
import { useEffect, useState, useCallback, useRef } from 'react';
import type { ProgressState, PhaseProgress } from './storage';
import { loadLocal, saveLocal, DEFAULT_STATE, STORAGE_VERSION } from './storage';

export function useProgress() {
  const [state, setState] = useState<ProgressState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = useState(false);
  const syncTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hydrate from localStorage on mount, then merge with server if server is newer
  useEffect(() => {
    const local = loadLocal();
    setState(local);
    setHydrated(true);
    fetch('/api/progress')
      .then((r) => (r.ok ? r.json() : null))
      .then((server: ProgressState | null) => {
        if (server && server.version === STORAGE_VERSION) {
          // Use functional setter to avoid clobbering local edits made while
          // the server fetch was in flight.
          setState((curr) => {
            const serverDate = new Date(server.lastActiveAt).getTime();
            const currDate = new Date(curr.lastActiveAt).getTime();
            if (serverDate > currDate) {
              saveLocal(server);
              return server;
            }
            return curr;
          });
        }
      })
      .catch(() => {});
  }, []);

  // Save to localStorage on every change after hydration
  useEffect(() => {
    if (!hydrated) return;
    saveLocal(state);
    // Debounced server sync
    if (syncTimer.current) clearTimeout(syncTimer.current);
    syncTimer.current = setTimeout(() => {
      fetch('/api/progress', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state),
      }).catch(() => {});
    }, 800);
    // Clean up pending debounce timer on unmount
    return () => {
      if (syncTimer.current) clearTimeout(syncTimer.current);
    };
  }, [state, hydrated]);

  const setIntake = useCallback((intake: ProgressState['intake']) => {
    setState((s) => ({ ...s, intake, lastActiveAt: new Date().toISOString() }));
  }, []);

  const updatePhase = useCallback(
    (phaseId: string, updater: (prev: PhaseProgress | undefined) => PhaseProgress) => {
      setState((s) => ({
        ...s,
        phases: { ...s.phases, [phaseId]: updater(s.phases[phaseId]) },
        lastActiveAt: new Date().toISOString(),
      }));
    },
    [],
  );

  const resetState = useCallback((next: ProgressState) => setState(next), []);

  return { state, hydrated, setIntake, updatePhase, resetState };
}
