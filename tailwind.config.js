/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // surfaces
        primary: '#F7F4EF',
        secondary: '#EDE9E0',
        tertiary: '#E4DFD5',
        'surface-card': '#FFFFFF',
        // ink
        ink: '#1A1A18',
        'ink-secondary': '#4A4A46',
        'ink-muted': '#909088',
        // borders
        border: '#E0DCD4',
        'border-strong': '#CCC8C0',
        // accent
        accent: '#FFDA1A',
        'accent-dark': '#1A1A18',
        // pastel tiles (background + paired ink)
        tile: {
          blue: '#D2E8F5',
          'blue-ink': '#1A3E5A',
          green: '#D2EDDA',
          'green-ink': '#1A4828',
          amber: '#FFE8C0',
          'amber-ink': '#5C3800',
          rose: '#F5D2D2',
          'rose-ink': '#5C1A1A',
          lavender: '#E2D5F0',
          'lavender-ink': '#3A1A5C',
          yellow: '#FFF5CC',
          'yellow-ink': '#4A3C00',
        },
      },
      fontFamily: {
        sans: ['"ABC Diatype Variable"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
