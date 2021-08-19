/*
 * @Author: web.王晓冬
 * @Date: 2020-11-03 16:29:47
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2021-08-19 22:25:01
 * @Description: file content
*/

<template>
  <div
    class="d-player-wrap"
    ref="refPlayerWrap"
    @mousemove="mouseMovewWarp"
    :class="{ 'web-full-screen': isWebFullScreen, 'd-player-wrap-hover': isVideoHovering }"
  >
    <div class="d-player-heimu"></div>
    <video
      ref="refdVideo"
      :controls="false"
      class="d-player-main"
      @loadstart="loadstart"
      @durationchange="durationchange"
      @loadeddata="loadeddata"
      @progress="progress"
      @canplay="canplay"
      @canplaythrough="canplaythrough"
      @timeupdate="timeupdate"
      @ended="ended"
      width="100%"
      height="100%"
      poster
    >
      <source src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" type="video/mp4" />
    </video>
    <!-- 全屏模式下顶部显示的内容 -->
    <d-player-top v-if="isFullScreen"></d-player-top>
    <!-- 状态栏 -->
    <div class="d-player-state" @click="togglePlay">
      <!-- <d-status-multiple></d-status-multiple> -->
    </div>
    <!-- 播放按钮控制器 -->
    <div class="d-player-control">
      <div
        class="d-control-progress"
        @mousemove="onProgressMove"
        @mousedown="onProgressDown"
        @touchstart="onProgressDown"
      >
        <div class="d-progress-bar">
          <div class="d-progress-subtitle" :style="{ left: progressCursorX + 'px' }">
            <div class="d-progress-cover">{{ progressCursorTime }}</div>
          </div>
          <div class="d-progress-play" :style="{ width: `${playRatio}%` }"></div>
          <div class="d-progress-load" :style="{ width: `${loadRatio}%` }"></div>
        </div>
      </div>

      <div class="d-control-tool" ref="controlWrap">
        <div class="d-tool-bar">
          <div class="d-tool-item">
            <d-icon @click="togglePlay" size="24" :icon="`icon-${isPaused ? 'play' : 'pause'}`"></d-icon>
          </div>
          <!-- 下一部 -->
          <!-- <div class="d-tool-item">
            <d-icon size="18" icon="icon-next"></d-icon>
          </div>-->

          <div class="d-tool-item d-tool-time">
            <span>{{ currentTime }}</span>
            <span style="margin: 0 3px">/</span>
            <span class="total-time">{{ totalTime }}</span>
          </div>
        </div>
        <div class="d-tool-bar">
          <div class="d-tool-item" style="width:26px">
            {{ speedActive == "1.0" ? "倍速" : speedActive + "X" }}
            <div class="d-tool-item-main">
              <ul class="speed-main">
                <li
                  :class="{ 'speed-active': speedActive == row }"
                  @click="playbackRate(row)"
                  v-for="row of options.speedRate"
                  :key="row"
                >{{ row }}X</li>
              </ul>
            </div>
          </div>
          <!-- 音量 -->
          <div class="d-tool-item">
            <div class="d-tool-item-main volume-box" style="width:52px">
              <div class="volume-main">
                <span class="volume-text-size">{{ ~~volumeSize }}%</span>
                <div
                  ref="refVolumeWrap"
                  class="volume-body"
                  @mousedown="onVolumeDown"
                  @touchstart="onVolumeDown"
                >
                  <div class="volume-line">
                    <p class="volume-line-range" :style="{ height: `${volumeSize}%` }"></p>
                  </div>
                </div>
              </div>
            </div>
            <d-icon
              @click="mutedHandler"
              size="18"
              :icon="`icon-volume-${volumeSize == 0 ? 'mute' : volumeSize > 50 ? 'up' : 'down'
              }`"
            ></d-icon>
          </div>
          <!-- 设置 -->
          <div class="d-tool-item">
            <d-icon size="20" icon="icon-settings"></d-icon>
            <div class="d-tool-item-main">
              <ul class="speed-main">
                <li
                  :class="{ 'speed-active': speedActive == row }"
                  @click="playbackRate(row)"
                  v-for="row of options.speedRate"
                  :key="row"
                >{{ row }}X</li>
              </ul>
            </div>
          </div>
          <!-- 画中画 -->
          <div class="d-tool-item" @click="requestPictureInPictureHandle">
            <d-icon size="20" icon="icon-pip"></d-icon>
            <div class="d-tool-item-main">画中画</div>
          </div>
          <!-- 画中画 -->
          <div class="d-tool-item" @click="isWebFullScreen = !isWebFullScreen">
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
<script>
// import dIcon from "./d-icon";
export default {
  name: "d-v-player",
}

</script>
<script setup>
import { reactive, ref, toRefs, nextTick } from 'vue'
import { debounce } from 'throttle-debounce';
import DIcon from '../components/d-icon.vue'
import DPlayerTop from '../components/d-player-top.vue'
import DStatusMultiple from '../components/d-status-Multiple.vue' //倍速播放状态
import { hexToRgba, timeFormat, requestPictureInPicture, toggleFullScreen } from '../utils/index'
const props = defineProps({
  options: {
    type: Object,
    default: () => ({
      color: "#409eff",
      muted: false,
      webFullScreen: false,
      speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
      autoPlay: false,
    }),
  },
})
let refdVideo = ref(null)
let refPlayerWrap = ref(null)
let refVolumeWrap = ref(null)
const state = reactive({
  dVideo: null,
  //标记当前的播放状态
  isPaused: !props.options.autoPlay,
  //标记当前是否静音
  isMuted: props.options.muted,
  isWebFullScreen: props.options.webFullScreen,
  isFullScreen: false,
  //当前播放时间
  currentTime: "00:00:00",
  // 当前播放进度比例
  playRatio: 0,
  // 当前缓冲进度
  loadRatio: 0,
  //总时长
  totalTime: "00:00:00",
  //标记控制面板是否可见
  isShow: true,
  //开始时间，毫秒为单位
  startTime: 0,
  isVideoHovering: true,
  // 是否在拖拽中
  draging: false,
  volumeSize: 30,
  cacheVolumeSize: 0, //记录静音之前的大小
  startY: 0,
  speedActive: "1.0", //倍速
  isMultiplesPlay: false, //是否倍速播放
  longPressTimeout: null,
  progressCursorX: 0, //进度条光标
  progressCursorTime: '00:00:00' //进度条光标时间
})

// 把颜色格式化为rgb格式
const hexToRgbaColor = hexToRgba(props.options.color)

const keypress = (ev, pressType) => {
  let keyCode = ev.keyCode || ev.code;
  // arrowLeft  快退
  if (keyCode == 37 || keyCode == 'ArrowLeft') {
    if (pressType == "keyup") {
      state.dVideo.currentTime = state.dVideo.currentTime < 10 ? 0.1 : state.dVideo.currentTime - 10;
      timeupdate(state.dVideo);
    }
  }
  // arrowTop
  else if (keyCode == 38 || keyCode == 'ArrowTop') {
  }
  // arrowRight
  else if (keyCode == 39 || keyCode == 'ArrowRight') {
    if (pressType == "keyup") {
      clearTimeout(state.longPressTimeout);
      if (state.isMultiplesPlay) {
        state.dVideo.playbackRate = state.speedActive;
        state.isMultiplesPlay = false;
      } else {
        // 进度加10s
        state.dVideo.currentTime = state.dVideo.currentTime + 10;
        timeupdate(state.dVideo);
      }
      // 如果长按5倍速播放
    } else if (pressType == "keydown") {
      if (state.isMultiplesPlay) {
        clearTimeout(state.longPressTimeout);
      }
      state.longPressTimeout = setTimeout(() => {
        state.isMultiplesPlay = true;
        state.dVideo.playbackRate = 5;
      }, 500)

    }
  }
  // arrowBottom
  else if (keyCode == 40 || keyCode == 'ArrowDown') {
  }
}

// 控制栏鼠标hover
// toolItemMouseenter(ev) {
//   ev.preventDefault();
//   if (ev.target.querySelector(".d-tool-item-main")) {
//     ev.target.querySelector(".d-tool-item-main").style.display = "flex";
//   }
// },
// toolItemMouseleave(ev) {
//   ev.preventDefault();
//   if (ev.target.querySelector(".d-tool-item-main")) {
//     ev.target.querySelector(".d-tool-item-main").style.display = "none";
//   }
// },
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
//开始加载
const loadstart = (ev) => {
  console.log("开始加载");
}
// 已获得播放时长
const durationchange = (ev) => {
  state.totalTime = timeFormat(ev.target.duration);
}
// 获得播放头文件
const loadeddata = (ev) => {
  console.log("已获取播放头");
}
// 缓冲下载中
const progress = (ev) => {
  console.log("开始缓冲");
  let duration = ev.target.duration; // 媒体总长
  let length = ev.target.buffered.length;
  let end = ev.target.buffered.end(length - 1);
  state.loadRatio = ((end / duration) * 100).toFixed(2);
  // console.dir(ev.target.buffered.length);
  // console.dir(ev.target.buffered.end(length - 1));
}
// 可以播放
const canplay = (ev) => {
  console.log("可以播放");
  // 如果静音
  if (props.options.muted) {
    state.dVideo.muted = true;
  } else {
    state.dVideo.volume = state.volumeSize / 100;
  }
  // 记录快进之前是否是暂停  如果不是暂停. 那么缓存完自动播放

  if (props.options.autoPlay) {
    state.isPaused = false;
    state.dVideo.play();
  }
}
const canplaythrough = (ev) => {
  console.log("可持续播放");
}
// 当前播放进度
const timeupdate = (ev) => {
  let duration = ev.duration || ev.target.duration; // 媒体总长
  let currentTime = ev.currentTime || ev.target.currentTime; // 当前歌曲播放长度

  state.playRatio = ((currentTime / duration) * 100).toFixed(2);
  state.currentTime = timeFormat(currentTime);
}
// 静音事件
const mutedHandler = () => {
  state.isMuted = !state.isMuted;
  state.dVideo.muted = state.isMuted;
  if (state.isMuted) {
    // 缓存静音之前的音量大小
    state.cacheVolumeSize = state.volumeSize;
    state.volumeSize = 0;
  } else {
    state.volumeSize = state.cacheVolumeSize;
  }
}
// 播放结束
const ended = () => { }
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
  state.draging = true;
  if (type == "y") {
    state.startY = ev.clientY - ev.offsetY;
  }
  // 音量大小
  let volume = onDraggFn(ev, refVolumeWrap.value, "y");
  state.volumeSize = volume * 100;
  state.dVideo.volume = volume;
}
// 调节音量中
const onVolumeing = (ev) => {
  if (!state.draging) return;
  // 音量大小
  let volume = onDraggFn(ev, refVolumeWrap.value, "y");
  state.volumeSize = volume * 100;
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
// 进度条按下
const onProgressMove = (ev) => {
  let playerWrapWidth = refPlayerWrap.value.clientWidth
  state.progressCursorX = ev.offsetX
  state.progressCursorTime = timeFormat(
    state.dVideo.duration * (ev.offsetX / playerWrapWidth)
  );
}
// 进度条按下
const onProgressDown = (ev) => {
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
  state.playRatio = onDraggFn(ev, refPlayerWrap.value) * 100;
  state.currentTime = timeFormat(
    ev.target.duration * onDraggFn(ev, refPlayerWrap.value)
  );
  state.dVideo.currentTime = state.dVideo.duration * (state.playRatio / 100);
}
// 拖拽中
const onDraging = (ev) => {
  ev.preventDefault();
  if (!state.draging) return;
  // 播放进度条进度
  state.playRatio = onDraggFn(ev, refPlayerWrap.value) * 100;

  state.currentTime = timeFormat(
    state.dVideo.duration * onDraggFn(ev, refPlayerWrap.value)
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
    let evBoxClientWidth = evBox.clientWidth;
    // 获取整个播放器宽度
    let offsetX = ev.clientX - refPlayerWrap.value.offsetLeft;
    let value = offsetX / evBoxClientWidth;
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
    state.isFullScreen = true
  } else {
    state.isFullScreen = false
  }
}


let { isPaused, isMuted, isWebFullScreen, isFullScreen, currentTime, playRatio, loadRatio, totalTime, isShow, startTime, isVideoHovering, draging, volumeSize, cacheVolumeSize, startY, speedActive, isMultiplesPlay, longPressTimeout, progressCursorX,
  progressCursorTime } = toRefs(state)
let color = '#000'
</script>

<style lang="less" scoped>
.d-player-wrap {
  --primary-color: v-bind(hexToRgbaColor);
}
@import "../style/reset.less";
@import "../style/vPlayer.less";
</style>