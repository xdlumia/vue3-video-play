/*
 * @Author: web.王晓冬
 * @Date: 2021-08-20 19:10:57
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2021-08-29 11:09:35
 * @Description: file content
*/
<template>
  <!-- <div style="height:150px; margin-top:100px">
    <d-slider v-model="options.volume"></d-slider>
  </div>-->
  <div style="text-align: center">
    <button>{{ options.src }}</button>
    <videoPlay
      @playing="clickHandle"
      @play="play"
      @pause="pause"
      @ended="ended"
      ref="video"
      style="display: inline-block; width: 100%"
      v-bind="options"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, nextTick } from "vue";
import { videoPlay } from "../lib/index.js";
import DSlider from "./components/d-slider.vue";

const options = reactive({
  width: "800px",
  height: "450px",
  color: "#409eff",
  muted: false, //静音
  webFullScreen: false,
  autoPlay: true, //自动播放
  currentTime: 20,
  loop: false, //循环播放
  mirror: false, //镜像画面
  ligthOff: false, //关灯模式
  volume: 0.3, //默认音量大小
  control: true, //是否显示控制器
  title: "", //视频名称
  type: 'm3u8',
  src: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8", //视频源
  // src: "https://logos-channel.scaleengine.net/logos-channel/live/biblescreen-ad-free/playlist.m3u8", //视频源
  poster: "", //封面
});
const video = ref(null);
const play = (val, ev) => {
  // console.log("APP 开始播放");
};
const pause = (val, ev) => {
  // console.log("APP 暂停播放");
};
const ended = (val, ev) => {
  // console.log("APP ended");
};
// video.value.play()
const clickHandle = (val, ev) => {
  // console.log(val, ev);
  // video.value.play()
};
nextTick(() => {
  console.log(video.value);
});
</script>

<style scoped>
</style>
