import type { Metadata } from 'next';
import { ConexionesTransmediaPage } from '@/components/sections/ConexionesTransmedia';

export const metadata: Metadata = {
  title: 'Conexiones Transmedia | Blue Eye Samurai — Archivo',
  description: 'El ecosistema completo: TikTok, Spotify, Realidad Virtual.',
  openGraph: {
    title: 'Conexiones Transmedia | Blue Eye Samurai',
    description: 'El universo de Blue Eye Samurai desplegado en múltiples plataformas',
  },
};

export default function ConexionesPage() {
  return <ConexionesTransmediaPage />;
}
