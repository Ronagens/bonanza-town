import React, { useEffect, useState } from 'react';

import FileNavItem from './FileNavItem.jsx';

const FileNavigator = () => {

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

  const newNavItems = [];
  for (let i = 0; i < files.length; i++) {
    newNavItems.push(<FileNavItem name={files[i].name} key={files[i]._id} id={files[i]._id} deleteFile={deleteFile} downloadFile={downloadFile} />)
  }

  return(
    <div>
      <p>HI HI THIS IS FILE NAVIGATOR</p>
      <div>
        {newNavItems}
      </div>
    </div>
  );
};

export default FileNavigator;