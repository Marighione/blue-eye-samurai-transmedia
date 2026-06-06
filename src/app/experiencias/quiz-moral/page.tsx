import type { Metadata } from 'next';
import { QuizMoral } from '@/components/experiences/QuizMoral';

export const metadata: Metadata = {
  title: '¿Venganza o Justicia? | Experiencias — Blue Eye Samurai',
  description: 'Tres situaciones. Sin respuestas correctas. Al final, el universo revela algo sobre vos.',
};

export default function QuizMoralPage() {
  return <QuizMoral />;
}
