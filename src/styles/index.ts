import {DarkTheme, DefaultTheme, Theme} from '@react-navigation/native';
import {extendTheme} from 'native-base';
import {colors} from './colors';

// Navigation Theme
export const navTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary[400],
    text: colors.darkText,
    card: colors.background.light,
    background: colors.background.light,
  },
};

export const navDarkTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.darkPrimary[400],
    text: colors.lightText,
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
        return {
          _dark: {
            borderColor: 'muted.400',
            _hover: {
              borderColor: 'darkPrimary.400',
            },
            _focus: {
              borderColor: 'darkPrimary.400',
              _hover: {borderColor: 'darkPrimary.400'},
              _stack: {
                style: {
                  outlineWidth: '1px',
                  outlineColor: `${
                    props.focusOutlineColor || 'darkPrimary.400'
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
