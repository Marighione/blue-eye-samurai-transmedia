'use client';

import { motion } from 'framer-motion';
import { documentAppear } from '@/lib/animations';
import type { ArchiveDocument } from '@/types/document';

interface DocumentCardProps {
  document: ArchiveDocument;
  isUnlocked: boolean;
  onOpen: (id: string) => void;
  style?: React.CSSProperties;
}

export function DocumentCard({ document, isUnlocked, onOpen, style }: DocumentCardProps) {
  const isVisible = isUnlocked;

  return (
    <motion.div
      variants={documentAppear}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      whileHover={isVisible ? { y: -8, rotate: 0, boxShadow: '0 20px 60px rgba(0,0,0,0.5)' } : {}}
      style={{
        transform: `rotate(${document.layoutRotation}deg)`,
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        ...style,
      }}
      className="relative w-56 md:w-64 cursor-pointer"
      onClick={() => isVisible && onOpen(document.id)}
      role={isVisible ? 'button' : undefined}
      tabIndex={isVisible ? 0 : undefined}
      onKeyDown={(e) => { if (e.key === 'Enter' && isVisible) onOpen(document.id); }}
      aria-label={isVisible ? `Abrir: ${document.title}` : `Documento bloqueado: ${document.title}`}
    >
      <div
        className="relative p-5 min-h-[180px] overflow-hidden"
        style={{
          backgroundColor: isVisible ? '#F5F0E8' : '#E0D8CC',
          backgroundImage: isVisible
            ? `radial-gradient(ellipse at 20% 80%, rgba(180,140,100,0.2) 0%, transparent 60%)`
            : undefined,
          filter: isVisible ? 'none' : 'saturate(0.3)',
        }}
      >
        {/* Type label */}
        <p
          className="font-ui text-xs font-semibold uppercase tracking-widest mb-3"
          style={{ color: isVisible ? '#6B4C3B' : '#9A9088' }}
        >
          {document.typeLabel}
        </p>

        {isVisible ? (
          <>
            <p className="font-display text-sm font-normal text-ink mb-3 leading-snug">
              {document.title}
            </p>
            {document.sourceLabel && (
              <p className="font-narrative italic text-xs text-ink-faded/60 mb-3">
                {document.sourceLabel}
              </p>
            )}
            <p className="font-narrative text-xs text-ink/70 leading-relaxed line-clamp-4">
              {document.text}
            </p>
          </>
        ) : (
          <>
            {/* Texto censurado */}
            <div className="space-y-2 mb-4">
              {[0.85, 0.7, 0.9, 0.6, 0.75].map((w, i) => (
                <div
                  key={i}
                  className="h-2.5 rounded-sm bg-ink/10"
                  style={{ width: `${w * 100}%` }}
                />
              ))}
            </div>
            <p className="font-ui text-xs italic text-ink/25">
              Esta pieza aún no fue descubierta
            </p>
          </>
        )}

        {/* Indicador de estado */}
        {isVisible && (
          <div
            className="absolute bottom-3 right-3 w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: '#6B4C3B', opacity: 0.5 }}
          />
        )}
      </div>
    </motion.div>
  );
}
