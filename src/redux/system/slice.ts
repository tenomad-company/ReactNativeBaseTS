import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ColorMode} from 'native-base';

// Define a type for the slice state
interface SystemState {
  colorMode: ColorMode;
  loading: boolean;
  firstTime: boolean;
  language?: string;
}

// Define the initial state using that type
const initialState: SystemState = {
  colorMode: 'light',
  loading: false,
  firstTime: true,
  language: undefined,
};

export const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    setColorMode: (state: SystemState, action: PayloadAction<ColorMode>) => {
      state.colorMode = action.payload;
    },
    setLanguage: (state: SystemState, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setFirstTime: (state: SystemState) => {
      state.firstTime = false;
    },
  },
});
