import type { Language } from '@/curriculum/types';

interface LanguagePillProps {
  language: Language;
  name: string;
  size?: 'sm' | 'md';
  /** When true, renders inverted (background = accent, text = bg) like an active row in htop. */
  active?: boolean;
}

/**
 * Terminal-style language tag: `[ python ]`.
 */
export function LanguagePill({ language, name, size = 'md', active = false }: LanguagePillProps) {
  const sizeStyles =
    size === 'sm'
      ? 'text-[0.7rem] py-0.5'
      : 'text-xs py-1';

  return (
    <span
      className={[
        'inline-flex items-center font-mono font-medium leading-none whitespace-nowrap',
        'tracking-wide select-none',
        sizeStyles,
      ].join(' ')}
      style={{
        color: active ? 'var(--bg)' : `var(--accent-${language})`,
        backgroundColor: active ? `var(--accent-${language})` : 'transparent',
        textShadow: active
          ? 'none'
          : `0 0 6px color-mix(in srgb, var(--accent-${language}) 35%, transparent)`,
      }}
    >
      <span style={{ color: active ? 'var(--bg)' : 'var(--fg-dim)' }} aria-hidden="true">
        [
      </span>
      <span className="px-1">{name}</span>
      <span style={{ color: active ? 'var(--bg)' : 'var(--fg-dim)' }} aria-hidden="true">
        ]
      </span>
    </span>
  );
}
