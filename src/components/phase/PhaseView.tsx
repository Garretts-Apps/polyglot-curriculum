'use client';

import { useCallback } from 'react';
import type { Phase, LanguageMeta } from '@/curriculum/types';
import type { PhaseProgress, CheckResult } from '@/lib/storage';
import { useProgress } from '@/lib/use-progress';
import { phasePassed, phasePassFraction, PASS_THRESHOLD } from '@/lib/phase-status';
import { getPhasesForLanguage } from '@/curriculum/phases';
import { Markdown } from '@/components/ui/Markdown';
import { Button } from '@/components/ui/Button';
import { ShellPrompt } from '@/components/ui/ShellPrompt';
import { TerminalCursor } from '@/components/ui/TerminalCursor';
import { StatusTag } from '@/components/ui/StatusTag';
import { BlockProgress } from '@/components/ui/BlockProgress';
import { CheckRenderer } from './CheckRenderer';
import { NotesEditor } from './NotesEditor';

interface PhaseViewProps {
  phase: Phase;
  langMeta: LanguageMeta;
}

function paddedLevel(level: number): string {
  return level.toString().padStart(2, '0');
}

function slugifyPhaseTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Section header — looks like a shell prompt issuing a man-page style command.
 * Renders `$ cat README.md` with a subtle accent-tinted underline rule below.
 */
function SectionHeader({
  command,
  rightSlot,
}: {
  command: string;
  rightSlot?: React.ReactNode;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3 mb-3 flex-wrap">
      <h2 className="text-sm font-semibold flex items-baseline gap-2">
        <ShellPrompt minimal command={` ${command}`} />
      </h2>
      {rightSlot}
    </div>
  );
}

