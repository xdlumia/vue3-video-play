/*
 * @Author: web.王晓冬
 * @Date: 2020-03-17 17:16:37
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-10-29 10:43:30
 * @Description: 收集公共组件  公共组件入口必须是index.js命名 并且必须正确命名name
 */

const files = require.context('./', true, /\index.js$/)

export default files.keys().filter(v => v != './index.js').reduce((arr, key) => {
  let comp = files(key).default
  return [...arr, comp]
}, [])
