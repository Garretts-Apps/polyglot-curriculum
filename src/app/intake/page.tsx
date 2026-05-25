'use client';

import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { IntakeForm } from '@/components/intake/IntakeForm';
import { useProgress } from '@/lib/use-progress';

export default function IntakePage() {
  const { state, hydrated } = useProgress();

  if (!hydrated) return null;

  if (state.intake !== null) {
    return (
      <AppShell>
        <div className="mx-auto w-full max-w-2xl px-4 sm:px-8 py-16 text-center">
          <h1
            className="font-serif font-semibold mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              letterSpacing: '-0.025em',
            }}
          >
            Intake already complete
          </h1>
          <p className="text-sm mb-6" style={{ color: 'var(--fg-muted)' }}>
            You&apos;ve already completed intake.
          </p>
          <Link
            href="/settings"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-[var(--radius-md)] text-sm font-medium transition-colors hover:bg-[var(--bg-elevated)] border"
            style={{ borderColor: 'var(--border)', color: 'var(--fg)', minHeight: '44px' }}
          >
            Edit in Settings →
          </Link>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-2xl px-4 sm:px-8 py-10">
        <header className="mb-10">
          <h1
            className="font-serif font-semibold mb-2"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              letterSpacing: '-0.03em',
              color: 'var(--fg)',
            }}
          >
            Welcome to Polyglot Curriculum
          </h1>
          <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>
            Tell us your current level in each language and where you want to go.
          </p>
        </header>

        <IntakeForm />
      </div>
    </AppShell>
  );
}
