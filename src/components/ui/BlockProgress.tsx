interface BlockProgressProps {
  /** 0..1 (any out-of-range value is clamped) */
  value: number;
  /** Number of cells. Defaults to 20. */
  width?: number;
  /** CSS color or var for the filled portion. Defaults to var(--accent-prompt). */
  color?: string;
  /** Show the percentage label inline after the bar */
  showPercent?: boolean;
  /** Accessible label */
  label?: string;
  className?: string;
}

const FULL = '█';
const SEVEN_EIGHTHS = '▉';
const THREE_QUARTERS = '▊';
const FIVE_EIGHTHS = '▋';
const HALF = '▌';
const THREE_EIGHTHS = '▍';
const QUARTER = '▎';
const EIGHTH = '▏';
const EMPTY = '░';

/**
 * Build a unicode block progress bar like `███████▍░░░░░░░░░░░░`.
 * Uses sub-cell glyphs so motion feels smooth as the bar fills.
 */
export function BlockProgress({
  value,
  width = 20,
  color = 'var(--accent-prompt)',
  showPercent = true,
  label,
  className = '',
}: BlockProgressProps) {
  const clamped = Math.max(0, Math.min(1, isNaN(value) ? 0 : value));
  const totalEighths = Math.round(clamped * width * 8);
  const fullBlocks = Math.floor(totalEighths / 8);
  const remainder = totalEighths - fullBlocks * 8;

  let partial = '';
  switch (remainder) {
    case 1: partial = EIGHTH; break;
    case 2: partial = QUARTER; break;
    case 3: partial = THREE_EIGHTHS; break;
    case 4: partial = HALF; break;
    case 5: partial = FIVE_EIGHTHS; break;
    case 6: partial = THREE_QUARTERS; break;
    case 7: partial = SEVEN_EIGHTHS; break;
    default: partial = '';
  }

  const filled = FULL.repeat(Math.min(fullBlocks, width)) + (fullBlocks < width ? partial : '');
  const empty = EMPTY.repeat(Math.max(0, width - filled.length));
  const pct = Math.round(clamped * 100);

  return (
    <span
      className={['inline-flex items-center gap-2 font-mono leading-none tabular-nums', className].join(' ')}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label ?? `progress ${pct}%`}
    >
      <span style={{ color }}>{filled}</span>
      <span style={{ color: 'var(--fg-dim)' }}>{empty}</span>
      {showPercent && (
        <span
          className="text-xs"
          style={{ color, minWidth: '3.5ch', textAlign: 'right' }}
        >
          {pct.toString().padStart(3, ' ')}%
        </span>
      )}
    </span>
  );
}
