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
  totalMarkets: 0,
  totalCards: 0,
  marketList: [],
  lastMarketId: 10000,
  newLocation: '',
};

export const generalReducers = createSlice({
  name: 'market',
  initialState,
  reducers: {
    example: (state) => {
      // increment lastMarketId and totalMarkets counters
      state.lastMarketId += 1;
      state.totalMarkets += 1;
      // create the new market object from provided data
      const newMarket = {
        // what goes in here?
        marketId: state.lastMarketId,
        location: state.newLocation,
        cards: 0,
        percent: 0,
      };

      // push the new market onto a copy of the market list
      state.marketList.push(newMarket);
    }
  },
});

// Add specific reducers
export const { market } = generalReducers.actions;

export default generalReducers.reducer;
