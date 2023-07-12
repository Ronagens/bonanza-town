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
import { useSelector, useDispatch } from 'react-redux';
import { counter } from '../reducers/generalReducers.js';

import FileNavigator from '../components/FileNavigator.jsx';
import DragDropFile from '../components/DragDropFile.jsx';
import HeaderNavBar from '../components/HeaderNavBar.jsx';

const MainContainer = () => {

  // Array of files on the server
  const [files, setFiles] = useState([]);

  // Get files from server on initial load
  useEffect(() => {
    getFiles();
  }, [])

  // Gets all files from server
  function getFiles() {
    fetch('/file')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setFiles(data)
    })
    .catch(err => console.log('FileNavigator getFiles error: ', err));
  }

  // Deletes a file from server matching the input id
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

  // Downloads a file form server matching id
  function downloadFile(id, name) {
    console.log('downloading: ', id);
    fetch('/file/download/' + id)
    .then(response => response.blob())
    .then(blob => {
      // Downloads to user's computer
      const fileURL = window.URL.createObjectURL(blob);
      let alink = document.createElement('a');
      alink.href = fileURL;
      alink.download = name;
      alink.click();
      getFiles();
    })
    .catch(err => console.log('Error in FileNavigator downloadFile: ', err));
  }

  return(
    <div className="container-main">
      <HeaderNavBar />
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