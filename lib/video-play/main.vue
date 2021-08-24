/*
 * @Author: web.王晓冬
 * @Date: 2020-11-03 16:29:47
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2021-08-24 16:11:38
 * @Description: file content
*/

<template>
  <div
    ref="refPlayerWrap"
    class="d-player-wrap"
    @mousemove="mouseMovewWarp"
    :class="{ 'web-full-screen': state.webFullScreen, 'd-player-wrap-hover': state.isPaused || state.isVideoHovering }"
  >
    <!-- 如果是移动端并且支持倍速 controls=true 否则为flase -->
    <video
      ref="refdVideo"
      :controls="isMobile && state.speed ? true : false"
      class="d-player-main"
      :class="{ 'video-mirror': state.mirror }"
      :webkit-playsinline="props.playsinline"
      :playsinline="props.playsinline"
      v-bind="$attrs"
      @waiting="onWaiting"
      @error="onError"
      @stalled="stalled"
      @playing="onPlaying"
      @loadstart="loadstart"
      @durationchange="durationchange"
      @progress="progress"
      @canplay="canplay"
      @timeupdate="timeupdate"
      :volume="state.volume"
      :muted="state.muted"
      :loop="state.loop"
      :preload="preload"
      width="100%"
      height="100%"
      :src="props.src"
    >您的浏览器不支持Video标签。</video>
    <d-waitingLoading text="正在缓冲..." v-show="state.waitingLoading" />
    <!-- 预加载动画 -->
    <d-loading v-show="state.loading" />
    <transition name="d-fade-in">
      <div class="d-player-lightoff" v-show="state.lightOff"></div>
    </transition>
    <!-- 全屏模式下顶部显示的内容 -->
    <d-player-top :title="props.title" v-if="state.fullScreen && state.isVideoHovering"></d-player-top>
    <!-- 状态栏 -->
    <div class="d-player-state">
      <transition name="d-scale-out">
        <!-- 播放按钮 -->
        <div class="d-play-btn" v-show="state.isPaused">
          <d-icon icon="icon-play" :size="40"></d-icon>
        </div>
      </transition>
      <!-- 操作信息通知 -->
      <d-status :state="state"></d-status>
    </div>
    <input
      v-if="!isMobile"
      type="input"
      readonly="readonly"
      ref="refInput"
      @dblclick="toggleFullScreenHandle"
      @click="togglePlay"
      @keyup="keypress"
      @keydown="keypress"
      class="d-player-input"
      maxlength="0"
    />
    <!-- PC端播放按钮控制器  移动端调用自带控制器-->
    <div class="d-player-control" ref="refPlayerControl" v-if="!isMobile && state.control">
      <div class="d-control-progress">
        <d-slider
          class="d-progress-bar"
          @onMousemove="onProgressMove"
          @change="progressBarChange"
          :disabled="!state.speed"
          style="z-index:1"
          :hoverText="state.progressCursorTime"
          v-model="state.playProgress"
          :preload="state.preloadBar"
        ></d-slider>
      </div>

      <div class="d-control-tool" @click="inputFocusHandle">
        <div class="d-tool-bar">
          <div class="d-tool-item">
            <d-icon
              @click="togglePlay"
              size="24"
              :icon="`icon-${state.isPaused ? 'play' : 'pause'}`"
            ></d-icon>
          </div>
          <!-- 下一部 -->
          <!-- <div class="d-tool-item">
            <d-icon size="18" icon="icon-next"></d-icon>
          </div>-->

          <div class="d-tool-item d-tool-time">
            <span>{{ state.currentTime }}</span>
            <span style="margin: 0 3px">/</span>
            <span class="total-time">{{ state.totalTime }}</span>
          </div>
        </div>
        <div class="d-tool-bar">
          <div class="d-tool-item" style="width:26px">
            {{ state.speedActive == "1.0" ? "倍速" : state.speedActive + "X" }}
            <div class="d-tool-item-main">
              <ul class="speed-main">
                <li
                  :class="{ 'speed-active': state.speedActive == row }"
                  @click="playbackRate(row)"
                  v-for="row of state.speedRate"
                  :key="row"
                >{{ row }}X</li>
              </ul>
            </div>
          </div>
          <!-- 音量 -->
          <div class="d-tool-item">
            <div class="d-tool-item-main volume-box" style="width:52px">
              <div class="volume-main" :class="{ 'is-muted': state.muted }">
                <span class="volume-text-size">{{ state.muted ? 0 : ~~(state.volume * 100) }}%</span>
                <!-- @change 如果修改音量则取消静音 -->
                <d-slider
                  @change="state.muted = false"
                  :hover="false"
                  size="5px"
                  :vertical="true"
                  v-model="state.volume"
                ></d-slider>
              </div>
            </div>
            <d-icon
              @click="mutedHandler"
              size="18"
              :icon="`icon-volume-${state.volume == 0 || state.muted ? 'mute' : state.volume > 0.5 ? 'up' : 'down'
              }`"
            ></d-icon>
          </div>
          <!-- 设置 -->
          <div class="d-tool-item">
            <d-icon size="20" class="rotateHover" icon="icon-settings"></d-icon>
            <div class="d-tool-item-main">
              <ul class="speed-main">
                <!-- :class="{ 'speed-active': state.speedActive == row }" -->
                <li>
                  镜像画面
                  <d-switch v-model="state.mirror" />
                </li>
                <li>
                  循环播放
                  <d-switch v-model="state.loop" />
                </li>
                <li>
                  关灯模式
                  <d-switch v-model="state.lightOff" />
                </li>
              </ul>
            </div>
          </div>
          <!-- 画中画 -->
          <div class="d-tool-item" @click="requestPictureInPictureHandle">
            <d-icon size="20" icon="icon-pip"></d-icon>
            <div class="d-tool-item-main">画中画</div>
          </div>
          <!-- 画中画 -->
          <div class="d-tool-item" @click="state.webFullScreen = !state.webFullScreen">
            <d-icon size="20" icon="icon-web-screen"></d-icon>
            <div class="d-tool-item-main">网页全屏</div>
          </div>
          <!-- 全屏 -->
          <div class="d-tool-item" @click="toggleFullScreenHandle">
            <div class="d-tool-item-main">全屏</div>
            <d-icon size="20" icon="icon-screen"></d-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
// import dIcon from "./d-icon";
// import 'element-plus/lib/theme-chalk/index.css';
export default {
  name: "vue3VideoPlay",
}


</script>
<script setup lang="ts">
import { reactive, ref, toRefs, nextTick, computed } from 'vue'
import { debounce } from 'throttle-debounce';
import DIcon from '../components/d-icon.vue'
import DPlayerTop from '../components/d-player-top.vue'
import DStatus from '../components/d-status.vue' //倍速播放状态
import DSwitch from '../components/d-switch.vue' //switch
import DLoading from '../components/d-loading.vue' //loading
import DWaitingLoading from '../components/d-waitingLoading.vue' //loading
import DSlider from '../components/d-slider.vue' // slider
import { hexToRgba, timeFormat, requestPictureInPicture, toggleFullScreen, isMobile } from '../utils/util'


const props = defineProps({
  width: { type: String, default: '800px' },
  height: { type: String, default: '450px' },
  color: { type: String, default: '#409eff' },
  webFullScreen: { type: Boolean, default: false },//网页全屏
  speed: { type: Boolean, default: true },//是否支持快进快退 //移动端不支持
  playsinline: { type: Boolean, default: false },//ios端 点击播放是否全屏
  muted: { type: Boolean, default: false }, //静音
  speedRate: { type: Array, default: () => ["0.75", "1.0", "1.25", "1.5", "2.0"] }, //播放倍速
  autoPlay: { type: Boolean, default: false }, //自动播放
  loop: { type: Boolean, default: false }, //循环播放
  mirror: { type: Boolean, default: false }, //镜像画面
  ligthOff: { type: Boolean, default: false },  //关灯模式
  volume: { type: [String, Number], default: '0.3' }, //默认音量大小
  control: { type: Boolean, default: true }, //是否显示控制器
  title: { type: String, default: '' }, //视频名称
  src: { required: true, type: String, default: '' }, //视频源
  preload: { type: String, default: 'auto' }, //预加载 
})
const emits = defineEmits(['loadstart', 'playing', 'error', 'stalled', 'waiting', 'durationchange', 'progress', 'canplay', 'timeupdate',])
let refPlayerWrap = ref(null)
let refdVideo = ref(null)
let refPlayerControl = ref(null) //控制器
let refInput = ref(null) //控制器
const state = reactive({
  dVideo: null,
  ...props, //如果有自定义配置就会替换默认配置
  muted: props.autoPlay,
  //标记当前的播放状态
  isPaused: !props.autoPlay,
  loading: true, //加载动画
  waitingLoading: true, //缓冲等待
  fullScreen: false,
  handleType: '', //当前操作类型
  //当前播放时间
  currentTime: "00:00:00",
  // 当前缓冲进度
  preloadBar: 0,
  //总时长
  totalTime: "00:00:00",
  isVideoHovering: true,
  speedActive: "1.0", //倍速
  playProgress: 0, //播放进度
  isMultiplesPlay: false, //是否倍速播放
  longPressTimeout: null,
  progressCursorTime: '00:00:00', //进度条光标时间

})

// 把颜色格式化为rgb格式
const hexToRgbaColor = hexToRgba(state.color)
// 清空当前操作类型
const clearHandleType = debounce(500, () => {
  state.handleType = '';
})
const keypress = (ev) => {
  let pressType = ev.type
  let keyCode = ev.keyCode || ev.code;
  // arrowLeft  快退
  if (keyCode == 37 || keyCode == 'ArrowLeft') {
    if (!props.speed) return // 如果不支持快进快退s
    if (pressType == "keyup") {
      state.dVideo.currentTime = state.dVideo.currentTime < 10 ? 0.1 : state.dVideo.currentTime - 10;
      timeupdate(state.dVideo);
    }
  }
  // arrowTop  音量+
  else if (keyCode == 38 || keyCode == 'ArrowTop') {
    if (pressType == "keydown") {
      state.muted = false
      state.handleType = 'volume' //操作类型  音量
      clearHandleType() //清空 操作类型
      state.volume = (state.volume + 0.1) > 1 ? 1 : state.volume + 0.1
    }
  }
  // arrowRight
  else if (keyCode == 39 || keyCode == 'ArrowRight') {
    if (pressType == "keyup") {
      clearTimeout(state.longPressTimeout);
      // 如果不支持快进快退 如果关闭快进快退必须在没有长按倍速播放的情况下
      if (!props.speed && !state.longPressTimeout) return
      if (state.isMultiplesPlay) { //如果倍速播放中
        state.dVideo.playbackRate = state.speedActive;
        state.isMultiplesPlay = false;
      } else {
        // 进度加10s
        state.dVideo.currentTime = state.dVideo.currentTime + 10;
        timeupdate(state.dVideo);
      }
      // 如果长按5倍速播放
    } else if (pressType == "keydown") {
      if (!props.speed) return // 如果不支持快进快退 也不能支持长按倍速播放
      if (state.isMultiplesPlay) {
        clearTimeout(state.longPressTimeout);
      }
      state.longPressTimeout = setTimeout(() => {
        state.isMultiplesPlay = true;
        state.dVideo.playbackRate = 5;
        state.isPaused = false;
        state.dVideo.play();
        state.handleType = 'playbackRate' //操作类型 倍速播放
        clearHandleType() //清空 操作类型
      }, 500)

    }
  }
  // arrowBottom 音量--
  else if (keyCode == 40 || keyCode == 'ArrowDown') {
    if (pressType == "keydown") {
      ev.preventDefault();
      state.muted = false
      state.handleType = 'volume' //操作类型  音量
      clearHandleType() //清空 操作类型
      state.volume = (state.volume - 0.1) < 0 ? 0 : state.volume - 0.1
    }
  }
}
const inputFocusHandle = () => {
  refInput.value.focus()
}

// 播放暂停
const togglePlay = () => {
  //视频标签（video）原生方法：
  //play():让视频播放
  //pause():让视频暂停
  if (state.isPaused) {
    state.dVideo.play();
  } else {
    state.dVideo.pause();
  }
  state.isPaused = !state.isPaused
}
// // 播放
const onPlay = (ev) => {
  console.log('播放')
  emits('play', ev)
}
// // 暂停
// const onPause = (ev) => {
//   // console.log('暂定')
//   emits('pause', ev)
// }
const onPlaying = (ev) => {
  console.log('playing');
  emits('playing', ev)
}
const onWaiting = (ev) => {
  state.waitingLoading = true //缓冲中...
  emits('waiting', ev)
}
const onError = (ev) => {
  emits('error', ev)
}
// 网速失速
const stalled = (ev) => {
  console.log('网速失速')
  emits('stalled', ev)
}
// 获得播放头文件
// const loadeddata = (ev) => {
//   console.log("已获取播放头");
// }
// const canplaythrough = (ev) => {
//   console.log("可持续播放");
// }
// // 播放结束
// const ended = () => { }
//开始加载
const loadstart = (ev) => {
  state.loading = true
  emits('loadstart', ev)
  console.log("开始加载");
}
// 已获得播放时长
const durationchange = (ev) => {
  emits('durationchange', ev)
  state.totalTime = timeFormat(ev.target.duration);
}

// 缓冲下载中
const progress = (ev) => {
  console.log("缓冲中...");
  emits('progress', ev)
  let duration = ev.target.duration; // 媒体总长
  let length = ev.target.buffered.length;
  let end = ev.target.buffered.length && ev.target.buffered.end(length - 1);
  state.preloadBar = end / duration //缓冲比例
}


const canplay = (ev) => {
  state.loading = false
  state.waitingLoading = false //缓冲结束.
  // console.log("可以播放");
  emits('canplay', ev)
  // 记录快进之前是否是暂停  如果不是暂停. 那么缓存完自动播放
  if (state.autoPlay) {
    state.isPaused = false;
    state.dVideo.play();
  }
  // 切换视频源的情况下 如果当前是未暂停 则继续播放
  if (!state.isPaused) {
    state.dVideo.play();
  }
}

// 当前播放进度
const timeupdate = (ev) => {
  emits('timeupdate', ev)
  let duration = ev.duration || ev.target.duration || 0; // 媒体总长
  let currentTime = ev.currentTime || ev.target.currentTime; // 当前媒体播放长度
  state.playProgress = currentTime / duration //播放进度比例
  state.currentTime = timeFormat(currentTime);
}
// 静音事件
const mutedHandler = () => {
  state.muted = !state.muted;
}

//进度条事件
const progressBarChange = (ev: Event, val) => {
  // emits('timeupdate', ev)
  let duration = state.dVideo.duration || state.dVideo.target.duration; // 媒体总长
  state.dVideo.currentTime = duration * val
  if (state.isPaused) {
    state.dVideo.play()
    state.isPaused = false
  }
}
// 进度条移动
const onProgressMove = (ev, val) => {
  state.progressCursorTime = timeFormat(state.dVideo.duration * val);
}


// 隐藏控制器
const hideControl = debounce(2500, () => {
  state.isVideoHovering = false;
})

const mouseMovewWarp = (ev) => {
  state.isVideoHovering = true;
  hideControl()
}


// 播放速度
const playbackRate = (row) => {
  state.speedActive = row;
  state.dVideo.playbackRate = row;
}

// 初始化
const init = async () => {
  await nextTick()
  state.dVideo = refdVideo
  state.dVideo.load()
}
init()

const requestPictureInPictureHandle = () => {
  requestPictureInPicture(state.dVideo)
}
// 全屏按钮
const toggleFullScreenHandle = () => {
  toggleFullScreen(refPlayerWrap.value)
  if (!document.webkitIsFullScreen) {
    state.fullScreen = true
  } else {
    state.fullScreen = false
  }
}
</script>

<style lang="less" scoped>
.d-player-wrap {
  --primary-color: v-bind(hexToRgbaColor);
  width: v-bind(width);
  height: v-bind(height);
}
@import "../style/reset.less";
@import "../style/vPlayer.less";
@import "../style/transition.less";
</style>