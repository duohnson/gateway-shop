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
          DEFAULT: '#eb5a4f',
          50: '#fff1ef',
          100: '#ffe6e4',
          200: '#ffc6bf',
          300: '#ff9f89',
          400: '#f97361',
          500: '#eb5a4f',
          600: '#d9483b',
          700: '#b43a2f'
        },
        accent: {
          DEFAULT: '#ff8800',
          500: '#ff8800',
          600: '#f97316'
        },
        neutral: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          500: '#6b7280',
          700: '#374151'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial']
      },
      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem'
      }
    },
  },
  safelist: [
    'from-red-500',
    'to-orange-400',
    'text-orange-600',
    'bg-orange-500',
    'hover:bg-orange-600',
    'text-red-600',
    'bg-white',
    'text-gray-600',
    'bg-gray-100',
    'bg-gray-50',
    'text-gray-800',
    'bg-red-500',
    'bg-transparent',
    'border-white',
    'text-white',
    'hover:underline'
  ],
  plugins: [],
}
