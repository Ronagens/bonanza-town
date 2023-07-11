/**
 * ************************************
 *
 * @module  marketsReducer
 * @author
 * @date
 * @description reducer for market data
 *
 * ************************************
 */

import { createSlice } from '@reduxjs/toolkit';

// example
const initialState = {
  count: 0,
};

export const generalReducers = createSlice({
  name: 'count',
  initialState,
  reducers: {
    counter: (state) => {
      state.count++;
    }
  },
});

// Add specific reducers
export const { counter } = generalReducers.actions;

export default generalReducers.reducer;
