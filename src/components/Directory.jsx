import React from 'react';
import PropTypes from 'prop-types';

const Directory = ({ tree, depth }) => (
  <li>
    {
      tree.hasRootMd
        ? (<a href={tree.rootName}>{tree.rootName}</a>)
        : (<>{tree.rootName}</>)
    }
    <ul>
      {tree.childDirs.map((childDir, index) => <Directory key={index} tree={childDir} depth={depth + 1} />)}
      {tree.childFiles.map((childFile, index) => <li key={index}><a href={childFile}>{childFile}</a></li>)}
    </ul>
  </li>
);

Directory.propTypes = {
  tree: PropTypes.object,
  depth: PropTypes.number,
};

export default Directory;
