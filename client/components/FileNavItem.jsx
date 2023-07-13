import React, { useState } from 'react';

const FileNavItem = (props) => {

  return(
    <div className='file-nav-item'>
      <p onClick={() => props.getNewPreviewFile(props.id, props.name)}>{props.name}</p>
      <button className='download-button' onClick={() => props.downloadFile(props.id, props.name)}>Download</button>
      <button className='delete-button' onClick={() => props.deleteFile(props.id, props.name)}>Delete</button>
    </div>
  );
};

export default FileNavItem;