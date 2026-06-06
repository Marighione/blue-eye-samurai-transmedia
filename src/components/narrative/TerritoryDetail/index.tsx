'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { NarrativeColumn } from '@/components/layout/NarrativeColumn';
import { Divider } from '@/components/primitives/Divider';
import { Button } from '@/components/primitives/Button';
import { InkSplatter } from '@/components/primitives/InkSplatter';
import { staggerContainer, revealFromFog } from '@/lib/animations';
import { addVisitedTerritory } from '@/lib/user-state';
import { processUnlockConditions } from '@/lib/unlock-logic';
import { useUserState } from '@/context/UserStateContext';
import { getCharacterBySlug } from '@/data';
import type { Territory } from '@/types/territory';

const CHAR_THEME_LABELS: Record<string, string> = {
  identity: 'Identidad',
  'gender-power': 'Poder y género',
  honor: 'Honor',
  loyalty: 'Lealtad',
};

interface TerritoryDetailProps {
  territory: Territory;
}

export function TerritoryDetail({ territory }: TerritoryDetailProps) {
  const { refreshState } = useUserState();

  useEffect(() => {
    addVisitedTerritory(territory.id);
    processUnlockConditions();
    refreshState(); // eslint-disable-line react-hooks/exhaustive-deps
  }, [territory.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const relatedChars = territory.relatedCharacters
    .map((slug) => getCharacterBySlug(slug))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-night">
      {/* Hero con color dominante del territorio */}
      <section
        className="relative min-h-[65vh] flex items-end overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse 80% 70% at 40% 30%, ${territory.dominantColor}20 0%, transparent 65%),
            radial-gradient(ellipse 60% 60% at 80% 80%, ${territory.dominantColor}10 0%, transparent 60%),
            #0D1B2A
          `,
        }}
      >
        <div className="absolute inset-0 vignette pointer-events-none" />
        <InkSplatter variant="ink" size="lg" opacity={0.05} className="absolute top-20 right-16" index={1} />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 px-8 md:px-20 pb-20"
        >
          <motion.div
            variants={revealFromFog}
            className="mb-4"
          >
            <Link
              href="/universo"
              className="font-ui text-xs uppercase tracking-widest text-snow/60 hover:text-snow/90 transition-colors duration-300"
            >
              ← Universo
            </Link>
          </motion.div>

          <motion.p
            variants={revealFromFog}
            className="font-ui text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: territory.dominantColor }}
          >
            {territory.centralConflict}
          </motion.p>

          <motion.h1
            variants={revealFromFog}
            className="font-display text-5xl md:text-6xl font-semibold text-snow tracking-wide mb-4"
          >
            {territory.name}
          </motion.h1>

          <motion.p variants={revealFromFog} className="font-narrative italic text-snow/70 text-lg max-w-md">
            {territory.symbol}
          </motion.p>
        </motion.div>

        {/* Línea de color base */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ backgroundColor: `${territory.dominantColor}30` }}
        />
      </section>

      {/* Descripción narrativa */}
      <section className="py-24 md:py-32">
        <NarrativeColumn>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
          >
            <motion.p variants={revealFromFog} className="font-ui text-xs uppercase tracking-widest text-mist/70 mb-8">
              El territorio
            </motion.p>
            <motion.p variants={revealFromFog} className="font-narrative text-lg text-snow/75 leading-loose mb-12">
              {territory.narrativeDescription}
            </motion.p>

            {/* Relato breve */}
            <motion.blockquote
              variants={revealFromFog}
              className="border-l-2 pl-6 py-2 my-8"
              style={{ borderColor: `${territory.dominantColor}50` }}
            >
              <p className="font-narrative italic text-lg text-snow/65 leading-loose">
                {territory.shortStory}
              </p>
            </motion.blockquote>
          </motion.div>
        </NarrativeColumn>
      </section>

      <Divider variant="sword" className="mx-8 md:mx-20 opacity-20" />

      {/* Personajes relacionados */}
      {relatedChars.length > 0 && (
        <section className="py-16 md:py-24 px-8 md:px-20">
          <div className="max-w-site mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={staggerContainer}
            >
              <motion.p variants={revealFromFog} className="font-ui text-xs uppercase tracking-widest text-mist/70 mb-8">
                Personajes de este territorio
              </motion.p>

              <div className="flex flex-wrap gap-4">
                {relatedChars.map((char) => {
                  if (!char) return null;
                  return (
                    <motion.div key={char.slug} variants={revealFromFog}>
                      <Link
                        href={`/personajes/${char.slug}`}
                        className="group block border border-white/8 hover:border-white/20 px-6 py-4 transition-all duration-300"
                        style={{
                          borderLeft: `3px solid ${char.colorScheme.accent}60`,
                        }}
                      >
                        <p
                          className="font-ui text-xs uppercase tracking-widest mb-1"
                          style={{ color: char.colorScheme.accent, opacity: 0.7 }}
                        >
                          {CHAR_THEME_LABELS[char.theme]}
                        </p>
                        <p className="font-display text-lg text-snow group-hover:text-snow/80 transition-colors">
                          {char.name}
                        </p>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA RV si corresponde */}
      {territory.rvExperienceId && (
        <>
          <Divider variant="dots" className="mx-8 md:mx-20" />
          <section className="py-16 px-8 md:px-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={revealFromFog}
              className="max-w-xl"
            >
              <p className="font-ui text-xs uppercase tracking-widest text-gold mb-4">
                Experiencia RV relacionada
              </p>
              <p className="font-narrative text-base text-snow/80 leading-relaxed mb-6">
                Existe un recorrido de realidad virtual que te sumerge en este territorio.
                Las decisiones que tomás en la RV son físicas, no narrativas.
              </p>
              <Button variant="primary" href="/realidad-virtual">
                Entrar en persona
              </Button>
            </motion.div>
          </section>
        </>
      )}

      {/* Navegación entre territorios */}
      <section className="py-12 px-8 md:px-20 border-t border-white/5">
        <div className="flex justify-between items-center max-w-site mx-auto">
          <Link
            href="/universo"
            className="font-ui text-sm text-snow/60 hover:text-snow/90 transition-colors duration-300 uppercase tracking-widest"
          >
            ← El Mundo
          </Link>
          <Link
            href="/archivo"
            className="font-ui text-sm text-snow/60 hover:text-snow/90 transition-colors duration-300 uppercase tracking-widest"
          >
            Abrir el archivo →
          </Link>
        </div>
      </section>
    </div>
  );
}
