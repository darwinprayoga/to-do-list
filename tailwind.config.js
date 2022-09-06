/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: 'Poppins'
      },
      colors: {
        smoke: '#F4F4F4',
        hint: '#A4A4A4',
        blue: {
          600: '#16ABF8'
        },
        red: {
          500: '#ED4C5C'
        }
      }
    },
  },
  plugins: [],
}