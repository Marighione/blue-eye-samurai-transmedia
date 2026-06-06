'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DocumentCard } from '@/components/ui/DocumentCard';
import { Modal } from '@/components/ui/Modal';
import { InkSplatter } from '@/components/primitives/InkSplatter';
import { Badge } from '@/components/primitives/Badge';
import { staggerContainer, revealFromFog } from '@/lib/animations';
import { processUnlockConditions, isDocumentUnlocked } from '@/lib/unlock-logic';
import { useUserState } from '@/context/UserStateContext';
import { archiveDocuments } from '@/data/archive/documents';
import type { ArchiveDocument, DocumentType } from '@/types/document';

const TYPE_LABELS: Record<DocumentType, string> = {
  'official-record': 'Registro',
  'letter': 'Carta',
  'rumor': 'Rumor',
  'testimony': 'Testimonio',
  'edict': 'Edicto',
  'diary-page': 'Diario',
  'training-note': 'Entrenamiento',
  'unknown': 'Sin clasificar',
};

export function ArchivoInteractivo() {
  const { refreshState } = useUserState();
  const [openDocId, setOpenDocId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<DocumentType | null>(null);
  const [unlockedIds, setUnlockedIds] = useState<string[]>([]);

  useEffect(() => {
    processUnlockConditions();
    refreshState(); // eslint-disable-line react-hooks/exhaustive-deps
    const unlocked = archiveDocuments.map((d) => d.id).filter((id) => isDocumentUnlocked(id));
    setUnlockedIds(unlocked);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const openDoc = archiveDocuments.find((d) => d.id === openDocId) ?? null;

  const visibleDocs = activeFilter
    ? archiveDocuments.filter((d) => d.type === activeFilter)
    : archiveDocuments;

  const usedTypes = Array.from(new Set(archiveDocuments.map((d) => d.type)));

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundColor: '#F5F0E8',
        backgroundImage: `
          radial-gradient(ellipse at 20% 50%, rgba(180,140,100,0.15) 0%, transparent 60%),
          radial-gradient(ellipse at 80% 20%, rgba(140,100,60,0.1) 0%, transparent 50%)
        `,
      }}
    >
      {/* Decoración */}
      <InkSplatter variant="ink" size="lg" opacity={0.04} className="absolute top-32 right-10" index={1} />
      <InkSplatter variant="ink" size="md" opacity={0.03} className="absolute bottom-40 left-8" index={3} />

      {/* Header */}
      <div className="pt-28 pb-10 px-8 md:px-16 border-b border-ink/8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={revealFromFog} className="font-ui text-xs font-semibold uppercase tracking-widest text-sepia/60 mb-4">
            Expediente
          </motion.p>
          <motion.h1 variants={revealFromFog} className="font-display text-5xl md:text-6xl font-semibold text-ink tracking-wide mb-4">
            El Archivo
          </motion.h1>
          <motion.p variants={revealFromFog} className="font-narrative italic text-ink-faded/70 text-lg max-w-lg">
            Documentos, cartas y testimonios. Algunos esperan ser descubiertos.
          </motion.p>

          {/* Conteo */}
          <motion.p variants={revealFromFog} className="font-ui text-xs text-sepia/50 uppercase tracking-widest mt-4">
            {unlockedIds.length} / {archiveDocuments.length} piezas descubiertas
          </motion.p>
        </motion.div>
      </div>

      {/* Filtros */}
      <div className="px-8 md:px-16 py-6 flex flex-wrap gap-3 border-b border-ink/8">
        <button
          onClick={() => setActiveFilter(null)}
          className={`font-ui text-xs font-semibold uppercase tracking-widest px-3 py-1 border transition-colors duration-200 ${
            activeFilter === null
              ? 'border-sepia/60 text-sepia bg-sepia/5'
              : 'border-ink/15 text-ink/40 hover:border-ink/30 hover:text-ink/60'
          }`}
        >
          Todos
        </button>
        {usedTypes.map((type) => (
          <button
            key={type}
            onClick={() => setActiveFilter(activeFilter === type ? null : type)}
            className={`font-ui text-xs font-semibold uppercase tracking-widest px-3 py-1 border transition-colors duration-200 ${
              activeFilter === type
                ? 'border-sepia/60 text-sepia bg-sepia/5'
                : 'border-ink/15 text-ink/40 hover:border-ink/30 hover:text-ink/60'
            }`}
          >
            {TYPE_LABELS[type]}
          </button>
        ))}
      </div>

      {/* Documentos — disposición tipo "esparcidos sobre una mesa" */}
      <div className="relative px-8 md:px-16 py-16 min-h-[900px]">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-8 md:gap-10"
        >
          <AnimatePresence>
            {visibleDocs.map((doc, i) => {
              const unlocked = unlockedIds.includes(doc.id);
              const isFiltered = activeFilter && doc.type !== activeFilter;

              return (
                <motion.div
                  key={doc.id}
                  layout
                  animate={{ opacity: isFiltered ? 0.2 : 1 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    // Desplazamiento vertical leve alternado para simular documentos esparcidos
                    marginTop: i % 3 === 1 ? '2rem' : i % 3 === 2 ? '4rem' : '0',
                  }}
                >
                  <DocumentCard
                    document={doc}
                    isUnlocked={unlocked}
                    onOpen={setOpenDocId}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal del documento */}
      <Modal isOpen={!!openDoc} onClose={() => setOpenDocId(null)} size="document">
        {openDoc && <DocumentModal doc={openDoc} />}
      </Modal>
    </div>
  );
}

function DocumentModal({ doc }: { doc: ArchiveDocument }) {
  return (
    <div className="p-8 md:p-12">
      {/* Encabezado del documento */}
      <div className="mb-8 pb-6 border-b border-ink/10">
        <p className="font-ui text-xs font-semibold uppercase tracking-widest text-sepia/70 mb-2">
          {doc.typeLabel}
        </p>
        {doc.sourceLabel && (
          <p className="font-narrative italic text-ink-faded/60 text-sm mb-3">{doc.sourceLabel}</p>
        )}
        <h2 className="font-display text-2xl md:text-3xl font-normal text-ink tracking-wide">
          {doc.title}
        </h2>
      </div>

      {/* Texto del documento */}
      <div className="space-y-4">
        {doc.text.split('\n\n').map((para, i) => (
          <p
            key={i}
            className={`font-narrative leading-loose text-ink/80 ${
              i === 0 && para.startsWith('*') ? 'italic text-sm text-ink-faded/70' : 'text-base'
            }`}
          >
            {para.replace(/^\*|\*$/g, '')}
          </p>
        ))}
      </div>

      {/* Footer */}
      {doc.relatedCharacters && doc.relatedCharacters.length > 0 && (
        <div className="mt-10 pt-6 border-t border-ink/10 flex gap-2 flex-wrap">
          <span className="font-ui text-xs uppercase tracking-widest text-sepia/50 mr-2">
            Relacionado:
          </span>
          {doc.relatedCharacters.map((slug) => (
            <Badge key={slug} variant="default" className="capitalize">
              {slug}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
