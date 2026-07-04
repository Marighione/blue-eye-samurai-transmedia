'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { staggerContainer, revealFromFog } from '@/lib/animations';

const SECTIONS = [
  {
    href: '/universo',
    label: 'El Mundo',
    sub: 'Universo',
    desc: 'Japón del período Edo. Un mundo cerrado sobre sí mismo donde la identidad se hereda, se impone o se oculta.',
    accent: '#00BCCE',
    size: 'large',
  },
  {
    href: '/personajes',
    label: 'Los que existen',
    sub: 'Personajes',
    desc: 'Cuatro personas que el sistema intentó definir antes de que pudieran definirse a sí mismas.',
    accent: '#ECB357',
    size: 'large',
  },
  {
    href: '/archivo',
    label: 'El expediente',
    sub: 'Archivo',
    desc: 'Documentos, cartas, registros y rumores. El universo guardado en papel.',
    accent: '#9B7B6B',
    size: 'small',
  },
  {
    href: '/experiencias',
    label: 'Los dilemas',
    sub: 'Experiencias',
    desc: 'Preguntas sin respuesta correcta. Decisiones que dicen algo sobre quién sos.',
    accent: '#FF8855',
    size: 'small',
  },
];

export function HomeSectionGrid() {
  return (
    <section className="relative py-24 md:py-32 px-8 md:px-16 texture-dark section-fade-top section-fade-bottom">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="max-w-site mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
          {SECTIONS.map((sec) => (
            <motion.div key={sec.href} variants={revealFromFog} className="h-full">
              <SectionEntry sec={sec} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function SectionEntry({ sec }: { sec: typeof SECTIONS[0] }) {
  return (
    <Link
      href={sec.href}
      className="group block bg-deep-blue/55 hover:bg-deep-blue/70 transition-colors duration-500 relative p-8 md:p-10 h-full"
    >
      {/* Línea de acento lateral */}
      <div
        className="absolute left-0 top-6 bottom-6 w-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ backgroundColor: sec.accent }}
      />

      <p className="font-ui text-base font-semibold uppercase tracking-widest mb-4 text-snow">
        {sec.sub}
      </p>
      <h3 className="font-display text-3xl font-normal tracking-wide text-snow mb-4">
        {sec.label}
      </h3>
      <p className="font-narrative text-lg text-snow/85 leading-relaxed max-w-sm">{sec.desc}</p>
      <div
        className="mt-6 h-px w-8 group-hover:w-16 transition-all duration-500"
        style={{ backgroundColor: sec.accent }}
      />
    </Link>
  );
}
