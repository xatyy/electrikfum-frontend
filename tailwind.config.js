/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './public/**/*.{js,ts,jx,tsx,html}'
  ],
  theme: {
    extend: {
      fontFamily:{
        satoshi: ["Satoshi-Bold", "sans-serif"],
        satoshimedium: ["Satoshi-Mediun", "sans-serif"],
        arimo: ["Arimo", "sans-serif"],
      },
      transitionProperty: {
        height: 'height'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
