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
// import { useSelector, useDispatch } from 'react-redux';
// import { counter } from '../reducers/generalReducers.js';

import FileNavigator from '../components/FileNavigator.jsx';
import DragDropFile from '../components/DragDropFile.jsx';

const MainContainer = () => {

  // const dispatch = useDispatch();
  // const count = useSelector(state => state.general.count);
  // <h1>{count}</h1>
  // <button onClick={ () => dispatch(counter()) }>increment</button>

  return(
    <div className="container-main">
      <div className="header-nav-bar">
        <header>
          <h1>FILE SHARE BONANZA TOWN</h1>
        </header>
      </div>
      <div className="file-navigator">
        <FileNavigator />
      </div>
      <div className="file-upload">
        <DragDropFile />
      </div>
    </div>
  );
};

export default MainContainer;