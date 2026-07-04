import type { CharacterSlug } from '@/types/character';
import type { TerritoryId } from '@/types/territory';

export const TOTAL_DOCUMENTS = 10;
export const TOTAL_TERRITORIES = 5;
export const TOTAL_CHARACTERS = 4;

export const CHARACTERS: CharacterSlug[] = ['mizu', 'akemi', 'taigen', 'ringo'];

export const TERRITORY_IDS: TerritoryId[] = [
  'caminos-exilio',
  'palacios-poder',
  'lugares-combate',
  'espacios-ocultamiento',
  'espacios-intimos',
];

export const SITE_NAME = '青眼 / ARCHIVO';
export const SITE_DESCRIPTION = 'Entre la venganza y la justicia, la verdadera batalla está en no perder la propia identidad.';
export const PREMISE = 'Entre la venganza y la justicia, la verdadera batalla está en no perder la propia identidad.';

export const NAV_ITEMS = [
  { label: 'Universo', href: '/universo' },
  { label: 'Personajes', href: '/personajes' },
  { label: 'Archivo', href: '/archivo' },
  { label: 'Experiencias', href: '/experiencias' },
  { label: 'Conexiones', href: '/conexiones' },
  { label: 'Experiencia RV', href: '/realidad-virtual', featured: true },
] as const;
