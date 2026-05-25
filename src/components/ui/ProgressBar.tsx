import { BlockProgress } from './BlockProgress';

interface ProgressBarProps {
  /** 0-100 */
  value: number;
  /** CSS var name like '--accent-python'. Falls back to terminal green. */
  accentVar?: string;
  label?: string;
  showLabel?: boolean;
  /** Bar width in cells. Defaults to 16. */
  width?: number;
  /** Legacy prop (ignored) — kept so existing callers don't break. */
  height?: 'sm' | 'md';
}

/**
 * Drop-in replacement for the old <ProgressBar>. Renders a unicode block bar
 * (`███████░░░░░░░░░ 47%`) — same accessible API, terminal aesthetic.
 */
export function ProgressBar({
  value,
  accentVar,
  label,
  showLabel = false,
  width = 16,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  const color = accentVar ? `var(${accentVar})` : 'var(--accent-prompt)';

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-1 text-xs" style={{ color: 'var(--fg-muted)' }}>
          <span>{label}</span>
        </div>
      )}
      <BlockProgress
        value={clamped / 100}
        width={width}
        color={color}
        showPercent={showLabel}
        label={label}
      />
    </div>
  );
}
