'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/primitives/Button';
import { Divider } from '@/components/primitives/Divider';
import { InkSplatter } from '@/components/primitives/InkSplatter';
import { staggerContainer, revealFromFog } from '@/lib/animations';
import { setQuizMoralResult } from '@/lib/user-state';
import { processUnlockConditions } from '@/lib/unlock-logic';
import { useUserState } from '@/context/UserStateContext';
import { quizMoralData } from '@/data/experiences/quiz-moral';
import type { QuizOptionId, MoralQuizProfile, MoralQuizProfileResult } from '@/types/experience';

type Phase = 'intro' | 'situation-0' | 'situation-1' | 'situation-2' | 'result';

interface Answer {
  situationId: string;
  optionId: QuizOptionId;
}

function calculateResult(answers: Answer[]): MoralQuizProfile {
  const scores = { llama: 0, balanza: 0, rio: 0, niebla: 0 };
  answers.forEach(({ situationId, optionId }) => {
    const sit = quizMoralData.situations.find((s) => s.id === situationId);
    const opt = sit?.options.find((o) => o.id === optionId);
    if (opt) {
      scores.llama += opt.profileWeight.llama;
      scores.balanza += opt.profileWeight.balanza;
      scores.rio += opt.profileWeight.rio;
      scores.niebla += opt.profileWeight.niebla;
    }
  });
  return (Object.entries(scores).reduce((a, b) => (b[1] > a[1] ? b : a))[0] as MoralQuizProfile);
}

