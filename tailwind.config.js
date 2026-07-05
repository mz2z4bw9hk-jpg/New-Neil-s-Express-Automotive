/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        night: {
          950: '#05080F',
          900: '#0A0F1A',
          850: '#0D1421',
          800: '#111927',
          700: '#182338',
          600: '#22304A',
        },
        ink: '#EDF1F7',
        dim: '#9AA7BA',
        faint: '#5E6B7E',
        accent: {
          DEFAULT: '#FFC53D',
          bright: '#FFD263',
          deep: '#E8A800',
          ink: '#1A1400',
        },
        electric: '#5B7CFA',
        line: 'rgba(154, 167, 186, 0.14)',
      },
      fontFamily: {
        display: [
          'Anton',
          '"Arial Narrow"',
          '"PingFang SC"',
          '"Hiragino Sans GB"',
          '"Microsoft YaHei"',
          'sans-serif',
        ],
        sans: [
          '"Inter Variable"',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          '"PingFang SC"',
          '"Hiragino Sans GB"',
          '"Microsoft YaHei"',
          'sans-serif',
        ],
      },
      maxWidth: {
        shell: '76rem',
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(255, 197, 61, 0.45)',
        card: '0 20px 50px -24px rgba(0, 0, 0, 0.65)',
        pop: '0 24px 70px -20px rgba(0, 0, 0, 0.8)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'slow-zoom': {
          '0%': { transform: 'scale(1.08)' },
          '100%': { transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.55' },
        },
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
        'slow-zoom': 'slow-zoom 14s ease-out forwards',
        shimmer: 'shimmer 2.4s linear infinite',
        'pulse-soft': 'pulse-soft 2.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
