import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Wraps the label in `[ ... ]` brackets. Default true. */
  bracketed?: boolean;
}

interface ButtonAsButtonProps
  extends ButtonBaseProps,
    ButtonHTMLAttributes<HTMLButtonElement> {
  as?: 'button';
  href?: never;
}

interface ButtonAsLinkProps extends ButtonBaseProps {
  as: 'link';
  href: string;
  children: ReactNode;
  className?: string;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
  rel?: AnchorHTMLAttributes<HTMLAnchorElement>['rel'];
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

/*
 * Sizes
 *
 * Each variant has a "painted height" (the visible border) and a "touch height"
 * (the actual hit surface). On coarse pointers the touch height bumps to 44px
 * minimum per Apple HIG — handled via the global rule in globals.css.
 */
const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-2.5 py-1.5 text-xs min-h-[36px]',
  md: 'px-3 py-2 text-sm min-h-[40px]',
  lg: 'px-4 py-3 text-sm min-h-[44px]',
};

/*
 * Variants
 *
 * The :active selector mirrors :hover so tap response works without a
 * hover-capable pointer. The inverted fill style on primary/danger gives a
 * crisp terminal "selected row" feel.
 */
const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    'bg-transparent text-[var(--accent-prompt)]',
    'border border-[var(--accent-prompt)]',
    'hover:bg-[var(--accent-prompt)] hover:text-[var(--bg)]',
    'active:bg-[var(--accent-prompt)] active:text-[var(--bg)]',
  ].join(' '),
  secondary: [
    'bg-transparent text-[var(--fg)]',
    'border border-[var(--border-active)]',
    'hover:border-[var(--accent-prompt)] hover:text-[var(--accent-prompt)]',
    'active:border-[var(--accent-prompt)] active:text-[var(--accent-prompt)]',
    'active:bg-[color-mix(in_srgb,var(--accent-prompt)_8%,transparent)]',
  ].join(' '),
  ghost: [
    'bg-transparent text-[var(--fg-muted)] border border-transparent',
    'hover:text-[var(--accent-prompt)] hover:border-[var(--border-active)]',
    'active:text-[var(--accent-prompt)] active:border-[var(--border-active)]',
    'active:bg-[color-mix(in_srgb,var(--accent-prompt)_6%,transparent)]',
  ].join(' '),
  danger: [
    'bg-transparent text-[var(--accent-error)]',
    'border border-[var(--accent-error)]',
    'hover:bg-[var(--accent-error)] hover:text-[var(--bg)]',
    'active:bg-[var(--accent-error)] active:text-[var(--bg)]',
  ].join(' '),
};

const baseStyles = [
  'inline-flex items-center justify-center gap-1.5',
  'font-mono font-medium leading-none tracking-wide',
  'transition-colors duration-100 ease-out',
  'cursor-pointer select-none',
  /* Suppress 300ms tap delay + the default iOS grey flash */
  'touch-manipulation',
  'focus-visible:outline-1 focus-visible:outline-offset-2',
  'disabled:opacity-40 disabled:cursor-not-allowed',
  'disabled:hover:bg-transparent disabled:active:bg-transparent',
].join(' ');

function withBrackets(children: ReactNode, bracketed: boolean) {
  if (!bracketed) return children;
  return (
    <>
      <span aria-hidden="true" className="opacity-60">[</span>
      <span className="px-0.5">{children}</span>
      <span aria-hidden="true" className="opacity-60">]</span>
    </>
  );
}

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', bracketed = true } = props;
  const classes = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    (props as ButtonAsButtonProps).className,
  ]
    .filter(Boolean)
    .join(' ');

  if (props.as === 'link') {
    const {
      href,
      children,
      target,
      rel,
      className: _c,
      as: _a,
      variant: _v,
      size: _s,
      bracketed: _b,
      ...rest
    } = props;
    void _c;
    void _a;
    void _v;
    void _s;
    void _b;
    return (
      <Link href={href} className={classes} target={target} rel={rel} {...(rest as object)}>
        {withBrackets(children, bracketed)}
      </Link>
    );
  }

  const {
    as: _a,
    variant: _v,
    size: _s,
    className: _c,
    bracketed: _b,
    children,
    ...rest
  } = props as ButtonAsButtonProps;
  void _a;
  void _v;
  void _s;
  void _c;
  void _b;

  return (
    <button className={classes} {...rest}>
      {withBrackets(children, bracketed)}
    </button>
  );
}
