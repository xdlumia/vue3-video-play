<!--
 * @Author: web.王晓冬
 * @Date: 2021-08-19 18:56:59
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2021-09-14 10:59:48
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

## 功能一览
1. 支持快捷键操作
2. 支持倍速播放设置
3. 支持镜像画面设置
4. 支持关灯模式设置
5. 支持画中画模式播放
6. 支持全屏/网页全屏播放
6. 支持从固定时间开始播放
8. 支持移动端，移动端会自动调用自带视频播放器
9. 支持hls视频流播放，支持直播
10. hls播放支持清晰度切换
# 主页示例

[https://dreamwq.com/vue3-video-play/](https://dreamwq.com/vue3-video-play/)



## 近期更新 v1.3.1-beta.3 🎉
- 新增: 支持hls视频流播放 
- 新增: 新增画质切换，需视频流支持
- 新增: 新增画音视切换，需视频流支持
- 新增: props参数增加`currentTime`属性，可跳转到固定时间播放
- 新增: props参数增加`type`属性，视频格式
- 新增: props参数增加`controlBtns`属性，自定义控制器按钮显示
- 新增: 右键菜单功能，右键菜单包涵，视频滤镜调节、快捷键说明、复制当前视频网址
- 新增: `mirrorChange` `loopChange` `lightOffChange` 事件
- 新增: 增加空格快捷键 `播放/暂停` 的操作
- 优化: 如果音量为 0 关闭静音按钮 音量设置为 5
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

``` js
import { createApp } from 'vue'
import App from './App.vue'
let app = createApp(App)

import vue3videoPlay from 'vue3-video-play' // 引入组件
import 'vue3-video-play/dist/style.css' // 引入css
app.use(vue3videoPlay)

app.mount('#app')
```

#### 组件内使用

```js
// require style
import 'vue3-video-play/dist/style.css'
import { videoPlay } from 'vue-video-play'
export default {
  components: {
    videoPlay
  }
}
```


## 基本示例
提供了丰富了配置功能

## Props
vue3-video-play 支持video原生所有Attributes  [video原生属性](https://segmentfault.com/a/1190000008053507) 使用方式和props属性使用一致

| 名称   |    说明    |  类型  | 可选值 | 默认值 |
| ------ | :--------: | :----: | :----: | :----: |
| width  | 播放器宽度 | string |   -    | 800px  |
| height | 播放器高度 | string |   -    | 450px  |


## Events
vue3-video-play支持video原生所有事件  [video默认事件](https://segmentfault.com/a/1190000008053507)

| 事件名称     | 说明         | 回调 |
| ------------ | ------------ | ---- |
| mirrorChange | 镜像翻转事件 | val  |


## 快捷键说明
支持快捷键操作
| 键名  | 说明 |
| ----- | ---- |
| Space | /    |
# Author

[xdlumia](https://dreamwq.com)

# 点个start

[vue3-video-play](https://github.com/xdlumia/vue3-video-play)

