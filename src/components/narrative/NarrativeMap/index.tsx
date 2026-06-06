'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { allTerritories } from '@/data';
import type { TerritoryId } from '@/types/territory';
import type { UserState } from '@/types/user';

interface NarrativeMapProps {
  visitedTerritories: UserState['visitedTerritories'];
}

export function NarrativeMap({ visitedTerritories }: NarrativeMapProps) {
  const [hoveredId, setHoveredId] = useState<TerritoryId | null>(null);

  const hovered = allTerritories.find((t) => t.id === hoveredId) ?? null;

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
        {/* Fondo del mapa — abstracción estilizada del Japón */}
        <rect width="800" height="500" fill="rgba(13,27,42,0.6)" />

        {/* Regiones de color plano — zonas narrativas */}
        {/* Zona norte / caminos */}
        <path
          d="M50 20 Q200 10 350 40 Q300 120 200 150 Q100 130 50 80 Z"
          fill="rgba(74,144,196,0.08)"
          stroke="rgba(74,144,196,0.12)"
          strokeWidth="0.5"
        />
        {/* Zona este / palacios */}
        <path
          d="M420 20 Q600 30 750 60 Q770 160 700 200 Q580 180 480 140 Q430 100 420 20 Z"
          fill="rgba(197,138,42,0.07)"
          stroke="rgba(197,138,42,0.1)"
          strokeWidth="0.5"
        />
        {/* Zona central / combate */}
        <path
          d="M280 200 Q400 170 520 200 Q540 310 460 360 Q360 380 280 340 Q240 290 280 200 Z"
          fill="rgba(139,26,26,0.07)"
          stroke="rgba(139,26,26,0.1)"
          strokeWidth="0.5"
        />
        {/* Zona oeste / ocultamiento */}
        <path
          d="M40 220 Q160 200 240 240 Q230 340 180 390 Q80 400 40 350 Z"
          fill="rgba(65,90,119,0.08)"
          stroke="rgba(65,90,119,0.1)"
          strokeWidth="0.5"
        />
        {/* Zona sur / espacios íntimos */}
        <path
          d="M500 340 Q640 310 750 360 Q760 450 680 480 Q560 490 500 460 Q490 400 500 340 Z"
          fill="rgba(197,138,42,0.06)"
          stroke="rgba(197,138,42,0.08)"
          strokeWidth="0.5"
        />

        {/* Líneas de camino — rutas entre territorios */}
        <path
          d="M200 125 Q320 160 360 200"
          stroke="rgba(165,140,100,0.15)"
          strokeWidth="0.8"
          strokeDasharray="4 4"
        />
        <path
          d="M520 130 Q490 180 460 230"
          stroke="rgba(165,140,100,0.15)"
          strokeWidth="0.8"
          strokeDasharray="4 4"
        />
        <path
          d="M200 340 Q290 350 360 340"
          stroke="rgba(165,140,100,0.1)"
          strokeWidth="0.8"
          strokeDasharray="4 4"
        />
        <path
          d="M460 340 Q500 370 570 370"
          stroke="rgba(165,140,100,0.1)"
          strokeWidth="0.8"
          strokeDasharray="4 4"
        />

        {/* Puntos interactivos de territorios */}
        {allTerritories.map((territory) => {
          const cx = (territory.mapPosition.x / 100) * 800;
          const cy = (territory.mapPosition.y / 100) * 500;
          const isHovered = hoveredId === territory.id;
          const isVisited = visitedTerritories.includes(territory.id);

          return (
            <g key={territory.id}>
              {/* Halo de hover */}
              <motion.circle
                cx={cx}
                cy={cy}
                r={isHovered ? 28 : 0}
                fill={territory.dominantColor}
                opacity={0.08}
                animate={{ r: isHovered ? 28 : 0 }}
                transition={{ duration: 0.3 }}
              />
              {/* Punto principal */}
              <motion.circle
                cx={cx}
                cy={cy}
                r={isHovered ? 9 : 6}
                fill={isVisited ? territory.dominantColor : 'transparent'}
                stroke={territory.dominantColor}
                strokeWidth={isHovered ? 1.5 : 1}
                animate={{ r: isHovered ? 9 : 6 }}
                transition={{ duration: 0.25 }}
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHoveredId(territory.id)}
                onMouseLeave={() => setHoveredId(null)}
              />
              {/* Label del territorio */}
              <text
                x={cx}
                y={cy + 20}
                textAnchor="middle"
                className="font-ui"
                fontSize="8"
                fill={isHovered ? territory.dominantColor : 'rgba(232,240,248,0.6)'}
                style={{ fontFamily: 'var(--font-cormorant)', transition: 'fill 0.3s', pointerEvents: 'none', userSelect: 'none' }}
              >
                {territory.name.split(' ').slice(1).join(' ')}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Tooltip flotante */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none z-10"
          >
            <Link
              href={`/universo/territorio/${hovered.id}`}
              className="pointer-events-auto block px-6 py-4 bg-night border border-white/10 hover:border-gold/30 transition-colors duration-300 min-w-64 text-center"
              style={{ borderTop: `2px solid ${hovered.dominantColor}` }}
            >
              <p
                className="font-ui text-xs font-semibold uppercase tracking-widest mb-1"
                style={{ color: hovered.dominantColor }}
              >
                {hovered.centralConflict}
              </p>
              <p className="font-display text-base text-snow">{hovered.name}</p>
              <p className="font-narrative italic text-xs text-snow/70 mt-1">Click para explorar</p>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
