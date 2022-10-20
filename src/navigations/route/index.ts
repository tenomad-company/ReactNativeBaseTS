import RootStackParamList from '../type/RootStack';

type Route = {
  [key in keyof RootStackParamList]: keyof RootStackParamList;
};

const RouteName: Route = {
  Welcome: 'Welcome',
  HomeTab: 'HomeTab',
  Home: 'Home',
  Profile: 'Profile',
};

export default RouteName;
