import React, { useEffect, useState } from 'react';

import DragDropFile from './DragDropFile.jsx';
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

  const newNavItems = [];
  for (let i = 0; i < files.length; i++) {
    newNavItems.push(<FileNavItem name={files[i].name} key={files[i]._id} />)
  }

  return(
    <div>
      <p>HI HI THIS IS FILE NAVIGATOR</p>
      <div>
        {newNavItems}
      </div>
      <div className="file-upload">
        <DragDropFile />
      </div>
    </div>
  );
};

export default FileNavigator;