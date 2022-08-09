/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {navDarkTheme, navTheme, theme} from '@/constants/style';
import RootNavigator from '@/navigations/RootNavigator';
import {store} from '@/redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {
  ColorMode,
  NativeBaseProvider,
  StorageManager,
  useColorMode,
} from 'native-base';
import React from 'react';
import {Provider} from 'react-redux';

// Define the colorModeManager,
// here we are using react-native-async-storage (https://react-native-async-storage.github.io/async-storage/)
const colorModeManager: StorageManager = {
  get: async () => {
    try {
      let val = await AsyncStorage.getItem('@color-mode');
      return val === 'dark' ? 'dark' : 'light';
    } catch (e) {
      console.log(e);
      return 'light';
    }
  },
  set: async (value: ColorMode) => {
    try {
      await AsyncStorage.setItem('@color-mode', value || 'light');
    } catch (e) {
      console.log(e);
    }
  },
};

const App = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme} colorModeManager={colorModeManager}>
        <NavigationContent />
      </NativeBaseProvider>
    </Provider>
  );
};

const NavigationContent = () => {
  const {colorMode} = useColorMode();

  return (
    <NavigationContainer theme={colorMode === 'dark' ? navDarkTheme : navTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default App;
