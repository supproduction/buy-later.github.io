/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Calming teal accent — wellness / finance feel, not marketplace red.
        brand: {
          50: '#eefbf7',
          100: '#d5f5ec',
          200: '#aeead9',
          300: '#79d8c1',
          400: '#43bfa3',
          500: '#1fa489',
          600: '#138370',
          700: '#13695b',
          800: '#14544a',
          900: '#14463e',
        },
        ink: {
          50: '#f6f7f9',
          100: '#eceef2',
          200: '#d5dae2',
          300: '#b0bac8',
          400: '#8493a8',
          500: '#64748b',
          600: '#4f5d72',
          700: '#414c5e',
          800: '#39414f',
          900: '#1f2530',
        },
      },
      fontFamily: {
        sans: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(16, 24, 40, 0.04), 0 4px 16px rgba(16, 24, 40, 0.06)',
      },
    },
  },
  plugins: [],
};
