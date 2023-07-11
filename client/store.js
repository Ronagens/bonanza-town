/**
 * ************************************
 *
 * @module  store.js
 * @author
 * @date
 * @description Redux 'single source of truth'
 *
 * ************************************
 */

import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import marketsReducer from './reducers/generalReducers.js';

// we are adding composeWithDevTools here to get easy access to the Redux dev tools
const store = configureStore({
  reducer: {
    markets: marketsReducer,
  },
  composedEnhancers: composeWithDevTools(),
});

export default store;