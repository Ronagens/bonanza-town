import React, { useState } from 'react';
import axios from 'axios';

import DragDropFile from './DragDropFile.jsx';

const FileNavigator = () => {

  const [file, setFile] = useState(null);

  function upDateFile(e) {
    setFile(e.target.files[0]);
  }

  function uploadFile() {
    const formData = new FormData();

    formData.append(
      'myFile',
      file,
      file.name
    )

    console.log('file: ', file);

    axios.post('/file', formData);
  }

  return(
    <div>
      <p>HI HI THIS IS FILE NAVIGATOR</p>
      <div className="file-upload">
        <input type="file" onChange={upDateFile} />
        <button onClick={uploadFile}>
          Upload!
        </button>
      </div>
    </div>
  );
};

export default FileNavigator;