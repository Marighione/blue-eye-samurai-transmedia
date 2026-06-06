import type { MoralQuizProfile, MaskId } from './experience';
import type { CharacterSlug } from './character';
import type { TerritoryId } from './territory';

export type InitialChoice = 'ocultar' | 'enfrentar';

export interface UserState {
  quizMoralResult: MoralQuizProfile | null;
  testMascarasResult: MaskId | null;
  quizInitialChoice: InitialChoice | null;
  unlockedDocuments: string[];
  visitedTerritories: TerritoryId[];
  visitedCharacters: CharacterSlug[];
  completedExperiences: string[];
  totalFragments: number;
  lastVisit: string | null;
}

export const DEFAULT_USER_STATE: UserState = {
  quizMoralResult: null,
  testMascarasResult: null,
  quizInitialChoice: null,
  unlockedDocuments: [],
  visitedTerritories: [],
  visitedCharacters: [],
  completedExperiences: [],
  totalFragments: 0,
  lastVisit: null,
};
