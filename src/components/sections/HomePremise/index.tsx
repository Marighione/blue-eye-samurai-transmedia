'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { PREMISE } from '@/lib/constants';

export function HomePremise() {
  const words = PREMISE.split(' ');

  return (
    <section
      className="min-h-screen flex items-center justify-center px-8 relative overflow-hidden"
    >
      {/* Imagen de fondo con degradado */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/lema-back.png"
          alt=""
          fill
          className="object-cover"
          quality={85}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night via-night/55 to-night" />
        <div className="absolute inset-0 bg-gradient-to-r from-night/50 via-transparent to-night/50" />
        <div className="absolute inset-0 bg-night/25" />
      </div>

      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
        }}
        className="font-narrative italic text-xl md:text-3xl text-center text-snow/85 max-w-3xl leading-loose relative z-10"
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { opacity: 0, filter: 'blur(6px)', y: 8 },
              visible: {
                opacity: 1,
                filter: 'blur(0px)',
                y: 0,
                transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            className="inline-block mr-[0.35em]"
          >
            {word}
          </motion.span>
        ))}
      </motion.p>
    </section>
  );
}