export function QuizMoral() {
  const { state, refreshState } = useUserState();
  const [phase, setPhase] = useState<Phase>(
    state.quizMoralResult ? 'result' : 'intro'
  );
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedOption, setSelectedOption] = useState<QuizOptionId | null>(null);
  const [showContinue, setShowContinue] = useState(false);
  const [result, setResult] = useState<MoralQuizProfile | null>(state.quizMoralResult);

  const situationIndex = phase === 'situation-0' ? 0 : phase === 'situation-1' ? 1 : 2;
  const currentSituation = phase.startsWith('situation-')
    ? quizMoralData.situations[situationIndex]
    : null;
  const profile = result ? quizMoralData.profiles.find((p) => p.id === result) ?? null : null;

  function handleStart() {
    setAnswers([]);
    setSelectedOption(null);
    setShowContinue(false);
    setResult(null);
    setPhase('situation-0');
  }

  function handleSelectOption(optionId: QuizOptionId) {
    setSelectedOption(optionId);
    setShowContinue(true);
  }

  function handleContinue() {
    if (!currentSituation || !selectedOption) return;
    const newAnswers = [...answers, { situationId: currentSituation.id, optionId: selectedOption }];
    setAnswers(newAnswers);
    setSelectedOption(null);
    setShowContinue(false);

    if (phase === 'situation-2') {
      const profile = calculateResult(newAnswers);
      setResult(profile);
      setQuizMoralResult(profile);
      processUnlockConditions();
      refreshState();
      setPhase('result');
    } else {
      setPhase(phase === 'situation-0' ? 'situation-1' : 'situation-2');
    }
  }

  const situationNumber = situationIndex + 1;

  return (
    <div className="min-h-screen relative overflow-hidden texture-dark">
      <InkSplatter variant="ink" size="lg" opacity={0.04} className="absolute top-20 right-16" index={2} />
      <InkSplatter variant="blood" size="md" opacity={0.03} className="absolute bottom-32 left-8" index={1} />

      <AnimatePresence mode="wait">

        {/* INTRO */}
        {phase === 'intro' && (
          <motion.div
            key="intro"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
            className="min-h-screen flex flex-col justify-center px-8 md:px-20 py-32 max-w-2xl mx-auto"
          >
            <motion.p variants={revealFromFog} className="font-ui text-sm font-semibold uppercase tracking-widest text-snow mb-6">
              Experiencia interactiva
            </motion.p>
            <motion.h1 variants={revealFromFog} className="font-display text-4xl md:text-5xl font-semibold text-snow tracking-wide mb-6">
              {quizMoralData.title}
            </motion.h1>
            <motion.p variants={revealFromFog} className="font-narrative italic text-xl text-snow/80 mb-4 leading-relaxed">
              {quizMoralData.subtitle}
            </motion.p>
            <motion.p variants={revealFromFog} className="font-narrative text-base text-snow/90 leading-loose mb-12">
              {quizMoralData.introduction}
            </motion.p>

            <Divider variant="sword" className="mb-12 opacity-20" />

            <motion.p variants={revealFromFog} className="font-ui text-sm uppercase tracking-widest text-snow mb-10">
              Tres situaciones. Sin respuestas correctas.
            </motion.p>

            {state.quizMoralResult && (
              <motion.div variants={revealFromFog} className="mb-8 p-4 border border-gold/20 bg-gold/5">
                <p className="font-ui text-sm uppercase tracking-widest text-snow mb-1">Resultado anterior</p>
                <p className="font-display text-lg text-snow">
                  {quizMoralData.profiles.find((p) => p.id === state.quizMoralResult)?.title}
                </p>
              </motion.div>
            )}

            <motion.div variants={revealFromFog}>
              <Button variant="primary" onClick={handleStart} size="lg">
                {state.quizMoralResult ? 'Rehacer el quiz' : 'Comenzar'}
              </Button>
            </motion.div>
          </motion.div>
        )}

        {/* SITUACIÓN */}
        {phase.startsWith('situation-') && currentSituation && (
          <motion.div
            key={phase}
            initial={{ opacity: 0, filter: 'blur(8px)', y: 20 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            exit={{ opacity: 0, filter: 'blur(8px)', y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="min-h-screen flex flex-col justify-center px-8 md:px-20 py-32 max-w-2xl mx-auto"
          >
            {/* Contenedor principal */}
            <div
              className="border border-white/10 p-8 md:p-12"
              style={{ backgroundColor: 'rgba(27, 38, 59, 0.8)' }}
            >
              {/* Título del quiz */}
              <p className="font-ui text-sm uppercase tracking-widest text-gold mb-6">
                Quiz Moral — Venganza o Justicia
              </p>

              {/* Indicador de progreso */}
              <div className="flex gap-2 mb-12">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-px flex-1 transition-colors duration-500"
                    style={{
                      backgroundColor: i <= situationIndex
                        ? 'rgba(197, 138, 42, 0.8)'
                        : 'rgba(255, 255, 255, 0.1)',
                    }}
                  />
                ))}
              </div>
              <p className="font-ui text-sm uppercase tracking-widest text-snow mb-8">
                Situación {situationNumber} de 3
              </p>

              {/* Texto narrativo */}
              <p className="font-narrative italic text-xl text-snow/85 leading-loose mb-4">
                {currentSituation.narrativeSetup}
              </p>
              <p className="font-display text-2xl text-snow mb-10 tracking-wide">
                {currentSituation.question}
              </p>

              <Divider variant="sword" className="mb-10 opacity-15" />

              {/* Opciones */}
              <div className="space-y-3">
                {currentSituation.options.map((opt) => (
                  <motion.button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    animate={
                      selectedOption === opt.id
                        ? { borderColor: 'rgba(232,177,75,1)', backgroundColor: 'rgba(197,138,42,0.1)' }
                        : selectedOption && selectedOption !== opt.id
                        ? { opacity: 0.5 }
                        : { opacity: 1 }
                    }
                    whileHover={{ borderColor: 'rgba(197,138,42,0.5)' }}
                    transition={{ duration: 0.25 }}
                    className="w-full text-left border border-white/10 px-5 py-4 cursor-pointer"
                  >
                    <span className="font-display text-sm text-mist mr-3">{opt.id})</span>
                    <span className="font-narrative text-base text-snow/80">{opt.text}</span>
                  </motion.button>
                ))}
              </div>

              {/* Botón continuar */}
              <AnimatePresence>
                {showContinue && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mt-10"
                  >
                    <Button
                      variant="primary"
                      onClick={handleContinue}
                      size="md"
                    >
                      {phase === 'situation-2' ? 'Ver resultado' : 'Continuar →'}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* RESULTADO */}
        {phase === 'result' && profile && (
          <QuizResult profile={profile} onRedo={handleStart} />
        )}

      </AnimatePresence>
    </div>
  );
}

function QuizResult({
  profile,
  onRedo,
}: {
  profile: MoralQuizProfileResult;
  onRedo: () => void;
}) {
  return (
    <motion.div
      key="result"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="min-h-screen flex flex-col justify-center px-8 md:px-20 py-32 max-w-3xl mx-auto"
    >
      <motion.p variants={revealFromFog} className="font-ui text-sm uppercase tracking-widest text-gold mb-4">
        Quiz Moral — Venganza o Justicia
      </motion.p>
      <motion.p variants={revealFromFog} className="font-ui text-sm uppercase tracking-widest text-snow mb-6">
        Tu camino revela algo sobre vos
      </motion.p>

      <motion.h1
        variants={revealFromFog}
        className="font-display text-5xl md:text-7xl font-bold text-snow tracking-widest mb-4"
        style={{ color: profile.color, textShadow: `0 0 60px ${profile.color}40` }}
      >
        {profile.title}
      </motion.h1>

      <motion.p variants={revealFromFog} className="font-narrative italic text-xl text-snow/80 mb-8 leading-relaxed">
        {profile.tagline}
      </motion.p>

      <Divider variant="sword" className="mb-8 opacity-20" />

      <motion.p variants={revealFromFog} className="font-narrative text-lg text-snow/90 leading-loose mb-12 max-w-xl">
        {profile.description}
      </motion.p>

      {/* Contenido desbloqueado */}
      <motion.div variants={revealFromFog} className="mb-10 p-6 border border-gold/20 bg-gold/5">
        <p className="font-ui text-sm uppercase tracking-widest text-snow mb-3">
          Nueva pieza encontrada
        </p>
        <p className="font-narrative text-base text-snow/90">
          El Diario de un soldado ha sido añadido al archivo. Accedé desde la sección Archivo.
        </p>
      </motion.div>

      <motion.div variants={revealFromFog} className="flex flex-col sm:flex-row gap-4">
        <Button variant="primary" href="/archivo" size="md">
          Ver documentos desbloqueados
        </Button>
        <Button variant="ghost" onClick={onRedo} size="md">
          Rehacer
        </Button>
      </motion.div>
    </motion.div>
  );
}
