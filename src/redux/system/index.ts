import {systemSlice} from './slice';

// Action creators are generated for each case reducer function
export const {
  setColorMode,
  setLanguage,
  setFirstTime,
  showTabBar,
  onChangeScroll,
} = systemSlice.actions;

export default systemSlice.reducer;
