import React from 'react';
import PropTypes from 'prop-types';
import * as FSUtils from '../fsUtils';

const RootDirectory = ({ fileName }) => {
  const fileNameTrimmed = FSUtils.trimExtension(fileName);
  return <li><a href={fileNameTrimmed}>{fileNameTrimmed}</a></li>;
};

RootDirectory.propTypes = {
  fileName: PropTypes.string,
};

export default RootDirectory;
