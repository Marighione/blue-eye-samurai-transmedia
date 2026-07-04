'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Typography } from '@/components/primitives/Typography';
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
  const [selected, setSelected] = useState<'ocultar' | 'enfrentar' | null>(null);

  useEffect(() => {
    if (state.quizInitialChoice) {
      setSelected(state.quizInitialChoice);
    }
  }, [state.quizInitialChoice]);

  function handleSelect(choice: 'ocultar' | 'enfrentar') {
    if (selected) return;
    setSelected(choice);
    setInitialChoice(choice);
    refreshState();
  }

  return (
    <SectionWrapper visualLanguage="blue-cold" className="py-32 md:py-40 section-fade-top section-fade-bottom">
      <div className="max-w-site mx-auto px-8 md:px-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
            {/* Columna izquierda: texto narrativo */}
            <div className="bg-deep-blue/55 p-10 md:p-16 flex flex-col justify-center">
              <Typography variant="label" className="text-mist mb-6 block">
                Elegí tu camino
              </Typography>

              <Typography variant="narrative" className="text-snow/85 mb-4 text-lg leading-loose">
                Estás en un mundo que no tiene lugar para vos. Tu diferencia es visible. No podés
                cambiarla. Lo que sí podés decidir es qué hacés con ella.
              </Typography>
              <Typography variant="narrative-italic" className="text-mist text-lg leading-loose">
                Dos caminos posibles. No hay uno correcto.
              </Typography>
            </div>

            {/* Columna derecha: opciones */}
            <div className="bg-deep-blue/55 p-10 md:p-16 flex flex-col justify-center gap-4">
              {OPTIONS.map((opt) => (
                <div key={opt.id}>
                  <motion.button
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
                    className="w-full text-left border border-white/20 bg-deep-blue/40 p-6 transition-colors duration-300 hover:border-gold/50 hover:bg-deep-blue/60 disabled:cursor-default"
                  >
                    <p className="font-display text-xl text-snow tracking-wide mb-2">{opt.label}</p>
                    <p className="font-narrative italic text-snow/90 text-lg">{opt.description}</p>
                  </motion.button>

                  <AnimatePresence>
                    {selected === opt.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden border-l-2 border-gold/40 border-r border-b border-r-gold/20 border-b-gold/20"
                        style={{ backgroundColor: 'rgba(197,138,42,0.08)' }}
                      >
                        <div className="p-6">
                          <Typography variant="narrative-italic" className="text-snow/90 text-lg leading-loose">
                            {FOLLOWUP[selected]}
                          </Typography>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
