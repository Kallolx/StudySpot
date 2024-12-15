/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
      },
      colors: {
        background: '#F8FAFC',
        primary: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
        },
        accent: {
          50: '#FFF7ED',
          100: '#FFE4C4',
          200: '#FFD700',
          500: '#F59E0B',
        }
      }
    },
  },
  plugins: [],
};
