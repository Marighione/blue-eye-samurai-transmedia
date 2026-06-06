'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
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

// Fondos atmosféricos por personaje
const HERO_BG: Record<string, string> = {
  mizu: `radial-gradient(ellipse 70% 80% at 40% 30%, rgba(74,144,196,0.25) 0%, transparent 60%),
         radial-gradient(ellipse 60% 50% at 80% 70%, rgba(27,38,59,0.8) 0%, transparent 60%),
         #0D1B2A`,
  akemi: `radial-gradient(ellipse 60% 70% at 60% 30%, rgba(139,0,0,0.3) 0%, transparent 60%),
          radial-gradient(ellipse 80% 60% at 20% 70%, rgba(26,6,6,0.9) 0%, transparent 60%),
          #0D0505`,
  taigen: `radial-gradient(ellipse 70% 60% at 50% 40%, rgba(74,63,56,0.4) 0%, transparent 60%),
           #1A1614`,
  ringo: `radial-gradient(ellipse 70% 70% at 40% 30%, rgba(197,138,42,0.15) 0%, transparent 60%),
          radial-gradient(ellipse 60% 60% at 70% 70%, rgba(122,74,21,0.2) 0%, transparent 60%),
          #110D08`,
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
    <div className="min-h-screen bg-night">
      {/* Hero del personaje */}
      <section
        className="relative min-h-screen flex items-end overflow-hidden"
        style={{ background: HERO_BG[character.slug] }}
      >
        <div className="absolute inset-0 vignette pointer-events-none" />
        <InkSplatter variant="ink" size="lg" opacity={0.05} className="absolute top-20 right-16" index={0} />

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
      <section className="py-24 md:py-32 bg-night">
        <NarrativeColumn>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            <motion.p variants={revealFromFog} className="font-ui text-xs font-semibold uppercase tracking-widest text-mist mb-8">
              Quién es
            </motion.p>
            {character.narrativeDescription.split('\n\n').map((para, i) => (
              <motion.p
                key={i}
                variants={revealFromFog}
                className="font-narrative text-lg text-snow/75 leading-loose mb-6"
              >
                {para}
              </motion.p>
            ))}
          </motion.div>
        </NarrativeColumn>
      </section>

      <Divider variant="sword" className="mx-8 md:mx-20 opacity-20" />

      {/* Motivaciones */}
      <section className="py-20 md:py-28 bg-night">
        <NarrativeColumn width="content">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
          >
            <motion.p variants={revealFromFog} className="font-ui text-xs font-semibold uppercase tracking-widest text-mist mb-10">
              Motivaciones
            </motion.p>
            <div className="space-y-8">
              {character.motivations.map((m, i) => (
                <motion.div key={m.level} variants={revealFromFog} className="flex gap-6">
                  <div
                    className="w-1 flex-shrink-0 rounded-full mt-1"
                    style={{
                      backgroundColor: character.colorScheme.accent,
                      opacity: 1 - i * 0.2,
                      height: '100%',
                      minHeight: '1.5rem',
                    }}
                  />
                  <div>
                    <p className="font-ui text-xs uppercase tracking-widest text-mist/70 mb-2">
                      {MOTIVATION_LABELS[m.level]}
                    </p>
                    <p className="font-narrative text-lg text-snow/70 leading-relaxed">{m.text}</p>
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
          <section className="py-20 md:py-28 bg-night">
            <NarrativeColumn width="content">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={staggerContainer}
              >
                <motion.p variants={revealFromFog} className="font-ui text-xs font-semibold uppercase tracking-widest text-mist mb-10">
                  Objetos simbólicos
                </motion.p>
                <div className="space-y-2">
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
      <section className="py-20 md:py-28 bg-night">
        <NarrativeColumn width="content">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={revealFromFog}
          >
            <PerspectiveSelector perspectives={character.othersPerspectives} />
          </motion.div>
        </NarrativeColumn>
      </section>

      {/* Diarios */}
      {character.diaryEntries.length > 0 && (
        <>
          <Divider variant="dots" className="mx-8 md:mx-20" />
          <section
            className="py-20 md:py-28"
            style={{ backgroundColor: '#0A1018' }}
          >
            <NarrativeColumn>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={staggerContainer}
              >
                <motion.p variants={revealFromFog} className="font-ui text-xs font-semibold uppercase tracking-widest text-mist mb-10">
                  Diario personal
                </motion.p>
                <div className="space-y-10">
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
      <section className="py-20 px-8 md:px-20 bg-night border-t border-white/5">
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between max-w-site mx-auto">
          <p className="font-narrative italic text-snow/70 text-base max-w-sm">
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
