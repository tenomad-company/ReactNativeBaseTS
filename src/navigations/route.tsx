import {AuthNavigationProp, AuthStackParamList} from './stack/AuthStack/type';
import {HomeTabNavigationProp, HomeTabParamList} from './tab/HomeTab/type';
import {RootNavigationProp, RootStackParamList} from './type';

export type AppParamList = RootStackParamList &
  HomeTabParamList &
  AuthStackParamList;

export type RouteName = keyof AppParamList;

type RouteNameMap = {
  [key in RouteName]: RouteName;
};

export type AppNavigationProps = RootNavigationProp &
  HomeTabNavigationProp &
  AuthNavigationProp;

const routeName: RouteNameMap = {
  Welcome: 'Welcome',
  AuthStack: 'AuthStack',
  HomeTab: 'HomeTab',
  Settings: 'Settings',

  Home: 'Home',
  Profile: 'Profile',

  Login: 'Login',
  Register: 'Register',
};

export default routeName;
