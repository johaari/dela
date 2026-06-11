/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'ikea-blue': '#0058A3',
        'ikea-yellow': '#FFDB00',
        'ikea-bg': '#F5F5F5',
        'ikea-text': '#111111',
        'ikea-border': '#E0E0E0',
        'ikea-green': '#0A8A4A',
      },
      fontFamily: {
        sans: ['"Noto Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
