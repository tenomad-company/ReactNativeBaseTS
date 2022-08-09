import {Alert, AppState, AppStateStatus} from 'react-native';
import {
  check,
  openSettings,
  Permission,
  RESULTS,
} from 'react-native-permissions';

export const showSettings = async (
  permission: Permission,
  title: string,
  message?: string,
) => {
  return new Promise<boolean>((resolve, reject) => {
    Alert.alert(title, message, [
      {
        text: 'Go settings',
        onPress: () => openSettings(),
      },
      {
        text: 'Cancel',
        onPress: () => {},
      },
    ]);

    let appState = AppState.currentState;

    const listener = AppState.addEventListener(
      'change',
      (nextState: AppStateStatus) => {
        if (appState.match(/inactive|background/) && nextState === 'active') {
          listener.remove();
          check(permission)
            .then(s => resolve(s === RESULTS.GRANTED || s === RESULTS.LIMITED))
            .catch(reject);
        }
        appState = nextState;
      },
    );
  });
};
