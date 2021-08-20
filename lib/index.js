/*
 * @Author: web.王晓冬
 * @Date: 2020-10-29 10:08:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2021-08-20 17:54:34
 * @Description: Table
 */
import videoPlay from './video-play/main.vue';

videoPlay.install = (app) => {
  app.component(videoPlay.name, videoPlay)
}

export {
  videoPlay
}
export default videoPlay;
