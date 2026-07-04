'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/primitives/Button';
import { Divider } from '@/components/primitives/Divider';
import { InkSplatter } from '@/components/primitives/InkSplatter';
import { staggerContainer, revealFromFog } from '@/lib/animations';
import { setTestMascarasResult } from '@/lib/user-state';
import { processUnlockConditions } from '@/lib/unlock-logic';
import { useUserState } from '@/context/UserStateContext';
import { testMascarasData } from '@/data/experiences/test-mascaras';
import type { QuizOptionId, MaskId, MaskResult } from '@/types/experience';

type Phase = 'intro' | 'q-0' | 'q-1' | 'q-2' | 'result';

interface Answer {
  questionId: string;
  optionId: QuizOptionId;
}

function calculateMask(answers: Answer[]): MaskId {
  const scores = { silencio: 0, guerra: 0, honor: 0, supervivencia: 0 };
  answers.forEach(({ questionId, optionId }) => {
    const q = testMascarasData.questions.find((q) => q.id === questionId);
    const opt = q?.options.find((o) => o.id === optionId);
    if (opt) {
      scores.silencio += opt.maskWeight.silencio;
      scores.guerra += opt.maskWeight.guerra;
      scores.honor += opt.maskWeight.honor;
      scores.supervivencia += opt.maskWeight.supervivencia;
    }
  });
  return Object.entries(scores).reduce((a, b) => (b[1] > a[1] ? b : a))[0] as MaskId;
}

