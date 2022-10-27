import Onboarding from '@/screens/Onboarding';
import useUpdateEffect from '@Hooks/useUpdateEffect';
import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAppSelector} from '@Redux/hooks';
import SettingsScreen from '@Screens/Settings';
import React, {useMemo} from 'react';
import AuthStack from './stack/AuthStack';
import {hideHeaderOptions} from './stack/screenOption';
import HomeTab from './tab/HomeTab';
import {RootNavigationProp, RootStackParamList} from './type';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const user = useAppSelector(state => state.authentication.user);
  const navigationKey = useMemo(() => (user ? 'user' : 'guest'), [user]);

  useUpdateEffect(() => {
    const name = user ? 'HomeTab' : 'AuthStack';
    navigation.reset({index: 0, routes: [{name}]});
  }, [navigation, user]);

  return (
    <Stack.Navigator initialRouteName={'OnBoarding'}>
      <Stack.Screen
        name="OnBoarding"
        component={Onboarding}
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
