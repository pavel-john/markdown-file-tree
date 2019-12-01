import * as FSUtils from './fsUtils';

const parseValidRegexArray = value => {
  if (!Array.isArray(value) || value.some(item => typeof (item) !== 'string')) {
    throw new Error('Not an array of strings.');
  }
  return value.map(regexp => new RegExp(regexp));
};

const parseValidNonnegativeInteger = value => {
  if (!Number.isInteger(value) || value < 0) {
    throw new Error('Is not an integer >= 0.');
  }
  return value;
};

const parseValidString = value => {
  if (typeof (value) !== 'string') {
    throw new Error('Is not a string.');
  }
  return value;
};

const parseValidBoolean = value => {
  if (typeof (value) !== 'boolean') {
    throw new Error('Is not a boolean.');
  }
  return value;
};

const configSchema = {
  exclude: {
    doc: 'What paths shall be excluded (exclude is preferred to include). Array of JavaScript RegEx strings.',
    default: [
      '\\.git',
      '_Sidebar',
      'node_modules',
    ],
    parse: parseValidRegexArray,
  },
  include: {
    doc: 'What paths shall be included (exclude is preferred to include). Array of JavaScript RegEx strings.',
    default: [
      '.*\\.md$',
    ],
    parse: parseValidRegexArray,
  },
  maxDepth: {
    doc: 'Maximum depth of recursion. Source root directory is 0.',
    default: Number.MAX_SAFE_INTEGER,
    parse: parseValidNonnegativeInteger,
  },
  rootFileName: {
    doc: 'Each directory including source root can have a root file. ' +
      'Directory name is linked to this root file if it exists. Directory name is not a link otherwise.',
    default: 'Home.md',
    parse: parseValidString,
  },
  source: {
    doc: 'Source root directory.',
    default: '.',
    parse: parseValidString,
  },
  output: {
    doc: 'Output file.',
    default: '_Sidebar.md',
    parse: parseValidString,
  },
  linkPrefix: {
    doc: 'All links are relative addresses to source root directory. This adds a prefix to each link, which may be handy when source is not ".".',
    default: '.',
    parse: parseValidString,
  },
  trimExtension: {
    doc: 'Whether file extension should be trimmed (in both links and titles).',
    default: true,
    parse: parseValidBoolean,
  },
};

const config = {};

export const initConfig = async configPath => {
  try {
    const configExists = await FSUtils.existsPromise(configPath);
    const userConfig = configExists
      ? JSON.parse(await FSUtils.readfilePromise(configPath))
      : {};

    Object.keys(configSchema).forEach(key => {
      const userValue = userConfig[key];
      const schema = configSchema[key];
      if (typeof (userValue) === 'undefined') {
        config[key] = schema.parse(schema.default);
      } else {
        try {
          config[key] = schema.parse(userValue);
        } catch (error) {
          throw new Error(`'${key}': ${error && error.message}`);
        }
      }
    });


  } catch (error) {
    throw new Error(`Cannot parse config file '${configPath}'. ` + error && error.message);
  }
};

export const getConfig = key => config[key];
