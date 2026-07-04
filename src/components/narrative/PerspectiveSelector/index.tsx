'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Divider } from '@/components/primitives/Divider';
import type { OthersPerspective } from '@/types/character';

interface PerspectiveSelectorProps {
  perspectives: OthersPerspective[];
}

export function PerspectiveSelector({ perspectives }: PerspectiveSelectorProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const active = perspectives.find((p) => p.observerId === activeId);

  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl text-snow tracking-wide mb-4">
        La mirada del otro
      </h2>
      <p className="font-narrative italic text-snow/70 text-lg mb-10">
        ¿Cómo lo ven quienes lo rodean?
      </p>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3 mb-12">
        {perspectives.map((p) => (
          <button
            key={p.observerId}
            onClick={() => setActiveId(activeId === p.observerId ? null : p.observerId)}
            className={`font-display text-base md:text-lg tracking-wide px-6 py-3 border transition-all duration-300 ${
              activeId === p.observerId
                ? 'text-gold border-gold/60 bg-gold/10'
                : 'text-snow/80 border-white/15 hover:border-gold/40 hover:text-snow hover:bg-white/5'
            }`}
          >
            {p.observerName}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {active ? (
          <motion.div
            key={active.observerId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="border-l-2 border-gold/40 pl-8 py-2"
          >
            <p className="font-narrative italic text-snow/90 text-xl leading-loose">
              &ldquo;{active.text}&rdquo;
            </p>
            <p className="font-ui text-base text-mist uppercase tracking-widest mt-4">
              — {active.observerName}
            </p>
          </motion.div>
        ) : (
          <motion.p
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="font-narrative italic text-snow/60 text-lg"
          >
            Seleccioná un observador para ver su perspectiva.
          </motion.p>
        )}
      </AnimatePresence>

      <Divider variant="dots" className="mt-12" />
    </div>
  );
}
