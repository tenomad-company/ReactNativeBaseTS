import LoginScreen from '@Screens/Authentication/LoginScreen';
import RegisterScreen from '@Screens/Authentication/RegisterScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {hideHeaderOptions} from '../screenOption';
import {AuthStackParamList} from './type';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={hideHeaderOptions}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      {/* <Stack.Screen name="RegisterStep1" component={RegisterStep1Screen} /> */}
      {/* <Stack.Screen name="RegisterStep2" component={RegisterStep2Screen} /> */}
      {/* <Stack.Screen name="RegisterStep3" component={RegisterStep3Screen} /> */}
      {/* <Stack.Screen name="RegisterFinish" component={RegisterFinishScreen} /> */}
      {/* <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} /> */}
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
