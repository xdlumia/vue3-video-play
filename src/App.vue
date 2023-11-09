/*
 * @Author: web.王晓冬
 * @Date: 2021-08-20 19:10:57
 * @LastEditors: itab.link
 * @LastEditTime: 2023-11-09 15:38:31
 * @Description: file content
*/
<template>
  <!-- <div style="height:150px; margin-top:100px">
    <d-slider v-model="options.volume"></d-slider>
  </div>-->
  <div style="text-align: center">
    {{ options.webFullScreen }}
    <button
      @click="options.src = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'"
    >
      {{ options.src }}
    </button>
    <videoPlay
      ref="video"
      style="display: inline-block; width: 100%"
      v-bind="options"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, nextTick } from "vue";
import { videoPlay } from "../lib/index.js";

const options = reactive({
  width: "800px",
  height: "450px",
  color: "#409eff",
  muted: false, //静音
  webFullScreen: false,
  autoPlay: false, //自动播放
  currentTime: 0,
  loop: false, //循环播放
  mirror: false, //镜像画面
  ligthOff: false, //关灯模式
  volume: 0.3, //默认音量大小
  control: true, //是否显示控制器
  title: "", //视频名称
  type: "video/mp4",
  // src: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8", //视频源
  src: "https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/IronMan.mp4", //视频源
  // src: "https://logos-channel.scaleengine.net/logos-channel/live/biblescreen-ad-free/playlist.m3u8", //视频源
  poster: "https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/ironMan.jpg", //封面
  controlBtns: [
    "audioTrack",
    "quality",
    "speedRate",
    "volume",
    "setting",
    "pip",
    "pageFullScreen",
    "fullScreen",
  ],
});
const video = ref(null);

nextTick(() => {
  console.log(video.value);
});
</script>

<style scoped>
</style>
