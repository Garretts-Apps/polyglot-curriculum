interface ProgressBarProps {
  value: number; // 0-100
  accentVar?: string; // CSS var e.g. '--accent-python'
  label?: string;
  showLabel?: boolean;
  height?: 'sm' | 'md';
}

export function ProgressBar({
  value,
  accentVar = '--accent-typescript',
  label,
  showLabel = false,
  height = 'sm',
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  const heightClass = height === 'sm' ? 'h-1' : 'h-2';

  return (
    <div className="w-full">
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && (
            <span className="text-xs text-[var(--fg-muted)] font-sans">{label}</span>
          )}
          {showLabel && (
            <span
              className="text-xs font-mono tabular-nums ml-auto"
              style={{ color: `var(${accentVar})` }}
            >
              {clamped}%
            </span>
          )}
        </div>
      )}
      <div
        className={`w-full ${heightClass} rounded-full bg-[var(--border)] overflow-hidden`}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? 'Progress'}
      >
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${clamped}%`,
            backgroundColor: `var(${accentVar})`,
          }}
        />
      </div>
    </div>
  );
}
