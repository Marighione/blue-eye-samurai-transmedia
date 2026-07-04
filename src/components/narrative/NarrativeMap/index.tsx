'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { allTerritories } from '@/data';
import type { TerritoryId } from '@/types/territory';
import type { UserState } from '@/types/user';

interface NarrativeMapProps {
  visitedTerritories: UserState['visitedTerritories'];
}

export function NarrativeMap({ visitedTerritories }: NarrativeMapProps) {
  const router = useRouter();
  const [hoveredId, setHoveredId] = useState<TerritoryId | null>(null);

  const hovered = allTerritories.find((t) => t.id === hoveredId) ?? null;

  function handleClick(id: TerritoryId) {
    router.push(`/universo/territorio/${id}`);
  }

  return (
    <div className="relative w-full">
      <svg
        viewBox="0 0 800 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        aria-label="Mapa narrativo del universo"
        role="img"
      >
        <rect width="800" height="500" fill="rgba(13,27,42,0.6)" />

        {/* Zona norte / caminos */}
        <path
          d="M50 20 Q200 10 350 40 Q300 120 200 150 Q100 130 50 80 Z"
          fill="rgba(0,188,206,0.18)"
          stroke="rgba(0,188,206,0.25)"
          strokeWidth="0.8"
        />
        {/* Zona este / palacios */}
        <path
          d="M420 20 Q600 30 750 60 Q770 160 700 200 Q580 180 480 140 Q430 100 420 20 Z"
          fill="rgba(255,136,85,0.16)"
          stroke="rgba(255,136,85,0.22)"
          strokeWidth="0.8"
        />
        {/* Zona central / combate */}
        <path
          d="M280 200 Q400 170 520 200 Q540 310 460 360 Q360 380 280 340 Q240 290 280 200 Z"
          fill="rgba(255,119,107,0.15)"
          stroke="rgba(255,119,107,0.22)"
          strokeWidth="0.8"
        />
        {/* Zona oeste / ocultamiento */}
        <path
          d="M40 220 Q160 200 240 240 Q230 340 180 390 Q80 400 40 350 Z"
          fill="rgba(109,232,240,0.14)"
          stroke="rgba(109,232,240,0.2)"
          strokeWidth="0.8"
        />
        {/* Zona sur / espacios íntimos */}
        <path
          d="M500 340 Q640 310 750 360 Q760 450 680 480 Q560 490 500 460 Q490 400 500 340 Z"
          fill="rgba(236,179,87,0.14)"
          stroke="rgba(236,179,87,0.2)"
          strokeWidth="0.8"
        />

        {/* Líneas de camino */}
        <path d="M200 125 Q320 160 360 200" stroke="rgba(165,140,100,0.15)" strokeWidth="0.8" strokeDasharray="4 4" />
        <path d="M520 130 Q490 180 460 230" stroke="rgba(165,140,100,0.15)" strokeWidth="0.8" strokeDasharray="4 4" />
        <path d="M200 340 Q290 350 360 340" stroke="rgba(165,140,100,0.1)" strokeWidth="0.8" strokeDasharray="4 4" />
        <path d="M460 340 Q500 370 570 370" stroke="rgba(165,140,100,0.1)" strokeWidth="0.8" strokeDasharray="4 4" />

        {/* Puntos interactivos */}
        {allTerritories.map((territory) => {
          const cx = (territory.mapPosition.x / 100) * 800;
          const cy = (territory.mapPosition.y / 100) * 500;
          const isHovered = hoveredId === territory.id;
          const isVisited = visitedTerritories.includes(territory.id);

          return (
            <g
              key={territory.id}
              onClick={() => handleClick(territory.id)}
              onMouseEnter={() => setHoveredId(territory.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{ cursor: 'pointer' }}
            >
              {/* Área clickeable invisible más grande */}
              <circle cx={cx} cy={cy} r={30} fill="transparent" />
              {/* Halo de hover */}
              <motion.circle
                cx={cx} cy={cy}
                r={isHovered ? 28 : 0}
                fill={territory.dominantColor}
                opacity={0.12}
                animate={{ r: isHovered ? 28 : 0 }}
                transition={{ duration: 0.3 }}
              />
              {/* Punto principal */}
              <motion.circle
                cx={cx} cy={cy}
                r={isHovered ? 9 : 6}
                fill={isVisited ? territory.dominantColor : 'transparent'}
                stroke={territory.dominantColor}
                strokeWidth={isHovered ? 1.5 : 1}
                animate={{ r: isHovered ? 9 : 6 }}
                transition={{ duration: 0.25 }}
              />
              {/* Label */}
              <text
                x={cx} y={cy + 22}
                textAnchor="middle"
                fontSize="11"
                fill={isHovered ? territory.dominantColor : 'rgba(232,240,248,0.75)'}
                style={{ fontFamily: 'var(--font-cormorant)', transition: 'fill 0.3s', pointerEvents: 'none', userSelect: 'none' }}
              >
                {territory.name}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Tooltip posicionado cerca del punto */}
      <AnimatePresence>
        {hovered && (() => {
          const xPct = Math.min(Math.max(hovered.mapPosition.x, 15), 85);
          const yPct = hovered.mapPosition.y;

          return (
            <motion.div
              key={hovered.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="absolute z-10 pointer-events-none"
              style={{
                left: `${xPct}%`,
                top: `${yPct + 7}%`,
                transform: 'translate(-50%, 0)',
              }}
            >
              <div
                onClick={() => handleClick(hovered.id)}
                className="pointer-events-auto cursor-pointer px-6 py-4 bg-night/95 border border-white/15 hover:border-gold/30 transition-colors duration-300 min-w-56 text-center"
                style={{ borderTop: `2px solid ${hovered.dominantColor}` }}
              >
                <p className="font-ui text-sm font-semibold uppercase tracking-widest mb-1 text-snow">
                  {hovered.centralConflict}
                </p>
                <p className="font-display text-lg text-snow">{hovered.name}</p>
                <p className="font-narrative italic text-sm text-snow/90 mt-1">Click para explorar</p>
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
