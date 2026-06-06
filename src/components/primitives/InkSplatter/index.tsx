import type { CSSProperties } from 'react';

interface InkSplatterProps {
  variant: 'ink' | 'blood';
  size?: 'sm' | 'md' | 'lg';
  opacity?: number;
  className?: string;
  style?: CSSProperties;
  index?: number;
}

const inkPaths = [
  'M50 30 C60 10, 90 15, 85 35 C80 55, 95 60, 80 75 C65 90, 40 85, 30 70 C20 55, 15 40, 30 30 C35 25, 45 35, 50 30Z M70 20 C75 15, 85 25, 80 30 C75 35, 65 28, 70 20Z',
  'M40 50 C30 30, 55 20, 70 30 C85 40, 90 65, 75 75 C60 85, 35 80, 28 65 C22 55, 30 45, 40 50Z M80 45 C85 38, 95 48, 88 55 C82 62, 75 52, 80 45Z',
  'M55 20 C70 5, 95 20, 90 40 C85 60, 70 70, 50 65 C30 60, 15 45, 20 30 C25 15, 45 15, 55 20Z M85 55 C90 48, 100 58, 93 65 C87 72, 80 62, 85 55Z',
  'M45 40 C35 20, 60 10, 75 25 C90 40, 88 65, 70 75 C52 85, 30 75, 22 58 C14 42, 25 30, 45 40Z M72 15 C78 8, 90 18, 83 25 C76 32, 67 22, 72 15Z',
];

const sizeStyles = {
  sm: 'w-16 h-16',
  md: 'w-32 h-32',
  lg: 'w-48 h-48',
};

export function InkSplatter({ variant, size = 'md', opacity = 0.1, className = '', style, index = 0 }: InkSplatterProps) {
  const color = variant === 'blood' ? '#8B1A1A' : '#1A1614';
  const pathIndex = index % inkPaths.length;

  return (
    <svg
      viewBox="0 0 110 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${sizeStyles[size]} ${className}`}
      style={{ opacity, ...style }}
      aria-hidden="true"
    >
      <path d={inkPaths[pathIndex]} fill={color} />
    </svg>
  );
}
