'use client';

import Link from 'next/link';

interface Segment {
  label: string;
  href?: string;
}

interface PathBreadcrumbProps {
  segments: Segment[];
  /** Optional prefix — defaults to ~/curriculum */
  prefix?: string;
  className?: string;
}

/**
 * Renders a filesystem-style breadcrumb:
 *
 *   ~/curriculum/python/03_modules
 *
 * Each segment is optionally a link. Separators are subtle slashes.
 */
export function PathBreadcrumb({
  segments,
  prefix = '~/curriculum',
  className = '',
}: PathBreadcrumbProps) {
  return (
    <span
      className={['inline-flex items-baseline flex-wrap font-mono text-xs', className].join(' ')}
      aria-label="breadcrumb"
    >
      <Link
        href="/"
        className="hover:opacity-100 transition-opacity duration-100"
        style={{ color: 'var(--fg-muted)' }}
      >
        {prefix}
      </Link>
      {segments.map((seg, i) => {
        const isLast = i === segments.length - 1;
        return (
          <span key={i} className="contents">
            <span style={{ color: 'var(--fg-dim)' }} aria-hidden="true">
              /
            </span>
            {seg.href && !isLast ? (
              <Link
                href={seg.href}
                className="transition-colors duration-100 hover:[color:var(--accent-prompt)]"
                style={{ color: 'var(--fg-muted)' }}
              >
                {seg.label}
              </Link>
            ) : (
              <span style={{ color: isLast ? 'var(--accent-prompt)' : 'var(--fg-muted)' }}>
                {seg.label}
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
}
