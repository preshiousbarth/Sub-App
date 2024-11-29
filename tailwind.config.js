/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#3b82f6', // Light Blue
          DEFAULT: '#2563eb', // Blue
          dark: '#1e40af', // Dark Blue
        },
        dark: {
          bg: '#1f2937', // Background Color (Dark)
          text: '#e5e7eb', // Light Text
          card: '#374151', // Card or Form Background
        },
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
