/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'ikea-blue': '#0058A3',
        'ikea-yellow': '#FFDB00',
        'ikea-bg': '#F7F4EF',
        'ikea-text': '#111111',
        'ikea-border': '#E0E0E0',
        'ikea-green': '#0A8A4A',
        'ikea-ink': '#1A1A1A',
        'pastel-blue': '#D6E8F5',
        'pastel-rose': '#F5D6E0',
        'pastel-lavender': '#E8D6F5',
        'pastel-green': '#D6F0E3',
        'pastel-amber': '#F5EAD0',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
};
