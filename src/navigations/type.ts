import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Welcome: undefined;
  AuthStack: undefined;
  HomeTab: undefined;
  Settings: undefined;
};

export type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;
