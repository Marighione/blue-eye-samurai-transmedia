import type { Metadata } from 'next';
import { ArchivoInteractivo } from '@/components/narrative/ArchivoInteractivo';

export const metadata: Metadata = {
  title: 'Archivo Interactivo — Blue Eye Samurai',
  description: 'Documentos, cartas, registros y rumores. El universo guardado en papel.',
};

export default function ArchivoPage() {
  return <ArchivoInteractivo />;
}
