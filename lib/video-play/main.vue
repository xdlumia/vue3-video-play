/*
 * @Author: web.王晓冬
 * @Date: 2020-11-03 16:29:47
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2021-08-23 17:30:25
 * @Description: file content
*/

<template>
  <div
    class="d-player-wrap"
    ref="refPlayerWrap"
    @mousemove="mouseMovewWarp"
    :class="{ 'web-full-screen': state.webFullScreen, 'd-player-wrap-hover': state.isPaused || state.isVideoHovering }"
  >
    <video
      ref="refdVideo"
      :controls="false"
      class="d-player-main"
      :class="{ 'video-mirror': state.mirror }"
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
      :src="src"
    >您的浏览器不支持Video标签。</video>
    <d-waitingLoading text="正在缓冲..." v-show="state.waitingLoading" />
    <!-- 预加载动画 -->
    <d-loading v-show="state.loading" />
    <transition name="d-fade-in">
      <div class="d-player-lightoff" v-show="state.lightOff"></div>
    </transition>
    <!-- 全屏模式下顶部显示的内容 -->
    <d-player-top :title="title" v-if="state.fullScreen && state.isVideoHovering"></d-player-top>
    <!-- 状态栏 -->
    <div class="d-player-state" @dblclick="toggleFullScreenHandle" @click="togglePlay">
      <transition name="d-scale-out">
        <div class="d-play-btn" v-show="state.isPaused">
          <d-icon icon="icon-play" :size="40"></d-icon>
        </div>
      </transition>
      <!-- 操作信息通知 -->
      <d-status :state="state"></d-status>
    </div>
    <!-- 播放按钮控制器 -->
    <div class="d-player-control" ref="refPlayerControl" v-if="state.control">
      <div
        class="d-control-progress"
        @mousemove="onProgressMove"
        @mousedown="onProgressDown"
        @touchstart="onProgressDown"
      >
        <div class="d-progress-bar">
          <div class="d-progress-subtitle" :style="{ left: state.progressCursorX + 'px' }">
            <div class="d-progress-cover">{{ state.progressCursorTime }}</div>
          </div>
          <div class="d-progress-play" :style="{ width: `${state.playRatio}%` }"></div>
          <div class="d-progress-load" :style="{ width: `${state.loadRatio}%` }"></div>
        </div>
      </div>

      <div class="d-control-tool">
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
              <div class="volume-main">
                <span class="volume-text-size">{{ state.muted ? 0 : ~~(state.volume * 100) }}%</span>
                <div
                  ref="refVolumeWrap"
                  class="volume-body"
                  @mousedown="onVolumeDown"
                  @touchstart="onVolumeDown"
                >
                  <div class="volume-line">
                    <p
                      class="volume-line-range"
                      :style="{ height: `${state.muted ? 0 : (state.volume * 100)}%` }"
                    ></p>
                  </div>
                </div>
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
import { hexToRgba, timeFormat, requestPictureInPicture, toggleFullScreen } from '../utils/index'


