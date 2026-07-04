import type { DiaryEntry as DiaryEntryType } from '@/types/character';

interface DiaryEntryProps {
  entry: DiaryEntryType;
  characterName: string;
  isUnlocked: boolean;
}

export function DiaryEntry({ entry, characterName, isUnlocked }: DiaryEntryProps) {
  if (!isUnlocked) {
    return (
      <div className="border-l-2 border-sepia/30 pl-6 py-4 opacity-60">
        <p className="font-ui text-sm uppercase tracking-widest text-snow mb-3">
          Entrada {entry.entryNumber} — Bloqueada
        </p>
        <div className="space-y-1.5">
          {[0.9, 0.7, 0.8, 0.5].map((w, i) => (
            <div
              key={i}
              className="h-3 rounded-sm bg-snow/10"
              style={{ width: `${w * 100}%` }}
            />
          ))}
        </div>
        <p className="font-ui text-sm text-mist/80 mt-4 italic">
          Completá el Quiz Moral para desbloquear esta entrada.
        </p>
      </div>
    );
  }

  return (
    <div
      className="border-l-2 pl-6 py-4"
      style={{ borderColor: 'rgba(107, 76, 59, 0.4)' }}
    >
      <p
        className="font-ui text-sm uppercase tracking-widest mb-4 text-snow"
      >
        {characterName} — Entrada {entry.entryNumber}
      </p>
      <p
        className="font-narrative italic leading-loose text-lg"
        style={{ color: 'rgba(245, 240, 232, 0.75)', lineHeight: '1.9' }}
      >
        {entry.text}
      </p>
    </div>
  );
}
