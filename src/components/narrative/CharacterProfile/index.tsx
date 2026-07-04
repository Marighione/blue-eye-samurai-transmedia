'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { NarrativeColumn } from '@/components/layout/NarrativeColumn';
import { Divider } from '@/components/primitives/Divider';
import { Badge } from '@/components/primitives/Badge';
import { Button } from '@/components/primitives/Button';
import { InkSplatter } from '@/components/primitives/InkSplatter';
import { PerspectiveSelector } from '@/components/narrative/PerspectiveSelector';
import { SymbolicObject } from '@/components/narrative/SymbolicObject';
import { DiaryEntry } from '@/components/narrative/DiaryEntry';
import { addVisitedCharacter } from '@/lib/user-state';
import { processUnlockConditions } from '@/lib/unlock-logic';
import { useUserState } from '@/context/UserStateContext';
import { staggerContainer, revealFromFog } from '@/lib/animations';
import type { Character } from '@/types/character';

const THEME_LABELS: Record<string, string> = {
  identity: 'Identidad',
  'gender-power': 'Poder y género',
  honor: 'Honor',
  loyalty: 'Lealtad',
};

const MOTIVATION_LABELS = {
  primary: 'Motivación primaria',
  secondary: 'Motivación secundaria',
  deep: 'Motivación profunda',
};

const HERO_IMAGES: Record<string, { src: string; position: string }> = {
  mizu: { src: '/images/mizu-detalle.png', position: '50% 20%' },
  akemi: { src: '/images/akemi-detalle.png', position: '50% 20%' },
  taigen: { src: '/images/taigen-detalle.png', position: '50% 20%' },
  ringo: { src: '/images/ringo-detalle.png', position: '50% 20%' },
};

interface CharacterProfileProps {
  character: Character;
}