// 默认配置
const defaultOptions = {
  speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
  autoPlay: false, //自动播放
  loop: false, //循环播放
  mirror: false, //镜像画面
  ligthOff: false,  //关灯模式
  volume: 0.3, //默认音量大小
  control: true, //是否显示控制器
  title: '', //视频名称
  src: "", //视频源
  preload: "auto", //预加载 
}
const props = defineProps({
  width: { type: String, default: '800px' },
  height: { type: String, default: '450px' },
  color: { type: String, default: '#409eff' },
  webFullScreen: { type: Boolean, default: false },//网页全屏
  speed: { type: Boolean, default: true },//是否支持快进快退
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
let refdVideo = ref(null)
let refPlayerWrap = ref(null)
let refVolumeWrap = ref(null)
let refPlayerControl = ref(null) //控制器
const state = reactive({
  dVideo: null,
  // ...defaultOptions, //默认配置
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
  // 当前播放进度比例
  playRatio: 0,
  // 当前缓冲进度
  loadRatio: 0,
  //总时长
  totalTime: "00:00:00",
  isVideoHovering: true,
  // 是否在拖拽中
  draging: false,
  startY: 0,
  speedActive: "1.0", //倍速
  isMultiplesPlay: false, //是否倍速播放
  longPressTimeout: null,
  progressCursorX: 0, //进度条光标
  progressCursorTime: '00:00:00', //进度条光标时间

})

// 把颜色格式化为rgb格式
const hexToRgbaColor = hexToRgba(state.color)
// 清空当前操作类型
const clearHandleType = debounce(1000, () => {
  state.handleType = '';
})
const keypress = (ev, pressType: any) => {
  let keyCode = ev.keyCode || ev.code;
  // arrowLeft  快退
  if (keyCode == 37 || keyCode == 'ArrowLeft') {
    if (!props.speed) return // 如果不支持快进快退
    ev.preventDefault();
    if (pressType == "keyup") {
      state.dVideo.currentTime = state.dVideo.currentTime < 10 ? 0.1 : state.dVideo.currentTime - 10;
      timeupdate(state.dVideo);
    }
  }
  // arrowTop  音量+
  else if (keyCode == 38 || keyCode == 'ArrowTop') {
    if (pressType == "keydown") {
      ev.preventDefault();
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
      ev.preventDefault();
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
      ev.preventDefault();
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
  state.loadRatio = ((end / duration) * 100).toFixed(2);
  // console.dir(ev.target.buffered.length);
  // console.dir(ev.target.buffered.end(length - 1));
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
  let duration = ev.duration || ev.target.duration; // 媒体总长
  let currentTime = ev.currentTime || ev.target.currentTime; // 当前歌曲播放长度

  state.playRatio = ((currentTime / duration) * 100).toFixed(2);
  state.currentTime = timeFormat(currentTime);
}
// 静音事件
const mutedHandler = () => {
  state.muted = !state.muted;
}

// 音量按下
const onVolumeDown = (ev) => {
  ev.preventDefault();
  onVolumeStart(ev, "y");
  // 鼠标移动
  window.addEventListener("mousemove", onVolumeing);
  window.addEventListener("touchmove", onVolumeing);
  // 鼠标释放
  window.addEventListener("mouseup", onVolumeEnd);
  window.addEventListener("touchend", onVolumeEnd);
  // 点击右键
  window.addEventListener("contextmenu", onVolumeEnd);
}
// 音量鼠标按下触发
const onVolumeStart = (ev, type) => {
  state.muted = false
  state.draging = true;
  if (type == "y") {
    state.startY = ev.clientY - ev.offsetY;
  }
  // 音量大小
  let volume = onDraggFn(ev, refVolumeWrap.value, "y");
  state.volume = volume;
  state.dVideo.volume = volume;
}
// 调节音量中
const onVolumeing = (ev) => {
  if (!state.draging) return;
  // 音量大小
  let volume = onDraggFn(ev, refVolumeWrap.value, "y");
  state.volume = volume;
  state.dVideo.volume = volume;
}
// 音量调节完成
const onVolumeEnd = (ev) => {
  if (state.draging) {
    /*
     * 防止在 mouseup 后立即触发 click，导致滑块有几率产生一小段位移
     * 不使用 preventDefault 是因为 mouseup 和 click 没有注册在同一个 DOM 上
     */
    setTimeout(() => {
      state.draging = false;
    }, 0);
    window.removeEventListener("mousemove", onVolumeing);
    window.removeEventListener("touchmove", onVolumeing);
    window.removeEventListener("mouseup", onVolumeEnd);
    window.removeEventListener("touchend", onVolumeEnd);
    window.removeEventListener("contextmenu", onVolumeEnd);
  }
}
// 进度条移动
const onProgressMove = (ev) => {
  let controlWidth = refPlayerControl.value.clientWidth
  state.progressCursorX = ev.offsetX
  state.progressCursorTime = timeFormat(
    state.dVideo.duration * (ev.offsetX / controlWidth)
  );
}
// 进度条按下
const onProgressDown = (ev) => {
  if (!props.speed) return
  // if(speed)
  ev.preventDefault();
  onProgressStart(ev);
  // 鼠标移动
  window.addEventListener("mousemove", onDraging);
  window.addEventListener("touchmove", onDraging);
  // 鼠标释放
  window.addEventListener("mouseup", onDragEnd);
  window.addEventListener("touchend", onDragEnd);
  // 点击右键
  window.addEventListener("contextmenu", onDragEnd);
}
// 进度条鼠标按下触发
const onProgressStart = (ev, type) => {
  ev.preventDefault();
  // state.cacheIsPaused = state.isPaused;
  // // 拖动之前暂停播放
  // state.isPaused = true;
  // state.dVideo.pause();
  state.draging = true;
  // 播放进度条进度
  state.playRatio = onDraggFn(ev, refPlayerControl.value) * 100;
  state.currentTime = timeFormat(
    ev.target.duration * onDraggFn(ev, refPlayerControl.value)
  );
  state.dVideo.currentTime = state.dVideo.duration * (state.playRatio / 100);
}
// 拖拽中
const onDraging = (ev) => {
  ev.preventDefault();
  if (!state.draging) return;
  // 播放进度条进度
  state.playRatio = onDraggFn(ev, refPlayerControl.value) * 100;

  state.currentTime = timeFormat(
    state.dVideo.duration * onDraggFn(ev, refPlayerControl.value)
  );
  state.dVideo.currentTime = state.dVideo.duration * (state.playRatio / 100);
}
// 获取鼠标拖拽比例
const onDraggFn = (ev, evBox, type) => {
  if (ev.type === "touchmove" || ev.type === "touchstart") {
    ev.clientY = ev.touches[0].clientY;
    ev.clientX = ev.touches[0].clientX;
  }
  // 如果是Y轴拖动
  if (type == "y") {
    // console.log(state.startY);
    let evBoxClientHeight = evBox.clientHeight;
    // 获取整个播放器宽度
    // let offsetTop = evBox.offsetTop - ev.offsetX;
    // console.log(ev.offsetX / evBoxClientHeight);
    let value =
      (evBoxClientHeight - (ev.clientY - state.startY)) / evBoxClientHeight;
    return value < 0 ? 0 : value > 1 ? 1 : value;
  }
  // X轴拖动
  else {
    // 控制器宽度
    let evBoxClientWidth = evBox.clientWidth;
    // 获取整个播放器宽度
    let offsetX = ev.clientX - refPlayerWrap.value.offsetLeft;
    let value = ev.offsetX / evBoxClientWidth
    // 鼠标移出播放器做的兼容
    return value < 0 ? 0 : value > 1 ? 1 : value;
  }
}
// 拖拽结束
const onDragEnd = (ev) => {
  // let diff = ev.offsetX / state.dVideo.clientWidth;
  // // 播放进度条进度
  // state.dVideo.currentTime = state.dVideo.duration * diff;
  if (state.draging) {
    /*
     * 防止在 mouseup 后立即触发 click，导致滑块有几率产生一小段位移
     * 不使用 preventDefault 是因为 mouseup 和 click 没有注册在同一个 DOM 上
     */
    setTimeout(() => {
      state.draging = false;
      state.dVideo.play();
      state.isPaused = false;

      // state.hideTooltip();
    }, 0);
    window.removeEventListener("mousemove", onDraging);
    window.removeEventListener("touchmove", onDraging);
    window.removeEventListener("mouseup", onDragEnd);
    window.removeEventListener("touchend", onDragEnd);
    window.removeEventListener("contextmenu", onDragEnd);
  }
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
  window.addEventListener("keydown", (ev) => {
    keypress(ev, "keydown");
  });
  window.addEventListener("keyup", (ev) => {
    keypress(ev, "keyup");
  });

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