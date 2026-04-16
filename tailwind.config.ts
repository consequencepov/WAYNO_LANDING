import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 5.5vw, 5.125rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'display': ['clamp(2.5rem, 4.5vw, 4rem)', { lineHeight: '1.0', letterSpacing: '-0.02em' }],
        'heading-1': ['clamp(2rem, 3.5vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'heading-2': ['clamp(1.5rem, 2.5vw, 2.25rem)', { lineHeight: '1.15' }],
        'heading-3': ['clamp(1.25rem, 1.8vw, 1.5rem)', { lineHeight: '1.3' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        'label': ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.08em' }],
      },
      colors: {
        surface: {
          primary: '#0A0A0A',
          secondary: '#141414',
          elevated: '#1A1A1A',
          overlay: '#1E1E1E',
        },
        content: {
          primary: '#EDEDED',
          secondary: '#A0A0A0',
          muted: '#666666',
          inverse: '#0A0A0A',
        },
        accent: {
          DEFAULT: '#C8CFA0',
          hover: '#D4D8B0',
          muted: 'rgba(200, 207, 160, 0.15)',
        },
        border: {
          subtle: 'rgba(237, 237, 237, 0.08)',
          DEFAULT: 'rgba(237, 237, 237, 0.12)',
          strong: 'rgba(237, 237, 237, 0.2)',
        },
      },
      spacing: {
        'section': 'clamp(6rem, 10vw, 10rem)',
        'section-sm': 'clamp(4rem, 6vw, 6rem)',
      },
      maxWidth: {
        'container': '1440px',
        'content': '1200px',
      },
      borderRadius: {
        'pill': '9999px',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'expo-in-out': 'cubic-bezier(0.87, 0, 0.13, 1)',
        'circ-out': 'cubic-bezier(0, 0.55, 0.45, 1)',
      },
      keyframes: {
        'marquee': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'marquee': 'marquee 240s linear infinite',
        'marquee-slow': 'marquee 360s linear infinite',
        'fade-up': 'fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fade-in 0.6s ease forwards',
      },
    },
  },
  plugins: [],
}

export default config
