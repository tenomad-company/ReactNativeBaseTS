import {User} from '@Models/User';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {loginApi} from './action';

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
    logout: (state: AuthenticationState) => {
      state.user = undefined;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginApi.pending, state => {
        state.loading = true;
      })
      .addCase(loginApi.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginApi.rejected, state => {
        state.loading = false;
      });
  },
});
