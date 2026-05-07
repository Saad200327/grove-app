import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        grove: {
          bg: '#0A0A0A',
          surface: '#111111',
          card: '#161616',
          gold: '#C9A84C',
          'gold-dim': '#8A6E2F',
          text: '#F0EDE6',
          muted: '#888888',
          border: 'rgba(255,255,255,0.07)',
          green: '#22C55E',
          red: '#EF4444',
          blue: '#3B82F6',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        serif: ['DM Serif Display', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        grove: '10px',
      },
    },
  },
  plugins: [],
}
export default config
