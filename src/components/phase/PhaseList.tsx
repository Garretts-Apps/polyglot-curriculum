'use client';

import Link from 'next/link';
import type { Phase, LanguageMeta } from '@/curriculum/types';
import { useProgress } from '@/lib/use-progress';
import { BlockProgress } from '@/components/ui/BlockProgress';
import { StatusTag } from '@/components/ui/StatusTag';
import type { StatusKind } from '@/components/ui/StatusTag';
import { phasePassed } from '@/lib/phase-status';

interface PhaseListProps {
  phases: Phase[];
  langMeta: LanguageMeta;
}

/** Zero-pad to 2 chars: 1 → "01", 10 → "10" */
function paddedLevel(level: number): string {
  return level.toString().padStart(2, '0');
}

/** Tighten "6-10 hours" → "6-10h" for the time column. */
function formatTime(estimate: string): string {
  const m = estimate.match(/(\d+)\s*-\s*(\d+)/);
  if (m) return `${m[1]}-${m[2]}h`;
  const single = estimate.match(/(\d+)/);
  return single ? `${single[1]}h` : estimate;
}

/**
 * Row-level state.
 *
 *  - skip     → phase.level <= startLevel and not completed (dimmed, [ SKIP ])
 *  - done     → completed
 *  - wip      → some checks passed but not all
 *  - todo     → no progress
 *  - locked   → previous phase hasn't met 80% pass threshold
 */
type RowState = 'skip' | 'done' | 'wip' | 'todo' | 'locked';

function getRowState(args: {
  isBelowStart: boolean;
  isCompleted: boolean;
  passed: number;
  total: number;
  isLocked: boolean;
}): RowState {
  const { isBelowStart, isCompleted, passed, total, isLocked } = args;
  if (isCompleted) return 'done';
  if (isLocked) return 'locked';
  if (passed > 0 && passed < total) return 'wip';
  if (isBelowStart) return 'skip';
  return 'todo';
}

function rowStatusKind(state: RowState): StatusKind {
  switch (state) {
    case 'done':
      return 'ok';
    case 'wip':
      return 'running';
    case 'skip':
    case 'locked':
      return 'locked';
    case 'todo':
    default:
      return 'pending';
  }
}

/**
 * Override label so the status column matches the brief exactly:
 * [ DONE ] / [ WIP  ] / [ TODO ] / [ SKIP ] / [ LOCK ]
 */
function rowStatusLabel(state: RowState): string {
  switch (state) {
    case 'done':
      return 'DONE';
    case 'wip':
      return 'WIP ';
    case 'skip':
      return 'SKIP';
    case 'locked':
      return 'LOCK';
    case 'todo':
    default:
      return 'TODO';
  }
}

