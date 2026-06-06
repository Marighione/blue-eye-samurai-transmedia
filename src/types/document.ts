import type { CharacterSlug } from './character';
import type { TerritoryId } from './territory';

export type DocumentType =
  | 'official-record'
  | 'letter'
  | 'rumor'
  | 'testimony'
  | 'edict'
  | 'diary-page'
  | 'training-note'
  | 'unknown';

export type DocumentStatus = 'visible' | 'locked' | 'newly-unlocked';

export interface ArchiveDocument {
  id: string;
  title: string;
  type: DocumentType;
  typeLabel: string;
  sourceLabel?: string;
  text: string;
  status: DocumentStatus;
  unlockCondition?: string;
  relatedCharacters?: CharacterSlug[];
  relatedTerritories?: TerritoryId[];
  layoutRotation: number;
  layoutPosition?: {
    top: number;
    left: number;
  };
}
