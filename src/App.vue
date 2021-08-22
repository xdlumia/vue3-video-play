/*
 * @Author: web.王晓冬
 * @Date: 2021-08-20 19:10:57
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2021-08-22 12:22:11
 * @Description: file content
*/
<template>
  <div style="text-align:center">
    <button @click="options.source.src = 'http://vjs.zencdn.net/v/oceans.mp4'">{{ options.source.src }}</button>
    <videoPlay
      style="display:inline-block"
      :options="options"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { videoPlay } from '../lib/index.js';

const options = reactive({
  width: '800px',
  height: '450px',
  color: "#409eff",
  muted: false, //静音
  webFullScreen: false,
  speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
  autoPlay: false, //自动播放
  loop: false, //循环播放
  mirror: false, //镜像画面
  ligthOff: false,  //关灯模式
  volume: 0.3, //默认音量大小
  control: true, //是否显示控制器
  source: {
    title: '', //视频名称
    src: "https://vdn3.vzuu.com/HD/3b323038-8da5-11eb-9b09-a245752d3292-t1-vdAuMVeAmR.mp4?disable_local_cache=1&auth_key=1629609682-0-0-cd193d16b89bb3c8de9be434080aa4e3&f=mp4&bu=http-com&expiration=1629609682&v=tx" //视频源
  },
  poster: '', //封面
})

</script>

<style scoped>
</style>
