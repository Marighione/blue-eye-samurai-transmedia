export type CharacterSlug = 'mizu' | 'akemi' | 'taigen' | 'ringo';

export type CharacterTheme =
  | 'identity'
  | 'gender-power'
  | 'honor'
  | 'loyalty';

export interface SymbolicObject {
  id: string;
  name: string;
  description: string;
  narrativeText: string;
  imageAlt: string;
}

export interface DiaryEntry {
  id: string;
  entryNumber: number;
  text: string;
  isLocked: boolean;
  unlockCondition?: string;
}

export interface OthersPerspective {
  observerId: string;
  observerName: string;
  text: string;
}

export interface Motivation {
  level: 'primary' | 'secondary' | 'deep';
  text: string;
}

export interface Character {
  slug: CharacterSlug;
  name: string;
  fullName?: string;
  theme: CharacterTheme;
  narrativeDescription: string;
  motivations: Motivation[];
  symbolicObjects: SymbolicObject[];
  signature_quote: string;
  diaryEntries: DiaryEntry[];
  othersPerspectives: OthersPerspective[];
  heroImage: string;
  portraitImage: string;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
  };
  unlockedContentId?: string;
}
