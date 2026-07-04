import type { Character } from '@/types/character';

export const akemiData: Character = {
  slug: 'akemi',
  name: 'Akemi',
  theme: 'gender-power',
  narrativeDescription: `Akemi es hija de un noble poderoso y ha sido educada para ser exactamente lo que se espera de ella: obediente, decorativa, políticamente útil. Pero Akemi aprendió a leer en silencio, a observar en silencio y a planear en silencio. El sistema la subestimó, y esa es su única ventaja.

Su historia es la de una mujer que descubre que la libertad no le fue negada: simplemente le fue ocultada. Y que una vez que la ve, no puede desverla.`,
  motivations: [
    { level: 'primary', text: 'Escapar del matrimonio arreglado y del destino que otros decidieron por ella' },
    { level: 'secondary', text: 'Construir su propio poder en un mundo que no le ofrece ninguna forma legítima de tenerlo' },
    { level: 'deep', text: 'Ser reconocida como un agente, no como un objeto. Ser sujeto de su propia historia.' },
  ],
  symbolicObjects: [
    {
      id: 'akemi-kimono',
      name: 'El kimono rojo',
      description: 'No es una prenda de sometimiento.',
      narrativeText: 'Es la única armadura que le permitieron usar. La lleva con intención. Cada pliegue es una decisión consciente de usar lo que el sistema le dio para sus propios fines.',
      imageAlt: 'Kimono rojo intenso con bordados dorados delicados',
    },
    {
      id: 'akemi-book',
      name: 'El libro oculto',
      description: 'Símbolo de todo lo que aprendió sin permiso.',
      narrativeText: 'De que la mente no puede ser encadenada aunque el cuerpo sí. Cada página leída en secreto fue un acto de resistencia. Cada palabra memorizada, una arma.',
      imageAlt: 'Libro pequeño de tapa oscura, parcialmente oculto',
    },
    {
      id: 'akemi-comb',
      name: 'El peine de oro',
      description: 'Regalo de bodas.',
      narrativeText: 'Le recuerda constantemente lo que se espera de ella. Lo carga como recordatorio de lo que rechaza. El peso del oro es el peso de lo que no eligió.',
      imageAlt: 'Peine ornamental de oro con incrustaciones',
    },
  ],
  signature_quote: 'Me enseñaron a ser bonita y a callarme. Aprendí ambas cosas perfectamente. Nadie me explicó que las mismas herramientas sirven para otra cosa.',
  diaryEntries: [
    {
      id: 'akemi-diary-1',
      entryNumber: 1,
      text: 'Mi padre dice que una mujer inteligente es un problema. Creo que lo que quiere decir es que una mujer inteligente que sabe que es inteligente es un problema. La diferencia es enorme. Por eso nunca le mostré cuánto sé.',
      isLocked: false,
    },
    {
      id: 'akemi-diary-2',
      entryNumber: 2,
      text: 'Me casarán con alguien que no elegí para sellar una alianza que no entiendo completamente. Lo gracioso es que entiendo más de política que la mayoría de los hombres en la sala. Pero mi comprensión no cuenta porque va en un cuerpo equivocado, según ellos.',
      isLocked: false,
    },
  ],
  othersPerspectives: [
    {
      observerId: 'mizu',
      observerName: 'Mizu',
      text: 'Akemi y yo no somos tan diferentes. Las dos aprendimos a existir en espacios que no fueron diseñados para nosotras. La diferencia es que ella tiene que sonreír mientras lo hace.',
    },
    {
      observerId: 'stranger_1',
      observerName: 'Una dama de compañía',
      text: 'La princesa Akemi nunca llora donde alguien pueda verla. Una vez la escuché, tarde en la noche, cuando creía que todos dormían. No era tristeza lo que escuché. Era rabia. Y rabia, en alguien como ella, asusta mucho más que las lágrimas.',
    },
  ],
  heroImage: '/images/characters/akemi-hero.jpg',
  portraitImage: '/images/characters/akemi-portrait.png',
  colorScheme: {
    primary: '#1A0A0A',
    secondary: '#FF776B',
    accent: '#ECB357',
  },
};
