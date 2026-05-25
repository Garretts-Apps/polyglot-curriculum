import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
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
  children: React.ReactNode;
  className?: string;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
  rel?: AnchorHTMLAttributes<HTMLAnchorElement>['rel'];
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-2 text-sm min-h-[44px]',
  md: 'px-5 py-3 text-base min-h-[44px]',
  lg: 'px-7 py-4 text-lg min-h-[52px]',
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    'bg-[var(--fg)] text-[var(--bg)]',
    'hover:opacity-90',
    'font-medium',
  ].join(' '),
  secondary: [
    'bg-transparent text-[var(--fg)]',
    'border border-[var(--border)]',
    'hover:border-[var(--border-hover)] hover:bg-[var(--bg-elevated)]',
  ].join(' '),
  ghost: [
    'bg-transparent text-[var(--fg-muted)]',
    'hover:text-[var(--fg)] hover:bg-[var(--bg-elevated)]',
  ].join(' '),
};

const baseStyles = [
  'inline-flex items-center justify-center gap-2',
  'rounded-[var(--radius-md)]',
  'font-sans transition-all duration-150 ease-out',
  'cursor-pointer select-none',
  'focus-visible:outline-2 focus-visible:outline-offset-2',
  'disabled:opacity-40 disabled:cursor-not-allowed',
].join(' ');

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md' } = props;
  const classes = [baseStyles, variantStyles[variant], sizeStyles[size], (props as ButtonAsButtonProps).className].filter(Boolean).join(' ');

  if (props.as === 'link') {
    const { href, children, target, rel, className: _c, as: _a, variant: _v, size: _s, ...rest } = props;
    void _c; void _a; void _v; void _s;
    return (
      <Link
        href={href}
        className={classes}
        target={target}
        rel={rel}
        {...(rest as object)}
      >
        {children}
      </Link>
    );
  }

  const { as: _a, variant: _v, size: _s, className: _c, ...rest } = props as ButtonAsButtonProps;
  void _a; void _v; void _s; void _c;

  return (
    <button className={classes} {...rest} />
  );
}
