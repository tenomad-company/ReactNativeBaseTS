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
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {persistor, store} from '@/redux/store';
import {setColorMode} from '@/redux/system';
import {NavigationContainer} from '@react-navigation/native';
import {
  ColorMode,
  NativeBaseProvider,
  StorageManager,
  useColorMode,
} from 'native-base';
import React, {useMemo} from 'react';
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
  const colorTheme = useAppSelector(state => state.system.colorMode);
  const dispatch = useAppDispatch();

  const colorModeManager: StorageManager = useMemo(
    () => ({
      get: async initTheme => colorTheme || initTheme,
      set: (value: ColorMode) => dispatch(setColorMode(value)),
    }),
    [colorTheme, dispatch],
  );

  return (
    <NativeBaseProvider theme={theme} colorModeManager={colorModeManager}>
      <NavigationContent />
    </NativeBaseProvider>
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
