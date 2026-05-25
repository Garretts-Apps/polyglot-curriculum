import type { CSSProperties } from 'react';

export type StatusKind = 'ok' | 'fail' | 'pending' | 'running' | 'pass' | 'info' | 'locked';

interface StatusTagProps {
  status: StatusKind;
  label?: string;
  className?: string;
  glow?: boolean;
}

const META: Record<StatusKind, { label: string; color: string; symbol: string }> = {
  ok:      { label: '  OK  ', color: 'var(--accent-prompt)', symbol: '✓' },
  pass:    { label: 'PASS', color: 'var(--accent-prompt)', symbol: '✓' },
  fail:    { label: 'FAIL', color: 'var(--accent-error)',  symbol: '✗' },
  pending: { label: 'PEND', color: 'var(--accent-warn)',   symbol: '·' },
  running: { label: ' RUN', color: 'var(--accent-info)',   symbol: '…' },
  info:    { label: 'INFO', color: 'var(--accent-info)',   symbol: 'i' },
  locked:  { label: 'LOCK', color: 'var(--fg-dim)',        symbol: '×' },
};

/**
 * Render a CI-style status tag — `[ OK ]`, `[FAIL]`, `[PEND]`, etc.
 *
 * Tags are exactly 6 characters wide (incl. brackets) so a column of tags
 * lines up vertically in a monospace grid.
 */
export function StatusTag({ status, label, className = '', glow = true }: StatusTagProps) {
  const meta = META[status];
  const text = (label ?? meta.label).padStart(4, ' ').slice(0, 4);

  const style: CSSProperties = {
    color: meta.color,
    borderColor: `color-mix(in srgb, ${meta.color} 40%, transparent)`,
    backgroundColor: `color-mix(in srgb, ${meta.color} 8%, transparent)`,
    fontVariantNumeric: 'tabular-nums',
    textShadow: glow ? `0 0 6px color-mix(in srgb, ${meta.color} 45%, transparent)` : undefined,
  };

  return (
    <span
      className={[
        'inline-flex items-center font-mono text-[0.7rem] leading-none',
        'px-1.5 py-1 border whitespace-nowrap tracking-wider',
        className,
      ].join(' ')}
      style={style}
      role="status"
      aria-label={`status: ${meta.label.trim()}`}
    >
      [{text}]
    </span>
  );
}
