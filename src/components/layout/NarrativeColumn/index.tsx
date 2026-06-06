import type { ReactNode } from 'react';

interface NarrativeColumnProps {
  children: ReactNode;
  width?: 'narrow' | 'content' | 'wide';
  className?: string;
}

const widthStyles = {
  narrow: 'max-w-narrative',
  content: 'max-w-content',
  wide: 'max-w-wide',
};

export function NarrativeColumn({ children, width = 'narrow', className = '' }: NarrativeColumnProps) {
  return (
    <div className={`mx-auto px-6 md:px-8 ${widthStyles[width]} ${className}`}>
      {children}
    </div>
  );
}
