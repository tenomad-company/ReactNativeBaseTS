import {MaterialTopTabNavigationProp} from '@react-navigation/material-top-tabs';

export type HomeTabParamList = {
  Home: undefined;
  Profile: {userId: string};
};

export type HomeTabNavigationProp =
  MaterialTopTabNavigationProp<HomeTabParamList>;

export const homeTabRoute: {
  [key in keyof HomeTabParamList]: keyof HomeTabParamList;
} = {
  Home: 'Home',
  Profile: 'Profile',
};
