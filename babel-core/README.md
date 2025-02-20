# babel-core

> Babel compiler core.


```javascript
var babel = require("babel-core");
import { transform } from 'babel-core';
import * as babel from 'babel-core';
```

## babel.transform(code: string, [options?](/docs/usage/api/#options): Object)

Transforms the passed in `code`. Returning an object with the generated code,
source map, and AST.

```js
babel.transform(code, options) // => { code, map, ast }
```

**Example**

```js
var result = babel.transform("code();", options);
result.code;
result.map;
result.ast;
```

## babel.transformFile(filename: string, [options?](/docs/usage/api/#options): Object, callback: Function)

Asynchronously transforms the entire contents of a file.

```js
babel.transformFile(filename, options, callback)
```

**Example**

```js
babel.transformFile("filename.js", options, function (err, result) {
  result; // => { code, map, ast }
});
```

## babel.transformFileSync(filename: string, [options?](/docs/usage/api/#options): Object)

Synchronous version of `babel.transformFile`. Returns the transformed contents of
the `filename`.

```js
babel.transformFileSync(filename, options) // => { code, map, ast }
```

**Example**

```js
babel.transformFileSync("filename.js", options).code;
```

## babel.transformFromAst(ast: Object, code?: string, [options?](/docs/usage/api/#options): Object)

Given, an [AST](https://astexplorer.net/), transform it.

```js
const code = "if (true) return;";
const ast = babylon.parse(code, { allowReturnOutsideFunction: true });
const { code, map, ast } = babel.transformFromAst(ast, code, options);
```

## Options

<blockquote class="babel-callout babel-callout-info">
  <h4>Babel CLI</h4>
  <p>
    You can pass these options from the Babel CLI like so:
  </p>
  <p>
    <code>babel --name<span class="o">=</span>value</code>
  </p>
</blockquote>

Following is a table of the options you can use:

| Option                   | Default              | Description                     |
| ------------------------ | -------------------- | ------------------------------- |
| `filename`               | `"unknown"`          | Filename for use in errors etc. |
| `filenameRelative`       | `(filename)`         | Filename relative to `sourceRoot`. |
| `presets`                | `[]`                 | List of [presets](/docs/plugins/#presets) (a set of plugins) to load and use. |
| `plugins`                | `[]`                 | List of [plugins](/docs/plugins/) to load and use. |
| `parserOpts`             | `{}`                 | An object containing the options to be passed down to the babel parser, babylon |
| `generatorOpts`          | `{}`                 | An object containing the options to be passed down to the babel code generator, babel-generator |
| `highlightCode`          | `true`               | ANSI highlight syntax error code frames |
| `only`                   | `null`               | A [glob](https://github.com/isaacs/minimatch), regex, or mixed array of both, matching paths to **only** compile. Can also be an array of arrays containing paths to explicitly match. When attempting to compile a non-matching file it's returned verbatim. |
| `ignore`                 | `null`               | Opposite to the `only` option. `ignore` is disregarded if `only` is specified. |
| `auxiliaryCommentBefore` | `null`               | Attach a comment before all non-user injected code. |
| `auxiliaryCommentAfter`  | `null`                | Attach a comment after all non-user injected code. |
| `sourceMaps`             | `false`              | If truthy, adds a `map` property to returned output. If set to `"inline"`, a comment with a sourceMappingURL directive is added to the bottom of the returned code. If set to `"both"` then a `map` property is returned as well as a source map comment appended. **This does not emit sourcemap files by itself!** To have sourcemaps emitted using the CLI, you must pass it the `--source-maps` option. |
| `inputSourceMap`         | `null`               | A source map object that the output source map will be based on. |
| `sourceMapTarget`        | `(filenameRelative)` | Set `file` on returned source map. |
| `sourceFileName`         | `(filenameRelative)` | Set `sources[0]` on returned source map. |
| `sourceRoot`             | `(moduleRoot)`       | The root from which all sources are relative. |
| `moduleRoot`             | `(sourceRoot)`       | Optional prefix for the AMD module formatter that will be prepend to the filename on module definitions. |
| `moduleIds`              | `false`              | If truthy, insert an explicit id for modules. By default, all modules are anonymous. (Not available for `common` modules) |
| `moduleId`               | `null`               | Specify a custom name for module ids. |
| `getModuleId`            | `null`               | Specify a custom callback to generate a module id with. Called as `getModuleId(moduleName)`. If falsy value is returned then the generated module id is used. |
| `resolveModuleSource`    | `null`               | Resolve a module source ie. `import "SOURCE";` to a custom value. Called as `resolveModuleSource(source, filename)`. |
| `code`                   | `true`               | Enable code generation |
| `no-babelrc`             | [CLI flag](http://babeljs.io/docs/usage/cli/#ignoring-babelrc) | Specify whether or not to use .babelrc and .babelignore files. Only available when using the CLI. |
| `ast`                    | `true`               | Include the AST in the returned object |
| `compact`                | `"auto"`             | Do not include superfluous whitespace characters and line terminators. When set to `"auto"` compact is set to `true` on input sizes of >500KB. |
| `minified`               | `false`              | Should the output be minified (not printing last semicolons in blocks, printing literal string values instead of escaped ones, stripping `()` from `new` when safe) |
| `comments`               | `true`               | Output comments in generated output. |
| `shouldPrintComment`     | `null`                 | An optional callback that controls whether a comment should be output or not. Called as `shouldPrintComment(commentContents)`. **NOTE:** This overrides the `comment` option when used. |
| `env`                    | `{}`                 | This is an object of keys that represent different environments. For example, you may have: `{ env: { production: { /* specific options */ } } }` which will use those options when the enviroment variable `BABEL_ENV` is set to `"production"`. If `BABEL_ENV` isn't set then `NODE_ENV` will be used, if it's not set then it defaults to `"development"` |
| `retainLines`            | `false`              | Retain line numbers. This will lead to wacky code but is handy for scenarios where you can't use source maps. (**NOTE:** This will not retain the columns) |
| `extends`                | `null`               | A path to an `.babelrc` file to extend |
