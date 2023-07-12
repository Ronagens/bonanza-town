import React, { useState } from 'react';
import axios from 'axios';

const DragDropFile = (props) => {

  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);

  async function uploadFile() {
    if (!file) return console.log('file is empty');

    try {
      const formData = new FormData();

      formData.append(
        'myFile',
        file,
        file.name
      )
      console.log('file: ', file);
      await axios.post('/file', formData);
  
      setFile(null);
      props.getFiles();
    }
    catch (err) {
      console.log('Error happened in DDF uploadFile: ', err);
    }
    
  }

  const handleDrag = function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    }
    else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }

  const handleDrop = function(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      console.log('draggy files: ', e.dataTransfer.files);
      setFile(e.dataTransfer.files[0]);
    }
  }

  const handleChange = function(e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
      <input type="file" id="input-file-upload" multiple={true} onChange={handleChange} />
      <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : "" }>
        <div>
          <p>Drag and drop your file then</p>
          <button className="upload-button" onClick={uploadFile}>Click to upload</button>
        </div> 
      </label>
      { dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
    </form>
  );
};

export default DragDropFile;