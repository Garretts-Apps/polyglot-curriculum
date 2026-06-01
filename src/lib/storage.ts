import type { Language } from '@/curriculum/types';

export const STORAGE_VERSION = 1;
export const STORAGE_KEY = 'polyglot-curriculum:v1';

export type CheckResult = {
  checkId: string;
  status: 'pass' | 'fail' | 'pending';
  attempts: number;
  lastAttemptAt: string; // ISO
};

export type PhaseProgress = {
  phaseId: string;
  language: Language;
  level: number;
  completed: boolean;
  completedAt?: string;
  credentialId?: string;
  notes: string; // markdown notes from user
  checkResults: Record<string, CheckResult>;
};

export type IntakeAnswers = {
  fullName?: string;
  startLevels: Record<Language, number>; // 0..10
  targetLevels: Record<Language, number>; // 1..10
  weeklyHours: number;
  priorities: Language[]; // ordering
  completedAt: string; // ISO
};

export type ProgressState = {
  version: number;
  intake: IntakeAnswers | null;
  phases: Record<string, PhaseProgress>; // keyed by phaseId
  lastActiveAt: string;
};

export const DEFAULT_STATE: ProgressState = {
  version: STORAGE_VERSION,
  intake: null,
  phases: {},
  lastActiveAt: new Date(0).toISOString(),
};

export function loadLocal(): ProgressState {
  if (typeof window === 'undefined') return DEFAULT_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as ProgressState;
    if (parsed.version !== STORAGE_VERSION) {
      console.warn('know your language™: stored version mismatch, resetting to defaults');
      return DEFAULT_STATE;
    }
    return parsed;
  } catch {
    return DEFAULT_STATE;
  }
}

export function saveLocal(state: ProgressState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // storage quota exceeded or unavailable — silently ignore
  }
}

export function exportJson(state: ProgressState): string {
  return JSON.stringify(state, null, 2);
}

export function stripDangerousKeys(obj: unknown): unknown {
  if (typeof obj !== 'object' || obj === null) return obj;
  if (Array.isArray(obj)) return obj.map(stripDangerousKeys);
  const out: Record<string, unknown> = Object.create(null);
  for (const [k, v] of Object.entries(obj)) {
    if (k === '__proto__' || k === 'constructor' || k === 'prototype') continue;
    out[k] = stripDangerousKeys(v);
  }
  return out;
}

export function importJson(raw: string): ProgressState | null {
  try {
    const parsed = stripDangerousKeys(JSON.parse(raw)) as ProgressState;
    if (
      typeof parsed !== 'object' ||
      parsed === null ||
      parsed.version !== STORAGE_VERSION ||
      typeof parsed.lastActiveAt !== 'string' ||
      typeof parsed.phases !== 'object'
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function resetLanguage(state: ProgressState, lang: Language): ProgressState {
  const phases: Record<string, PhaseProgress> = {};
  for (const [id, phase] of Object.entries(state.phases)) {
    if (phase.language !== lang) {
      phases[id] = phase;
    }
  }
  return { ...state, phases, lastActiveAt: new Date().toISOString() };
}

export function resetAll(): ProgressState {
  return { ...DEFAULT_STATE, lastActiveAt: new Date().toISOString() };
}
