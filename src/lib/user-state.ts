import type { UserState } from '@/types/user';
import type { CharacterSlug } from '@/types/character';
import type { TerritoryId } from '@/types/territory';
import type { MoralQuizProfile, MaskId } from '@/types/experience';
import { DEFAULT_USER_STATE } from '@/types/user';

const STATE_KEY = 'bes_user_state';

export function getUserState(): UserState {
  if (typeof window === 'undefined') return DEFAULT_USER_STATE;

  try {
    const stored = localStorage.getItem(STATE_KEY);
    if (!stored) return DEFAULT_USER_STATE;
    return { ...DEFAULT_USER_STATE, ...JSON.parse(stored) };
  } catch {
    return DEFAULT_USER_STATE;
  }
}

export function updateUserState(updates: Partial<UserState>): UserState {
  const current = getUserState();
  const next = { ...current, ...updates };
  if (typeof window !== 'undefined') {
    localStorage.setItem(STATE_KEY, JSON.stringify(next));
  }
  return next;
}

export function addUnlockedDocument(docId: string): void {
  const state = getUserState();
  if (!state.unlockedDocuments.includes(docId)) {
    updateUserState({
      unlockedDocuments: [...state.unlockedDocuments, docId],
      totalFragments: state.totalFragments + 1,
    });
  }
}

export function addVisitedCharacter(slug: CharacterSlug): void {
  const state = getUserState();
  if (!state.visitedCharacters.includes(slug)) {
    updateUserState({
      visitedCharacters: [...state.visitedCharacters, slug],
    });
  }
}

export function addVisitedTerritory(id: TerritoryId): void {
  const state = getUserState();
  if (!state.visitedTerritories.includes(id)) {
    updateUserState({
      visitedTerritories: [...state.visitedTerritories, id],
    });
  }
}

export function setQuizMoralResult(result: MoralQuizProfile): void {
  const state = getUserState();
  updateUserState({
    quizMoralResult: result,
    completedExperiences: [...state.completedExperiences, 'quiz-moral'],
  });
}

export function setTestMascarasResult(result: MaskId): void {
  const state = getUserState();
  updateUserState({
    testMascarasResult: result,
    completedExperiences: [...state.completedExperiences, 'test-mascaras'],
  });
}

export function setInitialChoice(choice: 'ocultar' | 'enfrentar'): void {
  updateUserState({ quizInitialChoice: choice });
}
