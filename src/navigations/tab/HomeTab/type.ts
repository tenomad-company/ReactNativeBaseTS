import {MaterialTopTabNavigationProp} from '@react-navigation/material-top-tabs';

export type HomeTabParamList = {
  Home: undefined;
  Profile: {userId: string};
  Plus: undefined;
};

export type HomeTabNavigationProp =
  MaterialTopTabNavigationProp<HomeTabParamList>;

export const homeTabRoute: {
  [key in keyof HomeTabParamList]: keyof HomeTabParamList;
} = {
  Home: 'Home',
  Profile: 'Profile',
  Plus: 'Plus',
};

export type TabBarProps = {
  name: string;
  iconName: string;
  component: React.ComponentType<any>;
  ref: any;
  icon?: any;
};
