'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LANGUAGES } from '@/curriculum/types';
import { AppShell } from '@/components/layout/AppShell';
import { BlockProgress } from '@/components/ui/BlockProgress';
import { ShellPrompt } from '@/components/ui/ShellPrompt';
import { BootSequence } from '@/components/ui/BootSequence';
import { TerminalCursor } from '@/components/ui/TerminalCursor';
import { StatusTag } from '@/components/ui/StatusTag';
import { useProgress } from '@/lib/use-progress';
import { getPhasesForLanguage } from '@/curriculum/phases';
import type { Language, LanguageMeta } from '@/curriculum/types';

const BOOT_SESSION_KEY = 'boot-played';
const HERO_TYPED_KEY = 'hero-typed';

type Bucket = 'reached' | 'progress' | 'idle';

interface LangSummary {
  meta: LanguageMeta;
  startLevel: number;
  targetLevel: number;
  pct: number;
  done: number;
  total: number;
  bucket: Bucket;
}

function calcProgress(
  language: Language,
  phases: Record<string, { completed: boolean; language: Language }>,
  startLevel: number,
  targetLevel: number,
): { pct: number; done: number; total: number } {
  if (targetLevel <= startLevel) return { pct: 0, done: 0, total: 0 };
  const total = targetLevel - startLevel;
  const done = Object.values(phases).filter(
    (p) => p.language === language && p.completed,
  ).length;
  return { pct: Math.round((done / total) * 100), done, total };
}

function bucketFor(pct: number, done: number, total: number): Bucket {
  if (total > 0 && done >= total) return 'reached';
  if (pct > 0) return 'progress';
  return 'idle';
}

const BUCKETS: { id: Bucket; label: string; color: string; status: 'ok' | 'running' | 'pending' }[] = [
  { id: 'reached', label: 'target reached', color: 'var(--accent-prompt)', status: 'ok' },
  { id: 'progress', label: 'in progress', color: 'var(--accent-info)', status: 'running' },
  { id: 'idle', label: 'not started', color: 'var(--fg-dim)', status: 'pending' },
];

