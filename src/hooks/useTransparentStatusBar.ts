import {useEffect} from 'react';
import {StatusBar, Platform} from 'react-native';

const useTransparentStatusBar = () => {
  useEffect(() => {
    if (Platform.OS === 'ios') return;
    StatusBar.setBackgroundColor('transparent');
    StatusBar.setTranslucent(true);
  }, []);
};

export default useTransparentStatusBar;
