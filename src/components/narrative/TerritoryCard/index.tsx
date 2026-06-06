'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { revealFromFog } from '@/lib/animations';
import type { Territory } from '@/types/territory';

interface TerritoryCardProps {
  territory: Territory;
  isVisited: boolean;
}

export function TerritoryCard({ territory, isVisited }: TerritoryCardProps) {
  return (
    <motion.div
      variants={revealFromFog}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
    >
      <Link
        href={`/universo/territorio/${territory.id}`}
        className="group block border-l-4 pl-6 py-5 pr-4 hover:pl-8 transition-all duration-400"
        style={{
          borderLeftColor: territory.dominantColor,
          backgroundColor: isVisited
            ? `${territory.dominantColor}08`
            : 'transparent',
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p
              className="font-ui text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color: territory.dominantColor, opacity: 0.7 }}
            >
              {territory.centralConflict}
            </p>
            <h3 className="font-display text-xl font-normal text-snow tracking-wide mb-2 group-hover:text-snow transition-colors">
              {territory.name}
            </h3>
            <p className="font-narrative italic text-snow/70 text-sm leading-relaxed max-w-xs">
              {territory.symbol}
            </p>
          </div>

          <div className="flex-shrink-0 mt-1">
            {isVisited ? (
              <span
                className="font-ui text-xs uppercase tracking-widest"
                style={{ color: territory.dominantColor, opacity: 0.6 }}
              >
                Visitado
              </span>
            ) : (
              <span className="font-ui text-xs text-snow/50 uppercase tracking-widest group-hover:text-snow/80 transition-colors duration-300">
                Explorar →
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
