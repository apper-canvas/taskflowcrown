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
          50: '#F5F3FF',
          100: '#EDE9FE',
          500: '#5B4CF5',
          600: '#8B7FF7',
          700: '#4338CA',
          900: '#312E81'
        },
        accent: {
          500: '#FF6B6B',
          600: '#FF5252'
        },
        success: '#4ECDC4',
        warning: '#FFE66D',
        info: '#4A90E2',
        surface: '#FFFFFF',
        background: '#F7F9FC'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'scale-up': 'scaleUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'confetti': 'confetti 0.6s ease-out'
      },
      keyframes: {
        scaleUp: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideIn: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        confetti: {
          '0%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
          '50%': { transform: 'scale(1.2) rotate(180deg)', opacity: '0.8' },
          '100%': { transform: 'scale(0.8) rotate(360deg)', opacity: '0' }
        }
      }
    },
  },
  plugins: [],
}