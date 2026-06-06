'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/primitives/Button';
import { InkSplatter } from '@/components/primitives/InkSplatter';
import { PREMISE } from '@/lib/constants';
import { staggerContainer, revealFromFog } from '@/lib/animations';

export function HomeHero() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-main.jpg"
          alt=""
          fill
          className="object-cover object-[50%_25%]"
          quality={90}
          priority
          sizes="100vw"
        />
        {/* Overlay oscuro para legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/70 to-night/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-night/80 via-transparent to-transparent" />
      </div>

      {/* Viñeta perimetral */}
      <div className="absolute inset-0 vignette pointer-events-none z-[1]" />

      {/* Decoración */}
      <InkSplatter variant="ink" size="lg" opacity={0.05} className="absolute top-16 right-16 z-[1]" index={0} />
      <InkSplatter variant="ink" size="md" opacity={0.04} className="absolute top-1/3 left-4 z-[1]" index={2} />

      {/* Contenido */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 px-8 md:px-20 pb-28 md:pb-36 max-w-3xl"
      >
        <motion.h1
          variants={revealFromFog}
          className="font-display text-7xl md:text-[8rem] font-bold text-snow tracking-[0.15em] leading-none mb-6"
          style={{ textShadow: '0 0 80px rgba(74,144,196,0.3)' }}
        >
          青眼
        </motion.h1>

        <motion.p
          variants={revealFromFog}
          className="font-display text-2xl md:text-4xl font-normal text-mist tracking-widest mb-8"
        >
          Blue Eye Samurai
        </motion.p>

        <motion.blockquote
          variants={revealFromFog}
          className="font-narrative text-lg md:text-xl italic text-snow/80 max-w-lg mb-12 leading-relaxed border-l-2 border-gold/30 pl-4"
        >
          {PREMISE}
        </motion.blockquote>

        <motion.div variants={revealFromFog} className="flex flex-col sm:flex-row gap-4">
          <Button variant="primary" href="/universo" size="lg">
            Ingresar al archivo
          </Button>
          <Button variant="secondary" href="/realidad-virtual">
            Reservar experiencia RV
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
