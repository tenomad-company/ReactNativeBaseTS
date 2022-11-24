import {login} from '@Api/authentication';
import {createAsyncThunk} from '@reduxjs/toolkit';

// https://redux-toolkit.js.org/api/createAsyncThunk#payloadcreator

export const loginApi = createAsyncThunk(
  'authentication/login',
  async (payload: {username: string; password: string}) => {
    try {
      const {username, password} = payload;
      const response = await login(username, password);
      // The value we return becomes the `fulfilled` action payload
      return response;
    } catch (error) {
      throw error;
    }
  },
);
