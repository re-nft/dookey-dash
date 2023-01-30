/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./layout/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./react/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "white": "white",
      "renft-purple": "#562581",
      "dookey-green": "#B2E14A",
      "dookey-green-dark": "#0F3415",
      "dookey-purple": "#A06DDB",
    },
    extend: {
      fontFamily: {
        sans: [
          "Averia Sans Libre",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "Fira Sans",
          "Droid Sans",
          "Helvetica Neue",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
