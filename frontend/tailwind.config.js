/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green_light: "#00dfc0",
        green_light_none: "#a9e708",
        gray_light: "#61677A",
        dark: "#272829"
      }
    },
  },
  plugins: [],
}

