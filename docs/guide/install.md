<!--
 * @Author: web.王晓冬
 * @Date: 2021-08-19 18:56:59
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2021-08-22 09:46:39
 * @Description: file content
-->
# 使用指南

## 安装
npm安装：
``` bash
npm i vue3-video-play --save
```
yarn安装：
``` bash
yarn add vue3-video-play --save
```

## 开始使用

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
// require style
import 'vue3-video-play/dist/style.css'
import { videoPlay } from 'vue-video-player'
export default {
  components: {
    videoPlay
  }
}
```

## 小试牛刀
:::demo 使用`options`属性来进行配置。

```vue
<template>
  <div>
    <ClientOnly>
      <vue3VideoPlay :options="options" />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

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
  source: {
    title: '', //视频名称
    type: "", //视频格式
    src: "http://vjs.zencdn.net/v/oceans.mp4" //视频源
  },
  poster: '', //封面
})
</script>

<style scoped>
</style>

```

:::



## 事件示例
:::demo `vue3-video-play` 支持原生`video`所有事件。

```vue
<template>
  <div>
      <vue3VideoPlay 
      :options="options" 
      @play="onPlay"
      @pause="onPause" 
      @timeupdate="onTimeupdate" 
      @canplay="onCanplay" />
    
  </div>

</template>

<script setup lang="ts">
import { reactive } from 'vue';

const options = reactive({
  width: '800px', //播放器高度
  source: {
    title: '', //视频名称
    type: "", //视频格式
    src: "http://vjs.zencdn.net/v/oceans.mp4" //视频源
  },
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

:::




#### Props
vue3-video-play 支持video原生所有Attributes  [video默认事件](https://www.w3school.com.cn/jsref/dom_obj_video.asp/)

| 参数名称 | 说明     | 类型   | 默认值        |
| -------- | -------- | ------ | ------------- |
| options  | 配置对象 | object | 见options配置 |


## options配置
options作为props配置项包含众多属性

| 名称          |     说明     |               类型               | 可选值 |                默认值                 |
| ------------- | :----------: | :------------------------------: | :----: | :-----------------------------------: |
| width         |  播放器宽度  |              string              |   -    |                 800px                 |
| height        |  播放器高度  |              string              |   -    |                 450px                 |
| color         | 播放器主色调 |              string              |   -    |                #409eff                |
| muted         |     静音     |             boolean              |   -    |                 false                 |
| webFullScreen |   网页全屏   |             boolean              |   -    |                 false                 |
| speedRate     |   倍速配置   |              array               |   -    | ["0.75", "1.0", "1.25", "1.5", "2.0"] |
| autoPlay      |   自动播放   |             boolean              |   -    |       false,为true时会自动静音        |
| loop          |   循环播放   |             boolean              |   -    |                 false                 |
| mirror        |   镜像画面   |             boolean              |   -    |                 false                 |
| ligthOff      |   关灯模式   |             boolean              |   -    |                 false                 |
| volume        |   默认音量   |               0.3                |  0-1   |                  0.3                  |
| poster        |   视频封面   |              string              |   -    |              视频第一帧               |
| source        |  视频源对象  |              object              |   -    |      {title:'',type:'',src:'',}       |
| source.title  |   视频名称   |              string              |   -    |                   -                   |
| source.src    |   视频资源   |              string              |   -    |                   -                   |
| source.type   |   视频类型   | video/mp4，video/webm，video/ogg |   -    |                   -                   |



## Events
vue3-video-play支持video原生所有事件 

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

## 快捷键说明
支持快捷键操作
| 键名      | 说明                |
| --------- | ------------------- |
| 方向左键← | 快退10s             |
| 方向右键→ | 快进10s             |
| 方向上键↑ | 音量+0.1            |
| 方向下键↓ | 音量-0.1            |
| 长按右键→ | 5x倍速播放          |
| 空格键    | 暂停/播放(暂未实现) |
# Author

[xdlumia](https://dreamwq.com)

# 点个start

[vue3-video-play](https://github.com/xdlumia/vue3-video-play)

