import {setLanguage} from '@Redux/system';
import {store} from '@Redux/store';
import i18n, {LanguageDetectorAsyncModule} from 'i18next';
import {initReactI18next} from 'react-i18next';
import {NativeModules, Platform} from 'react-native';
import en from './translations/en.json';
import vi from './translations/vi.json';

const fallbackLng = 'en';
const supportedLanguages = ['en', 'vi'];

const getDeviceLanguage = () => {
  const deviceLocale: string = Platform.select({
    android: NativeModules?.I18nManager?.localeIdentifier,
    ios:
      NativeModules?.SettingsManager?.settings?.AppleLocale ||
      NativeModules?.SettingsManager?.settings?.AppleLanguages[0],
  });

  if (!deviceLocale) return fallbackLng;

  const [lowerCaseLocale] = deviceLocale.split('_');
  if (supportedLanguages.includes(lowerCaseLocale)) return lowerCaseLocale;

  return fallbackLng;
};

// NOTE: 1 - persist and detect language via Redux or device's current locale
const reduxPersistLanguageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  init: () => {},
  detect: async callback => {
    const storedLanguage = store.getState().system.language;
    if (storedLanguage) return callback(storedLanguage);

    const deviceLanguage = getDeviceLanguage();
    callback(deviceLanguage);
  },
  cacheUserLanguage: lng => {
    const storedLanguage = store.getState().system.language;
    if (storedLanguage !== lng) store.dispatch(setLanguage(lng));
  },
};

// NOTE: 2 - because of [1] - init after Redux-persist rehydrated
export const initializeI18n = () => {
  return i18n
    .use(reduxPersistLanguageDetector)
    .use(initReactI18next)
    .init({
      compatibilityJSON: 'v3',
      resources: {
        en: {translation: en},
        vi: {translation: vi},
      },

      debug: true,
      fallbackLng: 'en',

      interpolation: {
        escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
      },
    });
};

export default i18n;
