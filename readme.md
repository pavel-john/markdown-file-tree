# Markdown File Tree

Generate file-tree in markdown, including links to particular file.

Intended to help with TOC (table of centents) in a sidebar of Github wiki pages such as `https://github.com/<user>/<repository>.wiki`, see more at [Documenting your project with wikis](https://help.github.com/en/github/building-a-strong-community/documenting-your-project-with-wikis). Github wiki `Pages` menu displays only top-level directory files. Markdown File Tree traverses directory structure, creates multi-level tree and saves it to a file, by default `_Sidebar.md` which is recognised by Github and placed to the sidebar right under the default menu.



## Getting started

Follow these instructions to [configure](#configuration) and [run](#install_run) the tool.

### Install/Run

Install as dev-dependency to your
```
npm install --save-dev markdown-file-tree
```

Run with [npx](https://www.npmjs.com/package/npx)

```
npx markdown-file-tree [configPath]
```



### Configuration
Configuration file is a `JSON` file, by default `.mftrc.json` in the current directory. Path to configuration can be specified by optional command argument.

Configuration values are as follows:

- `exclude`
  - What paths shall be excluded (exclude is preferred to include). Array of JavaScript RegEx strings.
  - **Type:** Array of [RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
  - **Default value:** `[ '\\.git', '_Sidebar', 'node_modules' ]`
- `include`
  - What paths shall be included (exclude is preferred to include). Array of JavaScript RegEx strings.
  - **Type:** Array of [RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
  - **Default value:** `[ '.*\\.md$' ]`
- `maxDepth`
  - Maximum depth of recursion. Source root directory is 0.
  - **Type:** non-negative integer
  - **Default value:** `Number.MAX_SAFE_INTEGER`
- `rootFileName`
  - The root file name. Directory roots shall have the same name as the directory itself.
  - **Type:** string
  - **Default value:** `'Home.md'`
- `source`
  - Source root directory.
  - **Type:** string
  - **Default value:** `'.'`
- `output`
  - Output file.
  - **Type:** string
  - **Default value:** `'_Sidebar.md'`
- `linkPrefix`
  - All links are relative addresses to source root directory. This adds a prefix to each link, which may be handy when source is not `'.'`.
  - **Type:** string
  - **Default value:** `'.'`
- `trimExtension`
  - Whether file extension should be trimmed (in both links and titles).
  - **Type:** boolean
  - **Default value:** `true`

## License

The project is licensed under MIT License - see the [license.md](license.md) file for details.
