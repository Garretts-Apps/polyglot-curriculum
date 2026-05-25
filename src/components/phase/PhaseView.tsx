'use client';

import { useCallback } from 'react';
import type { Phase, LanguageMeta } from '@/curriculum/types';
import type { PhaseProgress, CheckResult } from '@/lib/storage';
import { useProgress } from '@/lib/use-progress';
import { Markdown } from '@/components/ui/Markdown';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CheckRenderer } from './CheckRenderer';
import { NotesEditor } from './NotesEditor';

interface PhaseViewProps {
  phase: Phase;
  langMeta: LanguageMeta;
}

export function PhaseView({ phase, langMeta }: PhaseViewProps) {
  const { state, updatePhase } = useProgress();
  const phaseProgress: PhaseProgress | undefined = state.phases[phase.id];

  const checkResults = phaseProgress?.checkResults ?? {};
  const passedCount = Object.values(checkResults).filter((r) => r.status === 'pass').length;
  const totalChecks = phase.checks.length;
  const allPassed = passedCount === totalChecks;
  const notes = phaseProgress?.notes ?? '';

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

  return (
    <div className="mx-auto w-full max-w-3xl px-4 sm:px-8 py-10 space-y-10">
      {/* Header */}
      <header>
        <div
          className="h-1 w-full rounded-full mb-6"
          style={{ backgroundColor: `var(${accentVar})` }}
          aria-hidden="true"
        />
        <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: `var(${accentVar})` }}>
          {langMeta.name} — Phase {phase.level}
        </p>
        <h1
          className="font-serif font-semibold mb-2"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            letterSpacing: '-0.025em',
            color: 'var(--fg)',
          }}
        >
          {phase.title}
        </h1>
        <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>
          Estimated time: {phase.timeEstimate}
        </p>
      </header>

      {/* Intro */}
      <section>
        <Markdown content={phase.intro} />
      </section>

      {/* Topics */}
      <section>
        <h2 className="text-base font-semibold mb-3" style={{ color: 'var(--fg)' }}>
          Topics
        </h2>
        <ul className="space-y-2">
          {phase.topics.map((topic, i) => (
            <li key={i}>
              <a
                href={topic.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm underline underline-offset-2 transition-opacity hover:opacity-70"
                style={{ color: `var(${accentVar})` }}
              >
                {topic.label}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
              {topic.note && (
                <p className="text-xs mt-0.5 ml-0" style={{ color: 'var(--fg-muted)' }}>
                  {topic.note}
                </p>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Deliverable */}
      <section>
        <Card elevated className="p-5 border-l-4" style={{ borderLeftColor: `var(${accentVar})` } as React.CSSProperties}>
          <p className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: `var(${accentVar})` }}>
            Deliverable
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--fg)' }}>
            {phase.deliverable}
          </p>
        </Card>
      </section>

      {/* Knowledge checks */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold" style={{ color: 'var(--fg)' }}>
            Knowledge Checks
          </h2>
          <span className="text-xs font-mono" style={{ color: 'var(--fg-muted)' }}>
            {passedCount}/{totalChecks} passed
          </span>
        </div>
        <div className="space-y-4">
          {phase.checks.map((check) => (
            <CheckRenderer
              key={check.id}
              check={check}
              language={phase.language}
              checkResult={checkResults[check.id]}
              onResult={handleResult}
            />
          ))}
        </div>
      </section>

      {/* Notes */}
      <section>
        <h2 className="text-base font-semibold mb-3" style={{ color: 'var(--fg)' }}>
          Notes
        </h2>
        <NotesEditor value={notes} onChange={handleNotesChange} />
      </section>

      {/* Mark complete */}
      <div className="flex items-center gap-4 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
        {phaseProgress?.completed ? (
          <p className="text-sm" style={{ color: '#22c55e' }}>
            Phase completed
            {phaseProgress.completedAt && (
              <span className="ml-1 text-xs" style={{ color: 'var(--fg-muted)' }}>
                on {new Date(phaseProgress.completedAt).toLocaleDateString()}
              </span>
            )}
          </p>
        ) : (
          <Button
            onClick={handleMarkComplete}
            disabled={!allPassed}
            variant="primary"
            size="md"
          >
            Mark phase complete
          </Button>
        )}
        {!allPassed && !phaseProgress?.completed && (
          <p className="text-xs" style={{ color: 'var(--fg-muted)' }}>
            Pass all {totalChecks} checks to unlock
          </p>
        )}
      </div>
    </div>
  );
}
