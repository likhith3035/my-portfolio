export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: 'var(--accent)',
          hover: 'var(--accent-hover)',
          secondary: 'var(--accent-secondary)',
        },
        'neo-yellow':  '#FBD249',
        'neo-blue':    '#1D4ED8',
        'neo-orange':  'var(--accent)',
        'neo-teal':    '#14B8A6',
        'neo-purple':  '#A855F7',
      },
      boxShadow: {
        'neo':    '4px 4px 0px 0px rgba(0,0,0,1)',
        'neo-sm': '2px 2px 0px 0px rgba(0,0,0,1)',
        'neo-lg': '8px 8px 0px 0px rgba(0,0,0,1)',
        'card':   '0 8px 32px -8px rgba(24,24,27,0.08)',
        'card-lg':'0 20px 60px -12px rgba(24,24,27,0.12)',
      },
      fontFamily: {
        sans: ['Montserrat', 'Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'spin-slow': { to: { transform: 'rotate(360deg)' } },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(32px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(230,126,34,0.5)' },
          '50%':       { boxShadow: '0 0 0 6px rgba(230,126,34,0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%':      { transform: 'translateY(-8px) rotate(0.5deg)' },
          '66%':      { transform: 'translateY(-4px) rotate(-0.5deg)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
      },
      animation: {
        'spin-slow':      'spin-slow 12s linear infinite',
        'fade-up':        'fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both',
        'glow':           'glow-pulse 2.2s ease-in-out infinite',
        float:            'float 6s ease-in-out infinite',
        marquee:          'marquee 40s linear infinite',
        'marquee-slow':   'marquee 60s linear infinite',
        shimmer:          'shimmer 2.4s infinite',
      },
      screens: {
        'xs': '400px',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
}
