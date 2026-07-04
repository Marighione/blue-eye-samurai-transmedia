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
    id: 'rv-venganza',
    name: 'Entre la venganza y la justicia',
    description: 'Vive el dilema de Mizu entre la ira y la paz. Tus decisiones transforman el mundo y definen tu destino.',
    duration: '25 minutos',
    intensity: 'Alta',
    recommendedFor: 'llama',
    territory: 'lugares-combate',
  },
  {
    id: 'rv-ecos',
    name: 'Ecos del pasado',
    description: 'Explora recuerdos y traumas convertidos en escenarios simbólicos. Resuelve acertijos para reconstruir la memoria.',
    duration: '20 minutos',
    intensity: 'Media',
    recommendedFor: 'balanza',
    territory: 'palacios-poder',
  },
  {
    id: 'rv-laberinto',
    name: 'El laberinto de las verdades',
    description: 'Adéntrate en un espacio cambiante donde cada sala revela verdades ocultas. Decide si aceptarlas o manipularlas.',
    duration: '30 minutos',
    intensity: 'Baja',
    recommendedFor: 'niebla',
    territory: 'caminos-exilio',
  },
];
