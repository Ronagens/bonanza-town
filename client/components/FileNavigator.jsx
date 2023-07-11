import React from 'react';

import DragDropFile from './DragDropFile.jsx';

const FileNavigator = () => {

  function submitForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    // const data = new URLSearchParams(formData);
    console.log(formData);

    // 'multipart/form-data'
    fetch('/file', {
      method: 'POST',
      headers: {
        'Content-type': 'multipart/form-data'
      },
      body: formData
    })
    .then(res => console.log(res))
    .catch(err => console.log('error: ', err));
  }

  return(
    <div>
      <p>HI HI THIS IS FILE NAVIGATOR</p>
      <div className="file-upload">
        <form onSubmit={(e) => submitForm(e)}>
          <input name="username" type="text" placeholder="username"></input>
          <input name="password" type="text" placeholder="password"></input>
          <input name="file" type="file"></input>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default FileNavigator;