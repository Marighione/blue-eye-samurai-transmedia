interface DividerProps {
  variant: 'ink' | 'sword' | 'dots';
  className?: string;
}

export function Divider({ variant, className = '' }: DividerProps) {
  if (variant === 'dots') {
    return (
      <div className={`flex items-center justify-center gap-2 py-2 ${className}`}>
        <div className="w-1 h-1 rounded-full bg-sepia opacity-60" />
        <div className="w-1 h-1 rounded-full bg-sepia opacity-60" />
        <div className="w-1 h-1 rounded-full bg-sepia opacity-60" />
      </div>
    );
  }

  if (variant === 'sword') {
    return (
      <div className={`relative h-px w-full my-4 ${className}`}>
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, transparent, rgba(165, 140, 100, 0.3), transparent)',
          }}
        />
      </div>
    );
  }

  // ink variant — SVG path irregular
  return (
    <div className={`w-full py-2 ${className}`}>
      <svg
        viewBox="0 0 400 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-2 opacity-30"
      >
        <path
          d="M0 4 Q50 2 100 4.5 Q150 7 200 3.5 Q250 1 300 4.5 Q350 7 400 4"
          stroke="#6B4C3B"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
