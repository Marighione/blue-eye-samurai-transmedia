import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CharacterProfile } from '@/components/narrative/CharacterProfile';
import { getCharacterBySlug, allCharacters } from '@/data';
import type { CharacterSlug } from '@/types/character';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return allCharacters.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const character = getCharacterBySlug(params.slug as CharacterSlug);
  if (!character) return { title: 'Personaje no encontrado' };
  return {
    title: `${character.name} | Personajes — Blue Eye Samurai`,
    description: character.signature_quote,
  };
}

export default function PersonajeSlugPage({ params }: Props) {
  const character = getCharacterBySlug(params.slug as CharacterSlug);
  if (!character) notFound();
  return <CharacterProfile character={character} />;
}
