import {theme as nbTheme} from 'native-base';

// /node_modules/native-base/src/theme/base/colors.ts
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
    50: '#9396aa',
    100: '#7e8199',
    200: '#686c88',
    300: '#525676',
    400: '#3d4266',
    500: '#282d55',
    600: '#24284c',
    700: '#202444',
    800: '#1c1f3b',
    900: '#181b33',
  },
};

export const colors = {
  ...palletes,

  primary: palletes.lightBlue,
  darkPrimary: palletes.amber,

  lightText: palletes.white,
  darkText: palletes.black,

  background: {
    dark: palletes.dark[500],
    light: palletes.white,
  },
};
