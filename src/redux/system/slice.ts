import {NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ColorMode} from 'native-base';

// Define a type for the slice state
interface SystemState {
  colorMode: ColorMode;
  loading: boolean;
  firstTime: boolean;
  language?: string;
  showTabBar?: boolean;
  prevPosition?: number;
}

// Define the initial state using that type
const initialState: SystemState = {
  colorMode: 'light',
  loading: false,
  firstTime: true,
  language: undefined,
  showTabBar: true,
  prevPosition: 0,
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
    showTabBar: (state: SystemState, action: PayloadAction<boolean>) => {
      state.showTabBar = action.payload;
    },
    onChangeScroll: (
      state: SystemState,
      action: PayloadAction<NativeSyntheticEvent<NativeScrollEvent>>,
    ) => {
      state.showTabBar =
        action.payload.nativeEvent.contentOffset.y -
          (state.prevPosition ?? 0) <=
        0;
      state.prevPosition = action.payload.nativeEvent.contentOffset.y;
    },
  },
});

// const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
//   const currentPosition = event.nativeEvent.contentOffset.y;
//   const isScrollTop = positionRef.current - currentPosition >= 0;

//   dispatch(showTabBar(isScrollTop));
//   setTimeout(() => {
//     positionRef.current = currentPosition;
//   }, 400);

//   console.log('event', positionRef.current, currentPosition, isScrollTop);
// };
