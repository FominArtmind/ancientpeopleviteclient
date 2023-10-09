/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,vue,ts}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        "ancient": {
          50: "#e0f0f3",
          100: "#c5dfe5",
          200: "#b4d0d7",
          300: "#a6c2c9",
          400: "#9ab6bd",
          500: "#92acb3",
          600: "#8aa2a9",
          700: "#7b9197",
          800: "#7a9096",
          900: "#768b90"
        }
      }
    }
  },
  plugins: [require("tw-elements/dist/plugin.cjs")]
}

