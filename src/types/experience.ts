import type { CharacterSlug } from './character';

export type QuizOptionId = 'A' | 'B' | 'C' | 'D';

export interface QuizOption {
  id: QuizOptionId;
  text: string;
  profileWeight: {
    llama: number;
    balanza: number;
    rio: number;
    niebla: number;
  };
}

export interface QuizSituation {
  id: string;
  situationNumber: number;
  narrativeSetup: string;
  question: string;
  options: QuizOption[];
}

export type MoralQuizProfile = 'llama' | 'balanza' | 'rio' | 'niebla';

export interface MoralQuizProfileResult {
  id: MoralQuizProfile;
  title: string;
  tagline: string;
  description: string;
  rvRecommendation: string;
  unlockedDocumentIds: string[];
  unlockedCharacterContent?: CharacterSlug;
  color: string;
}

export interface MoralQuiz {
  id: 'quiz-moral';
  title: string;
  subtitle: string;
  introduction: string;
  situations: QuizSituation[];
  profiles: MoralQuizProfileResult[];
}

export type MaskId = 'silencio' | 'guerra' | 'honor' | 'supervivencia';

export interface MaskQuestion {
  id: string;
  questionNumber: number;
  text: string;
  options: {
    id: QuizOptionId;
    text: string;
    maskWeight: {
      silencio: number;
      guerra: number;
      honor: number;
      supervivencia: number;
    };
  }[];
}

export interface MaskResult {
  id: MaskId;
  name: string;
  description: string;
  unlockedDocumentIds: string[];
  imageDescription: string;
  color: string;
}

export interface MaskTest {
  id: 'test-mascaras';
  title: string;
  subtitle: string;
  introduction: string;
  questions: MaskQuestion[];
  results: MaskResult[];
}
