/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    
    extend: {
      // classes: {
      //   'rating': 'absolute top-[10px] left-[10px] flex items-center justify-center  text-white text-lg  w-[2.4rem]  pt-[2px] pr-[30px]'
      // },

      fontSize: {
        'customSizeText': 'clamp(0.938rem, 0.775rem + 0.81vw, 1.75rem)', 
      },
      colors: {
        gold: '#ad9760',
        green: 'green',
        orange: 'orange',
        red: 'red',
      }
    },
    fontFamily: {
      'garamond': ['EB Garamond', 'sans-serif'],
    }
    
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
  variants: {},
};