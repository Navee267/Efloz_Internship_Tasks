/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily :{
        display : "Poppins",
        body : "Marcellus SC"
      }
    },
    screens :{
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      'md-lg': { min: '768px', max: '1023px' },
    }
  },
  plugins: [],
}

