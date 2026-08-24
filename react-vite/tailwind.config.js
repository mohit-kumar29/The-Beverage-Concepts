/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Enforces system sans-serif as fallback, but maps standard sans utility
        sans: ['sans-serif'],
      },
      // Safely supports custom arbitrary properties used in your typography
      letterSpacing: {
        tightest: '-0.08em', 
      },
    },
  },
  plugins: [],
}


