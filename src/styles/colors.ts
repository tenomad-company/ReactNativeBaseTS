import {theme as nbTheme} from 'native-base';

// ../node_modules/native-base/src/theme/base/colors.ts

const palletes = {
  ...nbTheme.colors,

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

export const appColors = {
  ...palletes,
  primary: palletes.emerald,
  background: {
    dark: palletes.dark[900],
    light: '#f5f5f4',
  },
  cardBg: {
    dark: palletes.dark[500],
    light: palletes.white,
  },
};
