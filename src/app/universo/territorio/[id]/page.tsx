import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { TerritoryDetail } from '@/components/narrative/TerritoryDetail';
import { getTerritoryById, allTerritories } from '@/data';
import type { TerritoryId } from '@/types/territory';

interface Props {
  params: { id: string };
}

export function generateStaticParams() {
  return allTerritories.map((t) => ({ id: t.id }));
}

export function generateMetadata({ params }: Props): Metadata {
  const territory = getTerritoryById(params.id as TerritoryId);
  if (!territory) return { title: 'Territorio no encontrado' };
  return {
    title: `${territory.name} | Universo — Blue Eye Samurai`,
    description: territory.centralConflict,
  };
}

export default function TerritoryPage({ params }: Props) {
  const territory = getTerritoryById(params.id as TerritoryId);
  if (!territory) notFound();
  return <TerritoryDetail territory={territory} />;
}
