import { getUserState, addUnlockedDocument } from './user-state';
import type { CharacterSlug } from '@/types/character';

export function processUnlockConditions(): void {
  const state = getUserState();

  if (state.completedExperiences.includes('quiz-moral')) {
    addUnlockedDocument('doc-07');
  }

  if (state.visitedCharacters.includes('akemi')) {
    addUnlockedDocument('doc-08');
  }

  if (state.completedExperiences.includes('test-mascaras')) {
    addUnlockedDocument('doc-09');
  }

  const allCharacters: CharacterSlug[] = ['mizu', 'akemi', 'taigen', 'ringo'];
  if (allCharacters.every(c => state.visitedCharacters.includes(c))) {
    addUnlockedDocument('doc-10');
  }
}

export function isDocumentUnlocked(docId: string): boolean {
  const state = getUserState();
  const alwaysVisible = ['doc-01', 'doc-02', 'doc-03', 'doc-04', 'doc-05', 'doc-06'];
  if (alwaysVisible.includes(docId)) return true;
  return state.unlockedDocuments.includes(docId);
}

export function getDocumentStatus(docId: string): 'visible' | 'locked' | 'newly-unlocked' {
  const state = getUserState();
  const alwaysVisible = ['doc-01', 'doc-02', 'doc-03', 'doc-04', 'doc-05', 'doc-06'];
  if (alwaysVisible.includes(docId)) return 'visible';
  if (!state.unlockedDocuments.includes(docId)) return 'locked';
  return 'visible';
}
