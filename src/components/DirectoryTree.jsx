import React from 'react';
import PropTypes from 'prop-types';
import { getConfig } from '../config';
import * as FSUtils from '../fsUtils';
import Directory from './Directory';
import File from './File';

const RootDirectory = ({ tree }) => (
  <div>
    {
      tree.hasRootMd
        ? (<a href={FSUtils.trimExtension(getConfig('rootFileName'))}>{tree.rootName}</a>)
        : (<>{tree.rootName}</>)
    }
    <ul>
      {tree.childDirs.map((childDir, index) => <Directory key={index} tree={childDir} depth={1} />)}
      {tree.childFiles.map((childFile, index) => <File key={index} fileName={childFile} />)}
    </ul>
  </div>
);

RootDirectory.propTypes = {
  tree: PropTypes.object,
  depth: PropTypes.number,
};

export default RootDirectory;
