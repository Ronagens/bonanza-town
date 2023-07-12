import React, { useState } from 'react';

import DragDropFile from './DragDropFile.jsx';
import FileNavItem from './FileNavItem.jsx';

const FileNavigator = () => {

  // const [navItems, setNavItems] = useState([]);

  const newNavItems = [];
  for (let i = 0; i < 5; i++) {
    newNavItems.push(<FileNavItem name={i} />)
  }

  return(
    <div>
      <p>HI HI THIS IS FILE NAVIGATOR</p>
      <div>
        {newNavItems}
      </div>
      <div className="file-upload">
        <DragDropFile />
      </div>
    </div>
  );
};

export default FileNavigator;