import type { Territory } from '@/types/territory';

export const lugaresCombateData: Territory = {
  id: 'lugares-combate',
  name: 'Los Lugares de Combate',
  subtitle: 'Donde los conflictos internos se vuelven externos',
  dominantColor: '#FF776B',
  symbol: 'Salpicaduras de tinta/sangre sobre papel',
  centralConflict: 'Venganza vs justicia, honor vs supervivencia',
  narrativeDescription: 'Los lugares de combate no son solo físicos. Son el espacio donde los conflictos internos se vuelven externos, donde la decisión de herir o perdonar define quién se es. El combate en este universo no es espectáculo: es revelación.',
  shortStory: 'La primera vez que gané un combate entendí que ganar no era lo que pensaba que era. Esperaba sentir algo. Claridad, quizás. O cierre. En cambio sentí que el problema era el mismo de antes, solo que con una persona menos en el mundo. La venganza prometía ser un destino. Resultó ser solo un método.',
  relatedCharacters: ['mizu', 'taigen'],
  relatedDocumentIds: ['doc-03', 'doc-06'],
  rvExperienceId: 'rv-combate',
  mapPosition: { x: 45, y: 55 },
  isLocked: false,
};
