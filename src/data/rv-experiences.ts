export interface RVExperience {
  id: string;
  name: string;
  description: string;
  duration: string;
  intensity: 'Alta' | 'Media' | 'Baja';
  recommendedFor: string;
  territory: string;
}

export const rvExperiences: RVExperience[] = [
  {
    id: 'rv-combate',
    name: 'El Camino del Combate',
    description: 'Recorrido de acción e intensidad. Tomás decisiones en el campo de batalla: atacar o defender, avanzar o retroceder. Para quienes prefieren la acción directa sobre la contemplación.',
    duration: '25 minutos',
    intensity: 'Alta',
    recommendedFor: 'llama',
    territory: 'lugares-combate',
  },
  {
    id: 'rv-honor',
    name: 'El Camino del Honor',
    description: 'Recorrido de dilemas. Navegás por las estructuras de poder del período Edo, tomando decisiones que ponen en tensión el honor personal contra la supervivencia colectiva.',
    duration: '20 minutos',
    intensity: 'Media',
    recommendedFor: 'balanza',
    territory: 'palacios-poder',
  },
  {
    id: 'rv-identidad',
    name: 'El Camino de la Identidad',
    description: 'Recorrido introspectivo. Exploración de los espacios de ocultamiento y los caminos del exilio. Para quienes quieren comprender los conflictos internos de los personajes desde adentro.',
    duration: '30 minutos',
    intensity: 'Baja',
    recommendedFor: 'niebla',
    territory: 'caminos-exilio',
  },
];
