/*
 * @Author: web.王晓冬
 * @Date: 2020-11-03 16:29:47
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2021-09-16 18:00:57
 * @Description: file content
*/

<template>
  <teleport to="body">
    <transition name="d-fade-in">
      <div
        v-show="state.isLocked"
        class="d-lock-screen"
        @click="inputPassHanel"
        :class="{ inputPass: state.inputPass }"
        :style="bgImage"
      >
        <div class="d-lock-screen-date">
          <div class="d-lock-screen-time">{{ state.time }}</div>
          <div class="d-lock-screen-week">
            <span>{{ state.date }}</span>
            <span>星期{{ ['日', '一', '二', '三', '四', '五', '六',][state.week] }}</span>
          </div>
          <div class="d-lock-screen-weather">{{ state.weather }}</div>
        </div>

        <div class="d-lock-screen-input">
          <img
            class="d-lock-screen-avatar"
            src="https://xdlumia.oss-cn-beijing.aliyuncs.com/blog/avatar/60497771cc5eb351949ed4d8-1630921219218.jpg"
            alt
          />
          <p class="name">{{ props.name }}</p>
          <div>
            <input ref="refInput" class="input" maxlength="20" placeholder="请输入密码" type="password" />
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>
<script lang="ts">
export default {
  name: "lockScreen",
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import { reactive, ref, Ref, computed, onMounted, onUnmounted, watch, nextTick } from "vue";
import { debounce } from "throttle-debounce";
import local from '../utils/localStrong'
import { on, off } from '../utils/dom'
import dayjs from 'dayjs'
import {
  timeFormat,
  requestPictureInPicture,
  toggleFullScreen,
} from "../utils/util";
import { clearInterval } from 'timers';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  name: String,
  logo: String,
  timer: {
    type: Number,
    default: 5,
  }
}); //props
const emits = defineEmits(["update:modelValue", "locked", "enter", "unlock"]); //emits

const refInput: Ref<HTMLElement> = ref(null); //wrap
const state = reactive({
  bingWallpaper: {},
  time: dayjs().format('HH:mm'),
  date: dayjs().format('M月D日'),
  week: dayjs().day(),
  weather: '北京 晴转多云 12℃',
  lockTimer: new Date().getTime(),
  isLocked: false,
  updateTime: null,
  lockTime: null, //整体锁定倒计时
  inputLockTime: null, //输入情况下锁定倒计时
  inputPass: false,
});
// 获取本地壁纸
state.bingWallpaper = local.get('bingWallpaper') || {}

const getBingWallpaper = () => {
  fetch('https://api.dreamwq.com/api/bing').then(res => {
    return res.json()
  }).then(res => {
    let data = res.data || {}
    local.set('bingWallpaper', data)
    state.bingWallpaper = data
  })
}

if (state.bingWallpaper.enddate != dayjs().format('YYYYMMDD')) {
  getBingWallpaper()
}
// 获取背景图
const bgImage = computed(() => ({ backgroundImage: `url(${state.bingWallpaper.fullSrc})` }))
// 更新时间
state.updateTime = setInterval(() => {
  state.time = dayjs().format('HH:mm')
  state.date = dayjs().format('M月D日')
  state.week = dayjs().day()
}, 1000)

state.isLocked = computed({
  get() {
    return props.modelValue
  },
  set(val) {

    emits('update:modelValue', val)
  }
})
watch(() => props.modelValue, (val) => {
  if (!val) {
    unlockHandle()
  }
})
onMouseMove()
// 鼠标移动
function onMouseMove(e) {
  if (state.isLocked) return
  state.lockTimer = new Date().getTime()
  local.set('lockTimer', state.lockTimer)
  // state.lockTime = lockTime
  lockedTimer()
}
function lockedTimer() {
  window.clearInterval(state.lockTime)
  state.lockTime = setInterval(() => {
    let nowDate = new Date().getTime()
    if (state.isLocked || state.inputPass) return


    if ((nowDate - local.get('lockTimer')) > props.timer * 1000) {
      // 绑定keyup 执行inputPassHanelu事件
      on(document, 'keyup', inputPassHanel)
      state.isLocked = true
    } else {
      state.isLocked = false
    }
  }, 1000)
}
// 输入时锁定倒计时
function inputLockedTimer() {
  window.clearInterval(state.inputLockTime)
  if (state.isLocked && state.inputPass) {
    state.inputLockTime = setInterval(() => {
      let nowDate = new Date().getTime()
      if ((nowDate - state.lockTimer) > 60 * 1000) {
        state.inputPass = false
        window.clearInterval(state.inputLockTime)
      }
    }, 1000)
  }
}
// 输入密码
const inputPassHanel = () => {
  refInput.value.focus()
  state.lockTimer = new Date().getTime()
  state.inputPass = true

  inputLockedTimer()
  on(refInput.value, 'keydown', passEnter)
}
// 密码确认事件
function passEnter(ev) {
  if (ev.code == 'Enter') {
    emits('enter', false)
  }
}
// 输入密码后解锁事件
function unlockHandle(ev) {
  if (!state.inputPass) return
  off(refInput.value, 'keydown', passEnter)
  state.lockTimer = new Date().getTime()
  local.set('lockTimer', state.lockTimer)
  state.isLocked = false
  setTimeout(() => {
    state.inputPass = false
  }, 300)
  window.clearInterval(state.inputLockTime)
}
onMounted(() => {
  on(document, 'mousemove', onMouseMove)
  on(document, 'keyup', onMouseMove)
})

// 卸载事件
onUnmounted(() => {
  window.clearInterval(state.updateTime)
  window.clearInterval(state.inputLockTime)
  off(document, 'mousemove', onMouseMove)
  off(document, 'keyup', onMouseMove)
  off(refInput.value, 'keydown', passEnter)

})
</script>


<style lang="less" scoped>
@import "../style/transition.less";
@import "../style/lock-screen.less";
</style>