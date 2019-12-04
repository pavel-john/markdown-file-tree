import React from 'react';
import PropTypes from 'prop-types';
import { getConfig } from '../config';
import * as FSUtils from '../fsUtils';
import Directory from './Directory';

const RootDirectory = ({ tree }) => (
  <li>
    {
      tree.hasRootMd
        ? (<a href={FSUtils.trimExtension(getConfig('rootFileName'))}>{tree.rootName}</a>)
        : (<>{tree.rootName}</>)
    }
    <ul>
      {tree.childDirs.map((childDir, index) => <Directory key={index} tree={childDir} depth={1} />)}
      {tree.childFiles.map((childFile, index) => <li key={index}><a href={childFile}>{childFile}</a></li>)}
    </ul>
  </li>
);

RootDirectory.propTypes = {
  tree: PropTypes.object,
  depth: PropTypes.number,
};

export default RootDirectory;
