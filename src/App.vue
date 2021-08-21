<template>
  <div>
    <button @click="options.width = '1200px'">{{ options.width }}</button>
    <videoPlay
      @play="onPlay"
      :options="options"
      @pause="onPause"
      @timeupdate="onTimeupdate"
      @canplay="onCanplay"
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
    type: "", //视频格式
    src: "http://vjs.zencdn.net/v/oceans.mp4" //视频源
  },
  poster: '', //封面
})
const onPlay = (ev) => {
  console.log('播放发送扽')
}
const onPause = (ev) => {
  console.log(ev, '暂停')
}

const onTimeupdate = (ev) => {
  console.log(ev, '时间更新')
}
const onCanplay = (ev) => {
  console.log(ev, '可以播放')
}
</script>

<style scoped>
</style>
