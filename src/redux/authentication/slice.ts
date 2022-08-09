import {User} from '@/models/User';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {loginAsync} from './action';

// Define a type for the slice state
interface AuthenticationState {
  user?: User;
  loading: boolean;
}

// Define the initial state using that type
const initialState: AuthenticationState = {
  user: undefined,
  loading: false,
};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setUser: (state: AuthenticationState, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(loginAsync.pending, state => {
        state.loading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginAsync.rejected, state => {
        state.loading = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const {setUser} = authenticationSlice.actions;

export default authenticationSlice.reducer;
