import {DarkTheme, DefaultTheme, Theme} from '@react-navigation/native';
import {extendTheme} from 'native-base';
import {colors} from './colors';

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
                    props.focusOutlineColor || 'darkPrimary.500'
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
