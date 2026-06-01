'use client';

import type { LanguageMeta } from '@/curriculum/types';
import { useProgress } from '@/lib/use-progress';
import { PhaseList } from '@/components/phase/PhaseList';
import { TerminalCursor } from '@/components/ui/TerminalCursor';
import { ShellPrompt } from '@/components/ui/ShellPrompt';
import { getPhasesForLanguage } from '@/curriculum/phases';

interface LanguagePageClientProps {
  langMeta: LanguageMeta;
}

/**
 * Parse a time estimate string like "6-10 hours" or "4-6 hours" into the
 * upper-bound hour count for aggregation. Falls back to the lower bound,
 * then 0.
 */
function parseHoursUpper(estimate: string): number {
  const m = estimate.match(/(\d+)\s*-\s*(\d+)/);
  if (m) return Number(m[2]);
  const single = estimate.match(/(\d+)/);
  return single ? Number(single[1]) : 0;
}

function parseHoursLower(estimate: string): number {
  const m = estimate.match(/(\d+)\s*-\s*(\d+)/);
  if (m) return Number(m[1]);
  const single = estimate.match(/(\d+)/);
  return single ? Number(single[1]) : 0;
}

/**
 * Tokenise a language's display symbol into a hero "stem" + "tail" so the tail
 * (a trailing symbol such as `#`, `+`, or `>`) can be tinted in the accent
 * colour while the stem stays bold, e.g.:
 *   c#    → stem 'c',   tail '#'
 *   c++   → stem 'c',   tail '++'
 *   f#    → stem 'f',   tail '#'
 *   λ>    → stem 'λ',   tail '>'
 *   py    → stem 'py',  tail '_'  (plain symbols get a dim underscore cursor)
 *
 * The `tail` is rendered AFTER the stem and before the blinking cursor. For a
 * plain alphanumeric symbol it is a dim underscore for "shell variable" feel;
 * for symbols ending in punctuation we lift that punctuation into an
 * accent-tinted tail.
 */
