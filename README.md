# @douhao/singlefile

[![npm (scoped)](https://img.shields.io/npm/v/@douhao/singlefile.svg)](https://www.npmjs.com/package/@douhao/singlefile)
[![Downloads](http://img.shields.io/npm/dm/gulp-cli.svg)](https://www.npmjs.com/package/@douhao/singlefile)
[![size](https://img.shields.io/github/languages/code-size/aqkj/douhao-singlefile.svg)](https://www.npmjs.com/package/@douhao/singlefile)

使用vue单文件写法开发项目

## Install

```
$ npm install --save-dev @douhao/singlefile
```

## Usage

```js
const { compilerVue } = require("@douhao/singlefile");

gulp.src(filepath)
  .pipe(compilerVue())

```
