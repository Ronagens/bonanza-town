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
    let url = '/file/';
    if (user) url += 'myfiles/' + user._id
    fetch(url)
      .then(response => response.json())
      .then(data => {
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
        getFileNames();
      })
      .catch(err => console.log('Error in MainContainer deleteFile: ', err));
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
        getFileNames();
      })
      .catch(err => console.log('Error in MainContainer downloadFile: ', err));
  }

  function getNewPreviewFile(id, name) {
    fetch('/file/preview/' + id)
      .then(response => {
        return response.blob()
      })
      .then(blob => {
        fetch('/file/previewinfo/' + id)
          .then(response => response.json())
          .then(data => {
            const newFile = new File([blob], data.name, { type: data.type });
            updatePreviewFile(newFile);
          })
          .catch(err => console.oog('Error in MainConainer getNewPreviewFile getting the info: ', err));
      })
      .catch(err => console.log('Error in MainContainer getNewPreviewFile: ', err));
  }

  function updatePreviewFile(newFile) {
    const reader = new FileReader();
    reader.onload = function() {
      setPreviewFile({ file: newFile, preview: reader.result });
    }

    if (newFile.type === 'text/plain' || newFile.type === 'application/x-javascript') {
      reader.readAsText(newFile);
    }
    else if (newFile.type === 'image/png' || newFile.type === 'audio/mpeg') {
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
          getFileNames();
        })
        .catch(err => {
          console.log('Error occured in MainContainer loginUser: ', err);
        })
    }
    else {
      console.log('me angry');
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
    setPreviewFile(null);
    getFileNames();
  }

  return(
    <div className="container-main">
      <HeaderNavBar loginUser={loginUser} createUser={createUser} updateUserInfo={updateUserInfo} user={user} logoutUser={logoutUser} />
      <div className="file-navigator">
        <FileNavigator files={files} deleteFile={deleteFile} downloadFile={downloadFile} getNewPreviewFile={getNewPreviewFile} />
      </div>
      <div className="file-upload">
        <DragDropFile getFileNames={getFileNames} updatePreviewFile={updatePreviewFile} user={user} />
      </div>
      <FileViewer previewFile={previewFile} />
    </div>
  );
};

export default MainContainer;