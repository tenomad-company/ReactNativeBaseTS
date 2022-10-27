import {useEffect} from 'react';
import {BackHandler} from 'react-native';

export function useBackHandler(handler: () => boolean) {
  useEffect(() => {
    const listener = BackHandler.addEventListener('hardwareBackPress', handler);
    return () => listener.remove();
  }, [handler]);
}
