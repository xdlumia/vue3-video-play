/*
 * @Author: web.王晓冬
 * @Date: 2018年7月10日 17:56:26
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2021-05-21 16:55:17
 * @Description: localStorage操作
 * @axample
//存储用户信息
this.$local.set('userInfo', { name: 'wxd' })
//获取用户信息
let userInfo = this.$local.get('userInfo')
 */
const local = {
  // 保存数据 params: 1:key  2:value #
  set(key = '', value = '') {
    localStorage.setItem(key, JSON.stringify(value))
  }, //end
  // 获取数据  params: 1:key#
  get(key = null) {
    return JSON.parse(localStorage.getItem(key) || null) || ''
  }, //end
  // 清空localStrong #
  clear() {
    localStorage.clear()
  }, //end
  // 移除localStrong某一项 params: 1:key#
  remove(key = '') {
    return localStorage.removeItem(key)
  }
}

export default local