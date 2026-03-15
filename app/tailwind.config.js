/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Espanol-Course design system
        brand: {
          primary: '#6366f1',   // indigo
          secondary: '#8b5cf6', // purple
          accent: '#ec4899',    // pink
          success: '#10b981',   // green
          warning: '#f59e0b',   // amber
          error: '#ef4444',     // red
        },
        surface: {
          main: '#0f172a',      // page background
          card: '#1e293b',      // card background
          hover: '#334155',     // hover state
        },
        content: {
          primary: '#f1f5f9',   // main text
          secondary: '#94a3b8', // muted text
        },
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-down': 'fadeInDown 0.6s ease-out',
        'pulse-once': 'pulse 0.5s ease-in-out 1',
        'shake': 'shake 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-8px)' },
          '75%': { transform: 'translateX(8px)' },
        },
      },
    },
  },
  plugins: [],
}
