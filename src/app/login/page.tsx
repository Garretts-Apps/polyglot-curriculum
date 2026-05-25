import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { LoginForm } from '@/components/auth/LoginForm';
import { ShellPrompt } from '@/components/ui/ShellPrompt';
import { TerminalCursor } from '@/components/ui/TerminalCursor';
import { SESSION_COOKIE_NAME, verifySession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export default async function LoginPage() {
  // If the user already has a valid session, bounce them home so they don't
  // see a needless login screen.
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE_NAME)?.value;
  if (token) {
    const session = await verifySession(token);
    if (session) {
      redirect('/');
    }
  }

  return (
    <div className="min-h-dvh flex flex-col safe-pb">
      <main className="flex-1 flex items-center justify-center px-3 sm:px-6 py-12">
        <div className="w-full max-w-md">
          <header className="mb-8 text-left font-mono">
            <p
              className="text-[11px] uppercase tracking-[0.2em] mb-3"
              style={{ color: 'var(--fg-dim)' }}
            >
              <span style={{ color: 'var(--accent-prompt)' }}>●</span>{' '}
              <span style={{ color: 'var(--fg-muted)' }}>session</span>
              <span style={{ color: 'var(--fg-dim)' }}> · </span>
              <span style={{ color: 'var(--accent-info)' }}>tty0</span>
            </p>
            <h1
              className="font-mono font-semibold leading-[1.04] tracking-tight mb-4"
              style={{
                fontSize: 'clamp(1.75rem, 6vw, 2.75rem)',
                color: 'var(--fg)',
                letterSpacing: '-0.03em',
              }}
            >
              <span style={{ color: 'var(--accent-prompt)' }} className="glow-soft">
                polyglot
              </span>
              <span style={{ color: 'var(--fg-muted)' }}>@</span>
              <span style={{ color: 'var(--accent-info)' }} className="glow-soft">
                terminal
              </span>
              <TerminalCursor />
            </h1>
            <div
              className="text-sm space-y-1.5"
              style={{ color: 'var(--fg-muted)' }}
            >
              <p>
                <span style={{ color: 'var(--accent-warn)' }}>&gt;</span> auth required
              </p>
              <p>
                <ShellPrompt minimal command=" login --user=<input> --password=<input>" />
              </p>
            </div>
          </header>

          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>
      </main>

      <footer
        className="px-3 sm:px-6 py-2 flex items-center justify-between gap-3 text-[11px] font-mono"
        style={{
          color: 'var(--fg-dim)',
          borderTop: '1px solid var(--border)',
          backgroundColor: 'var(--bg-elevated)',
        }}
      >
        <span className="inline-flex items-center gap-2 truncate">
          <span style={{ color: 'var(--accent-prompt)' }}>●</span>
          <span>polyglot-curriculum v1.0.0</span>
        </span>
        <span className="inline-flex items-center">
          waiting<TerminalCursor thin />
        </span>
      </footer>
    </div>
  );
}
