/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/static/public/**/*.html',
    './src/static/public/**/*.js',
    './src/**/*.{html,js,go}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ef4444',
          50:  '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d'
        },
        accent: {
          DEFAULT: '#f97316',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c'
        },
        neutral: {
          50:  '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial']
      },
      borderRadius: {
        xl:  '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem'
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0,0,0,0.07), 0 10px 20px -2px rgba(0,0,0,0.04)',
        'glow': '0 0 20px rgba(239,68,68,0.15)'
      }
    },
  },
  safelist: [
    'from-red-500',
    'to-orange-500',
    'from-red-600',
    'to-orange-600',
    'text-red-600',
    'bg-red-500',
    'bg-red-600',
    'hover:bg-red-600',
    'text-orange-600',
    'bg-white',
    'text-gray-500',
    'text-gray-600',
    'bg-gray-100',
    'bg-gray-50',
    'text-gray-800',
    'bg-transparent',
    'border-white',
    'text-white',
    'hover:underline',
    'gap-8'
  ],
  plugins: [],
}
