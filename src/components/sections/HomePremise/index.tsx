'use client';

import { motion } from 'framer-motion';
import { PREMISE } from '@/lib/constants';

export function HomePremise() {
  const words = PREMISE.split(' ');

  return (
    <section
      className="min-h-screen flex items-center justify-center px-8 relative overflow-hidden"
      style={{ backgroundColor: '#080E16' }}
    >
      {/* Glow sutil centrado */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(74,144,196,0.06) 0%, transparent 70%)',
        }}
      />

      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
        }}
        className="font-narrative italic text-xl md:text-3xl text-center text-snow/75 max-w-3xl leading-loose relative z-10"
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
