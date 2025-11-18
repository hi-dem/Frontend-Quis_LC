/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0052CC',
        success: '#10B981',
        danger: '#EF4444',
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in',
        slideUp: 'slideUp 0.3s ease-out',
        slideDown: 'slideDown 0.3s ease-out',
        bounce: 'bounce 0.6s ease-in-out',
        shake: 'shake 0.4s ease-in-out',
        pulse: 'pulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}