import {combineReducers} from '@reduxjs/toolkit';
import authenticationReducer from './authentication';
import systemReducer from './system';
import foodReducer from './food';
import {persistReducer, Storage} from 'redux-persist';
import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

const mmvkStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    storage.delete(key);
    return Promise.resolve();
  },
};

export const persistConfig = {
  key: 'root',
  storage: mmvkStorage,
  whitelist: ['authentication', 'system', 'food'], // only persist these reducers
};

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  system: systemReducer,
  food: foodReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
