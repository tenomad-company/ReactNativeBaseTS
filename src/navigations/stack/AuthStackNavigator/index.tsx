import LoginScreen from '@/screens/Authentication/LoginScreen';
import RegisterScreen from '@/screens/Authentication/RegisterScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {AuthStackParamList} from './type';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator>
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
