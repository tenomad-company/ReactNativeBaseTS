/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import useColorModeManager from '@Hooks/useColorModeManager';
import useTransparentStatusBar from '@Hooks/useTransparentStatusBar';
import RootNavigator from '@Navigations/RootNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {persistor, store} from '@Redux/store';
import {navDarkTheme, navTheme, theme} from '@Styles';
import {NativeBaseProvider, useColorModeValue} from 'native-base';
import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseContent />
      </PersistGate>
    </Provider>
  );
};

const NativeBaseContent = () => {
  useTransparentStatusBar();
  const colorModeManager = useColorModeManager();

  return (
    <NativeBaseProvider theme={theme} colorModeManager={colorModeManager}>
      <NavigationContent />
    </NativeBaseProvider>
  );
};

const NavigationContent = () => {
  const navigationTheme = useColorModeValue(navTheme, navDarkTheme);

  return (
    <NavigationContainer theme={navigationTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default App;
