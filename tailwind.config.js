/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // Inclua classes usadas em arquivos JavaScript/TypeScript
    './public/index.html', // Inclua classes usadas em seu arquivo HTML
  ],
  theme: {
    extend: {
      colors: {
        white: '#fefefe',
        beige: '#dcdcba',
        black: '#171717',
        orange: {
          '50': '#fff7ed',
          '100': '#ffedd5',
          '200': '#fedba0',
          '300': '#fec56a',
          '400': '#f19234', // Laranja Padrão
          '500': '#e1761c', // Laranja Forte
          '600': '#e9762d',
          '700': '#d65e27',
          '800': '#bf4821',
          '900': '#9b3a1c',
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
}

