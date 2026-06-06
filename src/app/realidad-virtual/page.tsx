import type { Metadata } from 'next';
import { RealidadVirtualPage } from '@/components/sections/RealidadVirtual';

export const metadata: Metadata = {
  title: 'Experiencia RV | Blue Eye Samurai — Archivo',
  description: 'Tres recorridos de realidad virtual. El tuyo depende de quién sos.',
  openGraph: {
    title: 'Experiencia RV | Blue Eye Samurai',
    description: 'Tres recorridos inmersivos en el universo de Blue Eye Samurai',
  },
};

export default function RealidadVirtual() {
  return <RealidadVirtualPage />;
}
