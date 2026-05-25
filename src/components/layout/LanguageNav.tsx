'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LANGUAGES } from '@/curriculum/types';

export function LanguageNav() {
  const pathname = usePathname();

  return (
    <nav
      className={[
        'flex items-center gap-1 px-3 sm:px-6',
        /* Horizontal scroll on mobile — momentum scrolling kicks in via the
         * global rule. The row height is taller on touch so the painted
         * 28px pills sit inside a comfortable 44px swipe lane. */
        'overflow-x-auto h-12 sm:h-10',
      ].join(' ')}
      aria-label="Language navigation"
      style={{
        /* Smooth swipe momentum on iOS — also exposed via the global rule but
         * declared inline so the prop survives bundlers that strip the
         * vendor-prefixed property. */
        WebkitOverflowScrolling: 'touch',
      }}
    >
      <span
        className="font-mono text-[11px] mr-2 select-none flex-shrink-0"
        style={{ color: 'var(--fg-dim)' }}
        aria-hidden="true"
      >
        $ ls
      </span>
      {LANGUAGES.map((lang) => {
        const href = `/${lang.id}`;
        const isActive = pathname === href || pathname.startsWith(href + '/');

        return (
          <Link
            key={lang.id}
            href={href}
            className={[
              'group inline-flex items-center justify-center font-mono text-xs leading-none',
              /* Touch surface ≥ 44x44; painted border stays at 28px tall so
               * the row still looks like a TUI segment. */
              'min-h-11 sm:min-h-0 h-11 sm:h-7 px-3 sm:px-2 border whitespace-nowrap',
              'transition-colors duration-100',
              'focus-visible:outline-1 focus-visible:outline-offset-2',
              'active:brightness-110',
            ].join(' ')}
            style={{
              color: isActive ? 'var(--bg)' : `var(--accent-${lang.id})`,
              backgroundColor: isActive ? `var(--accent-${lang.id})` : 'transparent',
              borderColor: isActive
                ? `var(--accent-${lang.id})`
                : `color-mix(in srgb, var(--accent-${lang.id}) 30%, transparent)`,
              textShadow: isActive
                ? 'none'
                : `0 0 6px color-mix(in srgb, var(--accent-${lang.id}) 35%, transparent)`,
            }}
            aria-current={isActive ? 'page' : undefined}
          >
            <span
              aria-hidden="true"
              className="opacity-60 mr-0.5 group-hover:opacity-100 transition-opacity"
            >
              {isActive ? '▸' : '['}
            </span>
            {lang.id}
            <span aria-hidden="true" className="opacity-60 ml-0.5">
              {isActive ? '' : ']'}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
