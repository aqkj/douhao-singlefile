/**
 * 转换
 * @author xiaoqiang <465633678@qq.com>
 * @created 2019/06/28 10:52:50
 */
const path = require('path')
const fs = require('fs-extra')
const { Px2rpx } = require('../../px2rpx')
module.exports = async function parseTemplate(styles, fpath, op) {
  try {
    const varLess = `${Array(fpath.slice(fpath.indexOf('/src/') + 5).split('/').length -1).fill('../').join('')}var.less`
    const prefix = `@import url('${varLess}');`
    // console.log(path.resolve(fpath, varLess))
    const { content, lang } = styles[0]
    let output = await new Promise((resolve, reject) => {
      const actions = {
        less: () => {
          require('less').render(prefix + content, {
            compress: false,
            filename: fpath.replace(/\.vue$/, '.less'),
          }, (err, output) => {
            if (err) throw Error(err)
            resolve(output.css)
          })
          return true
        }
      }
      lang && (actions[lang] && actions[lang]()) || resolve(content)
    })
    // px按比例转换为rpx
    const px2rpx = new Px2rpx({
      size: 375
    })
    // 匹配component
    const reg = /(\.component)?\.vue$/
    output = px2rpx.generateRpx(output)
    fs.outputFileSync(fpath.replace(/src/, op).replace(reg, '.wxss'), output, 'utf-8')
  } catch (error) {
    throw new Error('转换样式失败' + error)
  }
}