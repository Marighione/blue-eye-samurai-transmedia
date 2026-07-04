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
        'blood': '#FF776B',
        'blood-bright': '#FF776B',
        'sepia': '#6B4C3B',
        // Lenguaje 2 — Azul Frío + Niebla
        'night': '#0D1B2A',
        'deep-blue': '#1B263B',
        'slate-blue': '#415A77',
        'mist': '#00BCCE',
        'mist-light': '#6DE8F0',
        'snow': '#E8F0F8',
        'eye-blue': '#00BCCE',
        // Lenguaje 3 — Dorado + Fuego
        'gold': '#ECB357',
        'gold-bright': '#FFCD7C',
        'wood': '#7A4A15',
        'fire': '#FF8855',
        'ember': '#8B3A0A',
        'lacquer': '#FF776B',
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
          '0%, 100%': { borderColor: 'rgba(236, 179, 87, 0.5)' },
          '50%': { borderColor: 'rgba(236, 179, 87, 1)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
