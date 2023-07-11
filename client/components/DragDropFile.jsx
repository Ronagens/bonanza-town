import React, { useState } from 'react';

const DragDropFile = () => {

  const [dragActive, setDragActive] = useState(false);

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
      uploadFile(e.dataTransfer.files[0]);
    }
  }

  const handleChange = function(e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      console.log('clicky files: ', e.target.files);
    }
  }

  const uploadFile = (file) => {
    const form = new FormData();
    form.append('test', true);
    console.log(form);
    fetch('/file', {
      method: 'POST',
      headers: {
        'content-length': '163',
        'content-type': 'multipart/form-data; boundary=--------------------------708012600792797463072238',
        connection: 'close',
        'accept-encoding': 'gzip, deflate, br',
        host: 'localhost:8080',
        accept: '*/*',
      },
      body: form
    })
    .then(response => console.log(response))
    // .then(success => console.log("Success: ", success))
    .catch(err => console.log(err));
  }

  return (
    <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
      <input type="file" id="input-file-upload" multiple={true} onChange={handleChange} />
      <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : "" }>
        <div>
          <p>Drag and drop your file here or</p>
          <button className="upload-button">Upload a file</button>
        </div> 
      </label>
      { dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
    </form>
  );
};

export default DragDropFile;