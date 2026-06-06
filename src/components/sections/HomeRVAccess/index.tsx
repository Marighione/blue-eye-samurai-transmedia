'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/primitives/Button';
import { InkSplatter } from '@/components/primitives/InkSplatter';
import { revealFromFog, staggerContainer } from '@/lib/animations';

export function HomeRVAccess() {
  return (
    <section
      className="relative py-32 md:py-40 px-8 md:px-20 overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 70% 60% at 80% 50%, rgba(197,138,42,0.12) 0%, transparent 70%),
          radial-gradient(ellipse 50% 80% at 10% 30%, rgba(139,58,10,0.15) 0%, transparent 60%),
          #0D1B2A
        `,
      }}
    >
      <InkSplatter variant="blood" size="lg" opacity={0.06} className="absolute right-20 top-10" index={1} />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="max-w-2xl"
      >
        <motion.p variants={revealFromFog} className="font-ui text-xs font-semibold uppercase tracking-widest text-gold/60 mb-6">
          Experiencia RV
        </motion.p>

        <motion.h2 variants={revealFromFog} className="font-display text-4xl md:text-5xl font-semibold text-snow tracking-wide mb-6">
          Entrar en persona
        </motion.h2>

        <motion.p variants={revealFromFog} className="font-narrative text-lg text-snow/60 leading-relaxed mb-4 max-w-lg">
          La plataforma es el mapa. La experiencia de realidad virtual es el territorio.
          Tomás decisiones que el anime no te dejó tomar.
        </motion.p>

        <motion.p variants={revealFromFog} className="font-narrative italic text-gold/70 text-base mb-12">
          Tres recorridos disponibles. El tuyo depende de quién sos.
        </motion.p>

        <motion.div variants={revealFromFog} className="flex flex-col sm:flex-row gap-4">
          <Button variant="primary" href="/realidad-virtual" size="lg">
            Entrar en persona
          </Button>
          <Button variant="ghost" href="/experiencias">
            Ver todas las experiencias
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
