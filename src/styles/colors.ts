import {theme as nbTheme} from 'native-base';

// ../node_modules/native-base/src/theme/base/colors.ts

const pallets = {
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
    50: '#0D0D0D',
    100: '#232323',
    200: '#383838',
    300: '#4F4F4F',
    400: '#676767',
    500: '#808080',
    600: '#9A9A9A',
    700: '#B5B5B5',
    800: '#D0D0D0',
    900: '#EDEDED',
  },
};

export const appColors = {
  ...pallets,

  background: {
    dark: pallets.dark[50],
    light: pallets.dark[900],
  },
  cardBg: {
    dark: pallets.dark[100],
    light: '#ffff',
  },
};
