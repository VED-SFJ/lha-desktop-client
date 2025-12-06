/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        surface: "#1e1e1e",
        surfaceHighlight: "#2A2A2E",
        primary: "#6366F1", // Indigo from your mobile app
        secondary: "#2ecc71", // Green/Teal
        text: "#FFFFFF",
        textDim: "#9CA3AF",
        danger: "#EF4444",
        accent: "#5EEAD4"
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['"Fira Code"', 'monospace'],
      }
    },
  },
  plugins: [],
}