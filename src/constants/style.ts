import {DarkTheme, DefaultTheme, Theme} from '@react-navigation/native';
import {extendTheme, theme as nbTheme} from 'native-base';

// /node_modules/native-base/src/theme/base/colors.ts

const palletes = {
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
  primary: nbTheme.colors.indigo,
  darkPrimary: nbTheme.colors.amber,

  ...palletes,

  background: {
    dark: palletes.darkBlue[500],
    light: nbTheme.colors.white,
  },
  text: {
    dark: '#FFFFFF',
    light: '#282d55',
  },
};

// Navigation Theme
export const navTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary[500],
    text: colors.text.light,
    card: colors.background.light,
    background: colors.background.light,
  },
};

export const navDarkTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.darkPrimary[500],
    text: colors.text.dark,
    card: colors.background.dark,
    background: colors.background.dark,
  },
};

// NativeBase theme
export const theme = extendTheme({
  colors: colors,
  components: {
    Input: {
      baseStyle: (props: any) => {
        const {darkPrimary} = props.theme.colors;
        return {
          _dark: {
            borderColor: 'muted.400',
            _hover: {
              borderColor: 'darkPrimary.500',
            },
            _focus: {
              borderColor: 'darkPrimary.500',
              _hover: {borderColor: 'darkPrimary.500'},
              _stack: {
                style: {
                  outlineWidth: '1px',
                  outlineColor: `${
                    props.focusOutlineColor || darkPrimary[500]
                  }`,
                  outlineStyle: 'solid',
                },
              },
            },
          },
        };
      },
    },
  },
});
