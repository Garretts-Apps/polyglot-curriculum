import type { ReactNode } from 'react';

interface AsciiBoxProps {
  children: ReactNode;
  /** Title rendered in the top border, like `╭─ title ──────╮` */
  title?: string;
  /** Title color */
  titleColor?: string;
  /** Border color */
  borderColor?: string;
  className?: string;
  /** padded child content */
  innerClassName?: string;
}

/**
 * A box with ASCII-style borders rendered via CSS. We use absolute-positioned
 * pseudo-elements for the corner glyphs so the layout stays clean and
 * responsive without monospace alignment math.
 *
 * Visual:
 *   ╭─ title ────────────╮
 *   │ children           │
 *   ╰────────────────────╯
 */
export function AsciiBox({
  children,
  title,
  titleColor = 'var(--accent-prompt)',
  borderColor = 'var(--border-active)',
  className = '',
  innerClassName = 'p-4',
}: AsciiBoxProps) {
  return (
    <div
      className={['relative', className].join(' ')}
      style={{
        border: `1px solid ${borderColor}`,
        backgroundColor: 'var(--bg-elevated)',
      }}
    >
      {/* corners */}
      <span
        aria-hidden="true"
        className="absolute -top-[1px] -left-[1px] font-mono text-xs leading-none select-none"
        style={{ color: borderColor, transform: 'translate(-2px, -7px)' }}
      >
        +
      </span>
      <span
        aria-hidden="true"
        className="absolute -top-[1px] -right-[1px] font-mono text-xs leading-none select-none"
        style={{ color: borderColor, transform: 'translate(2px, -7px)' }}
      >
        +
      </span>
      <span
        aria-hidden="true"
        className="absolute -bottom-[1px] -left-[1px] font-mono text-xs leading-none select-none"
        style={{ color: borderColor, transform: 'translate(-2px, 8px)' }}
      >
        +
      </span>
      <span
        aria-hidden="true"
        className="absolute -bottom-[1px] -right-[1px] font-mono text-xs leading-none select-none"
        style={{ color: borderColor, transform: 'translate(2px, 8px)' }}
      >
        +
      </span>

      {title && (
        <div
          className="absolute top-0 left-3 -translate-y-1/2 px-1.5 font-mono text-xs leading-none uppercase tracking-wider"
          style={{ backgroundColor: 'var(--bg)', color: titleColor }}
        >
          <span style={{ color: 'var(--fg-dim)' }}>─[</span>{' '}
          <span>{title}</span>{' '}
          <span style={{ color: 'var(--fg-dim)' }}>]─</span>
        </div>
      )}

      <div className={innerClassName}>{children}</div>
    </div>
  );
}
