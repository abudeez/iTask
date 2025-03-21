
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Poppins', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#4F46E5',
          dark: '#4338CA',
          light: '#818CF8'
        }
      },
      boxShadow: {
        glow: '0 0 10px rgba(79, 70, 229, 0.3), 0 0 20px rgba(79, 70, 229, 0.2), 0 0 30px rgba(79, 70, 229, 0.1)',
      }
    },
  },
  plugins: [],
  darkMode: 'media',
}