export function PhaseView({ phase, langMeta }: PhaseViewProps) {
  const { state, updatePhase, hydrated } = useProgress();
  const phaseProgress: PhaseProgress | undefined = state.phases[phase.id];

  const checkResults = phaseProgress?.checkResults ?? {};
  const passedCount = Object.values(checkResults).filter((r) => r.status === 'pass').length;
  const totalChecks = phase.checks.length;
  const thresholdMet = phasePassed(phase, phaseProgress);
  const { pct: passPct } = phasePassFraction(phase, phaseProgress);
  const thresholdPct = Math.round(PASS_THRESHOLD * 100);
  const notes = phaseProgress?.notes ?? '';

  // ── Phase-lock gate ────────────────────────────────────────────────────────
  // Block direct URL access to phase N unless phase N-1 has met PASS_THRESHOLD.
  // Lookup happens client-side because progress lives in localStorage.
  // While hydrating we render the full view to avoid a flash of the lock for
  // a user who has actually passed the prior phase.
  const phasesForLang = getPhasesForLanguage(phase.language);
  const prevPhase = phasesForLang.find((p) => p.level === phase.level - 1);
  const prevProgress = prevPhase ? state.phases[prevPhase.id] : undefined;
  const isLocked =
    hydrated && prevPhase != null && !phasePassed(prevPhase, prevProgress);

  const handleResult = useCallback(
    (checkId: string, status: 'pass' | 'fail') => {
      updatePhase(phase.id, (prev) => {
        const existing = prev?.checkResults ?? {};
        const prevResult = existing[checkId];
        const result: CheckResult = {
          checkId,
          status,
          attempts: (prevResult?.attempts ?? 0) + 1,
          lastAttemptAt: new Date().toISOString(),
        };
        return {
          phaseId: phase.id,
          language: phase.language,
          level: phase.level,
          completed: prev?.completed ?? false,
          notes: prev?.notes ?? '',
          checkResults: { ...existing, [checkId]: result },
        };
      });
    },
    [phase.id, phase.language, phase.level, updatePhase],
  );

  const handleNotesChange = useCallback(
    (nextNotes: string) => {
      updatePhase(phase.id, (prev) => ({
        phaseId: phase.id,
        language: phase.language,
        level: phase.level,
        completed: prev?.completed ?? false,
        notes: nextNotes,
        checkResults: prev?.checkResults ?? {},
      }));
    },
    [phase.id, phase.language, phase.level, updatePhase],
  );

  const handleMarkComplete = useCallback(() => {
    updatePhase(phase.id, (prev) => ({
      phaseId: phase.id,
      language: phase.language,
      level: phase.level,
      completed: true,
      completedAt: new Date().toISOString(),
      notes: prev?.notes ?? '',
      checkResults: prev?.checkResults ?? {},
    }));
  }, [phase.id, phase.language, phase.level, updatePhase]);

  const accentVar = langMeta.accentVar;
  const accentColor = `var(${accentVar})`;
  const phaseSlug = `${paddedLevel(phase.level)}_${slugifyPhaseTitle(phase.title)}`;
  const progressFraction = totalChecks > 0 ? passedCount / totalChecks : 0;

  if (isLocked) {
    return (
      <div className="mx-auto w-full max-w-3xl px-3 sm:px-6 py-20 text-center font-mono">
        <p className="text-sm text-[var(--accent-error)] mb-4">
          [ ERROR: LEVEL LOCKED ]
        </p>
        <p className="text-xs text-[var(--fg-muted)] mb-8 leading-relaxed">
          You must complete at least {Math.round(PASS_THRESHOLD * 100)}% of the checks in Level {paddedLevel(prevPhase?.level ?? 0)} ({prevPhase?.title}) to unlock this phase.
        </p>
        <div>
          <Button as="link" href={`/${langMeta.id}`} variant="secondary">
            ◀ return to {langMeta.name.toLowerCase()} map
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-3 sm:px-6 py-6 sm:py-10 font-mono">
      {/* ─── Phase header ─────────────────────────────────────────────────── */}
      <header className="mb-10">
        {/* Path breadcrumb — `~/curriculum/python/03_modules-pip.phase` */}
        <p
          className="text-[11px] tracking-wider mb-3 truncate"
          style={{ color: 'var(--fg-muted)' }}
        >
          <span style={{ color: 'var(--fg-dim)' }}>~</span>
          <span style={{ color: 'var(--fg-dim)' }}>/</span>
          <span>curriculum</span>
          <span style={{ color: 'var(--fg-dim)' }}>/</span>
          <span style={{ color: accentColor }}>{langMeta.id}</span>
          <span style={{ color: 'var(--fg-dim)' }}>/</span>
          <span style={{ color: 'var(--fg)' }}>{phaseSlug}</span>
          <span style={{ color: 'var(--fg-dim)' }}>.phase</span>
        </p>

        {/* Big title with blinking cursor */}
        <h1
          className="text-2xl sm:text-[2rem] font-semibold leading-[1.15] tracking-tight flex items-center flex-wrap gap-x-2"
          style={{ color: 'var(--fg)' }}
        >
          <span style={{ color: accentColor }}>{phase.title}</span>
          <TerminalCursor color={accentColor} />
        </h1>

        {/* Status line — level · time · check progress */}
        <div
          className="mt-3 flex items-center gap-x-3 gap-y-2 flex-wrap text-[11px] tabular-nums"
          style={{ color: 'var(--fg-muted)' }}
        >
          <span className="inline-flex items-center gap-1">
            <span style={{ color: 'var(--fg-dim)' }}>level</span>
            <span style={{ color: accentColor }}>{paddedLevel(phase.level)}</span>
          </span>
          <span style={{ color: 'var(--fg-dim)' }} aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1">
            <span style={{ color: 'var(--fg-dim)' }}>time</span>
            <span style={{ color: 'var(--accent-warn)' }}>{phase.timeEstimate}</span>
          </span>
          <span style={{ color: 'var(--fg-dim)' }} aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1">
            <span style={{ color: 'var(--fg-dim)' }}>checks</span>
            <span style={{ color: 'var(--accent-prompt)' }}>{totalChecks}</span>
          </span>
          <span style={{ color: 'var(--fg-dim)' }} aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-2">
            <span style={{ color: 'var(--fg-dim)' }}>progress</span>
            <BlockProgress
              value={progressFraction}
              width={10}
              color={accentColor}
              showPercent={false}
            />
            <span style={{ color: accentColor }}>
              {passedCount}/{totalChecks}
            </span>
          </span>
          <span style={{ color: 'var(--fg-dim)' }} aria-hidden="true">·</span>
          <StatusTag status={phaseProgress?.completed ? 'ok' : thresholdMet ? 'pass' : 'pending'} />
        </div>
      </header>

      {/* ─── Intro / README ───────────────────────────────────────────────── */}
      <section className="mb-12">
        <SectionHeader command="cat README.md" />
        <div
          className="border pl-4 pr-4 py-4 relative"
          style={{
            borderColor: 'var(--border)',
            backgroundColor: 'var(--bg-elevated)',
            borderLeftWidth: '2px',
            borderLeftColor: accentColor,
          }}
        >
          {/* file-header strip */}
          <div
            className="absolute top-0 right-0 px-2 py-0.5 text-[10px] uppercase tracking-widest"
            style={{
              color: 'var(--fg-dim)',
              backgroundColor: 'var(--bg)',
              borderLeft: '1px solid var(--border)',
              borderBottom: '1px solid var(--border)',
            }}
          >
            readme.md
          </div>
          <Markdown content={phase.intro} className="prose-terminal" />
        </div>
      </section>

      {/* ─── Topics — file listing ────────────────────────────────────────── */}
      <section className="mb-12">
        <SectionHeader
          command="ls topics/"
          rightSlot={
            <span className="text-[10px] tabular-nums" style={{ color: 'var(--fg-dim)' }}>
              {phase.topics.length} {phase.topics.length === 1 ? 'file' : 'files'}
            </span>
          }
        />
        <ul
          className="border divide-y"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-elevated)' }}
        >
          {phase.topics.map((topic, i) => {
            const filename = `${slugifyPhaseTitle(topic.label)}.md`;
            return (
              <li
                key={i}
                style={{ borderColor: 'var(--border)' }}
                className="border-b last:border-b-0"
              >
                <a
                  href={topic.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid items-start gap-3 px-3 py-2.5 transition-colors duration-100 hover:bg-[var(--bg-overlay)]"
                  style={{
                    gridTemplateColumns: 'auto 1ch 1fr auto',
                  }}
                >
                  {/* file glyph */}
                  <span
                    aria-hidden="true"
                    className="font-mono text-sm select-none pt-0.5"
                    style={{ color: 'var(--fg-dim)' }}
                  >
                    <span className="inline group-hover:hidden">└─</span>
                    <span className="hidden group-hover:inline" style={{ color: accentColor }}>
                      ▸─
                    </span>
                  </span>
                  {/* cursor space */}
                  <span aria-hidden="true" />
                  <div className="min-w-0">
                    <p
                      className="text-sm leading-snug flex items-center gap-1.5"
                      style={{ color: accentColor }}
                    >
                      <span>{filename}</span>
                    </p>
                    {topic.note ? (
                      <p
                        className="text-[11px] mt-0.5 leading-snug truncate"
                        style={{ color: 'var(--fg-muted)' }}
                      >
                        <span style={{ color: 'var(--fg-dim)' }}>{'// '}</span>
                        {topic.note}
                      </p>
                    ) : (
                      <p
                        className="text-[11px] mt-0.5 truncate"
                        style={{ color: 'var(--fg-dim)' }}
                      >
                        {topic.url.replace(/^https?:\/\//, '')}
                      </p>
                    )}
                  </div>
                  <span
                    aria-hidden="true"
                    className="font-mono text-xs self-center transition-colors duration-100"
                    style={{ color: 'var(--fg-dim)' }}
                  >
                    <span className="group-hover:hidden">→</span>
                    <span
                      className="hidden group-hover:inline"
                      style={{ color: accentColor }}
                    >
                      open ↗
                    </span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ─── Deliverable — highlighted callout ────────────────────────────── */}
      <section className="mb-12">
        <SectionHeader command="cat deliverable.md" />
        <div
          className="border-l-2 border-y border-r pl-4 pr-4 py-4 relative"
          style={{
            borderLeftColor: 'var(--accent-warn)',
            borderTopColor: 'var(--border)',
            borderRightColor: 'var(--border)',
            borderBottomColor: 'var(--border)',
            backgroundColor: 'color-mix(in srgb, var(--accent-warn) 5%, var(--bg-elevated))',
          }}
        >
          <p
            className="text-[10px] uppercase tracking-widest mb-2 inline-flex items-center gap-1"
            style={{ color: 'var(--accent-warn)' }}
          >
            <span aria-hidden="true">▼</span>
            <span>deliverable</span>
            <span style={{ color: 'var(--fg-dim)' }}>{'// build this to graduate the phase'}</span>
          </p>
          <p
            className="text-sm leading-relaxed"
            style={{ color: 'var(--fg)' }}
          >
            {phase.deliverable}
          </p>
        </div>
      </section>

      {/* ─── Knowledge checks — "test cases" ──────────────────────────────── */}
      <section className="mb-12">
        <SectionHeader
          command="run knowledge-checks --verbose"
          rightSlot={
            <span
              className="text-[11px] inline-flex items-center gap-2 tabular-nums"
              style={{ color: 'var(--fg-muted)' }}
            >
              <BlockProgress
                value={progressFraction}
                width={6}
                color="var(--accent-prompt)"
                showPercent={false}
              />
              <span>
                <span style={{ color: 'var(--accent-prompt)' }}>{passedCount}</span>
                <span style={{ color: 'var(--fg-dim)' }}>/</span>
                {totalChecks} pass
              </span>
            </span>
          }
        />
        <div className="space-y-4">
          {phase.checks.map((check, idx) => {
            const result = checkResults[check.id];
            const checkStatus = result?.status === 'pass'
              ? 'pass'
              : result?.status === 'fail'
                ? 'fail'
                : 'pending';
            const kindLabel = 'multiple-choice';

            return (
              <article key={check.id}>
                {/* Test-case header strip */}
                <div
                  className="flex items-center justify-between gap-2 px-3 py-1.5 border border-b-0 text-[11px]"
                  style={{
                    borderColor: 'var(--border)',
                    backgroundColor: 'var(--bg-overlay)',
                  }}
                >
                  <span
                    className="inline-flex items-center gap-2 tabular-nums"
                    style={{ color: 'var(--fg-muted)' }}
                  >
                    <span style={{ color: 'var(--accent-prompt)' }}>
                      test/{paddedLevel(idx + 1)}
                    </span>
                    <span style={{ color: 'var(--fg-dim)' }}>·</span>
                    <span style={{ color: 'var(--fg-muted)' }}>{kindLabel}</span>
                    {result && result.attempts > 1 && (
                      <>
                        <span style={{ color: 'var(--fg-dim)' }}>·</span>
                        <span style={{ color: 'var(--fg-dim)' }}>
                          attempt #{result.attempts}
                        </span>
                      </>
                    )}
                  </span>
                  <StatusTag status={checkStatus} />
                </div>
                <CheckRenderer
                  check={check}
                  checkResult={result}
                  onResult={handleResult}
                />
              </article>
            );
          })}
        </div>
      </section>

      {/* ─── Notes ─────────────────────────────────────────────────────────── */}
      <section className="mb-12">
        <SectionHeader command="vim notes.md" />
        <NotesEditor value={notes} onChange={handleNotesChange} hydrated={hydrated} />
      </section>

      {/* ─── Mark complete CTA ─────────────────────────────────────────────── */}
      <div
        className="pt-6 mt-2 border-t"
        style={{ borderColor: 'var(--border)', borderStyle: 'dashed' }}
      >
        {phaseProgress?.completed ? (
          <div
            className="border px-4 py-3 flex items-center justify-between gap-3 flex-wrap"
            style={{
              borderColor: 'var(--accent-prompt)',
              backgroundColor: 'color-mix(in srgb, var(--accent-prompt) 6%, transparent)',
            }}
          >
            <p
              className="text-sm inline-flex items-center gap-2"
              style={{ color: 'var(--accent-prompt)' }}
            >
              <StatusTag status="ok" />
              <span>phase committed to your progress log</span>
              {phaseProgress.completedAt && (
                <span className="text-xs" style={{ color: 'var(--fg-muted)' }}>
                  @ {new Date(phaseProgress.completedAt).toLocaleDateString()}
                </span>
              )}
            </p>
          </div>
        ) : thresholdMet ? (
          <button
            onClick={handleMarkComplete}
            type="button"
            className={[
              'pulse-prompt',
              'w-full px-4 py-3 border font-mono text-sm tracking-wide',
              'inline-flex items-center justify-center gap-2',
              'transition-colors duration-150 cursor-pointer',
              'hover:bg-[var(--accent-prompt)] hover:text-[var(--bg)]',
              'focus-visible:outline-1 focus-visible:outline-offset-2',
            ].join(' ')}
            style={{
              borderColor: 'var(--accent-prompt)',
              color: 'var(--accent-prompt)',
              backgroundColor: 'transparent',
            }}
            aria-label={`Mark phase ${phase.title} complete`}
          >
            <span aria-hidden="true">[</span>
            <span aria-hidden="true">▶</span>
            <span>mark phase complete</span>
            <span aria-hidden="true">]</span>
          </button>
        ) : (
          <button
            disabled
            type="button"
            className={[
              'w-full px-4 py-3 border font-mono text-sm tracking-wide',
              'inline-flex items-center justify-center gap-2',
              'cursor-not-allowed',
            ].join(' ')}
            style={{
              borderColor: 'var(--border)',
              color: 'var(--fg-dim)',
              backgroundColor: 'var(--bg-elevated)',
              borderStyle: 'dashed',
            }}
            aria-label={`Locked: pass ${thresholdPct}% of checks to unlock`}
            aria-disabled="true"
          >
            <span aria-hidden="true">[</span>
            <span aria-hidden="true" style={{ color: 'var(--accent-warn)' }}>⊘</span>
            <span>
              pass {thresholdPct}% of checks to advance{' '}
              <span style={{ color: 'var(--fg-muted)' }}>
                ({passedCount}/{totalChecks} — {Math.round(passPct * 100)}%)
              </span>
            </span>
            <span aria-hidden="true">]</span>
          </button>
        )}

        {/* Mini-footer help */}
        <p
          className="mt-3 text-[10px] inline-flex items-center gap-x-3 gap-y-1 flex-wrap"
          style={{ color: 'var(--fg-dim)' }}
        >
          <span>
            <span style={{ color: 'var(--fg-muted)' }}>tip:</span> press{' '}
            <kbd
              className="px-1 border tabular-nums"
              style={{ borderColor: 'var(--border)', color: 'var(--fg-muted)' }}
            >
              1-9
            </kbd>{' '}
            to pick MCQ options, then{' '}
            <kbd
              className="px-1 border"
              style={{ borderColor: 'var(--border)', color: 'var(--fg-muted)' }}
            >
              enter
            </kbd>{' '}
            to submit
          </span>
          <Button
            as="link"
            href={`/${langMeta.id}`}
            variant="ghost"
            size="sm"
            bracketed
          >
            cd ..
          </Button>
        </p>
      </div>
    </div>
  );
}
