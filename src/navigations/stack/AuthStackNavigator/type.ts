import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type AuthNavigationProp = NativeStackNavigationProp<AuthStackParamList>;
