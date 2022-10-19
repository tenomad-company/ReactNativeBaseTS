import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ColorMode} from 'native-base';

// Define a type for the slice state
interface SystemState {
  colorMode: ColorMode;
  loading: boolean;
}

// Define the initial state using that type
const initialState: SystemState = {
  colorMode: 'light',
  loading: false,
};

export const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    setColorMode: (state: SystemState, action: PayloadAction<ColorMode>) => {
      state.colorMode = action.payload;
    },
  },
});
