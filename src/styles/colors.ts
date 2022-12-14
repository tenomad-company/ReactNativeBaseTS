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
  tertiary: {
    300: '#E3CBBC',
    400: '#E6A986',
    450: '#E38751',

    500: '#DA6317',
    501: 'rgba(218, 99, 23, 0.1)',
    502: 'rgba(218, 99, 23, 0.2)',
    503: 'rgba(218, 99, 23, 0.3)',
    504: 'rgba(218, 99, 23, 0.4)',
    505: 'rgba(218, 99, 23, 0.5)',
    506: 'rgba(218, 99, 23, 0.6)',
    507: 'rgba(218, 99, 23, 0.7)',
    508: 'rgba(218, 99, 23, 0.8)',
    509: 'rgba(218, 99, 23, 0.9)',
  },
  dark: {
    50: '#656565',
    100: '#5B5B5B',
    200: '#515151',
    300: '#484848',
    400: '#3E3E3E',
    450: '#343434',
    500: '#2A2A2A',
    600: '#202020',
    700: '#171717',
    800: '#0D0D0D',
    900: '#030303',
  },
};

export const appColors = {
  ...palletes,
  primary: palletes.emerald,
  background: {
    dark: palletes.dark[900],
    light: '#F5F5F4',
  },
  card: {
    dark: palletes.dark[500],
    light: palletes.white,
  },
  border: {
    dark: palletes.dark[900],
    light: '#F4F4F4',
  },
};
