<!--
 * @Author: web.王晓冬
 * @Date: 2021-08-19 18:56:59
 * @LastEditors: itab.link
 * @LastEditTime: 2023-11-09 15:44:51
 * @Description: file content
-->

[![Version](https://img.shields.io/npm/dt/vue3-video-play.svg?style=flat-square)](https://www.npmjs.com/package/vue3-video-play)
[![Downloads](https://img.shields.io/npm/v/vue3-video-play.svg?style=flat-square)](https://www.npmjs.com/package/vue3-video-play)
[![GitHub stars](https://img.shields.io/github/stars/xdlumia/vue3-video-play.svg?style=flat-square)](https://github.com/xdlumia/vue3-video-play/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/xdlumia/vue3-video-play.svg?style=flat-square)](https://github.com/xdlumia/vue3-video-play/issues)
[![GitHub forks](https://img.shields.io/github/forks/xdlumia/vue3-video-play.svg?style=flat-square)](https://github.com/xdlumia/vue3-video-play/network)
[![GitHub last commit](https://img.shields.io/github/last-commit/google/skia.svg?style=flat-square)](https://github.com/xdlumia/vue3-video-play)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/xdlumia/vue3-video-play)

[![NPM](https://nodei.co/npm/vue3-video-play.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/vue3-video-play)

<span style="color:#cb3837"> **必须使用 vue@3.2.2及以上版本**</span>

### Vue3-video-play

适用于 Vue3 的 hls.js 播放器组件 | 并且支持 MP4/WebM/Ogg 格式
配置强大，UI 还算好看

## 功能一览

1. 支持快捷键操作
2. 支持倍速播放设置
3. 支持镜像画面设置
4. 支持关灯模式设置
5. 支持画中画模式播放
6. 支持全屏/网页全屏播放
7. 支持从固定时间开始播放
8. 支持移动端，移动端会自动调用自带视频播放器
9. 支持 hls 视频流播放，支持直播
10. hls 播放支持清晰度切换

# 主页示例

[https://codelife.cc/vue3-video-play/](https://codelife.cc/vue3-video-play/)

## 近期更新 v1.3.3 🎉

- 修复: 右键事件错误

# 使用指南

## 安装

npm 安装：

```bash
npm i vue3-video-play --save
```

yarn 安装：

```bash
yarn add vue3-video-play --save
```

## 开始使用

#### 全局使用

```js
import { createApp } from "vue";
import App from "./App.vue";
let app = createApp(App);

import vue3videoPlay from "vue3-video-play"; // 引入组件
import "vue3-video-play/dist/style.css"; // 引入css
app.use(vue3videoPlay);

app.mount("#app");
```

#### 组件内使用

```js
// require style
import "vue3-video-play/dist/style.css";
import { videoPlay } from "vue3-video-play";
export default {
  components: {
    videoPlay,
  },
};
```

## 基本示例

提供了丰富了配置功能
:::demo 自定义配置 比如自定义 poster。

```vue
<template>
  <div>
    <vue3VideoPlay
      v-bind="options"
      poster="https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/ironMan.jpg"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
const options = reactive({
  width: "800px", //播放器宽度
  height: "450px", //播放器高度
  color: "#409eff", //主题色
  title: "", //视频名称
  src: "https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/IronMan.mp4", //视频源
  muted: false, //静音
  webFullScreen: false,
  speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
  autoPlay: false, //自动播放
  loop: false, //循环播放
  mirror: false, //镜像画面
  ligthOff: false, //关灯模式
  volume: 0.3, //默认音量大小
  control: true, //是否显示控制
  controlBtns: [
    "audioTrack",
    "quality",
    "speedRate",
    "volume",
    "setting",
    "pip",
    "pageFullScreen",
    "fullScreen",
  ], //显示所有按钮,
});
</script>

<style scoped></style>
```

:::

可以通过`props`的`speed`开启或关闭进度条功能, 并且通过 `currentTime`属性控制从 60 秒开始播放

:::demo 通过`speed`关闭进度条拖动功能。 并且通过 `currentTime`属性控制从 60 秒开始播放

```vue
<template>
  <div>
    <vue3VideoPlay
      v-bind="options"
      poster="https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/ironMan.jpg"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const options = reactive({
  width: "500px", //播放器高度
  height: "260px", //播放器高度
  color: "#409eff", //主题色
  currentTime: 60,
  speed: false, //关闭进度条拖动
  title: "", //视频名称
  src: "https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/IronMan.mp4", //视频源
});
</script>

<style scoped></style>
```

:::

还可以通过`props`的`control`属性 来控制是否显示控制器
:::demo 通过`control` 来控制是否显示控制器

```vue
<template>
  <div>
    <vue3VideoPlay
      v-bind="options"
      poster="https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/ironMan.jpg"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const options = reactive({
  width: "500px", //播放器高度
  height: "260px", //播放器高度
  color: "#409eff", //主题色
  control: false, //是否显示控制器
  title: "", //视频名称
  src: "https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/IronMan.mp4", //视频源
});
</script>

<style scoped></style>
```

:::

## 事件示例

:::demo `vue3-video-play` 支持原生`video`所有事件。

```vue
<template>
  <div>
    <vue3VideoPlay
      width="800px"
      title="钢铁侠"
      :src="options.src"
      :poster="options.poster"
      @play="onPlay"
      @pause="onPause"
      @timeupdate="onTimeupdate"
      @canplay="onCanplay"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const options = reactive({
  src: "https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/IronMan.mp4", //视频源
  poster: "", //封面
});
const onPlay = (ev) => {
  console.log("播放");
};
const onPause = (ev) => {
  console.log(ev, "暂停");
};

const onTimeupdate = (ev) => {
  console.log(ev, "时间更新");
};
const onCanplay = (ev) => {
  console.log(ev, "可以播放");
};
</script>

<style scoped></style>
```

:::

## Hls m3u8 视频/直播

:::demo `vue3-video-play` 支持 m3u8(hls)播放

```vue
<template>
  <div>
    <vue3VideoPlay
      width="800px"
      title="冰河世纪"
      :src="options.src"
      :type="options.type"
      :autoPlay="false"
    />
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
const options = reactive({
  src: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8", //视频源
  type: "m3u8", //视频类型
});
</script>

<style scoped></style>
```

:::

## Props

vue3-video-play 支持 video 原生所有 Attributes [video 原生属性](https://segmentfault.com/a/1190000008053507) 使用方式和 props 属性使用一致

| 名称          |         说明          |  类型   |                                               可选值                                               |                                               默认值                                               |
| ------------- | :-------------------: | :-----: | :------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------: |
| width         |      播放器宽度       | string  |                                                 -                                                  |                                               800px                                                |
| height        |      播放器高度       | string  |                                                 -                                                  |                                               450px                                                |
| color         |     播放器主色调      | string  |                                                 -                                                  |                                              #409eff                                               |
| src           |       视频资源        | string  |                                                 -                                                  |                                                 -                                                  |
| title         |       视频名称        | string  |                                                 -                                                  |                                                 -                                                  |
| type          |       视频类型        | string  |                                                 -                                                  |                                             video/mp4|m3u8                                            |
| poster        |       视频封面        | string  |                                                 -                                                  |                                             视频第一帧                                             |
| webFullScreen |       网页全屏        | boolean |                                                 -                                                  |                                               false                                                |
| speed         |   是否支持快进快退    | boolean |                                                 -                                                  |                                                true                                                |
| currentTime   | 跳转到固定播放时间(s) | number  |                                                 -                                                  |                                                 0                                                  |
| playsinline   | ios 点击屏幕是否全屏  | boolean |                                                 -                                                  |                                               false                                                |
| muted         |         静音          | boolean |                                                 -                                                  |                                               false                                                |
| speedRate     |       倍速配置        |  array  |                                                 -                                                  |                            ["2.0", "1.0", "1.5", "1.25", "0.75", "0.5"]                            |
| autoPlay      |       自动播放        | boolean |                                                 -                                                  |                                     false,为 true 时会自动静音                                     |
| loop          |       循环播放        | boolean |                                                 -                                                  |                                               false                                                |
| mirror        |       镜像画面        | boolean |                                                 -                                                  |                                               false                                                |
| ligthOff      |       关灯模式        | boolean |                                                 -                                                  |                                               false                                                |
| volume        |       默认音量        | number  |                                                0-1                                                 |                                                0.3                                                 |
| control       |    是否显示控制器     | boolean |                                                 -                                                  |                                                true                                                |
| controlBtns   |   控制器显示的按钮    |  array  | ['audioTrack', 'quality', 'speedRate', 'volume', 'setting', 'pip', 'pageFullScreen', 'fullScreen'] | ['audioTrack', 'quality', 'speedRate', 'volume', 'setting', 'pip', 'pageFullScreen', 'fullScreen'] |
| preload       |        预加载         | string  |                                           meta/auto/none                                           |                                                auto                                                |

### `props`属性 `controlBtns` 按钮说明

| 名称           |       说明       |
| -------------- | :--------------: |
| audioTrack     |   音轨切换按钮   |
| quality        | 视频质量切换按钮 |
| speedRate      |   速率切换按钮   |
| volume         |       音量       |
| setting        |       设置       |
| pip            |    画中画按钮    |
| pageFullScreen |   网页全屏按钮   |
| fullScreen     |     全屏按钮     |

## Events

vue3-video-play 支持 video 原生所有事件 [video 默认事件](https://segmentfault.com/a/1190000008053507)

| 事件名称       | 说明               | 回调  |
| -------------- | ------------------ | ----- |
| mirrorChange   | 镜像翻转事件       | val   |
| loopChange     | 循环播放开关事件   | val   |
| lightOffChange | 关灯模式事件       | val   |
| loadstart      | 客户端开始请求数据 | event |
| progress       | 客户端正在请求数据 | event |
| error          | 请求数据时遇到错误 | event |
| stalled        | 网速失速           | event |
| play           | 开始播放时触发     | event |
| pause          | 暂停时触发         | event |
| loadedmetadata | 成功获取资源长度   | event |
| loadeddata     | 缓冲中             | event |
| waiting        | 等待数据，并非错误 | event |
| playing        | 开始回放           | event |
| canplay        | 暂停状态下可以播放 | event |
| canplaythrough | 可以持续播放       | event |
| timeupdate     | 更新播放时间       | event |
| ended          | 播放结束           | event |
| ratechange     | 播放速率改变       | event |
| durationchange | 资源长度改变       | event |
| volumechange   | 音量改变           | event |

## 快捷键说明

支持快捷键操作
| 键名       | 说明                          |
| ---------- | ----------------------------- |
| Space      | 暂停/播放                     |
| 方向右键 → | 单次快进 10s，长按 5 倍速播放 |
| 方向左键 ← | 快退 10s                      |
| 方向上键 ↑ | 音量+10%                      |
| 方向下键 ↓ | 音量-10%                      |
| Esc        | 退出全屏/退出网页全屏         |
| F          | 全屏/退出全屏                 |

# Author

[xdlumia](https://codelife.cc)

# 点个 start

[vue3-video-play](https://github.com/xdlumia/vue3-video-play)
