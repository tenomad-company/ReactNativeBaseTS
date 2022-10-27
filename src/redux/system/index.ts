import {systemSlice} from './slice';

// Action creators are generated for each case reducer function
export const {setColorMode, setLanguage, setFirstTime} = systemSlice.actions;

export default systemSlice.reducer;
