import React, { useState } from 'react';

const FileNavItem = (props) => {

  return(
    <div className='file-nav-item'>
      <p>{props.name}</p>
      <button className='download-button' onClick={() => props.downloadFile(props.id)}>Download</button>
      <button className='delete-button' onClick={() => props.deleteFile(props.id, props.name)}>Delete</button>
    </div>
  );
};

export default FileNavItem;