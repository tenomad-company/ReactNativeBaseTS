import {useAppSelector} from '@/redux/hooks';
import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useMemo} from 'react';

import SettingsScreen from '@/screens/Settings';
import WelcomeScreen from '@/screens/Welcome';
import AuthStack from './stack/AuthStack';
import {hideHeaderOptions} from './stack/screenOption';
import HomeTab from './tab/HomeTab';
import {RootNavigationProp, RootStackParamList} from './type';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const user = useAppSelector(state => state.authentication.user);
  const navigationKey = useMemo(() => (user ? 'user' : 'guest'), [user]);

  useEffect(() => {
    const name = user ? 'HomeTab' : 'AuthStack';
    navigation.reset({index: 0, routes: [{name}]});
  }, [navigation, user]);

  return (
    <Stack.Navigator initialRouteName={user ? 'HomeTab' : 'Welcome'}>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={hideHeaderOptions}
      />
      <Stack.Screen
        name="AuthStack"
        component={AuthStack}
        options={hideHeaderOptions}
      />
      <Stack.Screen
        name="HomeTab"
        component={HomeTab}
        options={hideHeaderOptions}
      />
      <Stack.Screen
        navigationKey={navigationKey}
        name="Settings"
        component={SettingsScreen}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
