import type { MoralQuiz } from '@/types/experience';

export const quizMoralData: MoralQuiz = {
  id: 'quiz-moral',
  title: 'Venganza o Justicia',
  subtitle: 'No hay respuestas correctas. Solo hay respuestas tuyas.',
  introduction: 'Tres situaciones. Cuatro caminos posibles cada vez. Al final, el universo te revela algo sobre vos. No juzga. Solo refleja.',
  situations: [
    {
      id: 'sit-1',
      situationNumber: 1,
      narrativeSetup: 'La persona responsable de destruir tu comunidad está frente a vos. No puede defenderse. Las personas que amabas ya no están.',
      question: '¿Qué hacés?',
      options: [
        {
          id: 'A',
          text: 'La atacás. Es lo que merece.',
          profileWeight: { llama: 3, balanza: 0, rio: 0, niebla: 0 },
        },
        {
          id: 'B',
          text: 'La entregás a las autoridades, aunque no confíes en ellas.',
          profileWeight: { llama: 0, balanza: 3, rio: 0, niebla: 0 },
        },
        {
          id: 'C',
          text: 'La dejás ir. La violencia no devuelve lo que perdiste.',
          profileWeight: { llama: 0, balanza: 0, rio: 3, niebla: 0 },
        },
        {
          id: 'D',
          text: 'La enfrentás públicamente para que todos sepan lo que hizo.',
          profileWeight: { llama: 0, balanza: 1, rio: 1, niebla: 1 },
        },
      ],
    },
    {
      id: 'sit-2',
      situationNumber: 2,
      narrativeSetup: 'Descubrís que alguien en quien confiabas te estuvo mintiendo para protegerte. La mentira te costó años. La verdad te hubiera costado todo.',
      question: '¿Qué sentís?',
      options: [
        {
          id: 'A',
          text: 'Traición. Sin importar la intención, la mentira es la mentira.',
          profileWeight: { llama: 2, balanza: 0, rio: 1, niebla: 0 },
        },
        {
          id: 'B',
          text: 'Gratitud confusa. Quizás necesitabas esa protección.',
          profileWeight: { llama: 0, balanza: 2, rio: 0, niebla: 1 },
        },
        {
          id: 'C',
          text: 'Rabia hacia el sistema que hizo necesaria esa mentira.',
          profileWeight: { llama: 1, balanza: 0, rio: 3, niebla: 0 },
        },
        {
          id: 'D',
          text: 'Nada todavía. Necesitás tiempo para procesar.',
          profileWeight: { llama: 0, balanza: 0, rio: 0, niebla: 3 },
        },
      ],
    },
    {
      id: 'sit-3',
      situationNumber: 3,
      narrativeSetup: 'Podés terminar tu misión pero para hacerlo tenés que actuar de una forma que va en contra de lo que creés que sos.',
      question: '¿Qué priorizás?',
      options: [
        {
          id: 'A',
          text: 'El objetivo. El fin justifica los medios.',
          profileWeight: { llama: 3, balanza: 0, rio: 0, niebla: 0 },
        },
        {
          id: 'B',
          text: 'Tus valores. Sin ellos, ¿quién sos después?',
          profileWeight: { llama: 0, balanza: 3, rio: 0, niebla: 0 },
        },
        {
          id: 'C',
          text: 'Buscás una tercera opción aunque parezca imposible.',
          profileWeight: { llama: 0, balanza: 1, rio: 3, niebla: 0 },
        },
        {
          id: 'D',
          text: 'Posponés la decisión. No estás listo/a todavía.',
          profileWeight: { llama: 0, balanza: 0, rio: 0, niebla: 3 },
        },
      ],
    },
  ],
  profiles: [
    {
      id: 'llama',
      title: 'La Llama',
      tagline: 'El fuego que te quema también ilumina.',
      description: 'Priorizás la acción directa. Creés en las consecuencias sobre las intenciones. El fuego que te quema también ilumina.',
      rvRecommendation: 'El camino del combate',
      unlockedDocumentIds: ['doc-07'],
      color: '#D4520A',
    },
    {
      id: 'balanza',
      title: 'La Balanza',
      tagline: 'Buscás el equilibrio incluso cuando el equilibrio es imposible.',
      description: 'Buscás el equilibrio incluso cuando el equilibrio es imposible. Confiás en los sistemas aunque sepas que fallan.',
      rvRecommendation: 'El camino del honor',
      unlockedDocumentIds: ['doc-07'],
      unlockedCharacterContent: 'taigen',
      color: '#C58A2A',
    },
    {
      id: 'rio',
      title: 'El Río',
      tagline: 'Cuestionás las estructuras. Buscás causas más que culpables.',
      description: 'Cuestionás las estructuras. Buscás causas más que culpables.',
      rvRecommendation: 'El camino de la justicia',
      unlockedDocumentIds: ['doc-07'],
      unlockedCharacterContent: 'akemi',
      color: '#4A90C4',
    },
    {
      id: 'niebla',
      title: 'La Niebla',
      tagline: 'La incertidumbre es tu estado natural. No sabés todavía y eso es honesto.',
      description: 'La incertidumbre es tu estado natural. No sabés todavía y eso es honesto.',
      rvRecommendation: 'El camino del descubrimiento',
      unlockedDocumentIds: ['doc-07'],
      color: '#415A77',
    },
  ],
};
