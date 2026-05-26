'use client';

import Link from 'next/link';
import type { Phase, LanguageMeta } from '@/curriculum/types';
import { useProgress } from '@/lib/use-progress';
import { StatusTag } from '@/components/ui/StatusTag';
import { phasePassed } from '@/lib/phase-status';
import { BlockProgress } from '../ui/BlockProgress';

interface PhaseTreeProps {
  phases: Phase[];
  langMeta: LanguageMeta;
}

function paddedLevel(level: number): string {
  return level.toString().padStart(2, '0');
}

export function PhaseTree({ phases, langMeta }: PhaseTreeProps) {
  const { state } = useProgress();
  const intake = state.intake;

  const startLevel = intake?.startLevels[langMeta.id] ?? langMeta.defaultStartLevel;
  const targetLevel = intake?.targetLevels[langMeta.id] ?? 4;

  const visiblePhases = phases.filter((p) => p.level <= targetLevel);
  const accent = `var(${langMeta.accentVar})`;

  // Find user progress per phase
  const getPhaseData = (phase: Phase, idx: number) => {
    const progress = state.phases[phase.id];
    const checkResults = progress?.checkResults ?? {};
    const totalChecks = phase.checks.length;
    const passedChecks = Object.values(checkResults).filter(
      (r) => r.status === 'pass',
    ).length;
    const pct = totalChecks > 0 ? passedChecks / totalChecks : 0;
    const isBelowStart = phase.level <= startLevel;
    const isCompleted = progress?.completed ?? false;

    // Check if locked
    const prevPhase = idx > 0 ? visiblePhases[idx - 1] : undefined;
    const isLocked =
      prevPhase !== undefined &&
      prevPhase.level > startLevel &&
      !phasePassed(prevPhase, state.phases[prevPhase.id]);

    let rowState: 'skip' | 'done' | 'wip' | 'todo' | 'locked' = 'todo';
    if (isCompleted) rowState = 'done';
    else if (isLocked) rowState = 'locked';
    else if (passedChecks > 0 && passedChecks < totalChecks) rowState = 'wip';
    else if (isBelowStart) rowState = 'skip';

    return { pct, rowState, isLocked, isCompleted, passedChecks, totalChecks };
  };

  return (
    <div className="relative py-12 flex flex-col items-center select-none font-mono">
      {/* Dynamic line connecting everything */}
      <div 
        className="absolute top-0 bottom-0 w-[2px] transition-all duration-300"
        style={{
          left: '50%',
          transform: 'translateX(-50%)',
          background: `linear-gradient(to bottom, ${accent} 0%, ${accent} 40%, var(--border-active) 60%, var(--border) 100%)`,
        }}
      />

      <div className="w-full relative z-10 flex flex-col gap-12">
        {visiblePhases.map((phase, idx) => {
          const { pct, rowState, isLocked, isCompleted, passedChecks, totalChecks } = getPhaseData(phase, idx);
          const isLeft = idx % 2 === 0;
          const statusKind = rowState === 'done' ? 'ok' : rowState === 'wip' ? 'running' : rowState === 'locked' || rowState === 'skip' ? 'locked' : 'pending';
          const statusLabel = rowState.toUpperCase().padEnd(4);

          return (
            <div
              key={phase.id}
              className={`flex items-center w-full ${isLeft ? 'justify-start' : 'justify-end'}`}
            >
              {/* Connector line from node to central timeline */}
              <div
                className="hidden md:block absolute h-[2px]"
                style={{
                  left: isLeft ? 'calc(25% + 4px)' : '50%',
                  right: isLeft ? '50%' : 'calc(25% + 4px)',
                  background: isCompleted || rowState === 'wip' ? accent : 'var(--border)',
                }}
              />

              <div className="w-full md:w-[48%] group">
                <Link
                  href={isLocked ? '#' : `/${langMeta.id}/${phase.level}`}
                  onClick={(e) => { if (isLocked) e.preventDefault(); }}
                  aria-disabled={isLocked}
                  className={`block border p-4 transition-all duration-200 bg-[var(--bg-elevated)] ${
                    isLocked 
                      ? 'border-dashed border-[var(--border)] opacity-60 cursor-not-allowed'
                      : isCompleted
                        ? 'border-[var(--accent-prompt)] hover:shadow-[0_0_12px_rgba(126,231,135,0.15)]'
                        : 'border-[var(--border-active)] hover:border-[var(--fg-muted)]'
                  }`}
                  style={{
                    borderColor: selectedBorderColor(rowState, accent),
                  }}
                >
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className="flex items-center gap-2">
                       <span
                        className="text-xs font-semibold tabular-nums px-1.5 py-0.5 border flex items-center gap-1"
                        style={{
                          borderColor: isCompleted ? 'var(--accent-prompt)' : accent,
                          color: isCompleted ? 'var(--accent-prompt)' : accent,
                          backgroundColor: 'var(--bg)',
                        }}
                      >
                        <span aria-hidden="true" className="opacity-70">{isCompleted ? '✓' : isLocked ? '×' : ' '}</span>
                        <span>L{paddedLevel(phase.level)}</span>
                      </span>
                      <span className="text-sm font-semibold text-[var(--fg)] truncate max-w-[160px] sm:max-w-xs group-hover:text-[var(--accent-info)] transition-colors">
                        {phase.title}
                      </span>
                    </span>
                    <StatusTag status={statusKind} label={statusLabel} />
                  </div>

                  <p className="text-[11px] text-[var(--fg-muted)] mb-3 line-clamp-2">
                    {phase.intro}
                  </p>

                  <div className="flex items-center justify-between gap-4 mt-auto pt-2 border-t border-[var(--border)] text-[10px] text-[var(--fg-dim)]">
                    <span>{phase.timeEstimate}</span>
                    <div className="flex items-center gap-2">
                      <BlockProgress value={pct} color={accent} width={10} showPercent={false} />
                      <span className="tabular-nums text-[var(--fg-muted)]">{passedChecks}/{totalChecks} checks</span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function selectedBorderColor(rowState: string, accent: string): string {
  switch (rowState) {
    case 'done':
      return 'var(--accent-prompt)';
    case 'wip':
      return accent;
    case 'locked':
      return 'var(--border)';
    case 'todo':
    default:
      return 'var(--border-active)';
  }
}
