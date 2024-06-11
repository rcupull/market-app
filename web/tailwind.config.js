/** @type {import('tailwindcss').Config} */

const getCheckEditorMaxHClasses = () => {
  const hs = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];

  return hs.reduce(
    (acc, h) => ({
      ...acc,
      [`.check-editor-max-h-${h}vh`]: {
        '.ck .ck-content': {
          maxHeight: `${h}vh`,
        },
      },
    }),
    {},
  );
};

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    //eslint-disable-next-line
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
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
          color: theme('colors.blue.700'),
        },
        '.no-preflight a:hover': {
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
        ...getCheckEditorMaxHClasses(),
      });
    }),
  ],
};
