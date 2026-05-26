'use client';

import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { ShellPrompt } from '@/components/ui/ShellPrompt';
import { TerminalCursor } from '@/components/ui/TerminalCursor';
import { Button } from '@/components/ui/Button';
import { LanguagePill } from '@/components/ui/LanguagePill';
import { useProgress } from '@/lib/use-progress';
import { LANGUAGES } from '@/curriculum/types';
import { PHASE_BADGES } from '@/curriculum/badges';
import { getAllPhases } from '@/curriculum/phases';

export default function CredentialsPage() {
  const { state, hydrated } = useProgress();

  if (!hydrated) return null;

  const credentials = Object.values(state.phases)
    .filter((p) => p.completed && p.credentialId)
    .sort((a, b) => (b.completedAt ?? '').localeCompare(a.completedAt ?? ''));

  const allPhases = getAllPhases();

  return (
    <AppShell>
      <div className="w-full px-4 sm:px-8 py-8 sm:py-12 font-mono">
        <header className="mb-8">
          <h1
            className="text-xl sm:text-2xl font-semibold mb-2"
            style={{ color: 'var(--fg)' }}
          >
            <ShellPrompt minimal command=" ls ~/credentials" />
          </h1>
          <p className="text-xs" style={{ color: 'var(--fg-muted)' }}>
            {credentials.length === 0
              ? '// no credentials issued yet. complete a phase to mint your first.'
              : `// ${credentials.length} credential${credentials.length === 1 ? '' : 's'} on file. each is publicly verifiable.`}
          </p>
        </header>

        {credentials.length === 0 ? (
          <div
            className="border px-5 py-10 text-center"
            style={{ borderColor: 'var(--border)', borderStyle: 'dashed' }}
          >
            <p className="text-sm mb-4" style={{ color: 'var(--fg-muted)' }}>
              <span style={{ color: 'var(--accent-warn)' }}>$</span> registry is empty
              <TerminalCursor thin />
            </p>
            <p className="text-xs mb-6" style={{ color: 'var(--fg-dim)' }}>
              credentials are minted automatically when you mark a phase complete.
            </p>
            <Button as="link" href="/" variant="primary" size="md">
              cd ~/
            </Button>
          </div>
        ) : (
          <ul className="space-y-2">
            {credentials.map((p) => {
              const badge = PHASE_BADGES[`${p.language}-${p.level}`];
              const phase = allPhases.find(
                (x) => x.language === p.language && x.level === p.level,
              );
              const langMeta = LANGUAGES.find((l) => l.id === p.language);
              const title = badge?.title ?? phase?.title ?? `Phase ${p.level}`;
              const accent = `var(--accent-${p.language})`;
              return (
                <li
                  key={p.credentialId}
                  className="border px-4 py-3 flex items-center justify-between gap-3 flex-wrap"
                  style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-elevated)' }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <LanguagePill
                      language={p.language}
                      name={langMeta?.name.toLowerCase() ?? p.language}
                    />
                    <div className="min-w-0">
                      <p className="text-sm truncate" style={{ color: 'var(--fg)' }}>
                        {title}
                      </p>
                      <p className="text-[11px]" style={{ color: 'var(--fg-dim)' }}>
                        issued{' '}
                        {p.completedAt
                          ? new Date(p.completedAt).toISOString().slice(0, 10)
                          : '—'}
                        <span style={{ color: 'var(--fg-dim)' }}>{' · '}</span>
                        <span className="break-all">{p.credentialId}</span>
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/cert/${p.credentialId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono inline-flex items-center gap-1 hover:underline whitespace-nowrap"
                    style={{ color: accent }}
                  >
                    <span aria-hidden="true">[⬡</span>
                    <span>view</span>
                    <span aria-hidden="true">]</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </AppShell>
  );
}
