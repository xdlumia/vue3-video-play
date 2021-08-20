/*
 * @Author: web.王晓冬
 * @Date: 2021-08-19 18:56:59
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2021-08-20 20:07:41
 * @Description: file content
*/

<template>
  <div>
    <videoPlay size="24" :options="options" />
  </div>
</template>

<script>
import { reactive } from 'vue';
import { videoPlay } from '../lib/index.js';
console.log(videoPlay)
// console.log(videoPlay)

export default {
  components: { videoPlay },

  // import { vue3VideoPlay } from 'vue3-video-play';
  // console.log(vue3VideoPlay)
  setup() {
    const options = reactive({
      color: "#409eff",
      muted: false,
      webFullScreen: false,
      speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
      autoPlay: true,
    })
    return { options }
  }
}
</script>

<style>
</style>
