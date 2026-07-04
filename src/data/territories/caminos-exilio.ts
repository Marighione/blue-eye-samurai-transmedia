import type { Territory } from '@/types/territory';

export const caminosExilioData: Territory = {
  id: 'caminos-exilio',
  name: 'Los Caminos del Exilio',
  subtitle: 'El único territorio que acepta a quienes los otros rechazan',
  dominantColor: '#00BCCE',
  symbol: 'Huellas en la nieve que se borran',
  centralConflict: 'Otredad y desplazamiento',
  narrativeDescription: 'Los caminos entre aldeas son el espacio del que no pertenece a ningún lugar. Aquí viajan los ronin, los exiliados, los diferentes. El camino no es una metáfora: es literalmente el único territorio que acepta a quienes los otros territorios rechazan.',
  shortStory: 'Hay una historia que se cuenta en las posadas de camino sobre una figura que viajaba siempre de noche. No por miedo a los bandidos, decían, sino por miedo a que alguien la mirara de frente. Una figura que cubría sus ojos con lentes de color ámbar y su identidad con el silencio. Los posaderos aprendieron a no preguntar. Los viajeros aprendieron a no mirar. Así funciona el camino: te deja existir siempre que no le pidas demasiado.',
  relatedCharacters: ['mizu', 'ringo'],
  relatedDocumentIds: ['doc-01', 'doc-03'],
  rvExperienceId: 'rv-identidad',
  mapPosition: { x: 25, y: 30 },
  isLocked: false,
};
