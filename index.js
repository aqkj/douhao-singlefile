/**
 * 转换vue
 * @author xiaoqiang <465633678@qq.com>
 * @created 2019/06/28 09:25:16
 */
const path = require('path')
// 操作流
const through = require('through2')
const { parseComponent } = require('vue-template-compiler')
const parseTemplate = require('./parse/parseTemplate')
const parseScript = require('./parse/parseScript')
const parseStyles = require('./parse/parseStyles')
const parseOther = require('./parse/parseOther')
exports.Loader = path.resolve(__dirname, './pv-loader.js')
exports.Plugin = class ParseVuePlugin {
  apply(compiler) {
    compiler.hooks.watchRun.tapAsync('ParseVuePlugin', (compilation, callback) => {
      console.log(compilation)
      callback()
    })
    // console.log(compiler.hooks.entryOption)
    // compiler.hooks.done.tap('Hello World Plugin', (
    //   stats /* 在 hook 被触及时，会将 stats 作为参数传入。 */
    // ) => {
    //   console.log('Hello World!');
    // });
  }
}
exports.compiler = function(output) {
  return through.obj((file, enc, callback) => {
    if (file.isNull()) {
      // 返回空文件
      callback(null, cb);
    }
    const fileContent = file.contents.toString('utf-8')
    const descriptor = parseComponent(fileContent, { pad: 'line' })
    // console.log(descriptor)
    // template
    if (descriptor.template) {
      parseTemplate(descriptor.template, file.path, output)
    }
    // styles
    if (descriptor.styles) {
      parseStyles(descriptor.styles, file.path, output)
    }
    // 自定义块
    if (descriptor.customBlocks && descriptor.customBlocks.length) {
      const config = descriptor.customBlocks.find(v => v.type === 'config')
      if (config) parseOther(config, file.path, output, '.json')
    }
    // script
    if (descriptor.script) {
      parseScript(descriptor.script, file, callback)
    } else {
      file.extname = '.ts'
      callback(null, file)
    }
  })
}