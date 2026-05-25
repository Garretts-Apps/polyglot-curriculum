'use client';

interface TerminalCursorProps {
  /** Use a thinner bar instead of a block */
  thin?: boolean;
  /** Override the colour (defaults to var(--accent-prompt)) */
  color?: string;
  className?: string;
}

/**
 * Blinking block cursor — drop it after a heading, on a prompt, anywhere
 * a terminal would draw one.
 *
 *   <h1>polyglot<TerminalCursor /></h1>
 */
export function TerminalCursor({ thin = false, color, className = '' }: TerminalCursorProps) {
  return (
    <span
      aria-hidden="true"
      className={['cursor-blink', thin ? 'cursor-blink--thin' : '', className]
        .filter(Boolean)
        .join(' ')}
      style={color ? { backgroundColor: color, boxShadow: `0 0 6px ${color}` } : undefined}
    />
  );
}
