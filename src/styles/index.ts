import {DarkTheme, DefaultTheme, Theme} from '@react-navigation/native';
import {extendTheme} from 'native-base';
import {appColors} from './colors';
import {typography} from './typography';

// Navigation Theme
export const navTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: appColors.primary[200],
    text: appColors.darkText,
    card: appColors.card.light,
    background: appColors.background.light,
    border: '#F4F4F4',
  },
};

export const navDarkTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: appColors.primary[800],
    text: appColors.lightText,
    card: appColors.card.dark,
    background: appColors.background.dark,
  },
};

// NativeBase theme
export const theme = extendTheme({
  colors: appColors,
  typography,
  components: {
    Button: {
      baseStyle: () => {
        return {
          borderRadius: '2xl',
        };
      },
    },
  },
});

export const AppColor = appColors;
