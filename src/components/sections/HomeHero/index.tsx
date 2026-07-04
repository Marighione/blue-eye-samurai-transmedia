'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { InkSplatter } from '@/components/primitives/InkSplatter';
import { revealFromFog } from '@/lib/animations';

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
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/60 to-night/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-night/60 via-transparent to-transparent" />
      </div>

      {/* Viñeta perimetral */}
      <div className="absolute inset-0 vignette pointer-events-none z-[1]" />

      {/* Decoración */}
      <InkSplatter variant="ink" size="lg" opacity={0.05} className="absolute top-16 right-16 z-[1]" index={0} />
      <InkSplatter variant="ink" size="md" opacity={0.04} className="absolute top-1/3 left-4 z-[1]" index={2} />

      {/* Logo */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={revealFromFog}
        className="relative z-10 px-8 md:px-20 pb-28 md:pb-36"
      >
        <Image
          src="/images/logo.png"
          alt="Blue Eye Samurai"
          width={575}
          height={345}
          className="w-[320px] md:w-[480px] lg:w-[575px] h-auto"
          priority
        />
      </motion.div>
    </section>
  );
}
