/**
 * 转换template
 * @author xiaoqiang <465633678@qq.com>
 * @created 2019/06/28 10:49:57
 */
const path = require('path')
const fs = require('fs-extra')
module.exports = function parseTemplate(template, fpath, op) {
  const { content } = template
  // 匹配component
  const reg = /(\.component)?\.vue$/
  fs.outputFileSync(fpath.replace(/src/, op).replace(reg, '.wxml'), content.replace(/^(\n)*/, ''), 'utf-8')
}