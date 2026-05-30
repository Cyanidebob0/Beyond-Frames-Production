/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0a0b0c',
        panel: '#0b1416',
        teal: { 900: '#0c2a30', 950: '#10171a' },
        amber: { DEFAULT: '#eaa64e', soft: '#f0bd78' },
        bone: '#eef1f0',
        mute: '#9fa9ab',
        line: '#1b2224',
      },
      fontFamily: {
        display: ['Anton', 'Oswald', 'Arial Narrow', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: { ui: '0.25em' },
    },
  },
  plugins: [],
};
