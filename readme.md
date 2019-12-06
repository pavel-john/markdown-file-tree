# Markdown File Tree

Generate file-tree of markdown files in **GitHub wiki sidebar**.

Intended to help with TOC (table of contents) in a sidebar of Github wiki pages such as `https://github.com/<user>/<repository>/wiki`, see more at [Documenting your project with wikis](https://help.github.com/en/github/building-a-strong-community/documenting-your-project-with-wikis). Github wiki `Pages` menu displays only single-level directory files. Markdown File Tree traverses directory structure, creates multi-level tree in HTML and saves it to a file, by default `_Sidebar.md` which is recognised by Github and placed to the sidebar right under the default menu.

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

## Features / Tips / HOWTOs

### Directory Main Files
When you use the same name for directory and file: `.../<name>/<name>.md`, the item representing directory is clickable and the file is ommited from the list below the directory.

If the only `md` file in the directory is named after it, the directory appears as file in effect and you can use it for associating resources like images ther.

### No Collapsing
Wiki is not single-page-app so when you expand a node representing a folder and then navigate to another `md` file from sidebar, everything is re-loaded and collapsed again.

It's easy to search the sidebar using `ctrl`+`f` fulltext search in browser. You'd loose this functionality because of collapsing your tree.

### Absolute Paths Only
GitHub wiki transforms the nested structure into a flat one. Every `md` file gets address `https://github.com/<user>/<repository>/wiki/<file-name>` and is stripped of the `.md` extension. As a side-effect, relative references work in root only, which is kinda stupid. You can either use path relative to the root
```
myDirectory/nestedDirectory/image1.png
```
or more unieversal and recommended
```
https://github.com/<user>/<repository>/wiki/myDirectory/nestedDirectory/image1.png
```


### Configuration
Configuration file is a `JSON` file, by default `.mftrc.json` in the current directory. Path to configuration can be specified by optional command-line argument.

```
npx markdown-file-tree [configPath]
```

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

## License

The project is licensed under MIT License - see the [license.md](license.md) file for details.
