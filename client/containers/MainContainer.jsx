/**
 * ************************************
 *
 * @module  MainContainer
 * @author
 * @date
 * @description stateful component that renders TotalsDisplay and MarketsContainer
 *
 * ************************************
 */

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { counter } from '../reducers/generalReducers.js';

const MainContainer = () => {

  const dispatch = useDispatch();

  const count = useSelector(state => state.general.count);

  return(
    <div className="container">
      <h1>{count}</h1>
      <button onClick={ () => dispatch(counter()) }>increment</button>
    </div>
  );
};

export default MainContainer;