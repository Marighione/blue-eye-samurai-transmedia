'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/primitives/Button';
import { InkSplatter } from '@/components/primitives/InkSplatter';
import { revealFromFog, staggerContainer } from '@/lib/animations';

export function HomeRVAccess() {
  return (
    <section className="relative py-32 md:py-40 px-8 md:px-20 overflow-hidden section-fade-top section-fade-bottom">
      {/* Imagen de fondo con degradado */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/RV-home.png"
          alt=""
          fill
          className="object-cover object-center"
          quality={85}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/60 to-night/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-night/60 via-transparent to-transparent" />
      </div>

      <InkSplatter variant="blood" size="lg" opacity={0.06} className="absolute right-20 top-10 z-[1]" index={1} />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="max-w-2xl relative z-10"
      >
        <motion.p variants={revealFromFog} className="font-ui text-sm font-semibold uppercase tracking-widest text-snow mb-6">
          Experiencia RV
        </motion.p>

        <motion.h2 variants={revealFromFog} className="font-display text-4xl md:text-5xl font-semibold text-snow tracking-wide mb-6">
          Entrar en persona
        </motion.h2>

        <motion.p variants={revealFromFog} className="font-narrative text-lg text-snow/80 leading-relaxed mb-4 max-w-lg">
          La plataforma es el mapa. La experiencia de realidad virtual es el territorio.
          Tomás decisiones que el anime no te dejó tomar.
        </motion.p>

        <motion.p variants={revealFromFog} className="font-narrative italic text-gold/90 text-base mb-12">
          Tres recorridos disponibles. El tuyo depende de quién sos.
        </motion.p>

        <motion.div variants={revealFromFog}>
          <Button variant="primary" href="/realidad-virtual" size="lg">
            Entrar en persona
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
