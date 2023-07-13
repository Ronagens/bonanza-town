import React, { useState } from 'react';

const FileNavItem = (props) => {

  return(
    <div className='file-nav-item' onClick={() => props.getNewPreviewFile(props.id, props.name)}>
      <p>{props.name}</p>
      <button className='download-button' onClick={() => props.downloadFile(props.id, props.name)}>Download</button>
      <button className='delete-button' onClick={() => props.deleteFile(props.id, props.name)}>Delete</button>
    </div>
  );
};

export default FileNavItem;