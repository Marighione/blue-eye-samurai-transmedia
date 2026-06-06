'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';

interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost';
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit';
}

const sizeStyles = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-10 py-3.5 text-sm',
  lg: 'px-12 py-4 text-base',
};

const variantStyles = {
  primary: `
    border border-gold text-gold bg-transparent
    hover:bg-gold/10 hover:shadow-[0_0_30px_rgba(197,138,42,0.15)]
    transition-all duration-500 font-ui font-semibold uppercase tracking-wider
    disabled:opacity-40 disabled:cursor-not-allowed
  `,
  secondary: `
    text-mist-light bg-transparent border-0
    hover:underline hover:text-snow
    transition-all duration-300 font-ui font-medium
    disabled:opacity-40 disabled:cursor-not-allowed
  `,
  ghost: `
    text-snow/70 bg-transparent border border-white/20
    hover:text-snow hover:border-white/40 hover:bg-white/5
    transition-all duration-300 font-ui font-light uppercase tracking-wider
    disabled:opacity-20 disabled:cursor-not-allowed
  `,
};

export function Button({ variant, children, href, onClick, disabled, className = '', size = 'md', type = 'button' }: ButtonProps) {
  const classes = `${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
