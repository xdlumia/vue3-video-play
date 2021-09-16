/*
 * @Author: web.王晓冬
 * @Date: 2020-10-29 10:08:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2021-09-14 11:05:53
 * @Description: Table
 */
import lockScreen from './lock-screen/main.vue';

function install(app) {
  app.component(lockScreen.name, lockScreen)
}
lockScreen.install = install
export {
  lockScreen,
  install
}
export default lockScreen;