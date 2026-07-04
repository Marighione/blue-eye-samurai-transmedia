'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { staggerContainer, revealFromFog } from '@/lib/animations';
import { useUserState } from '@/context/UserStateContext';
import { Badge } from '@/components/primitives/Badge';
import { Divider } from '@/components/primitives/Divider';

const EXPERIENCES = [
  {
    id: 'quiz-moral',
    href: '/experiencias/quiz-moral',
    title: 'Venganza o Justicia',
    subtitle: 'Quiz Moral',
    description:
      'Tres situaciones sin respuesta correcta. Cada decisión pesa. Al final, el universo te revela algo sobre vos: eres La Llama, La Balanza, El Río o La Niebla.',
    detail: '3 situaciones · 4 perfiles posibles',
    color: '#ECB357',
  },
  {
    id: 'test-mascaras',
    href: '/experiencias/test-mascaras',
    title: '¿Qué máscara usás para sobrevivir?',
    subtitle: 'Test de Máscaras',
    description:
      'En el Japón del período Edo, las máscaras no eran decorativas. Eran estrategia. Tres preguntas para revelar cuál es la tuya.',
    detail: '3 preguntas · 4 máscaras posibles',
    color: '#00BCCE',
  },
] as const;

export function ExperienciasHub() {
  const { state } = useUserState();

  return (
    <div className="min-h-screen texture-dark">
      {/* Hero con imagen */}
      <div className="relative w-full h-[70vh] min-h-[500px]">
        <Image
          src="/images/los-dilemas-hero.png"
          alt="Los Dilemas"
          fill
          className="object-cover"
          style={{ objectPosition: '50% 15%' }}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/60 to-night/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-night/60 via-transparent to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-20 pb-20">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.p variants={revealFromFog} className="font-ui text-sm font-semibold uppercase tracking-widest text-snow mb-4">
              Experiencias interactivas
            </motion.p>
            <motion.h1 variants={revealFromFog} className="font-display text-5xl md:text-6xl font-semibold text-snow tracking-wide mb-4">
              Los dilemas
            </motion.h1>
            <motion.p variants={revealFromFog} className="font-narrative italic text-snow/90 text-lg max-w-xl leading-relaxed">
              Estas experiencias no tienen respuestas correctas. Solo tienen las tuyas.
            </motion.p>
          </motion.div>
        </div>
      </div>

      <div className="relative section-fade-top" />

      <Divider variant="sword" className="mx-8 md:mx-20 opacity-20" />

      {/* Experiencias */}
      <div className="px-8 md:px-20 py-16 space-y-6">
        {EXPERIENCES.map((exp, i) => {
          const completed = state.completedExperiences.includes(exp.id);
          return (
            <motion.div
              key={exp.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={revealFromFog}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={exp.href}
                className="group block border border-white/10 hover:border-gold/30 transition-all duration-500 p-8 md:p-12"
                style={{ backgroundColor: 'rgba(27, 38, 59, 0.8)' }}
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <p className="font-ui text-sm font-semibold uppercase tracking-widest text-mist">
                        {exp.subtitle}
                      </p>
                      {completed && (
                        <Badge variant="default">Completada</Badge>
                      )}
                    </div>
                    <h2 className="font-display text-2xl md:text-3xl font-normal text-snow tracking-wide mb-4">
                      {exp.title}
                    </h2>
                    <p className="font-narrative text-base text-snow/80 leading-relaxed max-w-xl mb-6">
                      {exp.description}
                    </p>
                    <p className="font-ui text-sm text-snow/50 uppercase tracking-widest">{exp.detail}</p>
                  </div>

                  <div
                    className="hidden md:flex items-center justify-center w-16 h-16 border opacity-50 group-hover:opacity-90 transition-opacity duration-500 flex-shrink-0"
                    style={{ borderColor: exp.color }}
                  >
                    <span className="font-display text-2xl" style={{ color: exp.color }}>→</span>
                  </div>
                </div>

                <div
                  className="h-px w-0 group-hover:w-24 mt-8 transition-all duration-500"
                  style={{ backgroundColor: exp.color }}
                />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
