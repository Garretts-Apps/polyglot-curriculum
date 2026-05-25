'use client';

import Link from 'next/link';
import type { LanguageMeta } from '@/curriculum/types';
import { useProgress } from '@/lib/use-progress';
import { PhaseList } from '@/components/phase/PhaseList';
import { getPhasesForLanguage } from '@/curriculum/phases';

interface LanguagePageClientProps {
  langMeta: LanguageMeta;
}

export function LanguagePageClient({ langMeta }: LanguagePageClientProps) {
  const { state } = useProgress();
  const intake = state.intake;

  const startLevel = intake?.startLevels[langMeta.id] ?? langMeta.defaultStartLevel;
  const targetLevel = intake?.targetLevels[langMeta.id] ?? 4;

  const phases = getPhasesForLanguage(langMeta.id);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 sm:px-8 py-10">
      {/* Accent strip */}
      <div
        className="h-1 w-full rounded-full mb-8"
        style={{ backgroundColor: `var(${langMeta.accentVar})` }}
        aria-hidden="true"
      />

      {/* Header */}
      <header className="mb-8">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h1
            className="font-serif font-semibold"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              letterSpacing: '-0.03em',
              color: 'var(--fg)',
            }}
          >
            {langMeta.name}
          </h1>
          <Link
            href="/"
            className="text-sm flex items-center gap-1 mt-2 transition-opacity hover:opacity-70"
            style={{ color: 'var(--fg-muted)', minHeight: '44px' }}
          >
            ← All languages
          </Link>
        </div>
        <p className="text-sm mb-4" style={{ color: 'var(--fg-muted)' }}>
          {langMeta.blurb}
        </p>
        <div
          className="inline-flex items-center gap-2 text-sm font-mono px-3 py-1.5 rounded-[var(--radius-md)] border"
          style={{ borderColor: 'var(--border)', color: 'var(--fg-muted)' }}
        >
          <span>Level {startLevel}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          <span style={{ color: `var(${langMeta.accentVar})` }}>Level {targetLevel}</span>
        </div>
      </header>

      {/* Phase list */}
      <PhaseList phases={phases} langMeta={langMeta} />
    </div>
  );
}
