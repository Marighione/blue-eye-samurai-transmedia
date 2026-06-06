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
    accent: '#4A90C4',
    size: 'large',
  },
  {
    href: '/personajes',
    label: 'Los que existen',
    sub: 'Personajes',
    desc: 'Cuatro personas que el sistema intentó definir antes de que pudieran definirse a sí mismas.',
    accent: '#C58A2A',
    size: 'large',
  },
  {
    href: '/archivo',
    label: 'El expediente',
    sub: 'Archivo',
    desc: 'Documentos, cartas, registros y rumores. El universo guardado en papel.',
    accent: '#6B4C3B',
    size: 'small',
  },
  {
    href: '/experiencias',
    label: 'Los dilemas',
    sub: 'Experiencias',
    desc: 'Preguntas sin respuesta correcta. Decisiones que dicen algo sobre quién sos.',
    accent: '#8B1A1A',
    size: 'small',
  },
];

export function HomeSectionGrid() {
  return (
    <section className="py-24 md:py-32 px-8 md:px-16 bg-night">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="max-w-site mx-auto"
      >
        <motion.p variants={revealFromFog} className="font-ui text-xs font-semibold uppercase tracking-widest text-mist mb-12">
          Explorá el archivo
        </motion.p>

        {/* Grid asimétrico: 2 grandes arriba, 2 pequeñas abajo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
          {SECTIONS.filter(s => s.size === 'large').map((sec) => (
            <motion.div key={sec.href} variants={revealFromFog}>
              <SectionEntry sec={sec} />
            </motion.div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 mt-px">
          {SECTIONS.filter(s => s.size === 'small').map((sec) => (
            <motion.div key={sec.href} variants={revealFromFog}>
              <SectionEntry sec={sec} small />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function SectionEntry({ sec, small = false }: { sec: typeof SECTIONS[0]; small?: boolean }) {
  return (
    <Link
      href={sec.href}
      className={`group block bg-deep-blue/40 hover:bg-deep-blue/70 transition-colors duration-500 ${small ? 'p-8 md:p-10' : 'p-10 md:p-16'}`}
    >
      <p
        className="font-ui text-xs font-semibold uppercase tracking-widest mb-4"
        style={{ color: sec.accent }}
      >
        {sec.sub}
      </p>
      <h3
        className={`font-display font-normal tracking-wide text-snow mb-4 ${small ? 'text-2xl' : 'text-3xl md:text-4xl'}`}
      >
        {sec.label}
      </h3>
      <p className="font-narrative text-base text-snow/70 leading-relaxed max-w-sm">{sec.desc}</p>
      <div
        className="mt-6 h-px w-0 group-hover:w-16 transition-all duration-500"
        style={{ backgroundColor: sec.accent }}
      />
    </Link>
  );
}
