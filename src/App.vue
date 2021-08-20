/*
 * @Author: web.王晓冬
 * @Date: 2021-08-19 18:56:59
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2021-08-20 13:24:29
 * @Description: file content
*/

<template>
  <div>
    <vPlayer :options="options" />
  </div>
</template>

<script setup lang="ts">
import { reactive } from '@vue/reactivity';
import vPlayer from './v-player/main.vue'
const options = reactive({
  color: "#409eff",
  muted: false,
  webFullScreen: false,
  speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
  autoPlay: false,
})

</script>

<style>
</style>
