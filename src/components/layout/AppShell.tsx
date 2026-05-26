'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { LANGUAGES } from '@/curriculum/types';
import { TerminalCursor } from '@/components/ui/TerminalCursor';
import { PathBreadcrumb } from '@/components/ui/PathBreadcrumb';

import { useProgress } from '@/lib/use-progress';
import { calculateGamification } from '@/lib/gamification';

interface AppShellProps {
  children: ReactNode;
  /** When true, renders the LanguageNav slot below the top bar */
  showNav?: boolean;
  navSlot?: ReactNode;
}

/**
 * Builds a path breadcrumb from the current URL.
 * /python/3 → [python, phase_03]
 */
function buildSegments(pathname: string): { label: string; href?: string }[] {
  if (!pathname || pathname === '/') return [];
  const parts = pathname.split('/').filter(Boolean);
  const segments: { label: string; href?: string }[] = [];
  let acc = '';

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (part === undefined) continue;
    acc += `/${part}`;

    const lang = LANGUAGES.find((l) => l.id === part);
    if (lang) {
      segments.push({ label: lang.id, href: acc });
      continue;
    }

    if (/^\d+$/.test(part)) {
      const padded = part.padStart(2, '0');
      segments.push({ label: `phase_${padded}`, href: acc });
      continue;
    }

    segments.push({ label: part, href: acc });
  }

  return segments;
}

