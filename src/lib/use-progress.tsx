'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import type { ProgressState, PhaseProgress } from './storage';
import { loadLocal, saveLocal, DEFAULT_STATE, STORAGE_VERSION } from './storage';

interface ProgressContextProps {
  state: ProgressState;
  hydrated: boolean;
  setIntake: (intake: ProgressState['intake']) => void;
  updatePhase: (phaseId: string, updater: (prev: PhaseProgress | undefined) => PhaseProgress) => void;
  resetState: (next: ProgressState) => void;
}

const ProgressContext = createContext<ProgressContextProps | undefined>(undefined);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ProgressState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = useState(false);
  const syncTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hydrate from localStorage on mount, then merge with server if server is newer
  useEffect(() => {
    const local = loadLocal();
    setState(local);
    setHydrated(true);
    fetch('/api/progress')
      .then((r) => (r.ok && r.status !== 204 ? r.json() : null))
      .then((server: ProgressState | null) => {
        if (server && server.version === STORAGE_VERSION) {
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

  const resetState = useCallback((next: ProgressState) => {
    setState(next);
  }, []);

  return (
    <ProgressContext.Provider value={{ state, hydrated, setIntake, updatePhase, resetState }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
