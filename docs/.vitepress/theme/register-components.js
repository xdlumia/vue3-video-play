/*
 * @Author: web.王晓冬
 * @Date: 2021-08-21 15:12:41
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2021-08-25 16:07:32
 * @Description: file content
 */
import Demo from 'vitepress-theme-demoblock/components/Demo.vue'
import DemoBlock from 'vitepress-theme-demoblock/components/DemoBlock.vue'
// import {
//   videoPlay
// } from 'vue3-video-play'

export function registerComponents(app) {
  app.component('Demo', Demo)
  app.component('DemoBlock', DemoBlock)
}