export function AppShell({ children, showNav = false, navSlot }: AppShellProps) {
  const pathname = usePathname() ?? '/';
  const segments = buildSegments(pathname);
  const onSettings = pathname.startsWith('/settings');
  const onIntake = pathname.startsWith('/intake');
  const onCreds = pathname.startsWith('/credentials');

  const { state, hydrated } = useProgress();
  const stats = calculateGamification(state);

  return (
    <div className="min-h-dvh flex flex-col">
      {/* Top bar — terminal header. Safe-area inset on top so the chrome
       * doesn't slip under the iPhone notch / Dynamic Island. */}
      <header
        className="sticky top-0 z-50 safe-sticky-top"
        style={{
          backgroundColor: 'color-mix(in srgb, var(--bg) 92%, transparent)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="flex items-center justify-between gap-3 px-3 sm:px-6 h-12">
          {/* Wordmark + breadcrumb */}
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-mono text-xs leading-none flex-shrink-0 -mx-2 px-2 h-11 sm:h-9"
              aria-label="polyglot home"
            >
              <span style={{ color: 'var(--accent-prompt)' }} className="glow-soft font-semibold">
                polyglot
              </span>
              <span style={{ color: 'var(--fg-muted)' }}>@</span>
              <span style={{ color: 'var(--accent-info)' }} className="hidden sm:inline">
                terminal
              </span>
              <span style={{ color: 'var(--fg-muted)' }} className="hidden sm:inline">
                :
              </span>
            </Link>

            {/* Breadcrumb */}
            <div className="min-w-0 truncate hidden sm:block">
              <PathBreadcrumb segments={segments} />
            </div>
          </div>

          {/* Gamification stats */}
          {hydrated && stats.xp > 0 && (
            <div className="flex items-center gap-2.5 sm:gap-4 text-[10px] sm:text-xs font-mono text-[var(--fg-muted)] min-w-0">
              <span className="flex items-center gap-0.5 sm:gap-1 shrink-0" title={`${stats.streak} day streak`}>
                <span>🔥</span>
                <span className="text-[var(--fg)] font-semibold">{stats.streak}d</span>
              </span>
              <span className="flex items-center gap-0.5 sm:gap-1 shrink-0" title={`${stats.xp} experience points`}>
                <span style={{ color: 'var(--accent-prompt)' }}>XP:</span>
                <span className="text-[var(--fg)] font-semibold">{stats.xp}</span>
              </span>
              <span className="hidden md:flex items-center gap-1.5 min-w-0">
                <span className="text-[var(--fg-dim)] shrink-0">rank:</span>
                <span style={{ color: 'var(--accent-info)' }} className="font-semibold truncate">{stats.rank}</span>
                <span className="text-[var(--fg-dim)] font-normal shrink-0 select-none">
                  [{'#'.repeat(Math.floor(stats.percentToNext / 10)) + '.'.repeat(10 - Math.floor(stats.percentToNext / 10))}]
                </span>
              </span>
            </div>
          )}

          {/* Right actions */}
          <nav className="flex items-center gap-1 flex-shrink-0" aria-label="App navigation">
            <Link
              href="/credentials"
              className={[
                'inline-flex items-center justify-center font-mono text-xs leading-none',
                'h-11 sm:h-8 px-2 border transition-colors duration-100',
                'focus-visible:outline-1 focus-visible:outline-offset-2',
                'active:bg-[color-mix(in_srgb,var(--accent-info)_14%,transparent)]',
                onCreds
                  ? 'border-[var(--accent-prompt)] text-[var(--accent-prompt)]'
                  : 'border-[var(--border)] text-[var(--fg-muted)] hover:border-[var(--accent-info)] hover:text-[var(--accent-info)]',
              ].join(' ')}
              aria-label="Credentials"
              aria-current={onCreds ? 'page' : undefined}
            >
              <span aria-hidden="true" className="opacity-60">[</span>
              <span className="px-1">creds</span>
              <span aria-hidden="true" className="opacity-60">]</span>
            </Link>
            <Link
              href="/settings"
              className={[
                'inline-flex items-center justify-center font-mono text-xs leading-none',
                /* 44px touch surface, painted 32px tall via inner span */
                'h-11 sm:h-8 px-2 border transition-colors duration-100',
                'focus-visible:outline-1 focus-visible:outline-offset-2',
                'active:bg-[color-mix(in_srgb,var(--accent-prompt)_14%,transparent)]',
                onSettings
                  ? 'border-[var(--accent-prompt)] text-[var(--accent-prompt)]'
                  : 'border-[var(--border)] text-[var(--fg-muted)] hover:border-[var(--accent-prompt)] hover:text-[var(--accent-prompt)]',
              ].join(' ')}
              aria-label="Settings"
              aria-current={onSettings ? 'page' : undefined}
            >
              <span aria-hidden="true" className="opacity-60">[</span>
              <span className="px-1">settings</span>
              <span aria-hidden="true" className="opacity-60">]</span>
            </Link>
            <Link
              href="/intake"
              className={[
                'inline-flex items-center justify-center font-mono text-xs leading-none',
                'h-11 sm:h-8 px-2 border transition-colors duration-100',
                'focus-visible:outline-1 focus-visible:outline-offset-2',
                'active:bg-[color-mix(in_srgb,var(--accent-warn)_14%,transparent)]',
                onIntake
                  ? 'border-[var(--accent-prompt)] text-[var(--accent-prompt)]'
                  : 'border-[var(--border)] text-[var(--fg-muted)] hover:border-[var(--accent-warn)] hover:text-[var(--accent-warn)]',
              ].join(' ')}
              aria-label="Intake"
              aria-current={onIntake ? 'page' : undefined}
            >
              <span aria-hidden="true" className="opacity-60">[</span>
              <span className="px-1">intake</span>
              <span aria-hidden="true" className="opacity-60">]</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Mobile-only breadcrumb */}
      {segments.length > 0 && (
        <div
          className="sm:hidden px-3 py-1.5 text-[11px] overflow-x-auto"
          style={{ borderBottom: '1px dashed var(--border)' }}
        >
          <PathBreadcrumb segments={segments} />
        </div>
      )}

      {/* Optional language nav */}
      {showNav && navSlot && (
        <div style={{ borderBottom: '1px solid var(--border)' }}>{navSlot}</div>
      )}

      {/* Page content */}
      <main id="main-content" tabIndex={-1} className="flex-1">
        {children}
      </main>

      {/* Status-bar footer — collapses to single-line typography in landscape
       * iPhone (height ≤ 480px) so chrome doesn't eat the visible viewport.
       * The safe-pb class adds env(safe-area-inset-bottom) so the home-indicator
       * doesn't overlap. */}
      <footer
        className="app-footer-mobile-collapse safe-pb px-3 sm:px-6 py-2 flex items-center justify-between gap-3 text-[11px] font-mono"
        style={{
          color: 'var(--fg-dim)',
          borderTop: '1px solid var(--border)',
          backgroundColor: 'var(--bg-elevated)',
        }}
      >
        <span className="inline-flex items-center gap-2 truncate">
          <span style={{ color: 'var(--accent-prompt)' }}>●</span>
          <span className="hidden xs:inline sm:inline">polyglot-curriculum v1.0.0</span>
          <span className="sm:hidden">v1.0.0</span>
        </span>
        <span className="inline-flex items-center gap-2 truncate">
          <span className="hidden sm:inline">jetbrains-mono</span>
          <span style={{ color: 'var(--fg-dim)' }} className="hidden sm:inline">/</span>
          <span className="hidden sm:inline">tab=2</span>
          <span style={{ color: 'var(--fg-dim)' }} className="hidden sm:inline">/</span>
          <span className="inline-flex items-center">
            ready<TerminalCursor thin />
          </span>
        </span>
      </footer>
    </div>
  );
}
