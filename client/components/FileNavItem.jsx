import React, { useState } from 'react';

const FileNavItem = (props) => {

  return(
    <div className='file-nav-item'>
      <p>{props.name}</p>
    </div>
  );
};

export default FileNavItem;