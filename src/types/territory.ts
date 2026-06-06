import type { CharacterSlug } from './character';

export type TerritoryId =
  | 'caminos-exilio'
  | 'palacios-poder'
  | 'lugares-combate'
  | 'espacios-ocultamiento'
  | 'espacios-intimos';

export interface Territory {
  id: TerritoryId;
  name: string;
  subtitle: string;
  dominantColor: string;
  symbol: string;
  centralConflict: string;
  narrativeDescription: string;
  shortStory: string;
  relatedCharacters: CharacterSlug[];
  relatedDocumentIds: string[];
  rvExperienceId?: string;
  mapPosition: {
    x: number;
    y: number;
  };
  isLocked: boolean;
  unlockCondition?: string;
}
