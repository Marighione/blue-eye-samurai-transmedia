import type { ReactNode } from 'react';

interface SectionWrapperProps {
  children: ReactNode;
  visualLanguage: 'paper' | 'blue-cold' | 'golden-fire';
  fullHeight?: boolean;
  className?: string;
  id?: string;
}

const langStyles = {
  'paper': 'texture-paper text-ink',
  'blue-cold': 'texture-dark text-snow',
  'golden-fire': 'bg-wood text-paper',
};

export function SectionWrapper({ children, visualLanguage, fullHeight = false, className = '', id }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`overflow-hidden relative ${langStyles[visualLanguage]} ${fullHeight ? 'min-h-screen' : ''} ${className}`}
    >
      {children}
    </section>
  );
}
