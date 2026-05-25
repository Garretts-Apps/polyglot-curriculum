'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LANGUAGES } from '@/curriculum/types';

export function LanguageNav() {
  const pathname = usePathname();

  return (
    <nav
      className="flex items-center gap-1 px-4 sm:px-8 overflow-x-auto"
      style={{ height: '48px' }}
      aria-label="Language navigation"
    >
      {LANGUAGES.map((lang) => {
        const href = `/${lang.id}`;
        const isActive = pathname === href || pathname.startsWith(href + '/');

        return (
          <Link
            key={lang.id}
            href={href}
            className="flex items-center gap-1.5 px-3 h-8 rounded-[var(--radius-md)] text-sm font-sans whitespace-nowrap transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              color: isActive ? `var(--accent-${lang.id})` : 'var(--fg-muted)',
              backgroundColor: isActive
                ? `color-mix(in srgb, var(--accent-${lang.id}) 10%, transparent)`
                : 'transparent',
              fontWeight: isActive ? 500 : 400,
            }}
            aria-current={isActive ? 'page' : undefined}
          >
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: `var(--accent-${lang.id})` }}
              aria-hidden="true"
            />
            {lang.name}
          </Link>
        );
      })}
    </nav>
  );
}
