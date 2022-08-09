import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import authenticationReducer from './authentication/slice';

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
