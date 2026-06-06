import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Lenguaje 1 — Tinta + Papel
        'paper': '#F5F0E8',
        'paper-dark': '#E8E0D0',
        'ink': '#1A1614',
        'ink-faded': '#4A3F38',
        'blood': '#8B1A1A',
        'blood-bright': '#C41E1E',
        'sepia': '#6B4C3B',
        // Lenguaje 2 — Azul Frío + Niebla
        'night': '#0D1B2A',
        'deep-blue': '#1B263B',
        'slate-blue': '#415A77',
        'mist': '#6FA8DC',
        'mist-light': '#A8C8E8',
        'snow': '#E8F0F8',
        'eye-blue': '#4A90C4',
        // Lenguaje 3 — Dorado + Fuego
        'gold': '#C58A2A',
        'gold-bright': '#E8B14B',
        'wood': '#7A4A15',
        'fire': '#D4520A',
        'ember': '#8B3A0A',
        'lacquer': '#8B0000',
      },
      fontFamily: {
        'display': ['var(--font-cinzel)', 'serif'],
        'narrative': ['var(--font-eb-garamond)', 'serif'],
        'ui': ['var(--font-cormorant)', 'serif'],
      },
      maxWidth: {
        'narrative': '640px',
        'content': '800px',
        'wide': '1000px',
        'site': '1400px',
      },
      animation: {
        'pulse-gold': 'pulseGold 1.5s ease-in-out 3',
      },
      keyframes: {
        pulseGold: {
          '0%, 100%': { borderColor: 'rgba(197, 138, 42, 0.5)' },
          '50%': { borderColor: 'rgba(232, 177, 75, 1)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