export default function HomePage() {
  const router = useRouter();
  const { state, hydrated } = useProgress();
  const [bootDone, setBootDone] = useState(false);
  const [skipBoot, setSkipBoot] = useState(false);
  const [heroTyped, setHeroTyped] = useState(false);

  // Detect whether we should skip the intro animations
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      if (sessionStorage.getItem(BOOT_SESSION_KEY) === '1') {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration only, reads sessionStorage once on mount
        setSkipBoot(true);
        setBootDone(true);
      }
      if (sessionStorage.getItem(HERO_TYPED_KEY) === '1') {
        setHeroTyped(true);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (hydrated && state.intake === null) {
      router.push('/intake');
    }
  }, [hydrated, state.intake, router]);

  const intake = state.intake;
  const hasAnyProgress = Object.values(state.phases).some((p) => p.completed);

  // Aggregate metrics
  const totalPhases = LANGUAGES.reduce(
    (acc, l) => acc + getPhasesForLanguage(l.id).length,
    0,
  );
  const totalDone = Object.values(state.phases).filter((p) => p.completed).length;
  const overallPct = totalPhases > 0 ? Math.round((totalDone / totalPhases) * 100) : 0;

  // Build per-language summaries and bucket them
  const summaries: LangSummary[] = useMemo(() => {
    return LANGUAGES.map((meta) => {
      const startLevel = intake?.startLevels[meta.id] ?? meta.defaultStartLevel;
      const targetLevel = intake?.targetLevels[meta.id] ?? 4;
      const { pct, done, total } = calcProgress(
        meta.id,
        state.phases,
        startLevel,
        targetLevel,
      );
      return {
        meta,
        startLevel,
        targetLevel,
        pct,
        done,
        total,
        bucket: bucketFor(pct, done, total),
      };
    });
  }, [intake, state.phases]);

  const grouped: Record<Bucket, LangSummary[]> = useMemo(() => {
    const out: Record<Bucket, LangSummary[]> = { reached: [], progress: [], idle: [] };
    for (const s of summaries) out[s.bucket].push(s);
    return out;
  }, [summaries]);

  const handleBootDone = () => {
    try {
      sessionStorage.setItem(BOOT_SESSION_KEY, '1');
    } catch {
      /* ignore */
    }
    setBootDone(true);
  };

  // Mark hero as typed after first paint so we don't re-animate on nav-back
  useEffect(() => {
    if (!bootDone || heroTyped) return;
    const t = window.setTimeout(() => {
      try {
        sessionStorage.setItem(HERO_TYPED_KEY, '1');
      } catch {
        /* ignore */
      }
      setHeroTyped(true);
    }, 1200);
    return () => window.clearTimeout(t);
  }, [bootDone, heroTyped]);

  return (
    <AppShell>
      <div className="w-full px-4 sm:px-8 py-5 sm:py-8 pb-16">
        {/* ───────── BOOT SEQUENCE ───────── */}
        {!bootDone && (
          <section className="mb-10" aria-label="System boot">
            <BootSequence
              lines={[
                { text: 'boot polyglot-curriculum v1.0.0', pause: 60 },
                { text: 'loading curriculum modules...', pause: 50 },
                {
                  text: `linked ${LANGUAGES.length} language runtimes`,
                  pause: 40,
                  color: 'var(--accent-info)',
                },
                {
                  text: `mounted ${totalPhases} phases`,
                  pause: 40,
                  color: 'var(--accent-info)',
                },
                { text: 'pyodide.runtime → idle', pause: 40 },
                { text: 'storage://local mounted at /progress', pause: 80 },
                { text: 'READY.', color: 'var(--accent-prompt)', pause: 120 },
              ]}
              tail={220}
              skip={skipBoot}
              onComplete={handleBootDone}
            />
          </section>
        )}

        {/* ───────── HERO ───────── */}
        <section
          className={[
            'mb-10 sm:mb-14',
            bootDone ? 'home-reveal' : 'opacity-0',
          ].join(' ')}
          aria-labelledby="hero-heading"
        >
          {/* Path crumb above hero, tmux-style */}
          <p
            className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3"
            style={{ color: 'var(--fg-dim)' }}
          >
            <span style={{ color: 'var(--accent-prompt)' }}>●</span>{' '}
            <span style={{ color: 'var(--fg-muted)' }}>session</span>
            <span style={{ color: 'var(--fg-dim)' }}> · </span>
            <span>~/curriculum/</span>
            <span style={{ color: 'var(--fg-dim)' }}> · </span>
            <span style={{ color: 'var(--accent-info)' }}>tty0</span>
          </p>

          {/* THE marquee heading */}
          <h1
            id="hero-heading"
            className="font-mono font-semibold leading-[1.04] tracking-tight"
            style={{
              fontSize: 'clamp(2.5rem, 8.5vw, 5.75rem)',
              color: 'var(--fg)',
              letterSpacing: '-0.035em',
            }}
          >
            <span style={{ color: 'var(--accent-prompt)' }} className="glow-soft">
              polyglot
            </span>
            <span style={{ color: 'var(--fg-muted)' }}>@</span>
            <span style={{ color: 'var(--accent-info)' }} className="glow-soft">
              curriculum
            </span>
            <TerminalCursor />
          </h1>

          {/* Subtitle in `> ` prompt prefix style */}
          <div
            className="mt-5 sm:mt-6 font-mono text-sm sm:text-base space-y-1.5 max-w-2xl"
            style={{ color: 'var(--fg-muted)' }}
          >
            <p>
              <span style={{ color: 'var(--accent-prompt)' }}>&gt;</span>{' '}
              <span style={{ color: 'var(--fg)' }}>
                six languages. ten phases each. one operator.
              </span>
            </p>
            <p>
              <span style={{ color: 'var(--accent-prompt)' }}>&gt;</span>{' '}
              study at{' '}
              <span style={{ color: 'var(--accent-warn)' }} className="glow-soft">
                {intake?.weeklyHours ?? '—'}
              </span>{' '}
              hrs/week · current depth{' '}
              <span style={{ color: 'var(--accent-info)' }} className="glow-soft">
                {totalDone}
              </span>
              <span style={{ color: 'var(--fg-dim)' }}>/</span>
              <span style={{ color: 'var(--accent-info)' }}>{totalPhases}</span>
              {' '}phases
            </p>
            <p>
              <span style={{ color: 'var(--accent-prompt)' }}>&gt;</span>{' '}
              <span style={{ color: 'var(--fg-muted)' }}>type</span>{' '}
              <span
                className="px-1 border"
                style={{
                  color: 'var(--accent-prompt)',
                  borderColor: 'color-mix(in srgb, var(--accent-prompt) 40%, transparent)',
                  backgroundColor: 'color-mix(in srgb, var(--accent-prompt) 8%, transparent)',
                }}
              >
                cd ./lang
              </span>{' '}
              <span style={{ color: 'var(--fg-muted)' }}>or pick a row below.</span>
            </p>
          </div>

          {/* Marquee progress strip — phosphor wide bar */}
          <div className="mt-7 sm:mt-9">
            <div
              className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.18em] mb-2"
              style={{ color: 'var(--fg-dim)' }}
            >
              <span>overall.completion</span>
              <span
                className="tabular-nums"
                style={{ color: 'var(--accent-prompt)' }}
              >
                {overallPct.toString().padStart(3, ' ')}%
              </span>
            </div>
            <div
              className="overflow-hidden text-base sm:text-xl leading-none"
              aria-hidden="true"
            >
              <BlockProgress
                value={overallPct / 100}
                width={36}
                color="var(--accent-prompt)"
                showPercent={false}
                className="text-base sm:text-2xl"
              />
            </div>
            <div
              className="mt-2 grid grid-cols-3 gap-2 font-mono text-[11px]"
              style={{ color: 'var(--fg-dim)' }}
            >
              <span>
                <span style={{ color: 'var(--accent-prompt)' }}>reached</span>{' '}
                ·{' '}
                <span
                  className="tabular-nums"
                  style={{ color: 'var(--fg-muted)' }}
                >
                  {grouped.reached.length}
                </span>
              </span>
              <span className="text-center">
                <span style={{ color: 'var(--accent-info)' }}>active</span>{' '}
                ·{' '}
                <span
                  className="tabular-nums"
                  style={{ color: 'var(--fg-muted)' }}
                >
                  {grouped.progress.length}
                </span>
              </span>
              <span className="text-right">
                <span style={{ color: 'var(--fg-dim)' }}>idle</span>{' '}
                ·{' '}
                <span
                  className="tabular-nums"
                  style={{ color: 'var(--fg-muted)' }}
                >
                  {grouped.idle.length}
                </span>
              </span>
            </div>
          </div>
        </section>

        {/* ───────── EMPTY INTAKE WARN ───────── */}
        {!hasAnyProgress && !intake && bootDone && (
          <div
            className="mb-8 px-3 py-2 border-l-2 font-mono text-sm home-reveal"
            style={{
              borderLeftColor: 'var(--accent-warn)',
              backgroundColor: 'var(--bg-elevated)',
              animationDelay: '40ms',
            }}
          >
            <p>
              <span style={{ color: 'var(--accent-warn)' }}>warn:</span>{' '}
              intake not complete — defaults applied.{' '}
              <Link
                href="/intake"
                className="underline underline-offset-2"
                style={{ color: 'var(--accent-info)' }}
              >
                $ run intake
              </Link>
            </p>
          </div>
        )}

        {/* ───────── LANGUAGES — GROUPED ls -la PANELS ───────── */}
        {bootDone && (
          <section
            aria-labelledby="lang-heading"
            className="space-y-7 sm:space-y-9 home-reveal"
            style={{ animationDelay: '80ms' }}
          >
            <h2
              id="lang-heading"
              className="font-mono text-sm sm:text-base"
            >
              <ShellPrompt
                cwd="~/curriculum/"
                command=" ls -la --group-by=status"
              />
            </h2>

            {/* total line — like real ls */}
            <p
              className="-mt-5 sm:-mt-7 font-mono text-[11px]"
              style={{ color: 'var(--fg-dim)' }}
            >
              total {LANGUAGES.length}
            </p>

            {(() => {
              // Compute a global row index so the stagger flows
              // continuously across panels for visual cohesion.
              let rowCursor = 0;
              return BUCKETS.map((b) => {
                const items = grouped[b.id];
                if (items.length === 0) return null;
                return (
                  <PanelGroup
                    key={b.id}
                    label={b.label}
                    color={b.color}
                    status={b.status}
                    count={items.length}
                    startIndex={rowCursor}
                    items={items}
                    rowOffsetSetter={(n) => {
                      rowCursor += n;
                    }}
                  />
                );
              });
            })()}
          </section>
        )}

        {/* ───────── STATUS BAR (page-level, not app footer) ───────── */}
        {bootDone && (
          <section
            className="mt-12 sm:mt-16 home-reveal"
            style={{ animationDelay: '320ms' }}
            aria-label="Session status bar"
          >
            <div
              className="font-mono text-[11px] flex flex-wrap items-center gap-x-3 gap-y-1 px-3 py-2"
              style={{
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                borderLeft: '2px solid var(--accent-prompt)',
                color: 'var(--fg-muted)',
              }}
            >
              <span
                className="inline-flex items-center gap-1.5"
                style={{ color: 'var(--accent-prompt)' }}
              >
                <span className="glow-soft">●</span>
                <span>~/curriculum/</span>
              </span>
              <Divider />
              <span>
                <span style={{ color: 'var(--fg-dim)' }}>langs:</span>{' '}
                <span style={{ color: 'var(--accent-info)' }} className="tabular-nums">
                  {LANGUAGES.length}
                </span>
              </span>
              <Divider />
              <span>
                <span style={{ color: 'var(--fg-dim)' }}>phases:</span>{' '}
                <span style={{ color: 'var(--accent-info)' }} className="tabular-nums">
                  {totalPhases}
                </span>
              </span>
              <Divider />
              <span>
                <span style={{ color: 'var(--fg-dim)' }}>$userprogress:</span>{' '}
                <span style={{ color: 'var(--accent-prompt)' }} className="tabular-nums">
                  {overallPct}%
                </span>{' '}
                <span style={{ color: 'var(--fg-dim)' }}>complete</span>
              </span>
              <Divider />
              <span>
                <span style={{ color: 'var(--fg-dim)' }}>intake:</span>{' '}
                <StatusTag status={intake ? 'ok' : 'pending'} />
              </span>
              <span className="ml-auto inline-flex items-center gap-1.5">
                <span style={{ color: 'var(--fg-dim)' }}>EOF</span>
                <TerminalCursor thin />
              </span>
            </div>
          </section>
        )}
      </div>

      {/* Stagger keyframes — scoped to the home page */}
      <style jsx global>{`
        @keyframes home-row-in {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes home-reveal-in {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .home-row {
          opacity: 0;
          animation: home-row-in 320ms ease-out forwards;
        }
        .home-reveal {
          opacity: 0;
          animation: home-reveal-in 360ms ease-out forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .home-row,
          .home-reveal {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </AppShell>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */

interface PanelGroupProps {
  label: string;
  color: string;
  status: 'ok' | 'running' | 'pending';
  count: number;
  startIndex: number;
  items: LangSummary[];
  rowOffsetSetter: (n: number) => void;
}

function PanelGroup({
  label,
  color,
  status,
  count,
  startIndex,
  items,
  rowOffsetSetter,
}: PanelGroupProps) {
  // Inform the parent how many rows we contributed so stagger keeps flowing.
  rowOffsetSetter(items.length);

  return (
    <div>
      {/* Panel header — labeled box top */}
      <div
        className="flex items-baseline gap-3 mb-2.5 pb-1.5"
        style={{ borderBottom: '1px dashed var(--border-active)' }}
      >
        <span
          className="font-mono text-[11px] uppercase tracking-[0.22em] glow-soft"
          style={{ color }}
        >
          ── {label} ──
        </span>
        <span
          className="font-mono text-[11px] tabular-nums"
          style={{ color: 'var(--fg-dim)' }}
        >
          ({count})
        </span>
        <span className="ml-auto">
          <StatusTag status={status} glow={false} />
        </span>
      </div>

      {/* Desktop header */}
      <div
        className="hidden sm:grid font-mono text-[11px] uppercase tracking-wider py-1.5 px-2"
        style={{
          gridTemplateColumns: 'minmax(1.5ch,1.5ch) minmax(11ch,13ch) 1fr 10ch 22ch 8ch',
          color: 'var(--fg-dim)',
          columnGap: '0.75rem',
        }}
      >
        <span aria-hidden="true" />
        <span>name</span>
        <span>blurb</span>
        <span>level</span>
        <span>progress</span>
        <span className="text-right">action</span>
      </div>

      <ul>
        {items.map((s, i) => (
          <LangRow
            key={s.meta.id}
            summary={s}
            rowIndex={startIndex + i}
          />
        ))}
      </ul>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */

function LangRow({
  summary,
  rowIndex,
}: {
  summary: LangSummary;
  rowIndex: number;
}) {
  const { meta, startLevel, targetLevel, pct, done, total } = summary;
  const accent = `var(--accent-${meta.id})`;
  const delay = `${rowIndex * 60}ms`;

  return (
    <li
      className="home-row"
      style={{ animationDelay: delay }}
    >
      <Link
        href={`/${meta.id}`}
        className="lang-row group block font-mono"
        style={
          {
            ['--row-accent' as string]: accent,
            borderBottom: '1px solid var(--border)',
          } as React.CSSProperties
        }
      >
        {/* Desktop — ls -la columns */}
        <div
          className="hidden sm:grid items-center py-2 px-2 transition-colors duration-100"
          style={{
            gridTemplateColumns: 'minmax(1.5ch,1.5ch) minmax(11ch,13ch) 1fr 10ch 22ch 8ch',
            columnGap: '0.75rem',
          }}
        >
          {/* leading ▸ cursor — fades in on hover/focus */}
          <span
            className="lang-row__cursor select-none tabular-nums text-sm leading-none"
            aria-hidden="true"
          >
            ▸
          </span>

          {/* name — pill with brackets */}
          <span className="flex items-center gap-1.5 min-w-0 text-sm">
            <span
              aria-hidden="true"
              className="lang-row__bracket"
              style={{ color: 'var(--fg-dim)' }}
            >
              [
            </span>
            <span
              className="lang-row__name glow-soft truncate"
              style={{ color: accent }}
            >
              {meta.name.toLowerCase()}
            </span>
            <span
              aria-hidden="true"
              className="lang-row__bracket"
              style={{ color: 'var(--fg-dim)' }}
            >
              ]
            </span>
          </span>

          {/* blurb */}
          <span
            className="lang-row__blurb text-xs truncate"
            style={{ color: 'var(--fg-muted)' }}
            title={meta.blurb}
          >
            {meta.blurb}
          </span>

          {/* level */}
          <span className="text-xs tabular-nums">
            <span style={{ color: 'var(--fg-muted)' }}>L{startLevel}</span>
            <span style={{ color: 'var(--fg-dim)' }}>→</span>
            <span
              style={{ color: accent }}
              className="lang-row__target glow-soft"
            >
              L{targetLevel}
            </span>
          </span>

          {/* progress bar — color matches language */}
          <span className="lang-row__progress text-[13px]">
            <BlockProgress
              value={pct / 100}
              color={accent}
              width={14}
              showPercent
            />
          </span>

          {/* action */}
          <span
            className="text-xs text-right tabular-nums"
            style={{ color: 'var(--fg-dim)' }}
          >
            <span className="lang-row__action" style={{ color: accent }}>
              [ open ]
            </span>
          </span>
        </div>

        {/* Mobile — stacked rows */}
        <div className="sm:hidden px-2 py-3 transition-colors duration-100">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="flex items-center gap-2 min-w-0">
              <span
                className="lang-row__cursor select-none text-sm leading-none"
                aria-hidden="true"
              >
                ▸
              </span>
              <span className="text-sm">
                <span style={{ color: 'var(--fg-dim)' }}>[</span>
                <span
                  className="lang-row__name glow-soft px-0.5"
                  style={{ color: accent }}
                >
                  {meta.name.toLowerCase()}
                </span>
                <span style={{ color: 'var(--fg-dim)' }}>]</span>
              </span>
            </span>
            <span className="text-[11px] tabular-nums">
              <span style={{ color: 'var(--fg-muted)' }}>L{startLevel}</span>
              <span style={{ color: 'var(--fg-dim)' }}> → </span>
              <span style={{ color: accent }}>L{targetLevel}</span>
            </span>
          </div>
          <p
            className="lang-row__blurb text-xs mb-2"
            style={{ color: 'var(--fg-muted)' }}
          >
            {meta.blurb}
          </p>
          <div className="flex items-center justify-between gap-3">
            <BlockProgress
              value={pct / 100}
              color={accent}
              width={12}
              showPercent
            />
            <span
              className="text-[11px] tabular-nums"
              style={{ color: 'var(--fg-dim)' }}
            >
              {done}/{total || '—'}
            </span>
          </div>
          <p
            className="lang-row__action mt-2 text-[11px] text-right"
            style={{ color: accent }}
          >
            [ open ]
          </p>
        </div>
      </Link>

      {/* row-local interaction styles. Scoped via .lang-row */}
      <style jsx>{`
        .lang-row {
          position: relative;
        }
        .lang-row :global(.lang-row__cursor) {
          color: var(--row-accent);
          opacity: 0;
          transform: translateX(-2px);
          transition: opacity 100ms ease, transform 100ms ease;
        }
        .lang-row :global(.lang-row__action) {
          opacity: 0.4;
          transition: opacity 100ms ease, letter-spacing 100ms ease;
          letter-spacing: 0;
        }
        .lang-row:hover :global(.lang-row__cursor),
        .lang-row:focus-visible :global(.lang-row__cursor),
        .lang-row:focus :global(.lang-row__cursor) {
          opacity: 1;
          transform: translateX(0);
        }
        .lang-row:hover :global(.lang-row__action),
        .lang-row:focus-visible :global(.lang-row__action) {
          opacity: 1;
          letter-spacing: 0.04em;
        }

        /* Inverted hover state — row turns into a highlighted vim line */
        .lang-row:hover > div,
        .lang-row:focus-visible > div {
          background-color: color-mix(in srgb, var(--row-accent) 14%, transparent);
          box-shadow: inset 2px 0 0 var(--row-accent);
        }
        .lang-row:hover :global(.lang-row__name),
        .lang-row:focus-visible :global(.lang-row__name) {
          text-shadow: 0 0 10px
            color-mix(in srgb, var(--row-accent) 60%, transparent);
        }
        .lang-row:hover :global(.lang-row__blurb),
        .lang-row:focus-visible :global(.lang-row__blurb) {
          color: var(--fg);
        }
        .lang-row:hover :global(.lang-row__bracket),
        .lang-row:focus-visible :global(.lang-row__bracket) {
          color: var(--row-accent);
        }

        @media (prefers-reduced-motion: reduce) {
          .lang-row :global(.lang-row__cursor),
          .lang-row :global(.lang-row__action) {
            transition: none !important;
          }
        }
      `}</style>
    </li>
  );
}

function Divider() {
  return (
    <span
      aria-hidden="true"
      style={{ color: 'var(--fg-dim)' }}
      className="select-none"
    >
      ·
    </span>
  );
}
