import {getFoods} from '@Api/food';
import {createAsyncThunk} from '@reduxjs/toolkit';

// https://redux-toolkit.js.org/api/createAsyncThunk#payloadcreator

export const getFoodsApi = createAsyncThunk('food/list', async () => {
  try {
    const response = await getFoods();
    // The value we return becomes the `fulfilled` action payload
    return response;
  } catch (error) {
    throw error;
  }
});
