/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backdropBlur: {
        xs: '2px',
      },
      fontFamily:{
        montserrat:['Montserrat', 'sans-serif'],
      },
      colors:{
       'custom-green':'#b1d8d9'
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('daisyui'),
  ],
}

