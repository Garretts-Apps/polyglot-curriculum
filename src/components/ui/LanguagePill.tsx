import type { Language } from '@/curriculum/types';

interface LanguagePillProps {
  language: Language;
  name: string;
  size?: 'sm' | 'md';
}

export function LanguagePill({ language, name, size = 'md' }: LanguagePillProps) {
  const sizeStyles = size === 'sm'
    ? 'text-xs px-2 py-0.5 min-h-0'
    : 'text-sm px-3 py-1';

  return (
    <span
      className={[
        'inline-flex items-center font-mono font-medium rounded-[var(--radius-full)]',
        'border transition-opacity duration-150',
        sizeStyles,
      ].join(' ')}
      style={{
        color: `var(--accent-${language})`,
        borderColor: `color-mix(in srgb, var(--accent-${language}) 30%, transparent)`,
        backgroundColor: `color-mix(in srgb, var(--accent-${language}) 8%, transparent)`,
      }}
    >
      {name}
    </span>
  );
}
