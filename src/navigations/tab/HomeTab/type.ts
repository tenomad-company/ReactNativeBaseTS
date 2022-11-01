import {MaterialTopTabNavigationProp} from '@react-navigation/material-top-tabs';

export type HomeTabParamList = {
  Home: undefined;
  Profile: {userId: string};
  Order: undefined;
  Chat: undefined;
};

export type HomeTabNavigationProp =
  MaterialTopTabNavigationProp<HomeTabParamList>;

export const homeTabRoute: {
  [key in keyof HomeTabParamList]: keyof HomeTabParamList;
} = {
  Home: 'Home',
  Profile: 'Profile',
  Order: 'Order',
  Chat: 'Chat',
};

export type TabBarProps = {
  name: string;
  component: React.ComponentType<any>;
  ref: any;
  icon?: any;
};
