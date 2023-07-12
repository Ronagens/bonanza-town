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
  files: [],
};

export const generalReducers = createSlice({
  name: 'general',
  initialState,
  reducers: {
    
  },
});

// Add specific reducers
export const { counter } = generalReducers.actions;

export default generalReducers.reducer;
