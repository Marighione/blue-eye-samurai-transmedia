'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { NarrativeColumn } from '@/components/layout/NarrativeColumn';
import { Divider } from '@/components/primitives/Divider';
import { InkSplatter } from '@/components/primitives/InkSplatter';
import { staggerContainer, revealFromFog } from '@/lib/animations';
import { addVisitedTerritory } from '@/lib/user-state';
import { processUnlockConditions } from '@/lib/unlock-logic';
import { useUserState } from '@/context/UserStateContext';
import { getCharacterBySlug } from '@/data';
import type { Territory } from '@/types/territory';

const TERRITORY_IMAGES: Record<string, { src: string; position: string }> = {
  'caminos-exilio': { src: '/images/caminos-del-exilio.png', position: '50% 20%' },
  'palacios-poder': { src: '/images/palacios-del-poder.png', position: '50% 30%' },
  'lugares-combate': { src: '/images/lugares-de-combate.png', position: '50% 30%' },
  'espacios-ocultamiento': { src: '/images/espacios-de-ocultamiento.png', position: '50% 20%' },
  'espacios-intimos': { src: '/images/espacios-intimos.png', position: '60% 20%' },
};

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
    <div className="min-h-screen texture-dark">
      {/* Hero con imagen del territorio */}
      <section className="relative min-h-[65vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={TERRITORY_IMAGES[territory.id]?.src || '/images/caminos-del-exilio.png'}
            alt=""
            fill
            className="object-cover"
            style={{ objectPosition: TERRITORY_IMAGES[territory.id]?.position || '50% 30%' }}
            quality={85}
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night via-night/60 to-night/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-night/60 via-transparent to-transparent" />
        </div>
        <div className="absolute inset-0 vignette pointer-events-none z-[1]" />
        <InkSplatter variant="ink" size="lg" opacity={0.05} className="absolute top-20 right-16 z-[1]" index={1} />

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
              className="font-ui text-sm uppercase tracking-widest text-snow/80 hover:text-snow/90 transition-colors duration-300"
            >
              ← Universo
            </Link>
          </motion.div>

          <motion.p
            variants={revealFromFog}
            className="font-ui text-sm font-semibold uppercase tracking-widest mb-4 text-snow"
          >
            {territory.centralConflict}
          </motion.p>

          <motion.h1
            variants={revealFromFog}
            className="font-display text-5xl md:text-6xl font-semibold text-snow tracking-wide mb-4"
          >
            {territory.name}
          </motion.h1>

          <motion.p variants={revealFromFog} className="font-narrative italic text-snow/90 text-lg max-w-md">
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
      <section className="relative section-fade-top py-24 md:py-32">
        <NarrativeColumn>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
          >
            <motion.p variants={revealFromFog} className="font-ui text-sm uppercase tracking-widest text-snow mb-8">
              El territorio
            </motion.p>
            <motion.p variants={revealFromFog} className="font-narrative text-lg text-snow/85 leading-loose mb-12">
              {territory.narrativeDescription}
            </motion.p>

            {/* Relato breve */}
            <motion.blockquote
              variants={revealFromFog}
              className="border-l-2 pl-6 py-2 my-8"
              style={{ borderColor: `${territory.dominantColor}50` }}
            >
              <p className="font-narrative italic text-lg text-snow/80 leading-loose">
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
              <motion.p variants={revealFromFog} className="font-ui text-sm uppercase tracking-widest text-snow mb-8">
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
                          className="font-ui text-sm uppercase tracking-widest mb-1 text-snow"
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

    </div>
  );
}
