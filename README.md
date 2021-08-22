<!--
 * @Author: web.王晓冬
 * @Date: 2021-08-19 18:56:59
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2021-08-23 06:56:07
 * @Description: file content
-->


[![Version](https://img.shields.io/npm/dt/vue3-video-play.svg?style=flat-square)](https://www.npmjs.com/package/vue3-video-play)
[![Downloads](https://img.shields.io/npm/v/vue3-video-play.svg?style=flat-square)](https://www.npmjs.com/package/vue3-video-play)
[![GitHub stars](https://img.shields.io/github/stars/xdlumia/vue3-video-play.svg?style=flat-square)](https://github.com/xdlumia/vue3-video-play/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/xdlumia/vue3-video-play.svg?style=flat-square)](https://github.com/xdlumia/vue3-video-play/issues)
[![GitHub forks](https://img.shields.io/github/forks/xdlumia/vue3-video-play.svg?style=flat-square)](https://github.com/xdlumia/vue3-video-play/network)
[![GitHub last commit](https://img.shields.io/github/last-commit/google/skia.svg?style=flat-square)](https://github.com/xdlumia/vue3-video-play)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/xdlumia/vue3-video-play)



<!-- [![NPM](https://nodei.co/npm/vue3-video-play.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/vue3-video-play) -->

# vue3-video-play

适用于vue3编写的视频播放器插件

# 示例 主页

[https://xdlumia.github.io](https://xdlumia.github.io)



# 安装


npm安装：
``` bash
npm i vue3-video-play --save
```
yarn安装：
``` bash
yarn add vue3-video-play --save
```

### 开始使用

#### 全局使用

``` javascript
import { createApp } from 'vue'
import App from './App.vue'
let app = createApp(App)

import videoPlay from 'vue3-video-play' // 引入组件
import 'vue3-video-play/dist/style.css' // 引入css
app.use(videoPlay)

app.mount('#app')
```

#### 组件内使用

```js
// require styles
import 'vue3-video-play/dist/style.css'
import { videoPlay } from 'vue-video-player'
export default {
  components: {
    videoPlay
  }
}
```
### SPA 单页面使用示例

```html
<template>
  <div>
    <videoPlay 
    v-bind="options" 
    @play="onPlay"
    @pause="onPause" 
    @timeupdate="onTimeupdate" 
    @canplay="onCanplay" />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { videoPlay } from '../lib/index.js';

const options = reactive({
  width: '800px', //播放器高度
  height: '450px', //播放器高度
  color: "#409eff", //主题色
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
const onPlay = (ev) => {
  console.log('播放')
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

```

# Props
vue3-video-play支持video原生所有属性 [video默认属性](https://segmentfault.com/a/1190000008053507)

| 名称          |     说明     |  类型   | 可选值 |                默认值                 |
| ------------- | :----------: | :-----: | :----: | :-----------------------------------: |
| width         |  播放器宽度  | string  |   -    |                 800px                 |
| height        |  播放器高度  | string  |   -    |                 450px                 |
| title         |   视频名称   | string  |   -    |                   -                   |
| src           |   视频资源   | string  |   -    |                   -                   |
| color         | 播放器主色调 | string  |   -    |                #409eff                |
| webFullScreen |   网页全屏   | boolean |   -    |                 false                 |
| speedRate     |   倍速配置   |  array  |   -    | ["0.75", "1.0", "1.25", "1.5", "2.0"] |
| mirror        |   镜像画面   | boolean |   -    |                 false                 |
| ligthOff      |   关灯模式   | boolean |   -    |                 false                 |
| muted         |     静音     | boolean |   -    |                 false                 |
| autoPlay      |   自动播放   | boolean |   -    |       false,为true时会自动静音        |
| loop          |   循环播放   | boolean |   -    |                 false                 |
| volume        |   默认音量   |   0.3   |  0-1   |                  0.3                  |
| poster        |   视频封面   | string  |   -    |              视频第一帧               |


# Events
vue3-video-play支持video原生所有事件  [video默认事件](https://segmentfault.com/a/1190000008053507)

| 事件名称       | 说明               | 回调  |
| -------------- | ------------------ | ----- |
| loadstart      | 客户端开始请求数据 | event |
| progress       | 客户端正在请求数据 | event |
| error          | 请求数据时遇到错误 | event |
| stalled        | 网速失速           | event |
| play           | 开始播放时触发     | event |
| pause          | 暂停时触发         | event |
| loadedmetadata | 成功获取资源长度   | event |
| loadeddata     |                    | event |
| waiting        | 等待数据，并非错误 | event |
| playing        | 开始回放           | event |
| canplay        | 暂停状态下可以播放 | event |
| canplaythrough | 可以持续播放       | event |
| timeupdate     | 更新播放时间       | event |
| ended          | 播放结束           | event |
| ratechange     | 播放速率改变       | event |
| durationchange | 资源长度改变       | event |
| volumechange   | 音量改变           | event |



# Author
[xdlumia](https://dreamwq.com)
