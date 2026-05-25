import type { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
}

/**
 * Plain panel — single-pixel hairline border, no shadow, slightly elevated
 * background. Sharp corners. Used wherever the app needs a contained block.
 */
export function Card({ elevated = false, className = '', children, ...props }: CardProps) {
  const base = [
    'border border-[var(--border)]',
    'transition-colors duration-100 ease-out',
    elevated ? 'bg-[var(--bg-elevated)]' : 'bg-[var(--bg)]',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={base} {...props}>
      {children}
    </div>
  );
}
