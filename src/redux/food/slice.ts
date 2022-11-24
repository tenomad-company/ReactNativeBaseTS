import {Food} from '@Models/Food';
import {createSlice} from '@reduxjs/toolkit';
import {getFoodsApi} from './action';

// Define a type for the slice state
interface FoodState {
  list?: Food[];
  loading: boolean;
}

// Define the initial state using that type
const initialState: FoodState = {
  list: undefined,
  loading: false,
};

export const foodSlice = createSlice({
  name: 'Food',
  initialState,
  reducers: {
    clearList: (state: FoodState) => {
      state.list = undefined;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getFoodsApi.pending, state => {
        state.loading = true;
      })
      .addCase(getFoodsApi.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getFoodsApi.rejected, state => {
        state.loading = false;
      });
  },
});