export function CharacterProfile({ character }: CharacterProfileProps) {
  const { state, refreshState } = useUserState();

  useEffect(() => {
    addVisitedCharacter(character.slug);
    processUnlockConditions();
    refreshState(); // eslint-disable-line react-hooks/exhaustive-deps
  }, [character.slug]); // eslint-disable-line react-hooks/exhaustive-deps

  const hasUnlockedDiary = state.completedExperiences.includes('quiz-moral') ||
    state.quizMoralResult === 'llama';

  return (
    <div className="min-h-screen texture-dark">
      {/* Hero del personaje */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={HERO_IMAGES[character.slug]?.src || `/images/${character.slug}-detalle.png`}
            alt=""
            fill
            className="object-cover"
            style={{ objectPosition: HERO_IMAGES[character.slug]?.position || '50% 20%' }}
            quality={85}
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night via-night/60 to-night/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-night/60 via-transparent to-transparent" />
        </div>
        <div className="absolute inset-0 vignette pointer-events-none z-[1]" />
        <InkSplatter variant="ink" size="lg" opacity={0.05} className="absolute top-20 right-16 z-[1]" index={0} />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 px-8 md:px-20 pb-28"
        >
          <motion.div variants={revealFromFog} className="mb-4">
            <Badge variant="default">{THEME_LABELS[character.theme]}</Badge>
          </motion.div>

          <motion.h1
            variants={revealFromFog}
            className="font-display text-6xl md:text-8xl font-bold text-snow tracking-widest mb-6"
            style={{ textShadow: `0 0 60px ${character.colorScheme.accent}40` }}
          >
            {character.name}
          </motion.h1>

          <motion.blockquote
            variants={revealFromFog}
            className="font-narrative italic text-xl md:text-2xl text-snow/80 max-w-2xl leading-relaxed border-l-2 pl-6"
            style={{ borderColor: character.colorScheme.accent + '60' }}
          >
            &ldquo;{character.signature_quote}&rdquo;
          </motion.blockquote>
        </motion.div>

        {/* Línea de color en la base */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ backgroundColor: character.colorScheme.accent + '30' }}
        />
      </section>

      {/* Descripción narrativa */}
      <section className="relative section-fade-top py-24 md:py-32">
        <NarrativeColumn>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            {character.narrativeDescription.split('\n\n').map((para, i) => (
              <motion.p
                key={i}
                variants={revealFromFog}
                className="font-narrative text-lg text-snow/85 leading-loose mb-6"
              >
                {para}
              </motion.p>
            ))}
          </motion.div>
        </NarrativeColumn>
      </section>

      <Divider variant="sword" className="mx-8 md:mx-20 opacity-20" />

      {/* Motivaciones */}
      <section className="py-24 md:py-36">
        <NarrativeColumn width="content">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
          >
            <motion.h2 variants={revealFromFog} className="font-display text-2xl md:text-3xl text-snow tracking-wide mb-14">
              Motivaciones
            </motion.h2>
            <div className="bg-deep-blue/55 border border-white/5 p-10 md:p-16 space-y-10">
              {character.motivations.map((m, i) => (
                <motion.div key={m.level} variants={revealFromFog} className="flex gap-8">
                  <div
                    className="w-1 flex-shrink-0 rounded-full mt-1"
                    style={{
                      backgroundColor: character.colorScheme.accent,
                      opacity: 1 - i * 0.2,
                      height: '100%',
                      minHeight: '2rem',
                    }}
                  />
                  <div>
                    <p className="font-ui text-base uppercase tracking-widest text-snow mb-3">
                      {MOTIVATION_LABELS[m.level]}
                    </p>
                    <p className="font-narrative text-xl text-snow/90 leading-relaxed">{m.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </NarrativeColumn>
      </section>

      {/* Objetos simbólicos */}
      {character.symbolicObjects.length > 0 && (
        <>
          <Divider variant="dots" className="mx-8 md:mx-20" />
          <section className="py-24 md:py-36">
            <NarrativeColumn width="content">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={staggerContainer}
              >
                <motion.h2 variants={revealFromFog} className="font-display text-2xl md:text-3xl text-snow tracking-wide mb-14">
                  Objetos simbólicos
                </motion.h2>
                <div className="bg-deep-blue/55 border border-white/5 p-10 md:p-16 space-y-4">
                  {character.symbolicObjects.map((obj) => (
                    <motion.div key={obj.id} variants={revealFromFog}>
                      <SymbolicObject object={obj} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </NarrativeColumn>
          </section>
        </>
      )}

      <Divider variant="sword" className="mx-8 md:mx-20 opacity-20" />

      {/* La mirada del otro */}
      <section className="py-24 md:py-36">
        <NarrativeColumn width="content">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={revealFromFog}
          >
            <div className="bg-deep-blue/55 border border-white/5 p-10 md:p-16">
              <PerspectiveSelector perspectives={character.othersPerspectives} />
            </div>
          </motion.div>
        </NarrativeColumn>
      </section>

      {/* Diarios */}
      {character.diaryEntries.length > 0 && (
        <>
          <Divider variant="dots" className="mx-8 md:mx-20" />
          <section className="py-24 md:py-36">
            <NarrativeColumn>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={staggerContainer}
              >
                <motion.h2 variants={revealFromFog} className="font-display text-2xl md:text-3xl text-snow tracking-wide mb-14">
                  Diario personal
                </motion.h2>
                <div className="space-y-12">
                  {character.diaryEntries.map((entry) => (
                    <motion.div key={entry.id} variants={revealFromFog}>
                      <DiaryEntry
                        entry={entry}
                        characterName={character.name}
                        isUnlocked={!entry.isLocked || hasUnlockedDiary}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </NarrativeColumn>
          </section>
        </>
      )}

      {/* CTA final */}
      <section className="py-20 px-8 md:px-20 border-t border-white/5">
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between max-w-site mx-auto">
          <p className="font-narrative italic text-snow/90 text-base max-w-sm">
            ¿Querés conocer su camino desde adentro?
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="primary" href="/experiencias/quiz-moral">
              Quiz Moral
            </Button>
            <Button variant="secondary" href="/personajes">
              ← Todos los personajes
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
