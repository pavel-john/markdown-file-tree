#!/usr/bin/env node
import path from 'path';
import { initConfig, getConfig } from './config';
import * as FSUtils from './fsUtils';

import ReactDOMServer from 'react-dom/server';

const buildFormatFile = (linkPrefix, treeOffset) => fileName => {
  const trimmedFileName = getConfig('trimExtension') ? FSUtils.trimExtension(fileName) : fileName;
  return `${treeOffset}  - [${trimmedFileName}](${linkPrefix}/${trimmedFileName})\n`;
};

const formatTree = (tree, linkPrefix, depth) => {
  const treeOffset = ' '.repeat(depth * 2);
  const collapsible = tree.childDirs.length + tree.childFiles.length > 0;
  let string = formatDirectory(tree.hasRootMd, treeOffset, depth, tree.rootName, linkPrefix, collapsible);


  const bulletStart = depth > 0 ? '<li> ' : '';
  const bulletEnd = depth > 0 ? '</li> ' : '';
  const fileName = depth === 0
    ? FSUtils.trimExtension(getConfig('rootFileName'))
    : tree.rootName;
  const treeTitle = tree.hasRootMd
    ? `<a href="${linkPrefix}/${fileName}">${rootName}</a>`
    : rootName;

  const childDirs = string.concat(tree.childDirs.join(''));

  const formatFile = buildFormatFile(linkPrefix, treeOffset);
  const childFilesMd = tree.childFiles.map(formatFile);
  const childFiles = string.concat(childFilesMd.join(''));

  const collapsibleEnd = collapsible
    ? '</details>'
    : '';

  const subTree = collapsible
    ? `${treeOffset}${bulletStart}<details><summary>${treeTitle}</summary> \n${treeOffset}${bulletEnd}`
    : `${treeOffset}${rootBullet}[${rootName}](${linkPrefix}/${fileName})\n`;


  if (tree.childFiles.length > 0) {


    if (collapsible) {
      string = string + '</p>\n</details>';
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
      hasRootMd: false,
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
        const childLinkPrefix = `${linkPrefix}`;
        const childDir = await mdFileTree(childPath, childLinkPrefix, depth + 1);
        if (childDir !== null) {
          tree.childDirs.push(childDir);
        }
      } else if (
        depth === 0 && getConfig('rootFileName') === child ||
        tree.rootName === FSUtils.trimExtension(child)
      ) {
        tree.hasRootMd = true;
      } else if (getConfig('include').some(include => include.test(child))) {
        tree.childFiles.push(child);
      }
      return;
    }));

    return (tree.hasRootMd || tree.childDirs.length + tree.childFiles.length > 0)
      ? formatTree(tree, linkPrefix, depth)
      : null;
  };

  const run = async configPath => {
    try {
      ReactDOMServer.renderToStaticMarkup();

      await initConfig(configPath || '.mftrc.json');
      const dirPath = path.resolve(FSUtils.resolveHome(getConfig('source')));
      const tree = await mdFileTree(dirPath, getConfig('linkPrefix'));
      const outputPath = path.resolve(FSUtils.resolveHome(getConfig('output')));
      await FSUtils.writeFilePromise(outputPath, tree);
    } catch (error) {
      console.log(error);
    }
  };

  run(process.argv[2]);
