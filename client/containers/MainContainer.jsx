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

import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { counter } from '../reducers/generalReducers.js';

import FileNavigator from '../components/FileNavigator.jsx';
import DragDropFile from '../components/DragDropFile.jsx';

const MainContainer = () => {

  const [files, setFiles] = useState([]);

  useEffect(() => {
    getFiles();
  }, [])

  function getFiles() {
    fetch('/file')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setFiles(data)
    })
    .catch(err => console.log('FileNavigator getFiles error: ', err));
  }

  function deleteFile(id, name) {
    console.log('deleting: ', id);
    fetch('/file/' + id, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
      console.log('Deleted: ', data)
      getFiles();
    })
    .catch(err => console.log('Error in FileNavigator deleteFile: ', err));
  }

  function downloadFile(id) {
    console.log('downloading: ', id);
  }

  return(
    <div className="container-main">
      <div className="header-nav-bar">
        <header>
          <h1>FILE SHARE BONANZA TOWN</h1>
        </header>
      </div>
      <div className="file-navigator">
        <FileNavigator files={files} deleteFile={deleteFile} downloadFile={downloadFile} />
      </div>
      <div className="file-upload">
        <DragDropFile getFiles={getFiles} />
      </div>
    </div>
  );
};

export default MainContainer;