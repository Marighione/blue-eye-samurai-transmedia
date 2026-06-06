'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { NarrativeColumn } from '@/components/layout/NarrativeColumn';
import { Typography } from '@/components/primitives/Typography';
import { Divider } from '@/components/primitives/Divider';
import { setInitialChoice } from '@/lib/user-state';
import { useUserState } from '@/context/UserStateContext';

const OPTIONS = [
  {
    id: 'ocultar' as const,
    label: 'Ocultar la identidad',
    description: 'La supervivencia primero. Existir para luchar después.',
  },
  {
    id: 'enfrentar' as const,
    label: 'Enfrentar el conflicto',
    description: 'La verdad cuesta. El silencio también.',
  },
];

const FOLLOWUP: Record<string, string> = {
  ocultar:
    'Elegiste el camino de la máscara. Como Mizu, que cubría sus ojos azules para poder existir en un mundo que la rechazaba. A veces sobrevivir es la única forma de resistir.',
  enfrentar:
    'Elegiste el camino de la confrontación. La visibilidad tiene un precio. También tiene un poder que el ocultamiento nunca puede darte.',
};

export function HomeQuizInitial() {
  const { state, refreshState } = useUserState();
  const [selected, setSelected] = useState<'ocultar' | 'enfrentar' | null>(
    state.quizInitialChoice
  );

  function handleSelect(choice: 'ocultar' | 'enfrentar') {
    if (selected) return;
    setSelected(choice);
    setInitialChoice(choice);
    refreshState();
  }

  return (
    <SectionWrapper visualLanguage="blue-cold" className="py-32 md:py-40">
      <NarrativeColumn width="content">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="label" className="text-mist mb-6 block">
            Elegí tu camino
          </Typography>

          <Typography variant="narrative" className="text-snow/80 mb-4 leading-loose">
            Estás en un mundo que no tiene lugar para vos. Tu diferencia es visible. No podés
            cambiarla. Lo que sí podés decidir es qué hacés con ella.
          </Typography>
          <Typography variant="narrative-italic" className="text-mist mb-12 leading-loose">
            Dos caminos posibles. No hay uno correcto.
          </Typography>

          <Divider variant="sword" className="mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {OPTIONS.map((opt) => (
              <motion.button
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                disabled={!!selected}
                whileHover={!selected ? { scale: 1.01 } : {}}
                animate={
                  selected === opt.id
                    ? { borderColor: 'rgba(232,177,75,1)', backgroundColor: 'rgba(197,138,42,0.12)' }
                    : selected && selected !== opt.id
                    ? { opacity: 0.3 }
                    : {}
                }
                transition={{ duration: 0.3 }}
                className="text-left border border-white/10 p-6 transition-colors duration-300 hover:border-gold/50 hover:bg-gold/5 disabled:cursor-default"
              >
                <p className="font-display text-lg text-snow tracking-wide mb-2">{opt.label}</p>
                <p className="font-narrative italic text-snow/70 text-base">{opt.description}</p>
              </motion.button>
            ))}
          </div>

          <AnimatePresence>
            {selected && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="mt-10 border-l-2 border-gold/40 pl-6"
              >
                <Typography variant="narrative-italic" className="text-snow/70 leading-loose">
                  {FOLLOWUP[selected]}
                </Typography>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </NarrativeColumn>
    </SectionWrapper>
  );
}
