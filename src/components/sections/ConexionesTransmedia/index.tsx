'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { staggerContainer, revealFromFog } from '@/lib/animations';
import { Divider } from '@/components/primitives/Divider';

const JOURNEY_STEPS = [
  { number: 1, platform: 'Netflix', color: '#C41E1E' },
  { number: 2, platform: 'Web', color: '#00BCCE' },
  { number: 3, platform: 'TikTok', color: '#ECB357' },
  { number: 4, platform: 'Spotify', color: '#1DB954' },
  { number: 5, platform: 'Realidad Virtual', color: '#FF8855' },
  { number: 6, platform: 'Regreso al Ecosistema', color: '#C58A2A' },
] as const;

const NODE_POSITIONS = [
  { x: 15, y: 20 },
  { x: 40, y: 14 },
  { x: 65, y: 20 },
  { x: 90, y: 14 },
  { x: 105, y: 28 },
  { x: 80, y: 40 },
] as const;

export function ConexionesTransmediaPage() {
  return (
    <div className="min-h-screen texture-dark">
      {/* Hero con imagen */}
      <div className="relative w-full h-[70vh] min-h-[500px]">
        <Image
          src="/images/conexiones.jpeg"
          alt="Conexiones Transmedia"
          fill
          className="object-cover"
          style={{ objectPosition: '50% 30%' }}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/60 to-night/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-night/60 via-transparent to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-20 pb-20">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.p
              variants={revealFromFog}
              className="font-ui text-sm font-semibold uppercase tracking-widest text-snow mb-4"
            >
              Ecosistema transmedia
            </motion.p>
            <motion.h1
              variants={revealFromFog}
              className="font-display text-5xl md:text-6xl font-semibold text-snow tracking-wide mb-4"
            >
              Conexiones
            </motion.h1>
            <motion.p
              variants={revealFromFog}
              className="font-narrative italic text-snow/90 text-lg max-w-xl leading-relaxed"
            >
              El universo de Blue Eye Samurai no vive en un solo lugar. Se despliega en plataformas que se complementan, cada una explorando una dimensión distinta de la misma historia.
            </motion.p>
          </motion.div>
        </div>
      </div>

      <div className="relative section-fade-top" />

      <Divider variant="sword" className="mx-8 md:mx-20 opacity-20" />

      {/* Recorrido del Usuario */}
      <div className="px-8 md:px-20 py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={revealFromFog}
        >
          <h2 className="font-display text-2xl md:text-3xl text-snow tracking-wide mb-12 text-center">
            Recorrido del Usuario
          </h2>

          <div className="max-w-4xl mx-auto">
            <svg viewBox="0 0 120 55" className="w-full h-auto" aria-label="Recorrido del usuario transmedia">
              {/* Líneas de conexión */}
              {JOURNEY_STEPS.slice(0, -1).map((step, i) => {
                const fromX = NODE_POSITIONS[i].x;
                const fromY = NODE_POSITIONS[i].y;
                const toX = NODE_POSITIONS[i + 1].x;
                const toY = NODE_POSITIONS[i + 1].y;
                return (
                  <motion.line
                    key={`line-${i}`}
                    x1={fromX}
                    y1={fromY}
                    x2={toX}
                    y2={toY}
                    stroke="rgba(165, 140, 100, 0.25)"
                    strokeWidth="0.3"
                    strokeDasharray="1 1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.3 + i * 0.15 }}
                  />
                );
              })}

              {/* Nodos */}
              {JOURNEY_STEPS.map((step, i) => {
                const pos = NODE_POSITIONS[i];
                return (
                  <motion.g
                    key={step.number}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.18, duration: 0.6 }}
                  >
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="4.5"
                      fill="none"
                      stroke={step.color}
                      strokeWidth="0.3"
                      opacity="0.5"
                    />
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="1.2"
                      fill={step.color}
                      opacity="0.8"
                    />
                    <text
                      x={pos.x}
                      y={pos.y - 7}
                      textAnchor="middle"
                      fill={step.color}
                      fontSize="3.5"
                      fontFamily="'Cinzel', serif"
                      fontWeight="bold"
                      opacity="0.9"
                    >
                      {step.number}
                    </text>
                    <text
                      x={pos.x}
                      y={pos.y + 8}
                      textAnchor="middle"
                      fill={step.color}
                      fontSize="2.5"
                      fontFamily="'Cormorant Garamond', serif"
                      opacity="0.7"
                    >
                      {step.platform}
                    </text>
                  </motion.g>
                );
              })}
            </svg>
          </div>
        </motion.div>
      </div>

      <Divider variant="sword" className="mx-8 md:mx-20 opacity-20" />

      {/* Netflix */}
      <div className="px-8 md:px-20 py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start"
        >
          <motion.div variants={revealFromFog} className="order-2 md:order-1">
            <div className="block relative overflow-hidden border border-white/10">
              <div className="relative w-full aspect-video">
                <Image
                  src="/images/NETFLIX.png"
                  alt="Netflix — Blue Eye Samurai"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-night/20" />
              </div>
              <div className="p-4" style={{ backgroundColor: 'rgba(27, 38, 59, 0.8)' }}>
                <p className="font-ui text-sm text-mist uppercase tracking-widest">
                  Serie original · Punto de partida
                </p>
              </div>
            </div>
          </motion.div>

          <div className="order-1 md:order-2">
            <motion.h3
              variants={revealFromFog}
              className="font-display text-3xl text-snow tracking-wide mb-6"
            >
              Netflix
            </motion.h3>
            <motion.p
              variants={revealFromFog}
              className="font-narrative text-snow/85 leading-relaxed mb-4"
            >
              El punto de partida. La serie original que abre la puerta al universo de Blue Eye
              Samurai. Dos temporadas que presentan a los personajes, los conflictos y el mundo
              del Japón del período Edo.
            </motion.p>
            <motion.p
              variants={revealFromFog}
              className="font-narrative text-snow/85 leading-relaxed mb-6"
            >
              Todo comienza acá: la historia de Mizu, su búsqueda de venganza, y las máscaras
              que cada personaje elige usar para sobrevivir.
            </motion.p>
            <motion.div variants={revealFromFog}>
              <a
                href="https://www.netflix.com/title/81144203"
                target="_blank"
                rel="noopener noreferrer"
                className="font-ui text-sm font-semibold uppercase tracking-widest text-snow hover:text-gold transition-colors duration-300"
              >
                Ver en Netflix →
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <Divider variant="sword" className="mx-8 md:mx-20 opacity-20" />

      {/* TikTok */}
      <div className="px-8 md:px-20 py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start"
        >
          <div>
            <motion.h3
              variants={revealFromFog}
              className="font-display text-3xl text-snow tracking-wide mb-6"
            >
              TikTok
            </motion.h3>
            <motion.p
              variants={revealFromFog}
              className="font-narrative text-snow/85 leading-relaxed mb-4"
            >
              Contenido breve que amplía el universo. Fragmentos de los diarios de los personajes,
              datos históricos del período Edo presentados de forma visual, y escenas reimaginadas
              desde perspectivas que la serie no muestra.
            </motion.p>
            <motion.p
              variants={revealFromFog}
              className="font-narrative text-snow/85 leading-relaxed mb-6"
            >
              Cada video funciona de forma autónoma pero conecta con la plataforma web:
              los hashtags llevan a explorar más, y algunos videos contienen pistas para
              desbloquear contenido en el archivo.
            </motion.p>
            <motion.div variants={revealFromFog}>
              <p className="font-ui text-sm text-mist uppercase tracking-widest mb-6">
                #BlueEyeSamurai #ArchivoSecreto #PeriodoEdo
              </p>
              <a
                href="https://www.tiktok.com/@deboragimenez108/video/7636823774142139666?_r=1&_t=ZS-97b5LLLu2Df"
                target="_blank"
                rel="noopener noreferrer"
                className="font-ui text-sm font-semibold uppercase tracking-widest text-snow hover:text-gold transition-colors duration-300"
              >
                Ver en TikTok →
              </a>
            </motion.div>
          </div>

          <motion.div variants={revealFromFog}>
            <a
              href="https://www.tiktok.com/@deboragimenez108/video/7636823774142139666?_r=1&_t=ZS-97b5LLLu2Df"
              target="_blank"
              rel="noopener noreferrer"
              className="block relative overflow-hidden border border-white/10 group"
            >
              <div className="relative w-full aspect-video">
                <Image
                  src="/images/tiktok.png"
                  alt="TikTok — Blue Eye Samurai"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-night/20 group-hover:bg-night/10 transition-colors duration-500" />
              </div>
              <div className="p-4" style={{ backgroundColor: 'rgba(27, 38, 59, 0.8)' }}>
                <p className="font-ui text-sm text-mist uppercase tracking-widest">
                  Contenido breve · Expansión narrativa
                </p>
              </div>
            </a>
          </motion.div>
        </motion.div>
      </div>

      <Divider variant="sword" className="mx-8 md:mx-20 opacity-20" />

      {/* Spotify */}
      <div className="px-8 md:px-20 py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start"
        >
          <motion.div variants={revealFromFog} className="order-2 md:order-1">
            <a
              href="https://open.spotify.com/episode/0Z8AhL35wMZjlFKY4lL1NA?si=f907bb55a0f74290"
              target="_blank"
              rel="noopener noreferrer"
              className="block relative overflow-hidden border border-white/10 group"
            >
              <div className="relative w-full aspect-video">
                <Image
                  src="/images/spotify.png"
                  alt="Spotify — Blue Eye Samurai Podcast"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-night/20 group-hover:bg-night/10 transition-colors duration-500" />
              </div>
              <div className="p-4" style={{ backgroundColor: 'rgba(27, 38, 59, 0.8)' }}>
                <p className="font-ui text-sm text-mist uppercase tracking-widest">
                  Podcast narrativo · Inmersión sonora
                </p>
              </div>
            </a>
          </motion.div>

          <div className="order-1 md:order-2">
            <motion.h3
              variants={revealFromFog}
              className="font-display text-3xl text-snow tracking-wide mb-6"
            >
              Spotify
            </motion.h3>
            <motion.p
              variants={revealFromFog}
              className="font-narrative text-snow/85 leading-relaxed mb-4"
            >
              Un podcast narrativo que profundiza en las capas del universo. Episodios que
              exploran la historia real del período Edo, las motivaciones de los personajes,
              y los dilemas morales que la serie plantea.
            </motion.p>
            <motion.p
              variants={revealFromFog}
              className="font-narrative text-snow/85 leading-relaxed mb-6"
            >
              Cada episodio es una pieza del rompecabezas narrativo. No requiere haber visto
              la serie, pero revela dimensiones invisibles para quien sí la vio.
            </motion.p>
            <motion.div variants={revealFromFog}>
              <a
                href="https://open.spotify.com/episode/0Z8AhL35wMZjlFKY4lL1NA?si=f907bb55a0f74290"
                target="_blank"
                rel="noopener noreferrer"
                className="font-ui text-sm font-semibold uppercase tracking-widest text-snow hover:text-gold transition-colors duration-300"
              >
                Escuchar en Spotify →
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <Divider variant="sword" className="mx-8 md:mx-20 opacity-20" />

      {/* RV */}
      <div className="px-8 md:px-20 py-16 pb-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start"
        >
          <div>
            <motion.h3
              variants={revealFromFog}
              className="font-display text-3xl text-snow tracking-wide mb-6"
            >
              Realidad Virtual
            </motion.h3>
            <motion.p
              variants={revealFromFog}
              className="font-narrative text-snow/85 leading-relaxed mb-4"
            >
              La culminación del ecosistema. Tres recorridos inmersivos que te colocan dentro
              del universo: caminás por los territorios, enfrentás los dilemas, y descubrís
              qué decisiones tomás cuando la distancia de la pantalla desaparece.
            </motion.p>
            <motion.div variants={revealFromFog} className="mt-6">
              <a
                href="/realidad-virtual"
                className="font-ui text-sm font-semibold uppercase tracking-widest text-snow hover:text-gold transition-colors duration-300"
              >
                Reservá tu experiencia →
              </a>
            </motion.div>
          </div>

          <motion.div variants={revealFromFog}>
            <div className="block relative overflow-hidden border border-white/10">
              <div className="relative w-full aspect-video">
                <Image
                  src="/images/RV-transmedia.png"
                  alt="Realidad Virtual — Blue Eye Samurai"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-night/20" />
              </div>
              <div className="p-4" style={{ backgroundColor: 'rgba(27, 38, 59, 0.8)' }}>
                <p className="font-ui text-sm text-mist uppercase tracking-widest">
                  Experiencia inmersiva · Tres recorridos
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
