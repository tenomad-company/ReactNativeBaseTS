import {DarkTheme, DefaultTheme} from '@react-navigation/native';
import {extendTheme, theme as nbTheme} from 'native-base';

const colors = {
  primary: nbTheme.colors.indigo,
  darkPrimary: nbTheme.colors.amber,
  background: {
    dark: '#282d55',
    light: '#FFFFFF',
  },
  text: {
    dark: '#FFFFFF',
    light: '#282d55',
  },
};

export const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: colors.text.light,
    card: colors.background.light,
    background: colors.background.light,
  },
};

export const navDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    text: colors.text.dark,
    card: colors.background.dark,
    background: colors.background.dark,
  },
};

export const theme = extendTheme({
  colors: colors,
  components: {
    Button: {
      baseStyle: (props: any) => {
        const {darkPrimary} = props.theme.colors;
        return {
          colorScheme: 'amber',
        };
      },
    },
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
