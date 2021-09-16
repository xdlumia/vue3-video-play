/*
 * @Author: web.王晓冬
 * @Date: 2021-08-20 19:10:57
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2021-09-16 17:42:17
 * @Description: file content
*/
<template>
  <!-- <div style="height:150px; margin-top:100px">
    <d-slider v-model="options.volume"></d-slider>
  </div>-->
  <div style="text-align: center">
    <button @click="options.lock = !options.lock">{{ options.lock }}</button>

    <lockScreen @enter="enter" v-model="options.lock" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, nextTick } from "vue";
import { lockScreen } from "../lib/index.js";

const options = reactive({
  lock: false,
});

const enter = () => {
  setTimeout(() => {
    options.lock = false
  }, 1000)

}

</script>

<style scoped>
</style>
