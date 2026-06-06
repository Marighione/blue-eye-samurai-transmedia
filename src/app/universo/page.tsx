import type { Metadata } from 'next';
import { UniversoPage } from '@/components/sections/UniversoPage';

export const metadata: Metadata = {
  title: 'El Mundo | Blue Eye Samurai — Archivo',
  description: 'Japón. Período Edo. Un mundo cerrado sobre sí mismo donde la identidad se hereda, se impone o se oculta.',
};

export default function Universo() {
  return <UniversoPage />;
}
