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
import FileViewer from '../components/FileViewer.jsx';

const MainContainer = () => {

  // Array of files on the server
  const [files, setFiles] = useState([]);
  const [previewFile, setPreviewFile] = useState(null);
  const [user, setUser] = useState(null);
  const [userInput, setUserInput] = useState({
    username: null,
    password: null
  });

  // Get files from server on initial load
  useEffect(() => {
    getFileNames();
  }, [user])

  // Gets all files from server
  function getFileNames() {
    fetch('/file')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setFiles(data)
    })
    .catch(err => console.log('MainContainer getFileNames error: ', err));
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
      getFileNames();
    })
    .catch(err => console.log('Error in MainContainer deleteFile: ', err));
  }

  function getFileData(id) {
    return fetch('/file/download/' + id)
      .then(response => response.blob())
      .catch(err => console.log('Error in MainContainer getFileData: ', err));
  }

  // Downloads a file form server matching id
  async function downloadFile(id, name) {
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
      getFileNames();
    })
    .catch(err => console.log('Error in MainContainer downloadFile: ', err));
  }

  function getNewPreviewFile(id, name) {
    const newFile = files.find(el => el.name === name);
    console.log(newFile);

    updatePreviewFile(newFile);
  }

  function updatePreviewFile(newFile) {
    const reader = new FileReader();
    reader.onload = function() {
      setPreviewFile({ file: newFile, preview: reader.result });
    }

    if (newFile.type === 'text/plain') {
      reader.readAsText(newFile);
    }
    else if (newFile.type === 'image/png') {
      reader.readAsDataURL(newFile);
    }
    
  }

  function updateUserInfo(e) {
    setUserInput({
      ...userInput,
      username: e.target.parentNode[0].value,
      password: e.target.parentNode[1].value
    })
  }

  function loginUser() {
    if (userInput.username && userInput.password) {
      fetch('/user/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ username: userInput.username, password: userInput.password })
      })
      .then(response => response.json())
      .then(data => {
        setUser({
          ...data,
          password: null
        })
        console.log('changed user on login: ', data);
      })
      .catch(err => {
        console.log('Error occured in MainContainer loginUser: ', err);
      })
    }
    else {
      console.log('me angy');
    }
  }

  function createUser() {
    if (userInput.username && userInput.password) {
      fetch('/user/signup', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ username: userInput.username, password: userInput.password })
      })
      .then(response => response.json())
      .then(data => {
        setUser({
          ...data,
          password: null
        });
        console.log('changed user on signup: ', data);
      })
      .catch(err => console.log('Error in MainContainer createUser: ', err));
    }
    else {
      // make mad
      console.log('missing username or password')
    }
  }

  function logoutUser() {
    setUser(null);
  }

  return(
    <div className="container-main">
      <HeaderNavBar loginUser={loginUser} createUser={createUser} updateUserInfo={updateUserInfo} user={user} logoutUser={logoutUser} />
      <div className="file-navigator">
        <FileNavigator files={files} deleteFile={deleteFile} downloadFile={downloadFile} getNewPreviewFile={getNewPreviewFile} />
      </div>
      <div className="file-upload">
        <DragDropFile getFileNames={getFileNames} updatePreviewFile={updatePreviewFile} />
      </div>
      <FileViewer previewFile={previewFile} />
    </div>
  );
};

export default MainContainer;