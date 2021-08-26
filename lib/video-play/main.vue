/*
 * @Author: web.王晓冬
 * @Date: 2020-11-03 16:29:47
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2021-08-26 07:56:54
 * @Description: file content
*/

<template>
  <div
    ref="refPlayerWrap"
    class="d-player-wrap"
    @mousemove="mouseMovewWarp"
    :class="{
      'web-full-screen': state.webFullScreen,
      'is-lightoff': state.lightOff,
      'd-player-wrap-hover': state.playBtnState == 'pause' || state.isVideoHovering
    }"
  >
    <!-- 如果是移动端并且支持倍速 controls=true 否则为flase -->
    <div class="d-player-video">
      <video
        ref="refdVideo"
        class="d-player-video-main"
        :controls="isMobile && state.speed ? true : false"
        :class="{ 'video-mirror': state.mirror }"
        :webkit-playsinline="props.playsinline"
        :playsinline="props.playsinline"
        v-bind="videoEvents"
        :volume="state.volume"
        :muted="state.muted"
        :loop="state.loop"
        :preload="preload"
        width="100%"
        height="100%"
        :src="props.src"
        poster="https://xdlumia.oss-cn-beijing.aliyuncs.com/videos/02.jpg"
      >您的浏览器不支持Video标签。</video>
    </div>
    <!-- 缓冲动画 -->
    <!-- <d-waitingloading text="正在缓冲..." v-show="state.waitingLoading" /> -->
    <!-- 预加载动画 -->
    <d-loading :loadType="state.loadStateType" />
    <transition name="d-fade-in">
      <div class="d-player-lightoff" v-show="state.lightOff"></div>
    </transition>
    <!-- 全屏模式&&鼠标滑过 顶部显示的内容 -->
    <d-player-top :title="props.title" v-if="state.fullScreen && state.isVideoHovering"></d-player-top>
    <!-- 状态栏 移动端不显示-->
    <div class="d-player-state" v-if="!isMobile">
      <transition name="d-scale-out">
        <!-- 播放按钮 -->
        <div class="d-play-btn" v-show="state.playBtnState == 'play'">
          <d-icon icon="icon-play" :size="40"></d-icon>
        </div>
      </transition>
      <!-- 操作信息通知 -->
      <d-status :state="state"></d-status>
    </div>
    <!-- 移动端不显示 -->
    <input
      v-if="!isMobile"
      type="input"
      readonly="readonly"
      ref="refInput"
      @dblclick="toggleFullScreenHandle"
      @click="togglePlay"
      @keydown.space="togglePlay"
      @keyup="keypress"
      @keyup.arrow-left="keydownLeft"
      @keydown.arrow-up.arrow-down="volumeKeydown"
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
          :hoverText="state.progressCursorTime"
          v-model="state.playProgress"
          :preload="state.preloadBar"
        ></d-slider>
      </div>

      <div class="d-control-tool" @click="inputFocusHandle">
        <div class="d-tool-bar">
          <div class="d-tool-item">
            <d-icon @click="togglePlay" size="24" :icon="`icon-${state.playBtnState}`"></d-icon>
          </div>
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
            <span @click="mutedHandler" style="display:flex">
              <d-icon
                size="20"
                :icon="`icon-volume-${state.volume == 0 || state.muted ? 'mute' : state.volume > 0.5 ? 'up' : 'down'
                }`"
              ></d-icon>
            </span>
          </div>
          <!-- 设置 -->
          <div class="d-tool-item">
            <d-icon size="20" class="rotateHover" icon="icon-settings"></d-icon>
            <div class="d-tool-item-main">
              <ul class="speed-main">
                <li>
                  镜像画面
                  <d-switch @change="mirrorChange" v-model="state.mirror" />
                </li>
                <li>
                  循环播放
                  <d-switch @change="loopChange" v-model="state.loop" />
                </li>
                <li>
                  关灯模式
                  <d-switch @change="lightOffChange" v-model="state.lightOff" />
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
export default {
  name: "vue3VideoPlay",
  inheritAttrs: false,
}
</script>
<script setup lang="ts">
import { reactive, ref, nextTick, computed } from 'vue'
import { debounce } from 'throttle-debounce';
import DIcon from '../components/d-icon.vue'
import DPlayerTop from '../components/d-player-top.vue'
import DStatus from '../components/d-status.vue' //倍速播放状态
import DSwitch from '../components/d-switch.vue' //switch
import DLoading from '../components/d-loading.vue' //loading
import DSlider from '../components/d-slider.vue' // slider
import { on, off } from '../utils/dom'
import { hexToRgba, timeFormat, requestPictureInPicture, toggleFullScreen, isMobile, firstUpperCase } from '../utils/util'
import { videoEmits, defineProps } from './plugins/index'
const props = defineProps(defineProps) //props
const emits = defineEmits([...videoEmits, 'mirrorChange', 'loopChange', 'lightOffChange',])  //emits 

const refPlayerWrap: Ref<HTMLElement> = ref(null) //wrap 
const refdVideo: Ref<HTMLElement> = ref(null) // 视频播放器
const refPlayerControl: Ref<HTMLElement> = ref(null) //播放器控制器
const refInput: Ref<HTMLElement> = ref(null) //快捷键操作
const state = reactive({
  dVideo: null,
  ...props, //如果有自定义配置就会替换默认配置
  muted: props.autoPlay,
  playBtnState: props.autoPlay ? 'pause' : 'play',// 播放按钮状态
  loadStateType: 'loadstart',// 加载状态类型 //loadstart初始化  waiting缓冲 ended播放结束
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
var compose = function (f, g) {
  return function () {

    return f(g());
  };
};
// 收集video事件
const videoEvents = {}
videoEmits.forEach(emit => {
  let name = `on${firstUpperCase(emit)}`
  videoEvents[name] = (ev) => {
    // 当前状态
    state.loadStateType = emit
    emits(emit, ev)
  }
  // videoEvents['onPlay']

  videoEvents['onPlay'] = (ev) => {
    emits(emit, 'play')
  }
  videoEvents['onPause'] = (ev) => {
    emits(emit, 'pause')
  }
  // // 播放结束
  videoEvents['onEnded'] = (ev) => {
    state.loadStateType = 'ended' //当前是播放结束状态
    state.playBtnState = 'replay' //此时的控制按钮应该显示重新播放
    emits(emit, ev)
    // console.log('播放结束')
  }

  // 已获得播放时长
  videoEvents['onDurationchanged'] = (ev) => {
    emits('durationchange', ev)
    state.totalTime = timeFormat(ev.target.duration);
  }

  // 缓冲下载中
  videoEvents['onProgress'] = (ev) => {
    console.log("缓冲中...");
    emits(emit, ev)
    let duration = ev.target.duration; // 媒体总长
    let length = ev.target.buffered.length;
    let end = ev.target.buffered.length && ev.target.buffered.end(length - 1);
    state.preloadBar = end / duration //缓冲比例
  }

  videoEvents['onCanplay'] = (ev) => {
    state.loadStateType = 'canplay'
    // console.log("可以播放");
    emits(emit, ev)
    // 记录快进之前是否是暂停  如果不是暂停. 那么缓存完自动播放
    if (state.autoPlay) { //如果是自动播放 则显示暂停按钮
      state.dVideo.play();
      state.playBtnState = 'pause'
    }
  }
})
console.log(videoEvents)
// const videoEvents = videoEmits.reduce((obj, emit) => {
//   let name = `on${firstUpperCase(emit)}`
//   obj[name] = (ev) => {
//     emits(emit, ev)
//   }
//   return obj
// }, {})

// 把颜色格式化为rgb格式
const hexToRgbaColor = hexToRgba(state.color)
// 清空当前操作类型
const clearHandleType = debounce(500, () => {
  state.handleType = '';
})
// 音量 +++ --
const volumeKeydown = (ev) => {
  ev.preventDefault()
  if (ev.code == 'ArrowUp') {
    state.volume = (state.volume + 0.1) > 1 ? 1 : state.volume + 0.1
  } else {
    state.volume = (state.volume - 0.1) < 0 ? 0 : state.volume - 0.1
  }
  state.muted = false
  state.handleType = 'volume' //操作类型  音量
  clearHandleType() //清空 操作类型

}
const keydownLeft = (ev) => {
  if (!props.speed) return // 如果不支持快进快退s
  state.dVideo.currentTime = state.dVideo.currentTime < 10 ? 0.1 : state.dVideo.currentTime - 10;
  timeupdate(state.dVideo);
}
const keypress = (ev) => {
  ev.preventDefault()
  let pressType = ev.type
  if (ev.key == 'ArrowRight') {
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
        state.playBtnState = 'play'
        state.dVideo.play();
        state.handleType = 'playbackRate' //操作类型 倍速播放
        clearHandleType() //清空 操作类型
      }, 500)

    }
  }

}
// 聚焦到播放器
const inputFocusHandle = () => {
  if (isMobile) return
  refInput.value.focus()
}

// 播放方法
const playHandle = () => {
  state.dVideo.play().catch(() => {
    setTimeout(() => {
      state.playBtnState = 'play'
    }, 500)

  });
  state.playBtnState = 'pause'
  // 播放后清空状态
  // state.loadStateType = ''
}
// 暂停
const pauseHandle = () => {
  // state.loadStateType = 'pause' // 暂停状态
  state.dVideo.pause();
  state.playBtnState = 'play' // 暂停后要显示播放按钮
}

// 播放暂停
const togglePlay = (ev) => {
  if (ev) ev.preventDefault()
  if (state.playBtnState == 'play' || state.playBtnState == 'replay') {
    // 点击播放按钮 或 重新播放按钮 后
    playHandle()
  } else if (state.playBtnState == 'pause') {
    // 点击暂停按钮后...
    pauseHandle()
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
  // 如果之前音量调整为0 取消静音时会把音量设置为5
  if (state.volume == 0) {
    state.volume = 0.05
  }
}

//进度条事件
const progressBarChange = (ev: Event, val) => {
  // emits('timeupdate', ev)
  let duration = state.dVideo.duration || state.dVideo.target.duration; // 媒体总长
  state.dVideo.currentTime = duration * val
  if (state.playBtnState == 'play') {
    state.dVideo.play()
    state.playBtnState = 'pause'
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
//镜像画面事件
const mirrorChange = (val) => {
  // console.log(val)
  emits('mirrorChange', val, state.dVideo)
}
// 是否循环事件
const loopChange = (val) => {
  // console.log(val)
  emits('loopChange', val, state.dVideo)
}
// 关灯事件
const lightOffChange = (val) => {
  // console.log(val)
  emits('lightOffChange', val, state.dVideo)
}
// 初始化
const init = async () => {
  await nextTick()
  state.dVideo = refdVideo
  state.dVideo.load()
  inputFocusHandle()
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
defineExpose({
  play: playHandle, //播放
  pause: pauseHandle, //暂停
  togglePlay, //暂停或播放
})
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