/*
 * @Author: web.王晓冬
 * @Date: 2021-08-20 19:10:57
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2021-08-24 07:27:24
 * @Description: file content
*/
<template>
  <div style="height:100px">
    <d-slider v-model="options.volume"></d-slider>
  </div>
  <div style="text-align:center">
    <button @click="options.src = 'http://vjs.zencdn.net/v/oceans.mp4'">{{ options.src }}</button>
    <videoPlay style="display:inline-block" v-bind="options" />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { videoPlay } from '../lib/index.js';
import DSlider from './components/d-slider.vue'

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
  title: '', //视频名称
  src: "http://vjs.zencdn.net/v/oceans.mp4", //视频源
  poster: '', //封面
})

</script>

<style scoped>
</style>
