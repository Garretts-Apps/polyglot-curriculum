import type { Phase } from '@/curriculum/types';
import type { PhaseProgress } from './storage';

export const PASS_THRESHOLD = 0.8;

export function phasePassed(phase: Phase, progress: PhaseProgress | undefined): boolean {
  if (!progress) return false;
  const total = phase.checks.length;
  if (total === 0) return false;
  const passed = phase.checks.filter((c) => progress.checkResults[c.id]?.status === 'pass').length;
  return passed / total >= PASS_THRESHOLD;
}

export function phasePassFraction(
  phase: Phase,
  progress: PhaseProgress | undefined,
): { passed: number; total: number; pct: number } {
  const total = phase.checks.length;
  if (!progress || total === 0) return { passed: 0, total, pct: 0 };
  const passed = phase.checks.filter((c) => progress.checkResults[c.id]?.status === 'pass').length;
  return { passed, total, pct: passed / total };
}
