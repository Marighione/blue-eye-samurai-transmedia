export { mizuData } from './characters/mizu';
export { akemiData } from './characters/akemi';
export { taigenData } from './characters/taigen';
export { ringoData } from './characters/ringo';
export { caminosExilioData } from './territories/caminos-exilio';
export { palaciosPoderId } from './territories/palacios-poder';
export { lugaresCombateData } from './territories/lugares-combate';
export { espaciosOcultamientoData } from './territories/espacios-ocultamiento';
export { espaciosIntimosData } from './territories/espacios-intimos';
export { archiveDocuments } from './archive/documents';
export { quizMoralData } from './experiences/quiz-moral';
export { testMascarasData } from './experiences/test-mascaras';
export { rvExperiences } from './rv-experiences';

import { mizuData } from './characters/mizu';
import { akemiData } from './characters/akemi';
import { taigenData } from './characters/taigen';
import { ringoData } from './characters/ringo';
import type { Character } from '@/types/character';
import type { CharacterSlug } from '@/types/character';

export const allCharacters: Character[] = [mizuData, akemiData, taigenData, ringoData];

export function getCharacterBySlug(slug: CharacterSlug): Character | undefined {
  return allCharacters.find(c => c.slug === slug);
}

import { caminosExilioData } from './territories/caminos-exilio';
import { palaciosPoderId } from './territories/palacios-poder';
import { lugaresCombateData } from './territories/lugares-combate';
import { espaciosOcultamientoData } from './territories/espacios-ocultamiento';
import { espaciosIntimosData } from './territories/espacios-intimos';
import type { Territory } from '@/types/territory';
import type { TerritoryId } from '@/types/territory';

export const allTerritories: Territory[] = [
  caminosExilioData,
  palaciosPoderId,
  lugaresCombateData,
  espaciosOcultamientoData,
  espaciosIntimosData,
];

export function getTerritoryById(id: TerritoryId): Territory | undefined {
  return allTerritories.find(t => t.id === id);
}
