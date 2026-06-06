'use client';

import { motion } from 'framer-motion';
import { revealFromFog } from '@/lib/animations';
import type { ElementType, ReactNode } from 'react';

interface TypographyProps {
  variant:
    | 'display'
    | 'section-title'
    | 'card-title'
    | 'narrative'
    | 'narrative-italic'
    | 'quote'
    | 'label'
    | 'nav'
    | 'cta'
    | 'caption';
  children: ReactNode;
  className?: string;
  as?: ElementType;
  color?: string;
  animate?: boolean;
}

const variantStyles: Record<string, string> = {
  'display': 'font-display text-6xl md:text-7xl font-bold tracking-wider leading-none',
  'section-title': 'font-display text-4xl md:text-5xl font-semibold tracking-wide',
  'card-title': 'font-display text-2xl md:text-3xl font-normal tracking-wide',
  'narrative': 'font-narrative text-lg leading-relaxed',
  'narrative-italic': 'font-narrative text-lg italic leading-relaxed',
  'quote': 'font-narrative text-xl italic leading-relaxed',
  'label': 'font-ui text-xs font-semibold uppercase tracking-widest',
  'nav': 'font-ui text-base font-medium',
  'cta': 'font-ui text-sm font-semibold uppercase tracking-wider',
  'caption': 'font-ui text-xs font-normal',
};

const defaultElements: Record<string, ElementType> = {
  'display': 'h1',
  'section-title': 'h2',
  'card-title': 'h3',
  'narrative': 'p',
  'narrative-italic': 'p',
  'quote': 'blockquote',
  'label': 'span',
  'nav': 'span',
  'cta': 'span',
  'caption': 'span',
};

export function Typography({ variant, children, className = '', as, color, animate = false }: TypographyProps) {
  const Tag = as || defaultElements[variant] || 'p';
  const styles = variantStyles[variant] || '';
  const colorStyle = color ? { color } : {};

  if (animate) {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={revealFromFog}
      >
        <Tag className={`${styles} ${className}`} style={colorStyle}>
          {children}
        </Tag>
      </motion.div>
    );
  }

  return (
    <Tag className={`${styles} ${className}`} style={colorStyle}>
      {children}
    </Tag>
  );
}
