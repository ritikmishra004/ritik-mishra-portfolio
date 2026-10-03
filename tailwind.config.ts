import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { ink: '#08090b', panel: '#101216', line: '#24272c', muted: '#9ba1ab', signal: '#c6ff4d' },
      boxShadow: { panel: '0 18px 50px rgba(0,0,0,.22)' }
    }
  },
  plugins: []
};
export default config;
