'use client';

import Link from 'next/link';
import type { Phase, LanguageMeta } from '@/curriculum/types';
import { useProgress } from '@/lib/use-progress';
import { ProgressBar } from '@/components/ui/ProgressBar';

interface PhaseListProps {
  phases: Phase[];
  langMeta: LanguageMeta;
}

export function PhaseList({ phases, langMeta }: PhaseListProps) {
  const { state } = useProgress();
  const intake = state.intake;

  const startLevel = intake?.startLevels[langMeta.id] ?? langMeta.defaultStartLevel;
  const targetLevel = intake?.targetLevels[langMeta.id] ?? 4;

  const visiblePhases = phases.filter((p) => p.level <= targetLevel);

  return (
    <div className="space-y-3">
      {visiblePhases.map((phase) => {
        const progress = state.phases[phase.id];
        const checkResults = progress?.checkResults ?? {};
        const totalChecks = phase.checks.length;
        const passedChecks = Object.values(checkResults).filter((r) => r.status === 'pass').length;
        const pct = totalChecks > 0 ? Math.round((passedChecks / totalChecks) * 100) : 0;
        const isBelowStart = phase.level <= startLevel;
        const isCompleted = progress?.completed ?? false;

        return (
          <Link
            key={phase.id}
            href={`/${langMeta.id}/${phase.level}`}
            className="group flex items-center gap-4 rounded-[var(--radius-lg)] border p-4 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              borderColor: isCompleted
                ? 'rgba(34,197,94,0.3)'
                : 'var(--border)',
              backgroundColor: 'var(--bg-elevated)',
              opacity: isBelowStart ? 0.6 : 1,
            }}
          >
            {/* Level badge */}
            <div
              className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-mono font-semibold"
              style={{
                backgroundColor: isCompleted
                  ? 'rgba(34,197,94,0.15)'
                  : `color-mix(in srgb, var(${langMeta.accentVar}) 12%, transparent)`,
                color: isCompleted ? '#22c55e' : `var(${langMeta.accentVar})`,
              }}
            >
              {isCompleted ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                phase.level
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <p
                  className="text-sm font-medium leading-snug"
                  style={{ color: 'var(--fg)' }}
                >
                  {phase.title}
                </p>
                {isBelowStart && (
                  <span
                    className="flex-shrink-0 text-xs px-2 py-0.5 rounded-full border"
                    style={{ color: 'var(--fg-muted)', borderColor: 'var(--border)' }}
                  >
                    below start
                  </span>
                )}
              </div>
              <p className="text-xs mb-2" style={{ color: 'var(--fg-muted)' }}>
                {phase.timeEstimate}
              </p>
              <ProgressBar value={pct} accentVar={langMeta.accentVar} />
            </div>

            {/* Arrow */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="flex-shrink-0 transition-transform duration-150 group-hover:translate-x-0.5"
              style={{ color: 'var(--fg-muted)' }}
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        );
      })}

      {visiblePhases.length === 0 && (
        <p className="text-sm text-center py-8" style={{ color: 'var(--fg-muted)' }}>
          No phases available for your target level.
        </p>
      )}
    </div>
  );
}
