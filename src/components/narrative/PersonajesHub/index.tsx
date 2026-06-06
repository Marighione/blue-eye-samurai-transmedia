'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { staggerContainer, revealFromFog, characterReveal } from '@/lib/animations';
import { allCharacters } from '@/data';
import { InkSplatter } from '@/components/primitives/InkSplatter';
import { Divider } from '@/components/primitives/Divider';
import type { Character } from '@/types/character';

// Paleta de fondo por personaje cuando no hay imagen
const BG_STYLES: Record<string, string> = {
  mizu: 'from-night via-deep-blue to-slate-blue',
  akemi: 'from-lacquer/30 via-night to-deep-blue',
  taigen: 'from-ink via-ink-faded/40 to-night',
  ringo: 'from-wood/20 via-night to-deep-blue',
};

export function PersonajesHub() {
  const [mizu, akemi, taigen, ringo] = allCharacters;

  return (
    <div className="min-h-screen bg-night">
      {/* Header */}
      <div className="pt-32 pb-16 px-8 md:px-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={revealFromFog} className="font-ui text-xs font-semibold uppercase tracking-widest text-mist mb-4">
            Los que existen
          </motion.p>
          <motion.h1 variants={revealFromFog} className="font-display text-5xl md:text-6xl font-semibold text-snow tracking-wide">
            Personajes
          </motion.h1>
          <motion.p variants={revealFromFog} className="font-narrative italic text-snow/70 text-lg mt-4 max-w-lg">
            Cuatro personas que el sistema intentó definir antes de que pudieran definirse a sí mismas.
          </motion.p>
        </motion.div>
      </div>

      <Divider variant="sword" className="mx-8 md:mx-20 mb-0 opacity-30" />

      {/* Layout editorial asimétrico */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Mizu — grande */}
        <CharacterEntry character={mizu} large />
        {/* Akemi — grande */}
        <CharacterEntry character={akemi} large />
        {/* Taigen — pequeño */}
        <CharacterEntry character={taigen} />
        {/* Ringo — pequeño */}
        <CharacterEntry character={ringo} />
      </div>
    </div>
  );
}

function CharacterEntry({ character, large = false }: { character: Character; large?: boolean }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={characterReveal}
    >
      <Link
        href={`/personajes/${character.slug}`}
        className="group block relative overflow-hidden"
        style={{ minHeight: large ? '70vh' : '50vh' }}
      >
        {/* Fondo atmosférico */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${BG_STYLES[character.slug]} transition-all duration-700 group-hover:scale-105`}
        />

        {/* Accent de color del personaje en el borde inferior */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1 opacity-60 group-hover:opacity-100 transition-opacity duration-500"
          style={{ backgroundColor: character.colorScheme.accent }}
        />

        {/* Overlay al hover */}
        <div className="absolute inset-0 bg-night/0 group-hover:bg-night/20 transition-colors duration-500" />

        {/* Contenido */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
          <div className="relative z-10">
            <p
              className="font-ui text-xs font-semibold uppercase tracking-widest mb-3 transition-colors duration-300"
              style={{ color: character.colorScheme.accent }}
            >
              {character.theme === 'identity' && 'Identidad'}
              {character.theme === 'gender-power' && 'Poder y género'}
              {character.theme === 'honor' && 'Honor'}
              {character.theme === 'loyalty' && 'Lealtad'}
            </p>

            <h2
              className={`font-display font-normal text-snow tracking-widest mb-3 ${large ? 'text-4xl md:text-5xl' : 'text-3xl md:text-4xl'}`}
            >
              {character.name}
            </h2>

            {/* Frase signature — visible en hover */}
            <p className="font-narrative italic text-snow/0 group-hover:text-snow/70 text-base max-w-sm leading-relaxed transition-all duration-500 delay-100 translate-y-2 group-hover:translate-y-0">
              &ldquo;{character.signature_quote}&rdquo;
            </p>
          </div>
        </div>

        {/* Ink splatter decorativo */}
        <InkSplatter
          variant="ink"
          size={large ? 'lg' : 'md'}
          opacity={0.04}
          className="absolute top-8 right-8"
          index={allCharacters.indexOf(character)}
        />
      </Link>
    </motion.div>
  );
}
