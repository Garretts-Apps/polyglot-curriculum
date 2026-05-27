'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { ShellPrompt } from '@/components/ui/ShellPrompt';
import { TerminalCursor } from '@/components/ui/TerminalCursor';
import { Button } from '@/components/ui/Button';
import { LanguagePill } from '@/components/ui/LanguagePill';
import { useProgress } from '@/lib/use-progress';
import { LANGUAGES } from '@/curriculum/types';
import { PHASE_BADGES } from '@/curriculum/badges';
import { getAllPhases, getPhasesForLanguage } from '@/curriculum/phases';

export default function CredentialsPage() {
  const { state, hydrated, updatePhase } = useProgress();
  const backfillDone = useRef(false);

  // Backfill credentials for users who completed phases before the credential
  // system existed. Only runs once per session, after hydration settles.
  useEffect(() => {
    if (!hydrated || backfillDone.current) return;
    // Small delay to let the server-sync merge settle before we read state
    const timerId = setTimeout(() => {
      if (backfillDone.current) return;
      backfillDone.current = true;

      const intake = state.intake;
      if (!intake) return;

      const toBackfill = Object.values(state.phases).filter(
        (p) => p.completed && !p.credentialId && p.level > (intake.startLevels[p.language] ?? -1),
      );
      if (toBackfill.length === 0) return;

      let active = true;
      void (async () => {
        for (const p of toBackfill) {
          if (!active) break;
          try {
            const res = await fetch('/api/credentials', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ language: p.language, phaseLevel: p.level }),
            });
            if (res.ok) {
              const data = await res.json() as { id?: string };
              if (data.id) {
                updatePhase(p.phaseId, (prev) =>
                  prev
                    ? { ...prev, credentialId: data.id }
                    : {
                        phaseId: p.phaseId,
                        language: p.language,
                        level: p.level,
                        completed: true,
                        notes: '',
                        checkResults: {},
                        credentialId: data.id,
                      },
                );
              }
            }
          } catch { /* best-effort */ }
        }
      })();

      return () => { active = false; };
    }, 1500);

    return () => clearTimeout(timerId);
  }, [hydrated]); // eslint-disable-line react-hooks/exhaustive-deps

  const [claiming, setClaiming] = useState<Record<string, 'loading' | 'error'>>({});

  async function handleClaim(phaseId: string, language: string, level: number) {
    setClaiming((c) => ({ ...c, [phaseId]: 'loading' }));
    try {
      const res = await fetch('/api/credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language, phaseLevel: level }),
      });
      if (res.ok) {
        const data = await res.json() as { id?: string };
        if (data.id) {
          updatePhase(phaseId, (prev) =>
            prev
              ? { ...prev, credentialId: data.id }
              : { phaseId, language: language as never, level, completed: true, notes: '', checkResults: {}, credentialId: data.id },
          );
          setClaiming((c) => { const next = { ...c }; delete next[phaseId]; return next; });
          return;
        }
      }
      setClaiming((c) => ({ ...c, [phaseId]: 'error' }));
    } catch {
      setClaiming((c) => ({ ...c, [phaseId]: 'error' }));
    }
  }

  if (!hydrated) return null;

  const intake = state.intake;

  const earned = Object.values(state.phases)
    .filter((p) => p.completed && p.credentialId)
    .sort((a, b) => (b.completedAt ?? '').localeCompare(a.completedAt ?? ''));

  const allPhases = getAllPhases();

  // Attainable: phases above the user's effective start level (intake value, or
  // language default if no intake) that don't yet have a credential.
  const attainableByLang = LANGUAGES.map((lang) => {
    const startLevel = intake?.startLevels[lang.id] ?? lang.defaultStartLevel;
    const earnedIds = new Set(
      Object.values(state.phases)
        .filter((p) => p.language === lang.id && p.credentialId)
        .map((p) => p.phaseId),
    );
    const phases = getPhasesForLanguage(lang.id)
      .filter((ph) => ph.level > startLevel && !earnedIds.has(ph.id))
      .sort((a, b) => a.level - b.level);
    return { lang, phases };
  }).filter(({ phases }) => phases.length > 0);

  return (
    <AppShell>
      <div className="w-full px-4 sm:px-8 py-8 sm:py-12 font-mono">
        {/* ── Earned credentials ───────────────────────────────────────────── */}
        <header className="mb-8">
          <h1
            className="text-xl sm:text-2xl font-semibold mb-2"
            style={{ color: 'var(--fg)' }}
          >
            <ShellPrompt minimal command=" ls ~/credentials" />
          </h1>
          <p className="text-xs" style={{ color: 'var(--fg-muted)' }}>
            {earned.length === 0
              ? '// no credentials issued yet. complete a phase to mint your first.'
              : `// ${earned.length} credential${earned.length === 1 ? '' : 's'} on file. each is publicly verifiable.`}
          </p>
        </header>

        {earned.length === 0 ? (
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
          <ul className="space-y-2 mb-12">
            {earned.map((p) => {
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

        {/* ── Attainable credentials ───────────────────────────────────────── */}
        {attainableByLang.length > 0 && (
          <section>
            <header className="mb-6">
              <h2
                className="text-lg font-semibold mb-2"
                style={{ color: 'var(--fg)' }}
              >
                <ShellPrompt minimal command=" ls ~/credentials --available" />
              </h2>
              <p className="text-xs" style={{ color: 'var(--fg-muted)' }}>
                {'// credentials you can earn from your current standing to level 10'}
              </p>
            </header>

            <div className="space-y-6">
              {attainableByLang.map(({ lang, phases }) => (
                <div key={lang.id}>
                  <div className="flex items-center gap-2 mb-2">
                    <LanguagePill language={lang.id} name={lang.name.toLowerCase()} />
                    <span className="text-[11px]" style={{ color: 'var(--fg-dim)' }}>
                      {phases.length} available
                    </span>
                  </div>
                  <ul className="space-y-1">
                    {phases.map((ph) => {
                      const badge = PHASE_BADGES[`${lang.id}-${ph.level}`];
                      const title = badge?.title ?? ph.title;
                      const phaseProgress = state.phases[ph.id];
                      // Completed but no credential — can be claimed directly
                      const isClaimable = !!(phaseProgress?.completed && !phaseProgress.credentialId);
                      const claimState = claiming[ph.id];
                      return (
                        <li
                          key={ph.id}
                          className="border px-4 py-2.5 flex items-center justify-between gap-3 flex-wrap"
                          style={{
                            borderColor: 'var(--border)',
                            borderStyle: isClaimable ? 'dashed' : 'solid',
                            backgroundColor: 'var(--bg-elevated)',
                          }}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span
                              className="text-[10px] font-mono w-8 shrink-0 tabular-nums"
                              style={{ color: 'var(--fg-dim)' }}
                            >
                              L{String(ph.level).padStart(2, '0')}
                            </span>
                            <span className="text-sm truncate" style={{ color: 'var(--fg-muted)' }}>
                              {title}
                            </span>
                          </div>
                          {isClaimable ? (
                            <button
                              type="button"
                              disabled={claimState === 'loading'}
                              onClick={() => void handleClaim(ph.id, lang.id, ph.level)}
                              className="text-xs font-mono inline-flex items-center gap-1 hover:underline whitespace-nowrap shrink-0 disabled:opacity-50 disabled:cursor-wait"
                              style={{ color: `var(--accent-${lang.id})` }}
                            >
                              <span aria-hidden="true">[</span>
                              <span>{claimState === 'loading' ? '…' : claimState === 'error' ? 'retry' : 'claim'}</span>
                              <span aria-hidden="true">]</span>
                            </button>
                          ) : (
                            <Link
                              href={`/${lang.id}/${ph.level}`}
                              className="text-xs font-mono inline-flex items-center gap-1 hover:underline whitespace-nowrap shrink-0"
                              style={{ color: `var(--accent-${lang.id})` }}
                            >
                              <span aria-hidden="true">[</span>
                              <span>start</span>
                              <span aria-hidden="true">]</span>
                            </Link>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </AppShell>
  );
}
