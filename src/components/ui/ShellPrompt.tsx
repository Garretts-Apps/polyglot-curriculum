import type { ReactNode } from 'react';

interface ShellPromptProps {
  /** What appears after the prompt — e.g. "ls -la ~/curriculum" */
  command?: string;
  /** Optional inline children rendered after the command */
  children?: ReactNode;
  /** Prompt user/host shown left of the path */
  user?: string;
  /** Working directory shown after host */
  cwd?: string;
  /** Hide the user@host prefix and just show $ */
  minimal?: boolean;
  /** Optional override prompt character */
  symbol?: string;
  className?: string;
}

/**
 * Render a shell-style prompt header. Used for section titles across the app.
 *
 *   <ShellPrompt cwd="~/curriculum" command="ls -la" />
 *   →  garrett@polyglot:~/curriculum$ ls -la
 *
 *   <ShellPrompt minimal command="cat intro.md" />
 *   →  $ cat intro.md
 */
export function ShellPrompt({
  command,
  children,
  user = 'garrett',
  cwd,
  minimal = false,
  symbol = '$',
  className = '',
}: ShellPromptProps) {
  return (
    <span
      className={['inline-flex items-baseline flex-wrap gap-x-1 font-mono leading-tight', className].join(' ')}
    >
      {!minimal && (
        <>
          <span style={{ color: 'var(--accent-prompt)' }} className="glow-soft">
            {user}@polyglot
          </span>
          {cwd && (
            <>
              <span style={{ color: 'var(--fg-muted)' }}>:</span>
              <span style={{ color: 'var(--accent-info)' }}>{cwd}</span>
            </>
          )}
        </>
      )}
      <span style={{ color: 'var(--accent-prompt)' }} className="glow-soft">
        {symbol}
      </span>
      {command && <span style={{ color: 'var(--fg)' }}>{command}</span>}
      {children}
    </span>
  );
}
