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
import {initializeI18n} from '@Language';
import RootNavigator from '@Navigations/RootNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {persistor, store} from '@Redux/store';
import InitScreen from '@Screens/Initial';
import {navDarkTheme, navTheme, theme} from '@Styles';
import {NativeBaseProvider, useColorModeValue} from 'native-base';
import React, {useCallback} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import '@Utils/ActivateLayoutAnimation';

const App = () => {
  const onBeforeLift = useCallback(() => {
    initializeI18n();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate
        loading={<InitScreen />}
        persistor={persistor}
        onBeforeLift={onBeforeLift}>
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
