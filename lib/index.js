/*
 * @Author: web.王晓冬
 * @Date: 2020-10-29 10:08:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2021-08-22 08:43:52
 * @Description: Table
 */
import videoPlay from './video-play/main.vue';

function install(app) {
  app.component(videoPlay.name, videoPlay)
}
videoPlay.install = install
export {
  videoPlay,
  install
}
export default videoPlay;