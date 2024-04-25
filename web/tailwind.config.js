/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    //eslint-disable-next-line
    require('@tailwindcss/forms'),
    //eslint-disable-next-line
    require('tailwindcss/plugin')(({ addUtilities, theme }) => {
      addUtilities({
        '.hyperlink': {
          color: theme('colors.blue.600'),
          textDecorationLine: 'underline',
        },
        '.hyperlink:visited': {
          color: theme('colors.purple.600'),
          textDecorationLine: 'underline',
        },
        '.no-preflight a': {
          color: theme('colors.blue.600'),
          textDecorationLine: 'underline',
        },
        ////////////////////////////////////HX
        '.no-preflight h2': {
          fontSize: '1.5rem',
          fontWeight: 'bold',
        },
        ////////////////////////////////////LISTS
        '.no-preflight ul': {
          listStyleType: 'disc',
          listStylePosition: 'inside',
        },
        '.no-preflight ol': {
          listStyleType: 'decimal',
          listStylePosition: 'inside',
        },
        '.no-preflight ul ul, ol ul': {
          listStyleType: 'circle',
          listStylePosition: 'inside',
          marginLeft: '15px',
        },
        '.no-preflight ol ol, ul ol': {
          listStyleType: 'lower-latin',
          listStylePosition: 'inside',
          marginLeft: '15px',
        },
        '.no-preflight li span': {
          display: 'inline !important',
        },
      });
    }),
  ],
};
