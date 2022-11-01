import {DarkTheme, DefaultTheme, Theme} from '@react-navigation/native';
import {extendTheme} from 'native-base';
import {appColors} from './colors';

// Navigation Theme
export const navTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: appColors.primary[200],
    text: appColors.darkText,
    card: appColors.cardBg.light,
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
    card: appColors.cardBg.dark,
    background: appColors.background.dark,
  },
};

// NativeBase theme
export const theme = extendTheme({
  colors: appColors,
  components: {
    Button: {
      baseStyle: (props: any) => {
        return {
          borderRadius: '2xl',
        };
      },
    },
    // Input: {
    //   baseStyle: (props: any) => {
    //     return {
    //       borderRadius: '2xl',
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
