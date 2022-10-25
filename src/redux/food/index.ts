import {foodSlice} from './slice';

export * from './action';

// Action creators are generated for each case reducer function
export const {clearList} = foodSlice.actions;

export default foodSlice.reducer;
