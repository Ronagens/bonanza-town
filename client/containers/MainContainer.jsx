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

import FileNavigator from '../components/FileNavigator.jsx';
import DragDropFile from '../components/DragDropFile.jsx';
import HeaderNavBar from '../components/HeaderNavBar.jsx';

const MainContainer = () => {

  // Array of files on the server
  const [files, setFiles] = useState([]);
  const [user, setUser] = useState({
    username: null,
    password: null,
    files: []
  });

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

  function updateUserInfo(e) {
    setUser({
      ...user,
      username: e.target.parentNode[0].value,
      password: e.target.parentNode[1].value
    })
  }

  function loginUser(e) {
    console.log(e.target.parentNode[0]);
  }

  function createUser() {
    if (user.username && user.password) {
      fetch('/user/signup', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ username: user.username, password: user.password })
      })
      .then(response => response.json())
      .then(data => {{
        setUser({
          ...data,
          password: null
        });
        console.log('changed user: ', user);
      }})
      .catch(err => console.log('Error in MainContainer createUser: ', err));
    }
    else {
      // make mad
      console.log('missing username or password')
    }
  }

  return(
    <div className="container-main">
      <HeaderNavBar loginUser={loginUser} createUser={createUser} updateUserInfo={updateUserInfo} />
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