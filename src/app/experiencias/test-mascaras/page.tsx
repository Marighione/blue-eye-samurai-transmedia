import type { Metadata } from 'next';
import { TestMascaras } from '@/components/experiences/TestMascaras';

export const metadata: Metadata = {
  title: 'Test de Máscaras | Experiencias — Blue Eye Samurai',
  description: '¿Qué máscara usás para sobrevivir? Tres preguntas. Una revelación.',
};

export default function TestMascarasPage() {
  return <TestMascaras />;
}
