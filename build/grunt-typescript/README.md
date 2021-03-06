grunt-typescript
================
[![Build Status](https://travis-ci.org/k-maru/grunt-typescript.png?branch=master)](https://travis-ci.org/k-maru/grunt-typescript) [![NPM version](https://badge.fury.io/js/grunt-typescript.png)](http://badge.fury.io/js/grunt-typescript)

[![NPM](https://nodei.co/npm/grunt-typescript.png?downloads=true)](https://nodei.co/npm/grunt-typescript/)

Compile TypeScript in Grunt

[Release Note](CHANGELOG.md)

Important!
----------
``
BasePath option has been deprecated. Method for determining an output directory has been changed in the same way as the TSC. Please re-set output directory with the new rootDir option or use keepDirectoryHierachy option.However, keepDirectoryHierachy option would not be available long.
``

## Documentation
You'll need to install `grunt-typescript` first:

```
npm install grunt-typescript --save-dev
```

or add the following line to devDependencies in your package.json

```
"grunt-typescript": "",
```

Then modify your `Gruntfile.js` file by adding the following line:

```js
grunt.loadNpmTasks('grunt-typescript');
```

Then add some configuration for the plugin like so:

```js
grunt.initConfig({
  ...
  typescript: {
    base: {
      src: ['path/to/typescript/files/**/*.ts'],
      dest: 'where/you/want/your/js/files',
      options: {
        module: 'amd', //or commonjs
        target: 'es5', //or es3
        basePath: 'path/to/typescript/files',
        sourceMap: true,
        declaration: true
      }
    }
  },
  ...
});
```

If you want to create a js file that is a concatenation of all the ts file (like -out option from tsc),
you should specify the name of the file with the '.js' extension to dest option.

```js
grunt.initConfig({
  ...
  typescript: {
    base: {
      src: ['path/to/typescript/files/**/*.ts'],
      dest: 'where/you/want/your/js/file.js',
      options: {
        module: 'amd', //or commonjs
      }
    }
  },
  ...
});
```

## Options

### typescript options

| name                           | type    | description                                                                                                                           |
|--------------------------------|---------|---------------------------------------------------------------------------------------------------------------------------------------|
| noLib                          | boolean | Do not include a default lib.d.ts with global declarations                                                                            |
| target                         | string  | Specify ECMAScript target version: 'ES3' (default), 'ES5', or 'ES6'                                                                   |
| module                         | string  | Specify module code generation: "commonjs" (default), "amd", "system" or "umd"                                                        |
| sourceMap                      | boolean | Generates corresponding .map files                                                                                                    |
| declaration                    | boolean | Generates corresponding .d.ts file                                                                                                    |
| removeComments                 | boolean | Do not emit comments to output.                                                                                                       |
| noImplicitAny                  | boolean | Warn on expressions and declarations with an implied 'any' type.                                                                      |
| noResolve                      | boolean | Skip resolution and preprocessing.                                                                                                    |
| preserveConstEnums             | boolean | Do not erase const enum declarations in generated code.                                                                               |
| noEmitOnError                  | boolean | Do not emit outputs if any type checking errors were reported.The default for this option is set to true for backwards compatibility. |
| suppressImplicitAnyIndexErrors | boolean | Suppress noImplicitAny errors for indexing objects lacking index signatures.                                                          |
| experimentalDecorators         | boolean |                                                                                                                                       |
| emitDecoratorMetadata          | boolean |                                                                                                                                       |
| newLine                        | string  |                                                                                                                                       |
| inlineSourceMap                | boolean |                                                                                                                                       |
| inlineSources                  | boolean |                                                                                                                                       |
| noEmitHelpers                  | boolean |                                                                                                                                       |

### original options

####generateTsConfig
**type**: `string` | `boolean`

generateTsConfig option will generate the content and equivalent tsconfig.json that are specified in the option.
The value specify the directory name to be output. It is output to the current directory when you specify true.

#### references
**type**: `string` | `string[]`

Set auto reference libraries.

```js
grunt.initConfig({
  ...
  typescript: {
    base: {
      src: ['path/to/typescript/files/**/*.ts'],
      options: {
        references: [
          "core",       //lib.core.d.ts
          "dom",        //lib.dom.d.ts
          "scriptHost", //lib.scriptHost.d.ts
          "webworker",  //lib.webworker.d.ts
          "path/to/reference/files/**/*.d.ts"
        ]
      }
    }
  },
  ...
});
```

#### watch
**type**: `string` | `boolean` | { path?:<`string` | `string[]``>; before?: <`string` | `string[]``>; after?: <`string` | `string[]``>; atBegin: `boolean` }

Watch .ts files.
It runs very quickly the second time since the compilation. It is because you only want to read and output file is limited.

Specify the directory where you want to monitor in the options.

```js
grunt.initConfig({
  ...
  typescript: {
    base: {
      src: ['path/to/typescript/files/**/*.ts'],
      options: {
        watch: 'path/to/typescript/files' //or ['path/to/typescript/files1', 'path/to/typescript/files2']
      }
    }
  },
  ...
});
```

If you specify the true, then automatically detects the directory.

```js
grunt.initConfig({
  ...
  typescript: {
    base: {
      src: ['path/to/typescript/files/**/*.ts'],
      options: {
        watch: true //Detect all target files root. eg: 'path/to/typescript/files/'
      }
    }
  },
  ...
});
```

For expansion of the future, You can also be specified 'object'.

```js
grunt.initConfig({
  ...
  typescript: {
    base: {
      src: ['path/to/typescript/files/**/*.ts'],
      options: {
        watch: {
          path: 'path/to/typescript/files', //or ['path/to/typescript/files1', 'path/to/typescript/files2']
          before: ['beforetasks'],   //Set before tasks. eg: clean task
          after: ['aftertasks']      //Set after tasks.  eg: minify task
          atBegin: true              //Run tasks when watcher starts. default false
        }
      }
    }
  },
  ...
});
```

#### basePath(obsolete)
**type**: `string`

Path component to cut off when mapping the source files to dest files.

#### keepDirectoryHierarchy(obsolete)
**type**: `boolean`

Path component to cut off when mapping the source files to dest files.

```js
grunt.initConfig({
  ...
  typescript: {
    base: {
      src: ['path/to/typescript/files/**/*.ts'],
      dest: 'bin'
      options: {
        keepDirectoryHierarchy: true
      }
    }
  },
  ...
});
```

If keepDirectoryHierarchy option is true, it is output as follows.

```
/bin
- /path
--- /to
----- /typescript
------- /files
--------- *.ts 
```

If keepDirectoryHierarchy option is false or not set, it is output as follows.
It is same way as the tsc.

```
/bin
- *.ts 
```


※I'm sorry for poor English
