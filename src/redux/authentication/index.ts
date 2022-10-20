import {authenticationSlice} from './slice';

export * from './action';

// Action creators are generated for each case reducer function
export const {setUser, logout} = authenticationSlice.actions;

export default authenticationSlice.reducer;
