import {DarkTheme, DefaultTheme, Theme} from '@react-navigation/native';
import {extendTheme} from 'native-base';
import {appColors} from './colors';

// Navigation Theme
export const navTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: appColors.primary[800],
    text: appColors.darkText,
    card: appColors.cardBg.light,
    background: appColors.background.light,
  },
};

export const navDarkTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: appColors.primary[500],
    text: appColors.lightText,
    card: appColors.cardBg.dark,
    background: appColors.background.dark,
  },
};

// NativeBase theme
export const theme = extendTheme({
  colors: appColors,
  components: {
    // Input: {
    //   baseStyle: (props: any) => {
    //     return {
    //       _dark: {
    //         borderColor: 'muted.400',
    //         _hover: {
    //           borderColor: 'darkPrimary.400',
    //         },
    //         _focus: {
    //           borderColor: 'darkPrimary.400',
    //           _hover: {borderColor: 'darkPrimary.400'},
    //           _stack: {
    //             style: {
    //               outlineWidth: '1px',
    //               outlineColor: `${
    //                 props.focusOutlineColor || 'darkPrimary.400'
    //               }`,
    //               outlineStyle: 'solid',
    //             },
    //           },
    //         },
    //       },
    //     };
    //   },
    // },
  },
});

export const AppColor = appColors;
