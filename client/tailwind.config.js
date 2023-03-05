/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          DEFAULT: '#466995',
          50: '#F4F7FA',
          100: '#E0E7F0',
          200: '#B6C7DD',
          300: '#8CA7C9',
          400: '#6387B6',
          500: '#466995',
          600: '#324C6B',
          700: '#1F2E42',
          800: '#0B1118',
          900: '#000000'
        },
        'text': {
          DEFAULT: '#4A4A4A',
          50: '#A6A6A6',
          100: '#9C9C9C',
          200: '#878787',
          300: '#737373',
          400: '#5E5E5E',
          500: '#4A4A4A',
          600: '#2E2E2E',
          700: '#121212',
          800: '#000000',
          900: '#000000'
        },
        'secondary': {
          DEFAULT: '#DB504A',
          50: '#F9E4E3',
          100: '#F6D4D2',
          200: '#EFB3B0',
          300: '#E9928E',
          400: '#E2716C',
          500: '#DB504A',
          600: '#C62E27',
          700: '#97231E',
          800: '#681815',
          900: '#390D0B'
        },
      },
    },
  },
  plugins: [],
}
