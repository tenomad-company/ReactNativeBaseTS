import {theme as nbTheme} from 'native-base';

// ../node_modules/native-base/src/theme/base/colors.ts

const palletes = {
  ...nbTheme.colors,
  primary: {
    900: '#109059',
    800: '#11955D',
    700: '#12A366',
    600: '#14B16F',
    500: '#15BE77',
    400: '#17CC80',
    300: '#18DA89',
    200: '#1CE691',
    100: '#6FBC9B',
    50: '#EBFBF3',
  },
  secondary: {
    300: '#FEF8E0',
    400: '#FFDEA4',
    450: '#FFC668',
    500: '#FFAD1D',
  },
  dark: {
    50: '#656565',
    100: '#5b5b5b',
    200: '#515151',
    300: '#484848',
    400: '#3e3e3e',
    450: '#343434',
    500: '#2a2a2a',
    600: '#202020',
    700: '#171717',
    800: '#0d0d0d',
    900: '#030303',
  },
};
// #F4F4F4
export const appColors = {
  ...palletes,

  // primary: palletes.emerald,
  darkPrimary: palletes.amber,

  lightText: palletes.white,
  darkText: palletes.black,

  background: {
    dark: palletes.dark[900],
    light: palletes.white,
  },

  cardBg: {
    dark: palletes.dark[500],
    light: palletes.white,
  },
};
