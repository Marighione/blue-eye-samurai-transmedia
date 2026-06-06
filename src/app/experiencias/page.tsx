import type { Metadata } from 'next';
import { ExperienciasHub } from '@/components/sections/ExperienciasHub';

export const metadata: Metadata = {
  title: 'Experiencias | Blue Eye Samurai — Archivo',
  description: 'Estas experiencias no tienen respuestas correctas. Solo tienen las tuyas.',
  openGraph: {
    title: 'Experiencias | Blue Eye Samurai',
    description: 'Quiz Moral y Test de Máscaras — experiencias interactivas sin respuesta correcta',
  },
};

export default function ExperienciasPage() {
  return <ExperienciasHub />;
}
