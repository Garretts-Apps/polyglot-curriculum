import Link from 'next/link';
import type { ReactNode } from 'react';

interface AppShellProps {
  children: ReactNode;
  /** When true, renders the LanguageNav slot below the top bar */
  showNav?: boolean;
  navSlot?: ReactNode;
}

export function AppShell({ children, showNav = false, navSlot }: AppShellProps) {
  return (
    <div className="min-h-dvh flex flex-col bg-[var(--bg)]">
      {/* Top bar */}
      <header
        className="sticky top-0 z-50 h-14 flex items-center justify-between px-4 sm:px-8"
        style={{
          backgroundColor: 'color-mix(in srgb, var(--bg) 85%, transparent)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        {/* Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-2 min-h-0 min-w-0 focus-visible:outline-2 focus-visible:outline-offset-4"
          aria-label="Polyglot Curriculum home"
        >
          <span
            className="font-serif text-xl font-semibold tracking-tight"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.025em' }}
          >
            Polyglot
          </span>
          <span
            className="text-[10px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded border"
            style={{
              color: 'var(--fg-muted)',
              borderColor: 'var(--border)',
              lineHeight: '1.4',
            }}
          >
            curriculum
          </span>
        </Link>

        {/* Right actions */}
        <nav className="flex items-center gap-2" aria-label="App navigation">
          <Link
            href="/settings"
            className="flex items-center justify-center w-11 h-11 rounded-[var(--radius-md)] text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--bg-elevated)] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2"
            aria-label="Settings"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </Link>
        </nav>
      </header>

      {/* Optional language nav */}
      {showNav && navSlot && (
        <div style={{ borderBottom: '1px solid var(--border)' }}>{navSlot}</div>
      )}

      {/* Page content */}
      <main id="main-content" tabIndex={-1} className="flex-1">{children}</main>
    </div>
  );
}
