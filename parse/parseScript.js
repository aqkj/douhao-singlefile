/**
 * 转换script
 * @author xiaoqiang <465633678@qq.com>
 * @created 2019/06/28 10:51:55
 */
module.exports = async function parseScript(script, file, cb) {
  try {
    let { content } = script
    // content = transpileModule(content, {}).outputText
    file.contents = Buffer.from(content)
    file.extname = '.ts'
    cb(null, file)
  } catch (error) {
    cb(null, file)
  }
}