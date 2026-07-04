import type { MaskTest } from '@/types/experience';

export const testMascarasData: MaskTest = {
  id: 'test-mascaras',
  title: '¿Qué máscara usás para sobrevivir?',
  subtitle: 'Cada persona lleva una. La pregunta es cuál.',
  introduction: 'En el Japón del período Edo, las máscaras no eran decorativas. Eran estrategia. Son tres preguntas. La máscara que emerja te pertenece.',
  questions: [
    {
      id: 'mask-q-1',
      questionNumber: 1,
      text: 'Si tu diferencia más visible pudiera ponerte en peligro, ¿qué harías?',
      options: [
        { id: 'A', text: 'La ocultaría completamente. La supervivencia primero.', maskWeight: { silencio: 3, guerra: 0, honor: 0, supervivencia: 1 } },
        { id: 'B', text: 'La convertiría en arma. Que me teman antes de que me rechacen.', maskWeight: { silencio: 0, guerra: 3, honor: 0, supervivencia: 0 } },
        { id: 'C', text: 'Huiría a un lugar donde no sea una diferencia.', maskWeight: { silencio: 1, guerra: 0, honor: 0, supervivencia: 2 } },
        { id: 'D', text: 'La enfrentaría directamente. No voy a vivir ocultándome.', maskWeight: { silencio: 0, guerra: 1, honor: 3, supervivencia: 0 } },
      ],
    },
    {
      id: 'mask-q-2',
      questionNumber: 2,
      text: '¿Cómo manejás la mirada de alguien que ya decidió quién sos antes de conocerte?',
      options: [
        { id: 'A', text: 'La ignoro. Su percepción no me define.', maskWeight: { silencio: 2, guerra: 0, honor: 1, supervivencia: 0 } },
        { id: 'B', text: 'La uso. Si piensan que soy peligroso/a, eso me da ventaja.', maskWeight: { silencio: 0, guerra: 3, honor: 0, supervivencia: 0 } },
        { id: 'C', text: 'Intento cambiarla. Quiero ser visto/a correctamente.', maskWeight: { silencio: 0, guerra: 0, honor: 2, supervivencia: 1 } },
        { id: 'D', text: 'Me duele aunque no lo muestre.', maskWeight: { silencio: 1, guerra: 0, honor: 0, supervivencia: 2 } },
      ],
    },
    {
      id: 'mask-q-3',
      questionNumber: 3,
      text: '¿Cuántas versiones de vos mismo/a existen según con quién estés?',
      options: [
        { id: 'A', text: 'Una sola. La consistencia es integridad.', maskWeight: { silencio: 0, guerra: 0, honor: 3, supervivencia: 0 } },
        { id: 'B', text: 'Varias, pero todas son reales. El contexto las activa.', maskWeight: { silencio: 1, guerra: 1, honor: 0, supervivencia: 1 } },
        { id: 'C', text: 'Muchas, y a veces no sé cuál es la "verdadera".', maskWeight: { silencio: 2, guerra: 0, honor: 0, supervivencia: 2 } },
        { id: 'D', text: 'La que necesito que sea en cada momento.', maskWeight: { silencio: 0, guerra: 2, honor: 0, supervivencia: 3 } },
      ],
    },
  ],
  results: [
    {
      id: 'silencio',
      name: 'Máscara del Silencio',
      description: 'Aprendiste que callar es una forma de sobrevivir. No porque no tengas nada que decir, sino porque sabés cuándo el momento no es el correcto. Tu silencio no es vacío: es estrategia. El problema es que a veces te quedás callado/a incluso cuando es seguro hablar.',
      unlockedDocumentIds: ['doc-09'],
      imageDescription: 'Máscara lisa sin boca, ojos apenas sugeridos',
      color: '#415A77',
    },
    {
      id: 'guerra',
      name: 'Máscara de Guerra',
      description: 'Convertiste tu diferencia en tu mayor amenaza. Antes de que el mundo te rechace, vos ya estás en posición de combate. Es efectivo. Es también agotador. La pregunta es: ¿podés bajar la guardia?',
      unlockedDocumentIds: ['doc-09'],
      imageDescription: 'Máscara con expresión feroz, marcas de combate',
      color: '#FF776B',
    },
    {
      id: 'honor',
      name: 'Máscara de Honor',
      description: 'Construiste tu identidad sobre principios que no negociás. Eso te da estabilidad. También puede convertirse en una jaula si los principios son los que otros eligieron por vos. ¿Son realmente tuyos o los heredaste sin revisarlos?',
      unlockedDocumentIds: ['doc-09'],
      imageDescription: 'Máscara ceremonial con grabados formales',
      color: '#ECB357',
    },
    {
      id: 'supervivencia',
      name: 'Máscara de Supervivencia',
      description: 'Sos lo que el momento necesita que seas. Esa flexibilidad salvó tu vida más de una vez. Pero hay un costo: en algún punto, la persona que sos "de verdad" puede empezar a sentirse borrosa. Esta máscara es la más pesada porque nunca podés quitártela del todo.',
      unlockedDocumentIds: ['doc-09'],
      imageDescription: 'Máscara fragmentada que se compone de piezas distintas',
      color: '#6B4C3B',
    },
  ],
};
