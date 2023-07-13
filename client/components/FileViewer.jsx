import React, { useEffect, useState } from 'react';


const FileViewer = (props) => {
  const { previewFile } = props;

  if (previewFile) {
    console.log(previewFile);
    if (previewFile.file.type === 'text/plain') {
      return (
        <div className="file-viewer">
          <pre>{previewFile.preview}</pre>
        </div>
      );
    }
    else if (previewFile.file.type === 'image/png') {
      return (
        <div className="file-viewer container-center">
          <img id="preview-image" src={previewFile.preview} />
        </div>
      )
    }
    else {
      return (
        <div className="file-viewer">
          <h1>Unable to display file</h1>
        </div>
      )
    }
  }
  else {
    return(
      <div className="file-viewer">

      </div>
    );
  }
  
};

export default FileViewer;