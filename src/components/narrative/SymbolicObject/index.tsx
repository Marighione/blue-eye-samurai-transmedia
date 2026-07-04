'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SymbolicObject as SymbolicObjectType } from '@/types/character';

interface SymbolicObjectProps {
  object: SymbolicObjectType;
}

export function SymbolicObject({ object }: SymbolicObjectProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div layout className="border border-white/8 bg-white/2 hover:border-gold/20 transition-colors duration-300">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-5 flex items-start justify-between gap-4"
        aria-expanded={expanded}
      >
        <div>
          <p className="font-display text-lg font-normal text-snow tracking-wide mb-1">
            {object.name}
          </p>
          <p className="font-narrative italic text-snow/90 text-base">{object.description}</p>
        </div>
        <span className="font-ui text-snow/80 text-sm mt-0.5 flex-shrink-0 select-none">
          {expanded ? '▲' : '▼'}
        </span>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-white/5 pt-4">
              <p className="font-narrative text-lg text-snow/80 leading-relaxed">
                {object.narrativeText}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
