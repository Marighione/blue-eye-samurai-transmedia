import type { Character } from '@/types/character';

export const ringoData: Character = {
  slug: 'ringo',
  name: 'Ringo',
  theme: 'loyalty',
  narrativeDescription: `Ringo nació sin una mano, en un mundo donde eso debería haberlo convertido en nadie. En cambio, se convirtió en el personaje con más humanidad de la serie. No porque sea inocente, sino porque eligió la humanidad como estrategia. No como ingenuidad.

Su presencia al lado de Mizu funciona como espejo: le muestra lo que ella podría ser si dejara de invertir toda su energía en ser una amenaza.`,
  motivations: [
    { level: 'primary', text: 'Acompañar a Mizu, aprender el camino del guerrero' },
    { level: 'secondary', text: 'Demostrar que la diferencia no define los límites de lo posible' },
    { level: 'deep', text: 'Ser visto, completamente, sin que nadie sienta la necesidad de mirar hacia otro lado' },
  ],
  symbolicObjects: [
    {
      id: 'ringo-stump',
      name: 'El muñón',
      description: 'No lo oculta.',
      narrativeText: 'Es la primera cosa visible de él. Y eso, en este universo, es una declaración. Mientras todos los demás personajes aprenden a ocultar su diferencia, Ringo la lleva adelante. No por valentía ciega. Por una decisión consciente sobre quién quiere ser.',
      imageAlt: 'Brazo que termina en muñón, llevado con naturalidad',
    },
    {
      id: 'ringo-bandana',
      name: 'La venda de la cabeza',
      description: 'Marca de un accidente, llevada con naturalidad.',
      narrativeText: 'La diferencia como hecho, no como drama. En un mundo donde cada marca es una historia de vergüenza o de honor, Ringo lleva la suya sin ninguna de las dos cosas. Solo como parte de lo que es.',
      imageAlt: 'Venda blanca alrededor de la cabeza',
    },
  ],
  signature_quote: 'La gente me mira y ve lo que falta. Yo aprendí a mirar y ver lo que hay.',
  diaryEntries: [],
  othersPerspectives: [
    {
      observerId: 'mizu',
      observerName: 'Mizu',
      text: 'Ringo nunca me pidió que fuera diferente. Eso es más raro de lo que parece.',
    },
    {
      observerId: 'stranger_1',
      observerName: 'Un posadero',
      text: 'El chico de la venda sonríe mucho para alguien que debería estar amargado. Eso me incomoda. Prefiero entender por qué la gente sufre. No sé qué hacer con alguien que decidió no hacerlo.',
    },
  ],
  heroImage: '/images/characters/ringo-hero.jpg',
  portraitImage: '/images/ringo.png',
  colorScheme: {
    primary: '#2A1A0A',
    secondary: '#6B4C3B',
    accent: '#ECB357',
  },
};
