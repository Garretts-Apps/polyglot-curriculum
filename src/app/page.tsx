'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LANGUAGES } from '@/curriculum/types';
import { AppShell } from '@/components/layout/AppShell';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { LanguagePill } from '@/components/ui/LanguagePill';
import { useProgress } from '@/lib/use-progress';
import type { Language } from '@/curriculum/types';

function calcProgress(
  language: Language,
  phases: Record<string, { completed: boolean; language: Language }>,
  startLevel: number,
  targetLevel: number,
): number {
  if (targetLevel <= startLevel) return 0;
  const totalPhases = targetLevel - startLevel;
  const done = Object.values(phases).filter(
    (p) => p.language === language && p.completed,
  ).length;
  return Math.round((done / totalPhases) * 100);
}

export default function HomePage() {
  const router = useRouter();
  const { state, hydrated } = useProgress();

  useEffect(() => {
    if (hydrated && state.intake === null) {
      router.push('/intake');
    }
  }, [hydrated, state.intake, router]);

  const intake = state.intake;
  const hasAnyProgress = Object.values(state.phases).some((p) => p.completed);

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-8 py-12 sm:py-16">
        {/* Header */}
        <header className="mb-12 sm:mb-16">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p
                className="text-sm font-mono uppercase tracking-widest mb-3"
                style={{ color: 'var(--fg-muted)' }}
              >
                Welcome back, Garrett
              </p>
              <h1
                className="font-serif font-semibold leading-none"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.25rem, 6vw, 4rem)',
                  letterSpacing: '-0.03em',
                  color: 'var(--fg)',
                }}
              >
                Polyglot
                <br />
                Curriculum
              </h1>
              <p
                className="mt-4 text-base sm:text-lg max-w-md"
                style={{ color: 'var(--fg-muted)', lineHeight: '1.65' }}
              >
                Six languages. Structured phases. One dashboard.
              </p>
            </div>

            {!hasAnyProgress && (
              <Link
                href="/intake"
                className="hidden sm:flex items-center gap-2 px-5 py-3 rounded-[var(--radius-md)] text-sm font-sans font-medium transition-all duration-150 mt-2 min-h-[44px]"
                style={{
                  backgroundColor: 'var(--fg)',
                  color: 'var(--bg)',
                }}
              >
                Start intake
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </div>

          {/* Divider */}
          <div className="mt-10 sm:mt-12 h-px" style={{ backgroundColor: 'var(--border)' }} />
        </header>

        {/* Empty state */}
        {!hasAnyProgress && (
          <div
            className="mb-12 p-6 rounded-[var(--radius-lg)] border flex flex-col sm:flex-row items-start sm:items-center gap-4"
            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-elevated)' }}
          >
            <div
              className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'color-mix(in srgb, var(--accent-python) 15%, transparent)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-python)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4M12 16h.01" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-sans font-medium" style={{ color: 'var(--fg)' }}>
                No intake done yet
              </p>
              <p className="text-sm mt-0.5" style={{ color: 'var(--fg-muted)' }}>
                Complete the intake to set your starting levels and unlock phase tracking.
              </p>
            </div>
            <Link
              href="/intake"
              className="sm:hidden flex items-center gap-2 px-4 py-2.5 rounded-[var(--radius-md)] text-sm font-sans font-medium transition-colors duration-150 min-h-[44px]"
              style={{ backgroundColor: 'var(--fg)', color: 'var(--bg)' }}
            >
              Start intake
            </Link>
          </div>
        )}

        {/* Language grid */}
        <section aria-label="Languages">
          <h2 className="sr-only">Languages</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {LANGUAGES.map((lang) => {
              const startLevel = intake?.startLevels[lang.id] ?? lang.defaultStartLevel;
              const targetLevel = intake?.targetLevels[lang.id] ?? 4;
              const progress = calcProgress(lang.id, state.phases, startLevel, targetLevel);

              return (
                <Link
                  key={lang.id}
                  href={`/${lang.id}`}
                  className="group block rounded-[var(--radius-lg)] border overflow-hidden transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{
                    borderColor: 'var(--border)',
                    backgroundColor: 'var(--bg-elevated)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = `var(--accent-${lang.id})`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                  }}
                >
                  {/* Accent strip */}
                  <div
                    className="h-0.5 w-full transition-opacity duration-150 opacity-60 group-hover:opacity-100"
                    style={{ backgroundColor: `var(--accent-${lang.id})` }}
                    aria-hidden="true"
                  />

                  <div className="p-5">
                    {/* Language name + pill */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3
                        className="font-serif font-semibold text-xl leading-tight"
                        style={{
                          fontFamily: 'var(--font-display)',
                          color: 'var(--fg)',
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {lang.name}
                      </h3>
                      <LanguagePill language={lang.id} name={lang.id} size="sm" />
                    </div>

                    {/* Blurb */}
                    <p
                      className="text-sm leading-relaxed mb-4 line-clamp-2"
                      style={{ color: 'var(--fg-muted)' }}
                    >
                      {lang.blurb}
                    </p>

                    {/* Levels */}
                    <div className="flex items-center gap-2 mb-3 text-xs font-mono" style={{ color: 'var(--fg-muted)' }}>
                      <span>Level {startLevel}</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                      <span style={{ color: `var(--accent-${lang.id})` }}>Level {targetLevel}</span>
                    </div>

                    {/* Progress bar */}
                    <ProgressBar
                      value={progress}
                      accentVar={lang.accentVar}
                      label="Progress"
                      showLabel
                    />

                    {/* CTA */}
                    <div className="mt-4 flex items-center justify-end">
                      <span
                        className="text-sm font-sans font-medium flex items-center gap-1 transition-all duration-150 group-hover:gap-2"
                        style={{ color: `var(--accent-${lang.id})` }}
                      >
                        Continue
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
