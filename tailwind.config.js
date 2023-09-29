/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      },
      colors: {
        primary: " #00cab1",
      },
      screens: {
        xxsm: "340px",
        xsm: "444px",
        xssm: "520px",
        xmd: "880px",
        xmmd: "976px",
      },
      borderWidth: {
        1: "1px",
      },
    },
  },
  plugins: [],
}
