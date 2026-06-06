'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'locked' | 'new';
  className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variantStyles = {
    default: 'border border-gold/50 text-gold bg-transparent',
    locked: 'border border-white/20 text-white/60 bg-transparent',
    new: 'border border-gold-bright text-gold-bright bg-transparent',
  };

  if (variant === 'new') {
    return (
      <motion.span
        animate={{ borderColor: ['rgba(232,177,75,0.5)', 'rgba(232,177,75,1)', 'rgba(232,177,75,0.5)'] }}
        transition={{ duration: 1.5, repeat: 2, ease: 'easeInOut' }}
        className={`inline-block px-3 py-1 font-ui text-xs font-semibold uppercase tracking-widest ${variantStyles[variant]} ${className}`}
      >
        {children}
      </motion.span>
    );
  }

  return (
    <span className={`inline-block px-3 py-1 font-ui text-xs font-semibold uppercase tracking-widest ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
}
