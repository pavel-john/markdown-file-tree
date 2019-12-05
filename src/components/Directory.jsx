import React from 'react';
import PropTypes from 'prop-types';
import File from './File';

const Directory = ({ tree, depth }) => (
  <li>
    {
      tree.hasRootMd
        ? (<a href={tree.rootName}>{tree.rootName}</a>)
        : (<>{tree.rootName}</>)
    }
    <ul>
      {tree.childDirs.map((childDir, index) => {
        const hasChildren = childDir.childDirs.length + childDir.childFiles.length > 0;
        return hasChildren
          ? <Directory key={index} tree={childDir} depth={depth + 1} />
          : <File key={index} fileName={childDir.rootName} />;
      })}
      {tree.childFiles.map((childFile, index) => <File key={index} fileName={childFile} />)}
    </ul>
  </li>
);

Directory.propTypes = {
  tree: PropTypes.object,
  depth: PropTypes.number,
};

export default Directory;
