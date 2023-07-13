import React, { useEffect, useState } from 'react';

import FileNavItem from './FileNavItem.jsx';

const FileNavigator = (props) => {
  const { files, downloadFile, deleteFile } = props;

  const newNavItems = [];
  for (let i = 0; i < files.length; i++) {
    newNavItems.push(<FileNavItem name={files[i].name} key={files[i]._id} id={files[i]._id} deleteFile={deleteFile} downloadFile={downloadFile} />)
  }

  return(
    <div>
      {newNavItems}
    </div>
  );
};

export default FileNavigator;