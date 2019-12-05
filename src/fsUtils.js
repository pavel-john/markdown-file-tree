import fs from 'fs';
import path from 'path';

export const readfilePromise = filePath => new Promise(
  (resolve, reject) => fs.readFile(filePath,
    (error, data) => (error ? reject(error) : resolve(data))),
);

export const readdirPromise = dirPath => new Promise(
  (resolve, reject) => fs.readdir(dirPath,
    (error, files) => (error ? reject(error) : resolve(files))),
);

export const writeFilePromise = (filepath, data, options) => new Promise(
  (resolve, reject) => fs.writeFile(filepath, data, options,
    error => (error ? reject(error) : resolve())),
);

export const statPromise = filePath => new Promise(
  (resolve, reject) => fs.stat(filePath,
    (error, stats) => error ? reject(error) : resolve(stats)),
);

export const trimExtension = fileName => {
  const dotSplit = fileName.split('.');
  return dotSplit.length > 1
    ? dotSplit.slice(0, -1).join('.')
    : fileName;
};

export const resolveHome = filepath => (filepath[0] === '~')
  ? path.join(process.env.HOME, filepath.slice(1))
  : filepath;

export const existsPromise = filePath => new Promise(resolve => {
  fs.exists(filePath, exists => resolve(exists));
});
