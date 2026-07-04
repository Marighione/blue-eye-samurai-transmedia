import type { Character } from '@/types/character';

export const taigenData: Character = {
  slug: 'taigen',
  name: 'Taigen',
  theme: 'honor',
  narrativeDescription: `Taigen es lo que el sistema produce cuando funciona bien: un samurái que cree genuinamente en el honor, en la jerarquía y en que el mundo tiene un orden correcto. El problema es que ese orden empieza a mostrar fisuras cuando se encuentra con Mizu, que no debería existir según todas las reglas que él conoce, pero existe de todas formas, y lo derrota.

Su arco es el de alguien que tiene que elegir entre la comodidad de sus certezas y la incomodidad de la verdad.`,
  motivations: [
    { level: 'primary', text: 'Ser reconocido como el mejor guerrero, recuperar su honor' },
    { level: 'secondary', text: 'Entender a Mizu, que representa todo lo que su sistema de valores no puede explicar' },
    { level: 'deep', text: 'Descubrir si el honor que defiende es real o si es solo el disfraz del privilegio' },
  ],
  symbolicObjects: [
    {
      id: 'taigen-sword',
      name: 'La espada familiar',
      description: 'Herencia, linaje, identidad prestada.',
      narrativeText: 'El peso de ser lo que otros decidieron que fuera. Fue forjada para su padre, y para el padre de su padre. Cuando la sostiene, no sabe si está eligiendo o simplemente repitiendo.',
      imageAlt: 'Katana ornamentada con empuñadura familiar',
    },
    {
      id: 'taigen-scar',
      name: 'La cicatriz de su primer duelo',
      description: 'Recuerdo físico de que sus certezas tienen límites.',
      narrativeText: 'La primera vez que Mizu lo derrotó, algo más que la piel se rompió. Una certeza. La certeza de que el mundo tenía sentido. La cicatriz está ahí para recordarle que el mundo no espera su permiso para contradecirlo.',
      imageAlt: 'Cicatriz diagonal en el rostro, marca de combate',
    },
  ],
  signature_quote: 'Hay cosas que no pueden ser verdad porque si lo son, nada de lo demás tiene sentido. Prefería vivir sin sentido antes de aceptarlo. Hasta que ya no pude.',
  diaryEntries: [],
  othersPerspectives: [
    {
      observerId: 'mizu',
      observerName: 'Mizu',
      text: 'Taigen odia lo que no entiende. Eso lo hace predecible. Y a veces, inesperadamente, honesto.',
    },
    {
      observerId: 'stranger_1',
      observerName: 'Un soldado bajo su mando',
      text: 'El capitán Taigen exige de los demás lo que se exige a sí mismo. Eso sería admirable si no fuera tan ciego a la diferencia entre exigencia y crueldad.',
    },
  ],
  heroImage: '/images/characters/taigen-hero.jpg',
  portraitImage: '/images/characters/taigen-portrait.png',
  colorScheme: {
    primary: '#1A1614',
    secondary: '#4A3F38',
    accent: '#ECB357',
  },
};
