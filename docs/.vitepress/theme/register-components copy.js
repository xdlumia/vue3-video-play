import Demo from 'vitepress-theme-demoblock/components/Demo.vue'
import DemoBlock from 'vitepress-theme-demoblock/components/DemoBlock.vue'
import {
  videoPlay
} from 'vue3-video-play'
import 'vue3-video-play/dist/style.css'
export function registerComponents(app) {
  app.component(videoPlay.name, videoPlay)
  app.component('Demo', Demo)
  app.component('DemoBlock', DemoBlock)
}