export function TestMascaras() {
  const { state, refreshState } = useUserState();
  const [phase, setPhase] = useState<Phase>(
    state.testMascarasResult ? 'result' : 'intro'
  );
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedOption, setSelectedOption] = useState<QuizOptionId | null>(null);
  const [showContinue, setShowContinue] = useState(false);
  const [result, setResult] = useState<MaskId | null>(state.testMascarasResult);

  const questionIndex = phase === 'q-0' ? 0 : phase === 'q-1' ? 1 : 2;
  const currentQuestion = phase.startsWith('q-')
    ? testMascarasData.questions[questionIndex]
    : null;

  const maskProfile = result
    ? testMascarasData.results.find((r) => r.id === result) ?? null
    : null;

  function handleStart() {
    setAnswers([]);
    setSelectedOption(null);
    setShowContinue(false);
    setResult(null);
    setPhase('q-0');
  }

  function handleSelectOption(optionId: QuizOptionId) {
    setSelectedOption(optionId);
    setShowContinue(true);
  }

  function handleContinue() {
    if (!currentQuestion || !selectedOption) return;
    const newAnswers = [...answers, { questionId: currentQuestion.id, optionId: selectedOption }];
    setAnswers(newAnswers);
    setSelectedOption(null);
    setShowContinue(false);

    if (phase === 'q-2') {
      const mask = calculateMask(newAnswers);
      setResult(mask);
      setTestMascarasResult(mask);
      processUnlockConditions();
      refreshState();
      setPhase('result');
    } else {
      setPhase(phase === 'q-0' ? 'q-1' : 'q-2');
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden texture-dark">
      <InkSplatter variant="ink" size="lg" opacity={0.04} className="absolute top-24 left-10" index={3} />
      <InkSplatter variant="blood" size="md" opacity={0.03} className="absolute bottom-24 right-10" index={0} />

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
            <motion.p variants={revealFromFog} className="font-ui text-sm font-semibold uppercase tracking-widest text-snow mb-4">
              Experiencia interactiva
            </motion.p>
            <motion.h1 variants={revealFromFog} className="font-display text-4xl md:text-5xl font-semibold text-snow tracking-wide mb-6">
              {testMascarasData.title}
            </motion.h1>
            <motion.p variants={revealFromFog} className="font-narrative italic text-xl text-snow/80 mb-4 leading-relaxed">
              {testMascarasData.subtitle}
            </motion.p>
            <motion.p variants={revealFromFog} className="font-narrative text-base text-snow/90 leading-loose mb-12">
              {testMascarasData.introduction}
            </motion.p>

            {state.testMascarasResult && (
              <motion.div variants={revealFromFog} className="mb-8 p-4 border border-gold/20 bg-gold/5">
                <p className="font-ui text-sm uppercase tracking-widest text-snow mb-1">Máscara anterior</p>
                <p className="font-display text-lg text-snow">
                  {testMascarasData.results.find((r) => r.id === state.testMascarasResult)?.name}
                </p>
              </motion.div>
            )}

            <motion.div variants={revealFromFog}>
              <Button variant="primary" onClick={handleStart} size="lg">
                {state.testMascarasResult ? 'Revelar de nuevo' : 'Comenzar'}
              </Button>
            </motion.div>
          </motion.div>
        )}

        {/* PREGUNTA */}
        {phase.startsWith('q-') && currentQuestion && (
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
              {/* Título del test */}
              <p className="font-ui text-sm uppercase tracking-widest text-gold mb-6">
                Test de Máscaras
              </p>

              {/* Indicador de progreso */}
              <div className="flex gap-2 mb-12">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-px flex-1 transition-colors duration-500"
                    style={{
                      backgroundColor: i <= questionIndex
                        ? 'rgba(197, 138, 42, 0.8)'
                        : 'rgba(255, 255, 255, 0.1)',
                    }}
                  />
                ))}
              </div>
              <p className="font-ui text-sm uppercase tracking-widest text-snow mb-8">
                Pregunta {questionIndex + 1} de 3
              </p>

              {/* Pregunta */}
              <p className="font-display text-2xl md:text-3xl text-snow tracking-wide mb-10 leading-snug">
                {currentQuestion.text}
              </p>

              <Divider variant="sword" className="mb-10 opacity-15" />

              {/* Opciones */}
              <div className="space-y-3">
                {currentQuestion.options.map((opt) => (
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

              <AnimatePresence>
                {showContinue && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mt-10"
                  >
                    <Button variant="primary" onClick={handleContinue} size="md">
                      {phase === 'q-2' ? 'Revelar mi máscara' : 'Siguiente →'}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* RESULTADO */}
        {phase === 'result' && maskProfile && (
          <MaskResult profile={maskProfile} onRedo={handleStart} />
        )}

      </AnimatePresence>
    </div>
  );
}

function MaskResult({ profile, onRedo }: { profile: MaskResult; onRedo: () => void }) {
  return (
    <motion.div
      key="result"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="min-h-screen flex flex-col justify-center px-8 md:px-20 py-32 max-w-3xl mx-auto"
    >
      <motion.p variants={revealFromFog} className="font-ui text-sm uppercase tracking-widest text-mist mb-4">
        Test de Máscaras — Tu resultado
      </motion.p>

      <motion.h1
        variants={revealFromFog}
        className="font-display text-4xl md:text-6xl font-bold tracking-widest mb-6 text-snow"
        style={{ color: profile.color, textShadow: `0 0 50px ${profile.color}40` }}
      >
        {profile.name}
      </motion.h1>

      <Divider variant="sword" className="mb-8 opacity-20" />

      <motion.p variants={revealFromFog} className="font-narrative text-lg text-snow/90 leading-loose mb-12 max-w-xl">
        {profile.description}
      </motion.p>

      {/* Documento desbloqueado */}
      <motion.div variants={revealFromFog} className="mb-10 p-6 border border-gold/20 bg-gold/5">
        <p className="font-ui text-sm uppercase tracking-widest text-snow mb-3">
          Nueva pieza encontrada
        </p>
        <p className="font-narrative text-base text-snow/90">
          El Testimonio anónimo ha sido añadido al archivo. Una voz sin nombre que habla sobre libertad.
        </p>
      </motion.div>

      <motion.div variants={revealFromFog} className="flex flex-col sm:flex-row gap-4">
        <Button variant="primary" href="/archivo" size="md">
          Ver el documento desbloqueado
        </Button>
        <Button variant="secondary" href="/experiencias/quiz-moral">
          Quiz Moral
        </Button>
        <Button variant="ghost" onClick={onRedo} size="md">
          Revelar de nuevo
        </Button>
      </motion.div>
    </motion.div>
  );
}
