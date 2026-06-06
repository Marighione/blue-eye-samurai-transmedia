import type { Territory } from '@/types/territory';

export const espaciosIntimosData: Territory = {
  id: 'espacios-intimos',
  name: 'Los Espacios Íntimos',
  subtitle: 'Donde la guardia baja porque el peso de llevarla se vuelve insoportable',
  dominantColor: '#C58A2A',
  symbol: 'Vela encendida en una habitación vacía',
  centralConflict: 'Vulnerabilidad, humanidad, conexión',
  narrativeDescription: 'Los momentos y espacios donde los personajes bajan la guardia: no porque sea seguro, sino porque el peso de llevarla se vuelve insoportable. Aquí aparece la dimensión más humana del universo.',
  shortStory: 'No tengo recuerdos de que alguien me mirara y no viera el problema. Siempre fui el problema primero, la persona después, si es que llegaban a verla. Ringo fue el primero en hacer lo contrario. Por eso lo seguí. No porque me necesitara. Sino porque él no me necesitaba para ser lo que era.',
  relatedCharacters: ['ringo', 'mizu'],
  relatedDocumentIds: ['doc-04', 'doc-07'],
  mapPosition: { x: 70, y: 70 },
  isLocked: false,
};
