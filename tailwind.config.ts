import { palettes } from './src/papak/configs/palettes';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{tsx,css}',
    './papak/**/*.{tsx,css}',
  ],
  darkMode: ['class'],
  theme: {
    container: {
      center: true,
    },
    colors: {
      ...palettes,
    },
  },
  important: true,

  plugins: [],
};
export default config;
