import {systemSlice} from './slice';

// Action creators are generated for each case reducer function
export const {setColorMode, setLanguage} = systemSlice.actions;

export default systemSlice.reducer;
