import type { Character } from '@/types/character';

export const mizuData: Character = {
  slug: 'mizu',
  name: 'Mizu',
  theme: 'identity',
  narrativeDescription: `Mizu nació en un mundo que no tenía un lugar para ella. Hija de una madre japonesa y un padre europeo desconocido, sus ojos azules la convirtieron desde el nacimiento en un símbolo de lo que el Japón del Sakoku temía: la contaminación de lo extranjero. Creció siendo llamada oni (demonio), siendo tratada como un error de la naturaleza, aprendiendo que para sobrevivir debía transformarse en algo que el mundo no pudiera ignorar: una amenaza.

Eligió disfrazarse de hombre no solo por táctica sino porque el mundo masculino era el único donde la violencia que necesitaba ejercer era posible. Construyó una identidad de combate tan sólida que a veces ella misma olvidaba qué había debajo. Su camino de venganza es también un camino de regreso a sí misma.`,
  motivations: [
    { level: 'primary', text: 'Encontrar y destruir a los cuatro hombres blancos que pudieron ser su padre' },
    { level: 'secondary', text: 'Demostrar que su existencia tiene valor en un mundo que la niega' },
    { level: 'deep', text: 'Descubrir qué queda de ella cuando el odio ya no la sostiene' },
  ],
  symbolicObjects: [
    {
      id: 'mizu-sword',
      name: 'La espada de ojos azules',
      description: 'Forjada específicamente para ella.',
      narrativeText: 'El arma es su identidad más honesta: construida con propósito, hecha para cortar lo que la limita. No fue heredada ni robada. Fue creada. Como ella misma.',
      imageAlt: 'Espada con hoja de tonos azulados, forja única',
    },
    {
      id: 'mizu-glasses',
      name: 'Los lentes de ámbar',
      description: 'Ocultan sus ojos azules.',
      narrativeText: 'La máscara más literal. Lo primero que se pone y lo último que se quita. Cada vez que se los pone, elige sobrevivir sobre ser vista.',
      imageAlt: 'Lentes redondos de vidrio color ámbar con montura de metal negro',
    },
    {
      id: 'mizu-hat',
      name: 'El sombrero de paja',
      description: 'Cubre su figura, neutraliza su presencia.',
      narrativeText: 'Le permite existir en espacios donde de otra forma sería imposible. No es invisibilidad: es el permiso que el mundo da a lo que no puede ver.',
      imageAlt: 'Sombrero de paja de ala ancha, estilo kasa',
    },
  ],
  signature_quote: 'Nací siendo un error. Decidí convertirme en una consecuencia.',
  diaryEntries: [
    {
      id: 'mizu-diary-1',
      entryNumber: 1,
      text: 'No sé cuándo empecé a pensar en mí misma en masculino. Fue gradual, supongo. Como tantas otras cosas que uno hace para sobrevivir y termina confundiendo con quién es. Me pregunto si eso importa. Si el nombre que uno usa a solas, en la oscuridad, cuando no hay nadie mirando, dice más verdad que todos los demás.',
      isLocked: false,
    },
    {
      id: 'mizu-diary-2',
      entryNumber: 2,
      text: 'Ringo me preguntó hoy si alguna vez había sido feliz. No supe responder. No porque no haya habido momentos buenos, sino porque "feliz" parece una palabra hecha para personas que no tienen que gastar tanta energía en existir. Quizás cuando termine esto pueda aprender qué significa.',
      isLocked: false,
    },
    {
      id: 'mizu-diary-3',
      entryNumber: 3,
      text: 'Los ojos azules me convirtieron en un monstruo antes de que yo pudiera decidir qué quería ser. Ahora los uso como arma. La misma cosa que me definió como amenaza se convirtió en la razón por la que me temen. No sé si eso es justicia o simplemente es el sistema funcionando de otra manera.',
      isLocked: true,
      unlockCondition: 'quiz_moral_llama',
    },
  ],
  othersPerspectives: [
    {
      observerId: 'taigen',
      observerName: 'Taigen',
      text: 'No entiendo a Mizu. Pelea como alguien que no tiene nada que perder, lo que significa que pelea como alguien muy peligroso. Pero a veces la miro y veo a una persona que simplemente quiere que alguien la vea sin asustarse.',
    },
    {
      observerId: 'ringo',
      observerName: 'Ringo',
      text: 'Mizu me enseñó que la fuerza no es lo mismo que el miedo. Que uno puede ser temible y también tener miedo. Que las dos cosas conviven. Eso lo entendí tarde.',
    },
    {
      observerId: 'stranger_1',
      observerName: 'Un aldeano',
      text: 'Vi pasar a un samurái raro por el camino norte. Llevaba lentes de color y un sombrero caído. No paró. No pidió agua. Caminaba como si el destino ya estuviera decidido y el único trabajo que quedaba fuera llegar.',
    },
  ],
  heroImage: '/images/characters/mizu-hero.jpg',
  portraitImage: '/images/characters/mizu-portrait.png',
  colorScheme: {
    primary: '#0D1B2A',
    secondary: '#415A77',
    accent: '#00BCCE',
  },
};
