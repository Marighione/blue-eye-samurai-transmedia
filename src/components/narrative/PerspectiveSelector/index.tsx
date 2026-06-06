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
      <p className="font-ui text-xs font-semibold uppercase tracking-widest text-mist/60 mb-6">
        La mirada del otro
      </p>

      {/* Selectores */}
      <div className="flex flex-wrap gap-4 mb-8">
        {perspectives.map((p) => (
          <button
            key={p.observerId}
            onClick={() => setActiveId(activeId === p.observerId ? null : p.observerId)}
            className={`font-ui text-sm font-medium transition-all duration-300 pb-1 border-b ${
              activeId === p.observerId
                ? 'text-gold border-gold'
                : 'text-snow/70 border-transparent hover:text-snow hover:border-snow/30'
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
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
            className="border-l-2 border-gold/30 pl-6"
          >
            <p className="font-narrative italic text-snow/70 text-lg leading-loose">
              &ldquo;{active.text}&rdquo;
            </p>
            <p className="font-ui text-xs text-mist/70 uppercase tracking-widest mt-3">
              — {active.observerName}
            </p>
          </motion.div>
        ) : (
          <motion.p
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="font-narrative italic text-snow/50 text-base"
          >
            Seleccioná un observador para ver su perspectiva.
          </motion.p>
        )}
      </AnimatePresence>

      <Divider variant="dots" className="mt-8" />
    </div>
  );
}
