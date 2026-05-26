'use client';

import { AppShell } from '@/components/layout/AppShell';
import { IntakeForm } from '@/components/intake/IntakeForm';
import { ShellPrompt } from '@/components/ui/ShellPrompt';
import { TypeOut } from '@/components/ui/TypeOut';
import { useProgress } from '@/lib/use-progress';

export default function IntakePage() {
  const { state, hydrated } = useProgress();

  if (!hydrated) return null;

  const isEdit = state.intake !== null;

  return (
    <AppShell>
      <div className="w-full px-4 sm:px-8 py-8 sm:py-12">
        <header className="mb-8">
          <h1
            className="text-xl sm:text-2xl font-semibold mb-2"
            style={{ color: 'var(--fg)' }}
          >
            <ShellPrompt minimal command={isEdit ? ' set --goals --interactive' : ' init --interactive'} />
          </h1>
          <p className="text-sm font-mono" style={{ color: 'var(--fg-muted)' }}>
            {isEdit ? (
              <TypeOut
                text="// update your goals and study budget. phase progress is not affected."
                speed={18}
                sessionKey="intake-edit-hero"
                cursorAfterDone={false}
              />
            ) : (
              <TypeOut
                text="// tell me your current level, weekly study budget, and priorities. then i'll write your curriculum to /progress."
                speed={18}
                sessionKey="intake-hero"
                cursorAfterDone={false}
              />
            )}
          </p>
        </header>

        <IntakeForm existing={state.intake ?? undefined} />
      </div>
    </AppShell>
  );
}
