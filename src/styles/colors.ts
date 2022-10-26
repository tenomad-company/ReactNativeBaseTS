import {theme as nbTheme} from 'native-base';

// ../node_modules/native-base/src/theme/base/colors.ts

const palletes = {
  ...nbTheme.colors,

  light: {
    50: '#ffffff',
    100: '#e9eaee',
    200: '#d4d5dd',
    300: '#bec0cc',
    400: '#a9abbb',
    500: '#9396aa',
    600: '#7e8199',
    700: '#686c88',
    800: '#525676',
    900: '#3d4266',
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

export const colors = {
  ...palletes,

  primary: palletes.emerald,
  darkPrimary: palletes.amber,

  lightText: palletes.white,
  darkText: palletes.black,

  background: {
    dark: palletes.dark[800],
    light: palletes.white,
  },

  onBackground: {
    dark: palletes.dark[600],
    light: palletes.white,
  },
};
