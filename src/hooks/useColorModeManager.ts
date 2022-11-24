import {useAppDispatch, useAppSelector} from '@Redux/hooks';
import {setColorMode} from '@Redux/system';
import {ColorMode, StorageManager} from 'native-base';
import {useMemo} from 'react';
import {StatusBar} from 'react-native';

const useColorModeManager = () => {
  const colorTheme = useAppSelector(state => state.system.colorMode);
  const dispatch = useAppDispatch();

  const colorModeManager: StorageManager = useMemo(
    () => ({
      get: async initTheme => {
        const mode = colorTheme || initTheme || 'light';
        const reverseMode = mode === 'light' ? 'dark' : 'light';
        StatusBar.setBarStyle(`${reverseMode}-content`);
        return mode;
      },
      set: (value: ColorMode) => dispatch(setColorMode(value)),
    }),
    [colorTheme, dispatch],
  );

  return colorModeManager;
};

export default useColorModeManager;
