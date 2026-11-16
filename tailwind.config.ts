import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: [
          'var(--font-condensed)',
          'Impact',
          'Arial Narrow',
          'sans-serif',
        ],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          orange: {
            DEFAULT: '#FF6B00',
            hover: '#FF5500',
            light: '#FFF4ED',
          },
          dark: {
            DEFAULT: '#0C0A09',
            card: '#141210',
            surface: '#1C1815',
            elevated: '#1C1815',
            border: '#2D2622',
          },
          yellow: '#FBBF24',
        },
        card: '#141210',
        surface: '#1C1815',
        border: '#2D2622',
      },
      boxShadow: {
        'orange-glow': '0 0 36px -6px rgba(255, 107, 0, 0.42)',
        'orange-glow-sm': '0 0 20px -4px rgba(255, 107, 0, 0.32)',
        tactile:
          'inset 0 1px 0 0 rgba(255, 255, 255, 0.22), 0 10px 24px -6px rgba(255, 85, 0, 0.45)',
      },
      backgroundImage: {
        'arena-spot':
          'radial-gradient(circle at 80% 15%, rgba(255, 107, 0, 0.22), rgba(255, 85, 0, 0.06) 38%, transparent 65%)',
        'amber-spot':
          'radial-gradient(circle at 20% 85%, rgba(251, 191, 36, 0.12), transparent 55%)',
      },
    },
  },
  plugins: [],
};

export default config;
