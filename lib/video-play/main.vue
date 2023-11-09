/*
 * @Author: web.王晓冬
 * @Date: 2020-11-03 16:29:47
 * @LastEditors: itab.link
 * @LastEditTime: 2023-11-09 15:50:42
 * @Description: file content
*/

<template>
  <div
    ref="refPlayerWrap"
    id="refPlayerWrap"
    class="d-player-wrap"
    @mousemove="mouseMovewWarp"
    :class="{
      'web-full-screen': state.webFullScreen,
      'is-lightoff': state.lightOff,
      'd-player-wrap-hover':
        state.playBtnState == 'play' || state.isVideoHovering,
    }"
  >
    <!-- 如果是移动端并且支持倍速 controls=true 否则为flase -->
    <div class="d-player-video" id="dPlayerVideo">
      <!-- <div
        class="d-player-video-poster"
        v-show="props.poster && state.playBtnState == 'play' && state.currentTime == '00:00:00'"
      >
        <img :src="props.poster" :alt="props.title" />
      </div>-->
      <video
        ref="refdVideo"
        class="d-player-video-main"
        id="dPlayerVideoMain"
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
        :poster="props.poster"
      >
        您的浏览器不支持Video标签。
      </video>
    </div>
    <!-- 缓冲动画 -->
    <!-- <d-waitingloading text="正在缓冲..." v-show="state.waitingLoading" /> -->

    <transition name="d-fade-in">
      <div class="d-player-lightoff" v-show="state.lightOff"></div>
    </transition>
    <!-- 全屏模式&&鼠标滑过 顶部显示的内容 -->
    <d-player-top :title="props.title" v-if="state.fullScreen"></d-player-top>
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
      @keyup.f="toggleFullScreenHandle"
      @keyup.esc="state.webFullScreen = false"
      @click="togglePlay"
      @keydown.space="togglePlay"
      @keyup="keypress"
      @keydown.arrow-left="keydownLeft"
      @keydown.arrow-up.arrow-down="volumeKeydown"
      @keydown="keypress"
      class="d-player-input"
      maxlength="0"
    />
    <!-- 预加载动画 -->
    <d-loading :loadType="state.loadStateType" />
    <d-contextmenu />
    <!-- PC端播放按钮控制器  移动端调用自带控制器-->
    <div
      class="d-player-control"
      ref="refPlayerControl"
      v-if="!isMobile && state.control"
    >
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
          <div class="d-tool-item" @click="togglePlay">
            <d-icon size="24" :icon="`icon-${state.playBtnState}`"></d-icon>
          </div>
          <div
            class="d-tool-item d-tool-time audioTrack-btn"
            v-if="props.controlBtns.includes('audioTrack')"
          >
            <span>{{ state.currentTime }}</span>
            <span style="margin: 0 3px">/</span>
            <span class="total-time">{{ state.totalTime }}</span>
          </div>
        </div>
        <div class="d-tool-bar">
          <!-- 清晰度 -->
          <div
            class="d-tool-item quality-btn"
            v-if="
              state.qualityLevels.length &&
              props.controlBtns.includes('quality')
            "
          >
            {{
              state.qualityLevels.length &&
              (state.qualityLevels[state.currentLevel] || {}).height
            }}P
            <div class="d-tool-item-main">
              <ul class="speed-main" style="text-align: center">
                <li
                  :class="{ 'speed-active': state.currentLevel == index }"
                  @click="qualityLevelsHandle(row, index)"
                  v-for="(row, index) of state.qualityLevels"
                  :key="row"
                >
                  {{ row.height }}P
                </li>
                <!-- <li @click="qualityLevelsHandle({}, -1)">自动</li> -->
              </ul>
            </div>
          </div>
          <!-- 倍速播放 -->
          <div
            class="d-tool-item speedRate-btn"
            v-if="props.controlBtns.includes('speedRate')"
          >
            {{ state.speedActive == "1.0" ? "倍速" : state.speedActive + "x" }}
            <div class="d-tool-item-main">
              <ul class="speed-main">
                <li
                  :class="{ 'speed-active': state.speedActive == row }"
                  @click="playbackRate(row)"
                  v-for="row of state.speedRate"
                  :key="row"
                >
                  {{ row }}x
                </li>
              </ul>
            </div>
          </div>
          <!-- 音量 -->
          <div
            class="d-tool-item volume-btn"
            v-if="props.controlBtns.includes('volume')"
          >
            <div class="d-tool-item-main volume-box" style="width: 52px">
              <div class="volume-main" :class="{ 'is-muted': state.muted }">
                <span class="volume-text-size"
                  >{{ state.muted ? 0 : ~~(state.volume * 100) }}%</span
                >
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
            <span @click="mutedHandler" style="display: flex">
              <d-icon
                size="20"
                :icon="`icon-volume-${
                  state.volume == 0 || state.muted
                    ? 'mute'
                    : state.volume > 0.5
                    ? 'up'
                    : 'down'
                }`"
              ></d-icon>
            </span>
          </div>
          <!-- 设置 -->
          <div
            class="d-tool-item setting-btn"
            v-if="props.controlBtns.includes('setting')"
          >
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
          <div
            class="d-tool-item pip-btn"
            v-if="props.controlBtns.includes('pip')"
            @click="requestPictureInPictureHandle"
          >
            <d-icon size="20" icon="icon-pip"></d-icon>
            <div class="d-tool-item-main">画中画</div>
          </div>
          <!-- 网页全屏 -->
          <div
            class="d-tool-item pip-btn"
            v-if="props.controlBtns.includes('pageFullScreen')"
            @click="state.webFullScreen = !state.webFullScreen"
          >
            <d-icon size="20" icon="icon-web-screen"></d-icon>
            <div class="d-tool-item-main">网页全屏</div>
          </div>
          <!-- 全屏 -->
          <div
            class="d-tool-item fullScreen-btn"
            v-if="props.controlBtns.includes('fullScreen')"
            @click="toggleFullScreenHandle"
          >
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
};
</script>
<script setup lang="ts">
import { reactive, ref, Ref, onMounted, useAttrs, watch, nextTick } from "vue";
import { debounce } from "throttle-debounce";
import Hls2 from "hls.js";
import DIcon from "../components/d-icon.vue";
import DPlayerTop from "../components/d-player-top.vue";
import DStatus from "../components/d-status.vue"; //倍速播放状态
import DSwitch from "../components/d-switch.vue"; //switch
import DLoading from "../components/d-loading.vue"; //loading
import DSlider from "../components/d-slider.vue"; // slider
import DContextmenu from "../components/d-contextmenu.vue"; // slider
import {
  hexToRgba,
  timeFormat,
  requestPictureInPicture,
  toggleFullScreen,
  isMobile,
  firstUpperCase,
} from "../utils/util";
const Hls = new Hls2({ fragLoadingTimeOut: 2000 });
import { videoEmits, defineProps } from "./plugins/index";
const props = defineProps(defineProps); //props
const emits = defineEmits([
  ...videoEmits,
  "mirrorChange",
  "loopChange",
  "lightOffChange",
]); //emits

const refPlayerWrap: Ref<HTMLElement> = ref(null); //wrap
const refdVideo: Ref<HTMLElement> = ref(null); // 视频播放器
const refPlayerControl: Ref<HTMLElement> = ref(null); //播放器控制器
const refInput: Ref<HTMLElement> = ref(null); //快捷键操作
const state = reactive({
  dVideo: null,
  ...props, //如果有自定义配置就会替换默认配置
  muted: props.muted,
  playBtnState: props.autoPlay ? "pause" : "play", // 播放按钮状态
  loadStateType: "loadstart", // 加载状态类型 //loadstart初始化  waiting缓冲 ended播放结束
  fullScreen: false,
  handleType: "", //当前操作类型
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
  progressCursorTime: "00:00:00", //进度条光标时间
  qualityLevels: [], //分辨率数组
  currentLevel: 0, //首选分辨率
});
const compose =
  (...args) =>
  (value) =>
    args.reverse().reduce((acc, fn) => fn(acc), value);
// 收集video事件
const videoEvents = videoEmits.reduce((events, emit) => {
  let name = `on${firstUpperCase(emit)}`;
  events[name] = (ev) => {
    state.loadStateType = emit;
    emits(emit, ev);
  };

  return events;
}, {});
// 可以播放
videoEvents["onCanplay"] = compose(videoEvents["onCanplay"], () => {
  if (state.playBtnState != "play") {
    //如果是自动播放 则显示暂停按钮
    state.dVideo.play();
  }
  if (state.autoPlay) {
    //如果是自动播放 则显示暂停按钮
    state.dVideo.play();
    state.playBtnState = "pause";
  }
});
// 播放结束// 合并函数
videoEvents["onEnded"] = compose(videoEvents["onEnded"], () => {
  state.playBtnState = "replay"; //此时的控制按钮应该显示重新播放
});

// 资源长度改变
videoEvents["onDurationchange"] = (ev) => {
  emits("durationchange", ev);
  if (props.currentTime != 0) {
    state.dVideo.currentTime = props.currentTime;
  }

  //更新当前时长的所有状态
  videoEvents.onTimeupdate(ev);
};

// 缓冲下载中
videoEvents["onProgress"] = (ev) => {
  console.log("缓冲中...");
  emits("progress", ev);
  let duration = ev.target.duration; // 媒体总长
  let length = ev.target.buffered;
  let end = ev.target.buffered.length && ev.target.buffered.end(length - 1);
  state.preloadBar = end / duration; //缓冲比例
};

// 当前播放进度
videoEvents["onTimeupdate"] = (ev) => {
  emits("timeupdate", ev);
  let duration = ev.duration || ev.target.duration || 0; // 媒体总长
  let currentTime = ev.currentTime || ev.target.currentTime; // 当前媒体播放长度
  state.playProgress = currentTime / duration; //播放进度比例
  state.currentTime = timeFormat(currentTime);
  state.totalTime = timeFormat(duration);
};
// error
videoEvents["onError"] = compose(videoEvents["onError"], () => {
  state.playBtnState = "replay"; //此时的控制按钮应该显示重新播放
});

// 获取用户自定义事件
let attrs = useAttrs();
for (let emit in attrs) {
  videoEvents[emit] = attrs[emit];
}

// 把颜色格式化为rgb格式
const hexToRgbaColor = hexToRgba(state.color);
// 清空当前操作类型
const clearHandleType = debounce(500, () => {
  state.handleType = "";
});
// 音量 +++ --
const volumeKeydown = (ev) => {
  ev.preventDefault();
  if (ev.code == "ArrowUp") {
    state.volume = state.volume + 0.1 > 1 ? 1 : state.volume + 0.1;
  } else {
    state.volume = state.volume - 0.1 < 0 ? 0 : state.volume - 0.1;
  }
  state.muted = false;
  state.handleType = "volume"; //操作类型  音量
  clearHandleType(); //清空 操作类型
};
const keydownLeft = (ev) => {
  if (!props.speed) return; // 如果不支持快进快退s
  state.dVideo.currentTime =
    state.dVideo.currentTime < 10 ? 0.1 : state.dVideo.currentTime - 10;
  videoEvents.onTimeupdate(state.dVideo);
  playHandle();
};
const keypress = (ev) => {
  ev.preventDefault();
  let pressType = ev.type;
  if (ev.key == "ArrowRight") {
    playHandle();
    if (pressType == "keyup") {
      clearTimeout(state.longPressTimeout);
      // 如果不支持快进快退 如果关闭快进快退必须在没有长按倍速播放的情况下
      if (!props.speed && !state.longPressTimeout) return;
      if (state.isMultiplesPlay) {
        //如果倍速播放中
        state.dVideo.playbackRate = state.speedActive;
        state.isMultiplesPlay = false;
      } else {
        // 进度加10s
        state.dVideo.currentTime = state.dVideo.currentTime + 10;
        videoEvents.onTimeupdate(state.dVideo);
      }
      // 如果长按5倍速播放
    } else if (pressType == "keydown") {
      if (!props.speed) return; // 如果不支持快进快退 也不能支持长按倍速播放
      if (state.isMultiplesPlay) {
        clearTimeout(state.longPressTimeout);
      }
      state.longPressTimeout = setTimeout(() => {
        state.isMultiplesPlay = true;
        state.dVideo.playbackRate = 5;
        state.handleType = "playbackRate"; //操作类型 倍速播放
        clearHandleType(); //清空 操作类型
      }, 500);
    }
  }
};
// 聚焦到播放器
const inputFocusHandle = () => {
  if (isMobile) return;
  refInput.value.focus();
};
// 播放方法
const playHandle = () => {
  state.loadStateType = "play";
  //首次播放会报错：DOMException: The play() request was interrupted by a new load request.
  state.dVideo.play().catch(() => {
    //处理无缓冲报错问题
    state.dVideo.load()
    setTimeout(() => {
      state.dVideo.play().catch(() => {
        //如果依然报错，则显示错误状态。
        state.playBtnState = "replay";
        state.loadStateType = "error";
      })
    },200)
  });
  state.playBtnState = "pause";
  // 播放后清空状态
  // state.loadStateType = ''
};
// 暂停
const pauseHandle = () => {
  // state.loadStateType = 'pause' // 暂停状态
  state.dVideo.pause();
  state.playBtnState = "play"; // 暂停后要显示播放按钮
};

// 播放暂停
const togglePlay = (ev) => {
  if (ev) ev.preventDefault();
  if (state.playBtnState == "play" || state.playBtnState == "replay") {
    // 点击播放按钮 或 重新播放按钮 后
    playHandle();
  } else if (state.playBtnState == "pause") {
    // 点击暂停按钮后...
    pauseHandle();
  }
};

// 静音事件
const mutedHandler = () => {
  state.muted = !state.muted;
  // 如果之前音量调整为0 取消静音时会把音量设置为5
  if (state.volume == 0) {
    state.volume = 0.05;
  }
};

//进度条事件
const progressBarChange = (ev: Event, val) => {
  let duration = state.dVideo.duration || state.dVideo.target.duration; // 媒体总长
  state.dVideo.currentTime = duration * val;
  if (state.playBtnState == "play") {
    state.dVideo.play();
    state.playBtnState = "pause";
  }
};
// 进度条移动
const onProgressMove = (ev, val) => {
  state.progressCursorTime = timeFormat(state.dVideo.duration * val);
};

// 隐藏控制器
const hideControl = debounce(2500, () => {
  state.isVideoHovering = false;
});

const mouseMovewWarp = (ev) => {
  state.isVideoHovering = true;
  hideControl();
};

// 播放速度
const qualityLevelsHandle = (row, index) => {
  Hls.currentLevel = index;
  state.currentLevel = index;
};
// 播放速度
const playbackRate = (row) => {
  state.speedActive = row;
  state.dVideo.playbackRate = row;
};
//镜像画面事件
const mirrorChange = (val) => {
  // console.log(val)
  emits("mirrorChange", val, state.dVideo);
};
// 是否循环事件
const loopChange = (val) => {
  // console.log(val)
  emits("loopChange", val, state.dVideo);
};
// 关灯事件
const lightOffChange = (val) => {
  // console.log(val)
  emits("lightOffChange", val, state.dVideo);
};

const requestPictureInPictureHandle = () => {
  requestPictureInPicture(state.dVideo);
};
// 全屏按钮
const toggleFullScreenHandle = () => {
  state.fullScreen = toggleFullScreen(refPlayerWrap.value);
};

const init = (): void => {
  if (!state.dVideo.canPlayType(props.type)) {
    console.error(
      "vue3-video-play: Format not supported,Check the [type] parameter"
    );
  }
  if (
    state.dVideo.canPlayType(props.type) ||
    state.dVideo.canPlayType("application/vnd.apple.mpegurl")
  ) {
    state.muted = props.autoPlay;
    // state.dVideo.load();
  }
  // // 使用hls解码
  else if (Hls2.isSupported()) {
    Hls.detachMedia(); //解除绑定
    Hls.attachMedia(state.dVideo);
    Hls.on(Hls2.Events.MEDIA_ATTACHED, () => {
      Hls.loadSource(props.src);
      // 加载可用质量级别
      Hls.on("hlsManifestParsed", (ev, data) => {
        console.log(data);
        state.currentLevel = data.level;
        state.qualityLevels = data.levels || [];
        // state.dVideo.load();
      });
    });

    Hls.on("hlsLevelSwitching", (ev, data) => {
      console.log(data);
      // state.qualityLevels = Hls.levels || []
      console.log("LEVEL_SWITCHING");
      // state.dVideo.load();
    });
    Hls.on("hlsLevelSwitched", (ev, data) => {
      state.currentLevel = data.level;
      // state.qualityLevels = Hls.levels || []
      console.log("LEVEL_SWITCHED");
      // state.dVideo.load();
    });
  }
};

watch(
  () => props.src,
  () => {
    nextTick(() => {
      // 初始化
      init();
    });
  },
  { immediate: true }
);
onMounted(() => {
  state.dVideo = refdVideo;
  inputFocusHandle();
});
defineExpose({
  play: playHandle, //播放
  pause: pauseHandle, //暂停
  togglePlay, //暂停或播放
});
</script>


<style lang="less" scoped>
@import "../style/reset.less";
@import "../style/transition.less";
@import "../style/animate.less";
@import "../style/base.less";
.d-player-wrap {
  --primary-color: v-bind(hexToRgbaColor);
  width: v-bind(width);
  height: v-bind(height);
}
@import "../style/vPlayer.less";
</style>