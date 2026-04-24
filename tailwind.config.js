/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0a1f44",
        background: "#ffffff",
        surface: "#f5f7fa",
        accentText: "#000000",
        mutedText: "#4a4a4a",
        border: "#dde3ec",
        ctaHover: "#163366",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
