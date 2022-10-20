import {AuthStackParamList} from './stack/AuthStack/type';
import {HomeTabParamList} from './tab/HomeTab/type';
import {RootStackParamList} from './type';

type AppParamList = RootStackParamList & HomeTabParamList & AuthStackParamList;

type RouteName = {
  [key in keyof AppParamList]: keyof AppParamList;
};

const routeName: RouteName = {
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
