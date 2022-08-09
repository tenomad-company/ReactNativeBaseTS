import {useAppSelector} from '@/redux/hooks';
import LoginScreen from '@/screens/Authentication/LoginScreen';
import RegisterScreen from '@/screens/Authentication/RegisterScreen';
import SettingsScreen from '@/screens/Settings';
import WelcomeScreen from '@/screens/Welcome';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useMemo} from 'react';
import HomeTabNavigator from './tab/HomeTabNavigator';
import RootStackParamList from './type/RootStack';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthenGroup = () => (
  <Stack.Group>
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Group>
);

const HomeGroup = () => (
  <Stack.Group>
    <Stack.Screen name="Home" component={HomeTabNavigator} />
  </Stack.Group>
);

const RootNavigator = () => {
  const user = useAppSelector(state => state.authentication.user);
  const navigationKey = useMemo(() => (user ? 'user' : 'guest'), [user]);

  return (
    <Stack.Navigator>
      {user ? HomeGroup() : AuthenGroup()}
      <Stack.Screen
        navigationKey={navigationKey}
        name="Settings"
        component={SettingsScreen}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
