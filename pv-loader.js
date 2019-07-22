/**
 * 转换vue
 * @author xiaoqiang <465633678@qq.com>
 * @created 2019/06/28 09:25:16
 */
const { parseComponent } = require('vue-template-compiler')
const loaderUtils = require('loader-utils')
const parseTemplate = require('./parse/parseTemplate')
const parseScript = require('./parse/parseScript')
const parseStyles = require('./parse/parseStyles')
module.exports = async function (source, args) {
  this.cacheable && this.cacheable();
  var cb = this.async()
  const options = loaderUtils.getOptions(this)
  const descriptor = parseComponent(source, { pad: 'line' })
  // console.log(descriptor)
  // template
  if (descriptor.template) {
    await parseTemplate.call(this, descriptor.template)
  }
  // styles
  if (descriptor.styles) {
    parseStyles.call(this, descriptor.styles)
  }
  // config
  if (descriptor.config) {
    parseStyles.call(this, descriptor.config)
  }
  // script
  if (descriptor.script) {
    parseScript.call(this, descriptor.script, cb)
  } else {
    cb(null, '')
  }
  // console.log(descriptor)
  // return `module.exports = ${JSON.stringify(descriptor)}`
}