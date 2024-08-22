/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        azul: "#1B80BF",
        naranja: "#F28627",
        carne: "#F2AB6D",
        rojasio: "#F2522E",
        blanco: "#F2F2F2",
        negro: "#151515"
      },
      fontFamily: {
        lato: ["Lato", "sans-serif"],
        breeSerif: ["Bree Serif", "serif"]
      },
      backgroundImage: {
        'fondo': "url('src/assets/fondo.jpg')",
      }
    },
  },
  plugins: [],
}

