'use client';

import { AppShell } from '@/components/layout/AppShell';
import { IntakeForm } from '@/components/intake/IntakeForm';
import { ShellPrompt } from '@/components/ui/ShellPrompt';
import { TypeOut } from '@/components/ui/TypeOut';
import { Button } from '@/components/ui/Button';
import { useProgress } from '@/lib/use-progress';

export default function IntakePage() {
  const { state, hydrated } = useProgress();

  if (!hydrated) return null;

  if (state.intake !== null) {
    return (
      <AppShell>
        <div className="w-full px-4 sm:px-8 py-12 text-left font-mono">
          <pre
            className="text-xs leading-snug mb-6 whitespace-pre"
            style={{
              background: 'transparent',
              border: 'none',
              padding: 0,
              color: 'var(--accent-warn)',
            }}
          >
            {`╭──────────────────────────────────────────────╮
│  intake.lock — already initialised           │
╰──────────────────────────────────────────────╯`}
          </pre>
          <p className="text-sm mb-2" style={{ color: 'var(--fg-muted)' }}>
            <span style={{ color: 'var(--accent-warn)' }}>warn:</span> you&apos;ve already run{' '}
            <code className="px-1">intake</code> on this device.
          </p>
          <p className="text-sm mb-6" style={{ color: 'var(--fg-muted)' }}>
            Use <code className="px-1">settings</code> to adjust target levels or reset your
            answers.
          </p>
          <Button as="link" href="/settings" variant="primary" size="md">
            cd ~/settings
          </Button>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="w-full px-4 sm:px-8 py-8 sm:py-12">
        <header className="mb-8">
          <h1
            className="text-xl sm:text-2xl font-semibold mb-2"
            style={{ color: 'var(--fg)' }}
          >
            <ShellPrompt minimal command=" init --interactive" />
          </h1>
          <p className="text-sm font-mono" style={{ color: 'var(--fg-muted)' }}>
            <TypeOut
              text="// tell me your current level, weekly study budget, and priorities. then i'll write your curriculum to /progress."
              speed={18}
              sessionKey="intake-hero"
              cursorAfterDone={false}
            />
          </p>
        </header>

        <IntakeForm />
      </div>
    </AppShell>
  );
}
