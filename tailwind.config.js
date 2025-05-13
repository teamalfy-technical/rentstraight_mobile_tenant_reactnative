/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        montAlt: ["MontserratAlternates-Regular"],
        mont: ["Montserrat-Regular"],
      }
    },
  },
  plugins: [],
}

