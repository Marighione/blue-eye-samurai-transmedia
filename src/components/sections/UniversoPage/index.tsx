'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { NarrativeMap } from '@/components/narrative/NarrativeMap';
import { NarrativeColumn } from '@/components/layout/NarrativeColumn';
import { InkSplatter } from '@/components/primitives/InkSplatter';
import { staggerContainer, revealFromFog } from '@/lib/animations';
import { useUserState } from '@/context/UserStateContext';

const INTRO_TEXT = `El Japón del período Edo es un mundo cerrado sobre sí mismo. Desde 1633, el shogunato Tokugawa decretó el Sakoku: el cierre casi total de las fronteras. Ningún japonés podía salir. Casi ningún extranjero podía entrar. Quien lo hiciera clandestinamente traía consigo algo que el sistema no sabía cómo clasificar: la diferencia.

En este mundo, la jerarquía no es una preferencia. Es una ley grabada en el cuerpo, en la vestimenta, en la forma de caminar. Los samurái llevan espada porque pueden llevarla. Los campesinos se inclinan porque deben inclinarse. Las mujeres planifican bodas porque eso es lo que las mujeres hacen. Quien no encaja en estas categorías no encuentra un lugar alternativo. Encuentra la violencia.

La identidad, en el período Edo, no es algo que se construye. Es algo que se hereda, se impone o se oculta. Construirla activamente, elegirla, defenderla, es un acto revolucionario. Y como todo acto revolucionario en un sistema cerrado, tiene un precio.`;

export function UniversoPage() {
  const { state } = useUserState();

  return (
    <div className="min-h-screen">
      {/* Hero de sección */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/universo-hero.png"
            alt=""
            fill
            className="object-cover object-[50%_30%]"
            quality={90}
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night via-night/60 to-night/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-night/60 via-transparent to-transparent" />
        </div>

        <div className="absolute inset-0 vignette pointer-events-none z-[1]" />
        <InkSplatter variant="ink" size="lg" opacity={0.05} className="absolute top-16 right-20 z-[1]" index={0} />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 px-8 md:px-20 pb-20"
        >
          <motion.p variants={revealFromFog} className="font-ui text-sm font-semibold uppercase tracking-widest text-snow mb-4">
            Universo
          </motion.p>
          <motion.h1 variants={revealFromFog} className="font-display text-5xl md:text-7xl font-semibold text-snow tracking-wide mb-4">
            El Mundo
          </motion.h1>
          <motion.p variants={revealFromFog} className="font-narrative italic text-xl text-snow/90 max-w-xl leading-relaxed">
            Japón. Período Edo. Un mundo cerrado sobre sí mismo.
          </motion.p>
        </motion.div>
      </section>

      {/* Contenido principal */}
      <section className="texture-dark relative section-fade-top py-24 md:py-32">
        {/* Texto introductorio */}
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
                className="font-narrative text-lg text-snow/90 leading-loose mb-8"
              >
                {para}
              </motion.p>
            ))}
          </motion.div>
        </NarrativeColumn>

        {/* Mapa interactivo */}
        <div className="pt-20 md:pt-28 pb-8 px-8 md:px-20">
          <div className="max-w-site mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={revealFromFog}
              className="mb-10"
            >
              <p className="font-ui text-base font-semibold uppercase tracking-widest text-snow mb-4">
                Mapa narrativo
              </p>
              <p className="font-narrative italic text-snow/90 text-lg max-w-md">
                Cada punto es un territorio. Hover para explorar. Click para entrar.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden relative"
            >
              <NarrativeMap visitedTerritories={state.visitedTerritories} />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
