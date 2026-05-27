'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import type { ProgressState, PhaseProgress } from './storage';
import { DEFAULT_STATE, STORAGE_VERSION } from './storage';

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

  // Hydrate from server on mount — server is the source of truth
  useEffect(() => {
    fetch('/api/progress')
      .then((r) => (r.ok && r.status !== 204 ? r.json() : null))
      .then((server: ProgressState | null) => {
        if (server && server.version === STORAGE_VERSION) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setState(server);
        }
      })
      .catch(() => {})
      .finally(() => {
        setHydrated(true);
      });
  }, []);

  // Sync to server on every change after hydration (debounced)
  useEffect(() => {
    if (!hydrated) return;
    if (syncTimer.current) clearTimeout(syncTimer.current);
    syncTimer.current = setTimeout(() => {
      fetch('/api/progress', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state),
      }).catch(() => {});
    }, 800);
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
