import type { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
}

export function Card({ elevated = false, className = '', children, ...props }: CardProps) {
  const base = [
    'rounded-[var(--radius-lg)]',
    'border border-[var(--border)]',
    'transition-colors duration-150 ease-out',
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
