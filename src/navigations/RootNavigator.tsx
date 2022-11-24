import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useMemo} from 'react';
import {useDispatch} from 'react-redux';

import useUpdateEffect from '@Hooks/useUpdateEffect';
import {useAppSelector} from '@Redux/hooks';
import {showTabBar} from '@Redux/system';
import Onboarding from '@Screens/Onboarding';
import SettingsScreen from '@Screens/Settings';

import AuthStack from './stack/AuthStack';
import Header from './stack/Header';
import {hideHeaderOptions} from './stack/screenOption';
import HomeTab from './tab/HomeTab';
import {RootNavigationProp, RootStackParamList} from './type';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const user = useAppSelector(state => state.authentication.user);
  const firstTime = useAppSelector(state => state.system.firstTime);

  const dispatch = useDispatch();

  const navigationKey = useMemo(() => (user ? 'user' : 'guest'), [user]);

  const initialRouteName = useMemo(() => {
    if (firstTime) return 'OnBoarding';
    if (user) return 'HomeTab';
    return 'AuthStack';
  }, [firstTime, user]);

  useUpdateEffect(() => {
    const name = user ? 'HomeTab' : 'AuthStack';
    navigation.reset({index: 0, routes: [{name}]});
  }, [navigation, user]);

  useEffect(() => {
    dispatch(showTabBar(true));
  }, [dispatch]);

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{header: props => <Header {...props} />}}>
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
