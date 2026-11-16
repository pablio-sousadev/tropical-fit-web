import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: {
            DEFAULT: '#FF6B00',
            hover: '#E05E00',
            light: '#FFF4ED',
          },
          dark: {
            DEFAULT: '#0A0A0A',
            card: '#141414',
            border: '#262626',
          },
          yellow: '#FBBF24',
        },
        card: '#141414',
        border: '#262626',
      },
    },
  },
  plugins: [],
};

export default config;