function tokeniseHero(symbol: string): { stem: string; tail: string } {
  const m = symbol.match(/^(.*?)([#+>*!?]+)$/);
  if (m && m[1]) return { stem: m[1], tail: m[2] ?? '_' };
  return { stem: symbol, tail: '_' };
}

export function LanguagePageClient({ langMeta }: LanguagePageClientProps) {
  const { state } = useProgress();
  const intake = state.intake;

  const startLevel = intake?.startLevels[langMeta.id] ?? langMeta.defaultStartLevel;
  const targetLevel = intake?.targetLevels[langMeta.id] ?? 4;

  const phases = getPhasesForLanguage(langMeta.id);
  const visiblePhases = phases.filter((p) => p.level <= targetLevel);

  // Aggregate stats — only phases at or below target level count.
  // Lower bound = optimistic estimate, upper = pessimistic. Show the range.
  const studyPhases = visiblePhases.filter((p) => p.level > startLevel);
  const hoursLower = studyPhases.reduce((acc, p) => acc + parseHoursLower(p.timeEstimate), 0);
  const hoursUpper = studyPhases.reduce((acc, p) => acc + parseHoursUpper(p.timeEstimate), 0);

  // Completed-count for stats (across the user's *target* band)
  const phasesComplete = visiblePhases.filter((p) => state.phases[p.id]?.completed).length;

  const accent = `var(${langMeta.accentVar})`;
  const hero = tokeniseHero(langMeta.symbol);

  return (
    <div className="w-full px-4 sm:px-8 py-6 sm:py-10 font-mono">
      {/* ── Pre-hero command line ─────────────────────────────────────────── */}
      <p
        className="text-[11px] uppercase tracking-widest mb-3"
        style={{ color: 'var(--fg-dim)' }}
      >
        <ShellPrompt minimal command={` cd ~/curriculum/${langMeta.id} && ls -la phases/`} />
      </p>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <header className="mb-5">
        <h1
          className="font-bold leading-none flex items-baseline gap-0"
          style={{
            color: accent,
            fontSize: 'clamp(2.75rem, 9vw, 5.5rem)',
            letterSpacing: '-0.04em',
            textShadow: `0 0 22px color-mix(in srgb, ${accent} 55%, transparent),
                         0 0 4px color-mix(in srgb, ${accent} 30%, transparent)`,
          }}
        >
          <span>{hero.stem}</span>
          <span
            style={{
              color: hero.tail === '_' ? 'var(--fg-dim)' : accent,
              opacity: hero.tail === '_' ? 0.55 : 1,
            }}
          >
            {hero.tail}
          </span>
          <TerminalCursor color={accent} />
        </h1>

        {/* Sublabel: full name + phase count */}
        <p
          className="mt-3 text-[11px] uppercase tracking-[0.2em]"
          style={{ color: 'var(--fg-dim)' }}
        >
          <span style={{ color: 'var(--fg-muted)' }}>{langMeta.name}</span>
          <span className="mx-2" style={{ color: 'var(--fg-dim)' }}>·</span>
          <span style={{ color: 'var(--fg-muted)' }}>{phases.length} phases total</span>
        </p>

        {/* Blurb */}
        <p
          className="mt-4 text-sm max-w-2xl flex"
          style={{ color: 'var(--fg-muted)' }}
        >
          <span
            className="select-none mr-2 flex-shrink-0"
            style={{ color: 'var(--accent-warn)' }}
            aria-hidden="true"
          >
            &gt;
          </span>
          <span>{langMeta.blurb}</span>
        </p>
      </header>

      {/* ── ASCII separator ──────────────────────────────────────────────── */}
      <pre
        aria-hidden="true"
        className="text-xs leading-none whitespace-pre overflow-hidden select-none"
        style={{
          color: 'var(--border-active)',
          background: 'transparent',
          border: 'none',
          padding: 0,
          margin: '0 0 18px 0',
          maxWidth: '100%',
        }}
      >
        {/* Mix of ─ and ╴ glyphs so the rule has rhythm rather than a flat line */}
        {'─'.repeat(58)}
        <span style={{ color: 'var(--fg-dim)' }}>╴┤</span>
      </pre>

      {/* ── Stats bar ────────────────────────────────────────────────────── */}
      <section
        aria-label="study stats"
        className="mb-7 text-xs sm:text-sm flex items-center gap-x-1 gap-y-1 flex-wrap"
        style={{ color: 'var(--fg-muted)' }}
      >
        <span style={{ color: 'var(--fg-dim)' }}>level</span>
        <span
          className="tabular-nums"
          style={{ color: 'var(--accent-prompt)' }}
        >
          L{startLevel}
        </span>
        <span style={{ color: 'var(--fg-dim)' }} className="mx-0.5">
          →
        </span>
        <span className="tabular-nums" style={{ color: accent }}>
          L{targetLevel}
        </span>

        <Bullet />

        <span className="tabular-nums" style={{ color: 'var(--accent-warn)' }}>
          {hoursLower === hoursUpper ? `${hoursUpper}h` : `${hoursLower}-${hoursUpper}h`}
        </span>
        <span style={{ color: 'var(--fg-dim)' }}>estimated</span>

        <Bullet />

        <span className="tabular-nums" style={{ color: 'var(--accent-info)' }}>
          {phasesComplete}
        </span>
        <span style={{ color: 'var(--fg-dim)' }}>/</span>
        <span className="tabular-nums" style={{ color: 'var(--fg-muted)' }}>
          {visiblePhases.length}
        </span>
        <span style={{ color: 'var(--fg-dim)' }}>complete</span>

      </section>

      {/* ── Phase list (TUI table) ───────────────────────────────────────── */}
      <PhaseList phases={phases} langMeta={langMeta} />

      {/* ── Footer shell prompt ──────────────────────────────────────────── */}
      <footer className="mt-10 flex items-center gap-2 text-sm">
        <ShellPrompt
          cwd={`~/curriculum/${langMeta.id}`}
          command=""
        />
        <TerminalCursor color={accent} />
      </footer>
    </div>
  );
}

/** Tight bullet separator used between stats. */
function Bullet() {
  return (
    <span
      className="mx-2 select-none"
      style={{ color: 'var(--fg-dim)' }}
      aria-hidden="true"
    >
      •
    </span>
  );
}
