import React, { useState } from 'react';

import DragDropFile from './DragDropFile.jsx';

const FileNavigator = () => {

  

  

  return(
    <div>
      <p>HI HI THIS IS FILE NAVIGATOR</p>
      <div className="file-upload">
        <DragDropFile />
      </div>
    </div>
  );
};

export default FileNavigator;