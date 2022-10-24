import {theme as nbTheme} from 'native-base';

// /node_modules/native-base/src/theme/base/colors.ts
const palletes = {
  ...nbTheme.colors,

  darkBlue: {
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

  primary: palletes.indigo,
  darkPrimary: palletes.amber,

  background: {
    dark: palletes.darkBlue[500],
    light: palletes.white,
  },
  text: {
    dark: palletes.white,
    light: palletes.darkBlue[500],
  },
};
