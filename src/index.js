#!/usr/bin/env node
import path from 'path';
import { initConfig, getConfig } from './config';
import * as FSUtils from './fsUtils';

const buildFormatFile = (linkPrefix, treeOffset) => fileName => {
  const trimmedFileName = getConfig('trimExtension') ? FSUtils.trimExtension(fileName) : fileName;
  return `${treeOffset}  - [${trimmedFileName}](${linkPrefix}/${trimmedFileName})\n`;
};

const formatTree = (tree, linkPrefix, depth) => {
  const treeOffset = ' '.repeat(depth * 2);
  const rootBullet = depth > 0 ? '- ' : '';
  let string = (tree.rootMd)
    ? `${treeOffset}${rootBullet}[${tree.rootName}](${linkPrefix}/${getConfig('rootFileName')})\n`
    : `${treeOffset}${rootBullet}${tree.rootName}\n`;

  if (tree.childDirs.length > 0) {
    string = string.concat(tree.childDirs.join(''));
  }

  if (tree.childFiles.length > 0) {
    const formatFile = buildFormatFile(linkPrefix, treeOffset);
    const childFilesMd = tree.childFiles.map(formatFile);
    string = string.concat(childFilesMd.join(''));
  }
  return string;
};

const mdFileTree = async (dirPath, linkPrefix, depth = 0) => {
  if (depth > getConfig('maxDepth')) {
    return null;
  }

  const tree = {
    rootName: path.basename(dirPath),
    rootPath: path.resolve(dirPath),
    rootMd: false,
    childDirs: [],
    childFiles: [],
  };
  const children = await FSUtils.readdirPromise(dirPath);

  await Promise.all(children.map(async child => {
    const childPath = path.resolve(dirPath, child);
    if (getConfig('exclude').some(exclude => exclude.test(childPath))) {
      return;
    }
    const childStats = await FSUtils.statPromise(childPath);
    if (childStats.isDirectory()) {
      const childLinkPrefix = `${linkPrefix}/${child}`;
      const childDir = await mdFileTree(childPath, childLinkPrefix, depth + 1);
      if (childDir !== null) {
        tree.childDirs.push(childDir);
      }
    } else if (getConfig('rootFileName') === child) {
      tree.rootMd = true;
    } else if (getConfig('include').some(include => include.test(child))) {
      tree.childFiles.push(child);
    }
    return;
  }));

  return (tree.rootMd || tree.childDirs.length + tree.childFiles.length > 0)
    ? formatTree(tree, linkPrefix, depth)
    : null;
};

const run = async configPath => {
  try {
    await initConfig(configPath ||  '.mftrc.json');
    const dirPath = path.resolve(FSUtils.resolveHome(getConfig('source')));
    const tree = await mdFileTree(dirPath, getConfig('linkPrefix'));
    const outputPath = path.resolve(FSUtils.resolveHome(getConfig('output')));
    await FSUtils.writeFilePromise(outputPath, tree);
  } catch (error) {
    console.log(error);
  }
};

run(process.argv[2]);
