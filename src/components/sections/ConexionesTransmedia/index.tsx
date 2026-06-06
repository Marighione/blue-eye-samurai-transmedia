'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, revealFromFog } from '@/lib/animations';
import { Divider } from '@/components/primitives/Divider';
import { Button } from '@/components/primitives/Button';

const ECOSYSTEM_NODES = [
  { id: 'web', label: 'Plataforma Web', x: 50, y: 50, color: '#4A90C4', size: 48 },
  { id: 'tiktok', label: 'TikTok', x: 15, y: 25, color: '#E8B14B', size: 36 },
  { id: 'spotify', label: 'Spotify', x: 85, y: 25, color: '#C58A2A', size: 36 },
  { id: 'rv', label: 'Realidad Virtual', x: 50, y: 10, color: '#8B1A1A', size: 36 },
] as const;

const CONNECTIONS = [
  { from: 'web', to: 'tiktok' },
  { from: 'web', to: 'spotify' },
  { from: 'web', to: 'rv' },
] as const;

export function ConexionesTransmediaPage() {
  const [spotifyLoaded, setSpotifyLoaded] = useState(false);

  return (
    <div className="min-h-screen bg-night">
      {/* Header */}
      <div className="pt-32 pb-16 px-8 md:px-20">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <motion.p
            variants={revealFromFog}
            className="font-ui text-xs font-semibold uppercase tracking-widest text-mist mb-4"
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
            className="font-narrative italic text-snow/70 text-lg max-w-xl leading-relaxed"
          >
            El universo de Blue Eye Samurai no vive en un solo lugar. Se despliega en plataformas que se complementan, cada una explorando una dimensión distinta de la misma historia.
          </motion.p>
        </motion.div>
      </div>

      <Divider variant="sword" className="mx-8 md:mx-20 opacity-20" />

      {/* Diagrama del ecosistema */}
      <div className="px-8 md:px-20 py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={revealFromFog}
        >
          <h2 className="font-display text-2xl md:text-3xl text-snow tracking-wide mb-12 text-center">
            El ecosistema completo
          </h2>

          <div className="max-w-3xl mx-auto">
            <svg viewBox="0 0 100 60" className="w-full h-auto" aria-label="Diagrama del ecosistema transmedia">
              {/* Connections */}
              {CONNECTIONS.map((conn) => {
                const from = ECOSYSTEM_NODES.find((n) => n.id === conn.from)!;
                const to = ECOSYSTEM_NODES.find((n) => n.id === conn.to)!;
                return (
                  <motion.line
                    key={`${conn.from}-${conn.to}`}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke="rgba(165, 140, 100, 0.2)"
                    strokeWidth="0.3"
                    strokeDasharray="1 1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                );
              })}

              {/* Nodes */}
              {ECOSYSTEM_NODES.map((node, i) => (
                <motion.g
                  key={node.id}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
                >
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.size / 10}
                    fill="none"
                    stroke={node.color}
                    strokeWidth="0.3"
                    opacity="0.6"
                  />
                  <circle cx={node.x} cy={node.y} r="1" fill={node.color} opacity="0.8" />
                  <text
                    x={node.x}
                    y={node.y + (node.id === 'rv' ? -6 : 7)}
                    textAnchor="middle"
                    fill={node.color}
                    fontSize="2.5"
                    fontFamily="'Cormorant Garamond', serif"
                    opacity="0.7"
                  >
                    {node.label}
                  </text>
                </motion.g>
              ))}
            </svg>
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
            <motion.p
              variants={revealFromFog}
              className="font-ui text-xs font-semibold uppercase tracking-widest text-gold/60 mb-4"
            >
              Plataforma 1
            </motion.p>
            <motion.h3
              variants={revealFromFog}
              className="font-display text-3xl text-snow tracking-wide mb-6"
            >
              TikTok
            </motion.h3>
            <motion.p
              variants={revealFromFog}
              className="font-narrative text-snow/75 leading-relaxed mb-4"
            >
              Contenido breve que amplía el universo. Fragmentos de los diarios de los personajes,
              datos históricos del período Edo presentados de forma visual, y escenas reimaginadas
              desde perspectivas que la serie no muestra.
            </motion.p>
            <motion.p
              variants={revealFromFog}
              className="font-narrative text-snow/75 leading-relaxed mb-6"
            >
              Cada video funciona de forma autónoma pero conecta con la plataforma web:
              los hashtags llevan a explorar más, y algunos videos contienen pistas para
              desbloquear contenido en el archivo.
            </motion.p>
            <motion.div variants={revealFromFog}>
              <p className="font-ui text-xs text-mist/70 uppercase tracking-widest mb-6">
                #BlueEyeSamurai #ArchivoSecreto #PeriodoEdo
              </p>
              <a
                href="https://www.tiktok.com/tag/blueeyesamurai"
                target="_blank"
                rel="noopener noreferrer"
                className="font-ui text-xs font-semibold uppercase tracking-widest text-gold/70 hover:text-gold transition-colors duration-300"
              >
                Ver en TikTok →
              </a>
            </motion.div>
          </div>

          <motion.div
            variants={revealFromFog}
            className="border border-white/10 bg-deep-blue/20 p-12 flex items-center justify-center min-h-[300px]"
          >
            <div className="text-center">
              <p className="font-display text-4xl text-mist/50 mb-4">短</p>
              <p className="font-ui text-xs text-mist/60 uppercase tracking-widest">
                Contenido breve · Expansión narrativa
              </p>
            </div>
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
            {!spotifyLoaded ? (
              <div className="border border-white/10 bg-deep-blue/20 p-12 flex flex-col items-center justify-center min-h-[352px]">
                <p className="font-display text-4xl text-gold/50 mb-6">♪</p>
                <p className="font-narrative italic text-snow/60 mb-8 text-center">
                  Click para cargar el podcast
                </p>
                <Button variant="ghost" size="sm" onClick={() => setSpotifyLoaded(true)}>
                  Escuchar
                </Button>
              </div>
            ) : (
              <iframe
                src="https://open.spotify.com/embed/show/placeholder?utm_source=generator&theme=0"
                width="100%"
                height="352"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="border-0 opacity-80"
                title="Podcast Blue Eye Samurai en Spotify"
              />
            )}
          </motion.div>

          <div className="order-1 md:order-2">
            <motion.p
              variants={revealFromFog}
              className="font-ui text-xs font-semibold uppercase tracking-widest text-gold/60 mb-4"
            >
              Plataforma 2
            </motion.p>
            <motion.h3
              variants={revealFromFog}
              className="font-display text-3xl text-snow tracking-wide mb-6"
            >
              Spotify
            </motion.h3>
            <motion.p
              variants={revealFromFog}
              className="font-narrative text-snow/75 leading-relaxed mb-4"
            >
              Un podcast narrativo que profundiza en las capas del universo. Episodios que
              exploran la historia real del período Edo, las motivaciones de los personajes,
              y los dilemas morales que la serie plantea.
            </motion.p>
            <motion.p
              variants={revealFromFog}
              className="font-narrative text-snow/75 leading-relaxed mb-6"
            >
              Cada episodio es una pieza del rompecabezas narrativo. No requiere haber visto
              la serie, pero revela dimensiones invisibles para quien sí la vio.
            </motion.p>
            <motion.div variants={revealFromFog}>
              <a
                href="https://open.spotify.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-ui text-xs font-semibold uppercase tracking-widest text-gold/70 hover:text-gold transition-colors duration-300"
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
          className="text-center max-w-2xl mx-auto"
        >
          <motion.p
            variants={revealFromFog}
            className="font-ui text-xs font-semibold uppercase tracking-widest text-gold/60 mb-4"
          >
            Plataforma 3
          </motion.p>
          <motion.h3
            variants={revealFromFog}
            className="font-display text-3xl md:text-4xl text-snow tracking-wide mb-6"
          >
            Realidad Virtual
          </motion.h3>
          <motion.p
            variants={revealFromFog}
            className="font-narrative text-snow/75 leading-relaxed mb-4"
          >
            La culminación del ecosistema. Tres recorridos inmersivos que te colocan dentro
            del universo: caminás por los territorios, enfrentás los dilemas, y descubrís
            qué decisiones tomás cuando la distancia de la pantalla desaparece.
          </motion.p>
          <motion.p
            variants={revealFromFog}
            className="font-narrative italic text-snow/60 leading-relaxed mb-10"
          >
            El recorrido recomendado se personaliza según tu perfil del Quiz Moral.
          </motion.p>
          <motion.div variants={revealFromFog}>
            <Button variant="primary" href="/realidad-virtual">
              Entrar en persona
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