export function PhaseList({ phases, langMeta }: PhaseListProps) {
  const { state } = useProgress();
  const intake = state.intake;

  const startLevel = intake?.startLevels[langMeta.id] ?? langMeta.defaultStartLevel;
  const targetLevel = intake?.targetLevels[langMeta.id] ?? 4;

  const visiblePhases = phases.filter((p) => p.level <= targetLevel);
  const accent = `var(${langMeta.accentVar})`;

  // Column template:
  //   ##(4) | title(1fr) | time(7ch) | progress(28ch) | status(8ch)
  // Designed so the unicode box edges line up at every breakpoint.
  const gridCols = '4ch 1fr 7ch 28ch 8ch';

  return (
    <section aria-label="phases" className="font-mono">
      {/* ── Table title ──────────────────────────────────────────────────── */}
      <h2
        className="mb-2 text-xs uppercase tracking-[0.18em] flex items-center gap-2"
        style={{ color: 'var(--fg-dim)' }}
      >
        <span aria-hidden="true">┌─</span>
        <span style={{ color: 'var(--fg-muted)' }}>phases</span>
        <span aria-hidden="true" style={{ color: 'var(--border-active)' }}>
          ──
        </span>
        <span style={{ color: 'var(--fg-dim)' }} className="tabular-nums">
          {visiblePhases.length}/{phases.length}
        </span>
        <span aria-hidden="true" className="flex-1 text-right truncate">
          ────────────────────────────────────
        </span>
      </h2>

      {/* ── Desktop: TUI table ───────────────────────────────────────────── */}
      <div
        className="hidden sm:block border"
        style={{
          borderColor: 'var(--border-active)',
          backgroundColor: 'color-mix(in srgb, var(--bg-elevated) 70%, transparent)',
        }}
      >
        {/* Column header row */}
        <div
          className="grid items-center text-[11px] uppercase tracking-[0.16em] border-b"
          style={{
            gridTemplateColumns: gridCols,
            color: 'var(--fg-dim)',
            borderColor: 'var(--border-active)',
            backgroundColor: 'var(--bg)',
          }}
        >
          <ColHeader>##</ColHeader>
          <ColHeader>title</ColHeader>
          <ColHeader>time</ColHeader>
          <ColHeader>progress</ColHeader>
          <ColHeader className="text-center">status</ColHeader>
        </div>

        {/* Rows */}
        <ul className="divide-y" style={{ borderColor: 'var(--border)' }}>
          {visiblePhases.map((phase, idx) => {
            const progress = state.phases[phase.id];
            const checkResults = progress?.checkResults ?? {};
            const totalChecks = phase.checks.length;
            const passedChecks = Object.values(checkResults).filter(
              (r) => r.status === 'pass',
            ).length;
            const pct = totalChecks > 0 ? passedChecks / totalChecks : 0;
            const isBelowStart = phase.level <= startLevel;
            const isCompleted = progress?.completed ?? false;

            // A phase is locked if it's not the first visible phase and the
            // previous phase hasn't met the 80% pass threshold.
            const prevPhase = idx > 0 ? visiblePhases[idx - 1] : undefined;
            const isLocked =
              prevPhase !== undefined && !phasePassed(prevPhase, state.phases[prevPhase.id]);

            const rowState = getRowState({
              isBelowStart,
              isCompleted,
              passed: passedChecks,
              total: totalChecks,
              isLocked,
            });
            const dimmed = rowState === 'skip' || rowState === 'locked';

            return (
              <li
                key={phase.id}
                style={{ borderColor: 'var(--border)' }}
                className="border-b last:border-b-0"
              >
                <Link
                  href={isLocked ? '#' : `/${langMeta.id}/${phase.level}`}
                  aria-disabled={isLocked}
                  className="group relative grid items-center transition-colors duration-100"
                  style={{
                    gridTemplateColumns: gridCols,
                    opacity: dimmed ? 0.5 : 1,
                    pointerEvents: isLocked ? 'none' : undefined,
                    cursor: isLocked ? 'not-allowed' : undefined,
                  }}
                  aria-label={`phase ${paddedLevel(phase.level)}: ${phase.title}`}
                >
                  {/* Accent left bar on hover/focus */}
                  <span
                    aria-hidden="true"
                    className="absolute top-0 bottom-0 left-0 w-[2px] opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-100"
                    style={{
                      backgroundColor: accent,
                      boxShadow: `0 0 8px color-mix(in srgb, ${accent} 60%, transparent)`,
                    }}
                  />
                  {/* Background hover tint */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-100"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${accent} 6%, transparent)`,
                    }}
                  />

                  {/* ## */}
                  <Cell>
                    <span
                      className="tabular-nums text-xs"
                      style={{
                        color: isCompleted ? 'var(--accent-prompt)' : accent,
                      }}
                    >
                      {paddedLevel(phase.level)}
                    </span>
                  </Cell>

                  {/* title */}
                  <Cell>
                    <span
                      className="text-sm truncate inline-flex items-center gap-1.5 min-w-0"
                      style={{ color: 'var(--fg)' }}
                    >
                      <span
                        className="opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity flex-shrink-0"
                        style={{ color: accent }}
                        aria-hidden="true"
                      >
                        ▸
                      </span>
                      <span className="truncate">{phase.title}</span>
                    </span>
                  </Cell>

                  {/* time */}
                  <Cell>
                    <span
                      className="text-xs tabular-nums"
                      style={{ color: 'var(--fg-muted)' }}
                    >
                      {formatTime(phase.timeEstimate)}
                    </span>
                  </Cell>

                  {/* progress */}
                  <Cell>
                    <BlockProgress
                      value={pct}
                      color={accent}
                      width={20}
                      showPercent
                    />
                  </Cell>

                  {/* status */}
                  <Cell className="justify-center">
                    <StatusTag
                      status={rowStatusKind(rowState)}
                      label={rowStatusLabel(rowState)}
                    />
                  </Cell>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Bottom border accent */}
        <div
          aria-hidden="true"
          className="h-[1px]"
          style={{ backgroundColor: 'var(--border-active)' }}
        />
      </div>

      {/* ── Mobile: stacked cards (still terminal-styled) ────────────────── */}
      <ul className="sm:hidden space-y-1">
        {visiblePhases.map((phase, idx) => {
          const progress = state.phases[phase.id];
          const checkResults = progress?.checkResults ?? {};
          const totalChecks = phase.checks.length;
          const passedChecks = Object.values(checkResults).filter(
            (r) => r.status === 'pass',
          ).length;
          const pct = totalChecks > 0 ? passedChecks / totalChecks : 0;
          const isBelowStart = phase.level <= startLevel;
          const isCompleted = progress?.completed ?? false;

          const prevPhase = idx > 0 ? visiblePhases[idx - 1] : undefined;
          const isLocked =
            prevPhase !== undefined && !phasePassed(prevPhase, state.phases[prevPhase.id]);

          const rowState = getRowState({
            isBelowStart,
            isCompleted,
            passed: passedChecks,
            total: totalChecks,
            isLocked,
          });
          const dimmed = rowState === 'skip' || rowState === 'locked';

          return (
            <li key={phase.id}>
              <Link
                href={isLocked ? '#' : `/${langMeta.id}/${phase.level}`}
                aria-disabled={isLocked}
                className="group block relative border px-3 py-3 transition-colors duration-100"
                style={{
                  borderColor: 'var(--border)',
                  backgroundColor: 'var(--bg-elevated)',
                  opacity: dimmed ? 0.55 : 1,
                  pointerEvents: isLocked ? 'none' : undefined,
                  cursor: isLocked ? 'not-allowed' : undefined,
                }}
              >
                {/* Accent bar */}
                <span
                  aria-hidden="true"
                  className="absolute top-0 bottom-0 left-0 w-[2px]"
                  style={{
                    backgroundColor: isCompleted ? 'var(--accent-prompt)' : accent,
                    opacity: 0.6,
                  }}
                />
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="flex items-center gap-2 min-w-0">
                    <span
                      className="text-xs tabular-nums flex-shrink-0"
                      style={{
                        color: isCompleted ? 'var(--accent-prompt)' : accent,
                      }}
                    >
                      {paddedLevel(phase.level)}
                    </span>
                    <span
                      className="text-sm font-medium truncate"
                      style={{ color: 'var(--fg)' }}
                    >
                      {phase.title}
                    </span>
                  </span>
                  <StatusTag
                    status={rowStatusKind(rowState)}
                    label={rowStatusLabel(rowState)}
                  />
                </div>
                <div
                  className="flex items-center justify-between gap-2 text-[11px]"
                  style={{ color: 'var(--fg-muted)' }}
                >
                  <span className="tabular-nums">{formatTime(phase.timeEstimate)}</span>
                  <BlockProgress value={pct} color={accent} width={12} showPercent />
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Empty state */}
      {visiblePhases.length === 0 && (
        <div
          className="text-xs text-center py-10 border border-dashed"
          style={{
            color: 'var(--fg-muted)',
            borderColor: 'var(--border-active)',
            backgroundColor: 'var(--bg-elevated)',
          }}
        >
          <span style={{ color: 'var(--accent-warn)' }}>warn:</span>{' '}
          no phases at or below your target level
          <br />
          <span style={{ color: 'var(--fg-dim)' }} className="text-[11px]">
            adjust target_level in $ /intake
          </span>
        </div>
      )}

      {/* Closing footer line — TUI corner */}
      <p
        className="mt-2 text-[11px] flex items-center gap-2"
        style={{ color: 'var(--fg-dim)' }}
      >
        <span aria-hidden="true">└─</span>
        <span>
          {visiblePhases.length} {visiblePhases.length === 1 ? 'phase' : 'phases'} shown
        </span>
        <span aria-hidden="true">·</span>
        <span>
          target_level=<span style={{ color: accent }}>L{targetLevel}</span>
        </span>
      </p>
    </section>
  );
}

/* ─── Cell primitives ─────────────────────────────────────────────────── */

interface CellProps {
  children: React.ReactNode;
  className?: string;
}

function Cell({ children, className = '' }: CellProps) {
  return (
    <div
      className={`relative z-10 px-3 py-2.5 flex items-center min-w-0 ${className}`}
    >
      {children}
    </div>
  );
}

function ColHeader({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`px-3 py-2 flex items-center ${className}`}>{children}</div>
  );
}
