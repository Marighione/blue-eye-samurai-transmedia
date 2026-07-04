'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DocumentCard } from '@/components/ui/DocumentCard';
import { Modal } from '@/components/ui/Modal';
import { InkSplatter } from '@/components/primitives/InkSplatter';
import { Badge } from '@/components/primitives/Badge';
import { Divider } from '@/components/primitives/Divider';
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
    <div className="min-h-screen texture-dark relative">
      {/* Decoración */}
      <InkSplatter variant="ink" size="lg" opacity={0.04} className="absolute top-32 right-10" index={1} />
      <InkSplatter variant="ink" size="md" opacity={0.03} className="absolute bottom-40 left-8" index={3} />

      {/* Header */}
      <div className="pt-32 pb-16 px-8 md:px-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={revealFromFog} className="font-ui text-sm font-semibold uppercase tracking-widest text-snow mb-4">
            Expediente
          </motion.p>
          <motion.h1 variants={revealFromFog} className="font-display text-5xl md:text-6xl font-semibold text-snow tracking-wide mb-4">
            El Archivo
          </motion.h1>
          <motion.p variants={revealFromFog} className="font-narrative italic text-snow/80 text-lg max-w-lg leading-relaxed">
            Documentos, cartas y testimonios. Algunos esperan ser descubiertos.
          </motion.p>

          {/* Conteo */}
          <motion.p variants={revealFromFog} className="font-ui text-sm text-mist uppercase tracking-widest mt-6">
            {unlockedIds.length} / {archiveDocuments.length} piezas descubiertas
          </motion.p>
        </motion.div>
      </div>

      <Divider variant="sword" className="mx-8 md:mx-20 opacity-20" />

      {/* Filtros */}
      <div className="px-8 md:px-20 py-8 flex flex-wrap gap-3">
        <button
          onClick={() => setActiveFilter(null)}
          className={`font-ui text-sm font-semibold uppercase tracking-widest px-4 py-2 border transition-colors duration-300 ${
            activeFilter === null
              ? 'border-gold/60 text-gold bg-gold/10'
              : 'border-white/15 text-snow/60 hover:border-gold/40 hover:text-snow'
          }`}
        >
          Todos
        </button>
        {usedTypes.map((type) => (
          <button
            key={type}
            onClick={() => setActiveFilter(activeFilter === type ? null : type)}
            className={`font-ui text-sm font-semibold uppercase tracking-widest px-4 py-2 border transition-colors duration-300 ${
              activeFilter === type
                ? 'border-gold/60 text-gold bg-gold/10'
                : 'border-white/15 text-snow/60 hover:border-gold/40 hover:text-snow'
            }`}
          >
            {TYPE_LABELS[type]}
          </button>
        ))}
      </div>

      {/* Documentos */}
      <div className="relative px-8 md:px-20 py-16 min-h-[900px]">
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
      <div className="mb-8 pb-6 border-b border-white/10">
        <p className="font-ui text-base font-semibold uppercase tracking-widest text-mist mb-2">
          {doc.typeLabel}
        </p>
        {doc.sourceLabel && (
          <p className="font-narrative italic text-snow/50 text-base mb-3">{doc.sourceLabel}</p>
        )}
        <h2 className="font-display text-2xl md:text-3xl font-normal text-snow tracking-wide">
          {doc.title}
        </h2>
      </div>

      {/* Texto del documento */}
      <div className="space-y-4">
        {doc.text.split('\n\n').map((para, i) => (
          <p
            key={i}
            className={`font-narrative leading-loose text-snow/80 ${
              i === 0 && para.startsWith('*') ? 'italic text-base text-snow/50' : 'text-base'
            }`}
          >
            {para.replace(/^\*|\*$/g, '')}
          </p>
        ))}
      </div>

      {/* Footer */}
      {doc.relatedCharacters && doc.relatedCharacters.length > 0 && (
        <div className="mt-10 pt-6 border-t border-white/10 flex gap-2 flex-wrap">
          <span className="font-ui text-base uppercase tracking-widest text-mist mr-2">
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
