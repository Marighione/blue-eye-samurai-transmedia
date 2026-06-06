import type { Metadata } from 'next';
import { PersonajesHub } from '@/components/narrative/PersonajesHub';

export const metadata: Metadata = {
  title: 'Personajes — Blue Eye Samurai',
  description: 'Cuatro personas que el sistema intentó definir antes de que pudieran definirse a sí mismas.',
};

export default function PersonajesPage() {
  return <PersonajesHub />;
}
