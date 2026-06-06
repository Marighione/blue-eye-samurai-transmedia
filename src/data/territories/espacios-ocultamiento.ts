import type { Territory } from '@/types/territory';

export const espaciosOcultamientoData: Territory = {
  id: 'espacios-ocultamiento',
  name: 'Los Espacios de Ocultamiento',
  subtitle: 'Donde los personajes pueden ser algo distinto a lo que deben ser',
  dominantColor: '#415A77',
  symbol: 'Máscara de madera sobre fondo oscuro',
  centralConflict: 'Máscara como protección, identidad fracturada',
  narrativeDescription: 'Las posadas, los sótanos, los establos, los pasillos traseros: los espacios donde los personajes pueden, por un momento, ser algo distinto a lo que se supone que deben ser. O donde deben construir la siguiente versión de sí mismos para sobrevivir al día siguiente.',
  shortStory: '¿Cuántas veces puede una persona cambiarse de nombre antes de olvidar cuál era el verdadero? En algún momento dejé de contarlas. Ahora pienso que quizás todos los nombres fueron igualmente reales. Que la persona que los llevó fue siempre la misma, aunque nadie lo supiera. Aunque yo misma tardara en saberlo.',
  relatedCharacters: ['mizu', 'akemi'],
  relatedDocumentIds: ['doc-02', 'doc-09'],
  mapPosition: { x: 30, y: 65 },
  isLocked: false,
};
