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
        boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
        ...style,
      }}
      className="relative w-72 md:w-80 cursor-pointer"
      onClick={() => isVisible && onOpen(document.id)}
      role={isVisible ? 'button' : undefined}
      tabIndex={isVisible ? 0 : undefined}
      onKeyDown={(e) => { if (e.key === 'Enter' && isVisible) onOpen(document.id); }}
      aria-label={isVisible ? `Abrir: ${document.title}` : `Documento bloqueado: ${document.title}`}
    >
      <div
        className="relative p-6 min-h-[220px] overflow-hidden border border-white/10"
        style={{
          backgroundColor: isVisible ? 'rgba(27, 38, 59, 0.8)' : 'rgba(13, 27, 42, 0.6)',
          filter: isVisible ? 'none' : 'saturate(0.3)',
        }}
      >
        {/* Type label */}
        <p
          className={`font-ui text-base font-semibold uppercase tracking-widest mb-3 ${isVisible ? 'text-mist' : 'text-snow/30'}`}
        >
          {document.typeLabel}
        </p>

        {isVisible ? (
          <>
            <p className="font-display text-base font-normal text-snow mb-3 leading-snug">
              {document.title}
            </p>
            {document.sourceLabel && (
              <p className="font-narrative italic text-base text-snow/50 mb-3">
                {document.sourceLabel}
              </p>
            )}
            <p className="font-narrative text-base text-snow/60 leading-relaxed line-clamp-4">
              {document.text}
            </p>
          </>
        ) : (
          <>
            {/* Texto censurado */}
            <div className="space-y-2.5 mb-4">
              {[0.85, 0.7, 0.9, 0.6, 0.75].map((w, i) => (
                <div
                  key={i}
                  className="h-3 rounded-sm bg-white/8"
                  style={{ width: `${w * 100}%` }}
                />
              ))}
            </div>
            <p className="font-ui text-base italic text-snow/25">
              Esta pieza aún no fue descubierta
            </p>
          </>
        )}

        {/* Indicador de estado */}
        {isVisible && (
          <div
            className="absolute bottom-3 right-3 w-1.5 h-1.5 rounded-full bg-gold/60"
          />
        )}
      </div>
    </motion.div>
  );
}
