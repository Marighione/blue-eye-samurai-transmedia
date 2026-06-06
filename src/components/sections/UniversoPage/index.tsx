'use client';

import { motion } from 'framer-motion';
import { NarrativeMap } from '@/components/narrative/NarrativeMap';
import { TerritoryCard } from '@/components/narrative/TerritoryCard';
import { NarrativeColumn } from '@/components/layout/NarrativeColumn';
import { InkSplatter } from '@/components/primitives/InkSplatter';
import { Divider } from '@/components/primitives/Divider';
import { staggerContainer, revealFromFog } from '@/lib/animations';
import { useUserState } from '@/context/UserStateContext';
import { allTerritories } from '@/data';

const INTRO_TEXT = `El Japón del período Edo es un mundo cerrado sobre sí mismo. Desde 1633, el shogunato Tokugawa decretó el Sakoku: el cierre casi total de las fronteras. Ningún japonés podía salir. Casi ningún extranjero podía entrar. Quien lo hiciera clandestinamente traía consigo algo que el sistema no sabía cómo clasificar: la diferencia.

En este mundo, la jerarquía no es una preferencia. Es una ley grabada en el cuerpo, en la vestimenta, en la forma de caminar. Los samurái llevan espada porque pueden llevarla. Los campesinos se inclinan porque deben inclinarse. Las mujeres planifican bodas porque eso es lo que las mujeres hacen. Quien no encaja en estas categorías no encuentra un lugar alternativo. Encuentra la violencia.

La identidad, en el período Edo, no es algo que se construye. Es algo que se hereda, se impone o se oculta. Construirla activamente, elegirla, defenderla, es un acto revolucionario. Y como todo acto revolucionario en un sistema cerrado, tiene un precio.`;

export function UniversoPage() {
  const { state } = useUserState();

  return (
    <div className="min-h-screen bg-night">
      {/* Hero de sección */}
      <section
        className="relative min-h-[70vh] flex items-end overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 20%, rgba(74,144,196,0.15) 0%, transparent 60%),
            radial-gradient(ellipse 60% 80% at 10% 80%, rgba(27,38,59,0.9) 0%, transparent 60%),
            #0D1B2A
          `,
        }}
      >
        <div className="absolute inset-0 vignette pointer-events-none" />
        <InkSplatter variant="ink" size="lg" opacity={0.05} className="absolute top-16 right-20" index={0} />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 px-8 md:px-20 pb-20"
        >
          <motion.p variants={revealFromFog} className="font-ui text-xs font-semibold uppercase tracking-widest text-mist mb-4">
            El mundo
          </motion.p>
          <motion.h1 variants={revealFromFog} className="font-display text-5xl md:text-7xl font-semibold text-snow tracking-wide mb-4">
            El Mundo
          </motion.h1>
          <motion.p variants={revealFromFog} className="font-narrative italic text-xl text-snow/70 max-w-xl leading-relaxed">
            Japón. Período Edo. Un mundo cerrado sobre sí mismo.
          </motion.p>
        </motion.div>
      </section>

      {/* Texto introductorio */}
      <section className="py-24 md:py-32">
        <NarrativeColumn>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
          >
            {INTRO_TEXT.split('\n\n').map((para, i) => (
              <motion.p
                key={i}
                variants={revealFromFog}
                className="font-narrative text-lg text-snow/70 leading-loose mb-8"
              >
                {para}
              </motion.p>
            ))}
          </motion.div>
        </NarrativeColumn>
      </section>

      <Divider variant="sword" className="mx-8 md:mx-20 opacity-20" />

      {/* Cinco territorios — lista */}
      <section className="py-20 md:py-28 px-8 md:px-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="max-w-site mx-auto"
        >
          <motion.p variants={revealFromFog} className="font-ui text-xs font-semibold uppercase tracking-widest text-mist/70 mb-10">
            Los cinco territorios narrativos
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
            {allTerritories.map((territory) => (
              <TerritoryCard
                key={territory.id}
                territory={territory}
                isVisited={state.visitedTerritories.includes(territory.id)}
              />
            ))}
          </div>
        </motion.div>
      </section>

      <Divider variant="dots" className="mx-8 md:mx-20" />

      {/* Mapa interactivo */}
      <section className="py-20 md:py-28 px-8 md:px-20">
        <div className="max-w-site mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={revealFromFog}
            className="mb-10"
          >
            <p className="font-ui text-xs font-semibold uppercase tracking-widest text-mist/70 mb-4">
              Mapa narrativo
            </p>
            <p className="font-narrative italic text-snow/70 text-base max-w-md">
              Cada punto es un territorio. Hover para explorar. Click para entrar.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="border border-white/5 overflow-hidden relative"
          >
            <NarrativeMap visitedTerritories={state.visitedTerritories} />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
